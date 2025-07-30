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
    varprfx := varmonth || RIGHT(varyear,2);

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
    varnewdocno := varpostfix || varprfx || LPAD(varnumber::varchar, 2, '0');

    RETURN varnewdocno;
END;
$function$
;

-- DROP FUNCTION public.fn_inventory_save(int4, jsonb);

CREATE OR REPLACE FUNCTION public.fn_inventory_save(arguserid integer, argdata jsonb)
 RETURNS TABLE(sku character varying)
 LANGUAGE plpgsql
AS $function$
BEGIN
    RETURN QUERY
    WITH t_inv_info AS (
        SELECT * FROM jsonb_to_recordset(argdata)
        AS info_data(
            "categoryType" Integer,
            "inventoryType" integer,
            "color" integer,
            "dimension" Integer,
            "unitCp" numeric(10,2),
            "unitSp" numeric(10,2),
            "qty" integer,
            "date" date,
			"description" varchar
        )
    ),
    t_data AS (
        SELECT vi.*, ic.id AS category_id
        FROM t_inv_info vi
        LEFT JOIN inventory_category ic
            ON ic.category_type = vi."categoryType"
            AND ic.color = vi."color"
            AND ic.dimension = vi."dimension"
    ),
    t_ins_category AS (
        INSERT INTO inventory_category
        (stamp_date, stamp_user, category_type, color, dimension)
        SELECT now(), arguserid, td."categoryType", td.color, td.dimension
        FROM t_data td
        WHERE td.category_id IS NULL
        RETURNING id
    ),
    t_data2 AS (
        SELECT vi.*, ic.id AS category_id
        FROM t_inv_info vi
        LEFT JOIN inventory_category ic
            ON ic.category_type = vi."categoryType"
            AND ic.color = vi."color"
            AND ic.dimension = vi."dimension"
    ),
    t_ins_inv AS (
        INSERT INTO inventory
        ("date", stamp_date, stamp_user, unit_cp, unit_sp, inventory_type,inventory_desc)
        SELECT td.date, now(), arguserid, td."unitCp", td."unitSp", td."inventoryType",td."description"
        FROM t_data2 td
        RETURNING id
    ),
    t_ins_inv_info AS (
        INSERT INTO inventory_info
        (inventory_sku, purchased_quantity, sold_quantity, stamp_date, stamp_user, category_id, inventory_id)
        SELECT fn_sys_generate_code(), td."qty", 0, now(), arguserid, tc.id, ti.id
        FROM t_data2 td
        FULL JOIN t_ins_inv ti ON true
		FULL JOIN t_ins_category tc ON true
        RETURNING inventory_sku
    )
    SELECT inventory_sku FROM t_ins_inv_info;
END;
$function$
;
