-- DROP FUNCTION public.fn_sys_generate_code();

CREATE OR REPLACE FUNCTION public.fn_sys_generate_code()
 RETURNS character varying
 LANGUAGE plpgsql
AS $function$
DECLARE
 varprfx varchar(20);
 varoutprfx varchar(20);
 varyear varchar(4);
 varmonth varchar(2);
 varday varchar(2);
 varpostfix varchar(2); -- This variable will hold the postfix character (e.g., 'A', 'B')
 varnumber integer;
 varnewdocno varchar(30);
BEGIN
    --- Step1: Get the year, month and day from the today's date
    -- Use LPAD to ensure month and day are always two digits (e.g., '01', '07')
    SELECT DATE_PART('year', current_date)::varchar(4),
           LPAD(DATE_PART('month', current_date)::varchar(2), 2, '0'),
           LPAD(DATE_PART('day', current_date)::varchar(2), 2, '0')
      INTO varyear, varmonth, varday;

    -- Construct the prefix (e.g., '0725' for July 2025)
    -- Using varmonth directly as it's already zero-padded
    varprfx := RIGHT(varyear,2) || varmonth;

    --- Attempt to update the document format table by incrementing num_seg2
    --- The RETURNING clause will populate varoutprfx, varnumber, and varpostfix
    UPDATE public.sys_doc_number
    SET num_seg2 = num_seg2 + 1
    WHERE num_seg1 = varprfx
    RETURNING num_seg1, num_seg2, postfix INTO varoutprfx, varnumber, varpostfix;

    --- If no record was found for the current prefix (varprfx), insert a new one
    IF NOT FOUND THEN
        INSERT INTO public.sys_doc_number(postfix, num_seg1, num_seg2)
        VALUES('A', varprfx, 1)
        -- Crucially, return all three values into the respective variables
        RETURNING num_seg1, num_seg2, postfix INTO varoutprfx, varnumber, varpostfix;
    -- If a record was found and the incremented number exceeds 99
    ELSEIF varnumber > 99 THEN
        -- Update the existing record: increment postfix and reset num_seg2 to 1
        UPDATE public.sys_doc_number
        SET
            postfix = CHR(ASCII(postfix::char) + 1), -- Increment the character (e.g., 'A' to 'B')
            num_seg2 = 1 -- Reset the sequence number for the new postfix
        WHERE num_seg1 = varprfx
        -- Return the NEW postfix and the reset number into the variables
        RETURNING postfix, num_seg2 INTO varpostfix, varnumber;
    END IF;

    -- Construct the new document number
    -- Assuming format: POSTFIX + PREFIX (MMYY) + NUMBER (3 digits, zero-padded)
    -- Example: A0725001, B0725001 etc.
    varnewdocno := varprfx || varpostfix || LPAD(varnumber::varchar, 2, '0');

    RETURN varnewdocno;
END;
$function$
;

-- DROP FUNCTION public.fn_inventory_save(int4, jsonb);

CREATE OR REPLACE FUNCTION public.fn_inventory_save(
	arguserid integer,
	argdata jsonb)
    RETURNS TABLE(sku character varying)
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
BEGIN
	RETURN QUERY
	WITH t_inv_info AS (
        SELECT info_data.*, ic.id category_id, i.id inventory_id FROM jsonb_to_recordset(argdata)
        AS info_data(
            "categoryType" Integer,
            "inventoryType" integer,
            "color" integer,
            "dimension" Integer,
            "unitCp" numeric(10,2),
            "unitSp" numeric(10,2),
            "qty" integer,
            "date" date,
			"description" varchar,
			"sku" varchar
        )
		LEFT JOIN inventory_category ic
            ON ic.category_type = info_data."categoryType"
            AND ic.color = info_data."color"
            AND ic.dimension = info_data."dimension"
		LEFT JOIN inventory i
			ON i.inventory_type = info_data."inventoryType"
			AND i.inventory_desc = info_data."description"
			AND i.unit_cp = info_data."unitCp"
			AND i.unit_sp = info_data."unitSp"
    ),
    t_ins_category AS (
		INSERT INTO inventory_category
	    (stamp_date, stamp_user, category_type, color, dimension)
	    SELECT DISTINCT now(), arguserid, td."categoryType", td.color, td.dimension
	    FROM t_inv_info td
	    WHERE td.category_id IS NULL
		RETURNING id, category_type, color, dimension
	),
    t_ins_inv AS (
        INSERT INTO inventory
        ("date", stamp_date, stamp_user, unit_cp, unit_sp, inventory_type,inventory_desc)
        SELECT DISTINCT td.date, now(), arguserid, td."unitCp", td."unitSp", td."inventoryType",td."description"
        FROM t_inv_info td
		WHERE td.inventory_id IS NULL
        RETURNING id, unit_cp, unit_sp, inventory_type,inventory_desc
    )
	INSERT INTO inventory_info
	(inventory_sku, purchased_quantity, sold_quantity, stamp_date, stamp_user, category_id, inventory_id)
	SELECT
		CASE WHEN td."sku" IS NULL OR LENGTH(td."sku") = 0 THEN fn_sys_generate_code() ELSE td."sku" END,
		td."qty", 0, now(), arguserid, COALESCE(td.category_id, tic.id, 0), COALESCE(td.inventory_id, ti.id, 0)
	FROM t_inv_info td
	LEFT JOIN t_ins_inv ti
		ON ti.unit_sp = td."unitSp" AND ti.unit_cp = td."unitCp"
		AND ti.inventory_type = td."inventoryType" AND ti.inventory_desc = td."description"
	LEFT JOIN t_ins_category tic
		ON tic.color = td.color AND tic.dimension = td.dimension AND tic.category_type = td."categoryType"
	RETURNING inventory_sku;
END;
$BODY$;
