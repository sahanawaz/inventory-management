SELECT insert_dummy_data_shine_collection(50);

INSERT INTO public.sys_option
(id, info1, info2, option_code, option_desc, option_value)
VALUES(1, '', '', 'COLOR', 'Red', 'Red'),
(2, '', '', 'COLOR', 'Blue', 'Blue'),
(3, '', '', 'COLOR', 'Green', 'Green'),
(30, '', '', 'DIMENSION', '2/2', '2/2'),
(31, '', '', 'DIMENSION', '2/4', '2/4'),
(32, '', '', 'DIMENSION', '2/6', '2/6'),
(50, '', '', 'DIMENSION', '2/6', '2/6'),
(51, '', '', 'INV_CATEGORY', 'Design', 'Design'),
(52, '', '', 'INV_CATEGORY', 'Price', 'Price'),
(53, '', '', 'INV_CATEGORY', 'Company', 'Company');

INSERT INTO public.inventory
(id,date, stamp_date, stamp_user, unit_cp, unit_sp)
VALUES(1,CURRENT_DATE, CURRENT_DATE, 1, 100, 100);

INSERT INTO public.inventory_category
(id,stamp_date, stamp_user, category_type, color, dimension)
VALUES(1, CURRENT_DATE, 1, 51, 1, 30);

INSERT INTO public.inventory_info
(id,inventory_sku, purchased_quantity, sold_quantity, stamp_date, stamp_user, category_id, inventory_id)
VALUES(1,'A072501', 10, 0, CURRENT_DATE, 1, 1, 1);