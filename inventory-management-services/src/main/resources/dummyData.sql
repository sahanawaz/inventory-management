SELECT
    insert_dummy_data_shine_collection (50);

INSERT INTO
    public.sys_option (
        id,
        option_code,
        option_desc,
        option_value,
        info1,
        info2
    )
VALUES
    (1, 'COLOR', 'Red', 'Red', NULL, NULL),
    (2, 'COLOR', 'Blue', 'Blue', NULL, NULL),
    (3, 'COLOR', 'Green', 'Green', NULL, NULL),
    (4, 'COLOR', 'Green', 'Peacock', NULL, NULL),
    (5, 'COLOR', 'Soft Green', 'Pista', NULL, NULL),
    (6, 'COLOR', 'Yellow', 'Yellow', NULL, NULL),
    (
        7,
        'COLOR',
        'Strawberry',
        'Strawberry',
        NULL,
        NULL
    ),
    (8, 'COLOR', 'Multi', 'Multi', NULL, NULL),
    (9, 'COLOR', 'L Multi', 'L Multi', NULL, NULL),
    (10, 'COLOR', 'T Multi', 'T Multi', NULL, NULL),
    (11, 'COLOR', 'D Multi', 'D Multi', NULL, NULL),
    (12, 'COLOR', 'Green', 'Mehendi', NULL, NULL),
    (13, 'COLOR', 'White', 'White', NULL, NULL),
    (14, 'COLOR', 'Black', 'Black', NULL, NULL),
    (15, 'COLOR', 'Golden', 'Golden', NULL, NULL),
    (16, 'COLOR', 'Silver', 'Silver', NULL, NULL),
    (17, 'COLOR', 'White', 'White', NULL, NULL),
    (18, 'COLOR', 'Surf', 'Surf', NULL, NULL),
    (19, 'COLOR', 'Kahiya', 'Kahiya', NULL, NULL),
    (20, 'COLOR', 'Haldi', 'Haldi', NULL, NULL),
    (21, 'COLOR', 'Sentro', 'Sentro', NULL, NULL),
    (22, 'COLOR', 'Cream', 'Cream', NULL, NULL),
    (23, 'COLOR', 'Purple', 'Purple', NULL, NULL),
    (24, 'COLOR', 'Red', 'Gajari', NULL, NULL),
    (25, 'COLOR', 'Yellow', 'Mango', NULL, NULL),
    (26, 'COLOR', 'Morpankhi', 'Morpankhi', NULL, NULL),
    (27, 'COLOR', 'Wine', 'Wine', NULL, NULL),
    (28, 'COLOR', 'Redium', 'Redium', NULL, NULL),
    (29, 'COLOR', 'Rani', 'Rani', NULL, NULL),
    (30, 'COLOR', 'Tomato', 'Tamatri', NULL, NULL),
    (31, 'COLOR', 'Peach', 'Peach', NULL, NULL),
    (32, 'COLOR', 'Orange', 'Orange', NULL, NULL),
    (33, 'COLOR', 'Ice Blue', 'Indigo', NULL, NULL),
    (34, 'COLOR', 'Violet', 'Violet', NULL, NULL),
    (35, 'COLOR', 'Brown', 'Brown', NULL, NULL),
    (36, 'COLOR', 'Baby Pink', 'Baby Pink', NULL, NULL),
    (37, 'COLOR', 'NA', 'NA', NULL, NULL),
    (51, 'DIMENSION', '2/2', '2/2', NULL, NULL),
    (52, 'DIMENSION', '2/6', '2/6', NULL, NULL),
    (53, 'DIMENSION', '2/4', '2/4', NULL, NULL),
    (54, 'DIMENSION', '2/10', '2/10', NULL, NULL),
    (55, 'DIMENSION', '2/8', '2/8', NULL, NULL),
    (56, 'DIMENSION', '18', '18', NULL, NULL),
    (57, 'DIMENSION', '22', '22', NULL, NULL),
    (58, 'DIMENSION', '24', '24', NULL, NULL),
    (59, 'DIMENSION', 'MIX', 'MIX', NULL, NULL),
    (60, 'DIMENSION', 'NA', 'NA', NULL, NULL),
    (
        81,
        'CATEGORY_TYPE',
        'Design',
        'Design',
        NULL,
        NULL
    ),
    (82, 'CATEGORY_TYPE', 'Price', 'Price', NULL, NULL),
    (
        83,
        'CATEGORY_TYPE',
        'Company',
        'Company',
        NULL,
        NULL
    );

INSERT INTO
    public.sys_option (id, option_code, option_value)
VALUES
    (101, 'INVENTORY_TYPE', 'BANGLES'),
    (102, 'INVENTORY_TYPE', 'NECKLACE'),
    (103, 'INVENTORY_TYPE', 'EARINGS'),
    (104, 'INVENTORY_TYPE', 'LIPSTICK'),
    (105, 'INVENTORY_TYPE', 'NAILPOLISH'),
    (106, 'INVENTORY_TYPE', 'PERFUMES');

INSERT INTO
    public.inventory (
        id,
        date,
        stamp_date,
        stamp_user,
        unit_cp,
        unit_sp
    )
VALUES
    (1, CURRENT_DATE, CURRENT_DATE, 1, 100, 100);

INSERT INTO
    public.inventory_category (
        id,
        stamp_date,
        stamp_user,
        category_type,
        color,
        dimension
    )
VALUES
    (1, CURRENT_DATE, 1, 51, 1, 30);

INSERT INTO
    public.inventory_info (
        id,
        inventory_sku,
        purchased_quantity,
        sold_quantity,
        stamp_date,
        stamp_user,
        category_id,
        inventory_id
    )
VALUES
    (1, 'A072501', 10, 0, CURRENT_DATE, 1, 1, 1);