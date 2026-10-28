-- ========================================================================
-- RANCANGAN SQL DDL & DML DUMMY DATA
-- Halaman: ContactPage.jsx & ProductsMain.jsx
-- Target Database: PostgreSQL
-- ========================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ========================================================================
-- 1. TABEL MODUL KONTAK (CONTACTS)
-- ========================================================================

-- Grup Kontak
CREATE TABLE IF NOT EXISTS contact_groups (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Master Kontak
CREATE TABLE IF NOT EXISTS contacts (
    id BIGSERIAL PRIMARY KEY,
    display_name VARCHAR(200) NOT NULL,
    contact_types VARCHAR(50)[] NOT NULL,
    title VARCHAR(20) DEFAULT '',
    first_name VARCHAR(100) DEFAULT '',
    middle_name VARCHAR(100) DEFAULT '',
    last_name VARCHAR(100) DEFAULT '',
    identity_type VARCHAR(30) DEFAULT '',
    identity_number VARCHAR(50) DEFAULT '',
    emails TEXT[] DEFAULT '{}',
    company_name VARCHAR(200) DEFAULT '',
    phone VARCHAR(30) DEFAULT '',
    telephone VARCHAR(30) DEFAULT '',
    fax VARCHAR(30) DEFAULT '',
    billing_address TEXT DEFAULT '',
    billing_number VARCHAR(50) DEFAULT '',
    billing_rt_rw VARCHAR(50) DEFAULT '',
    billing_hamlet VARCHAR(100) DEFAULT '',
    billing_village VARCHAR(100) DEFAULT '',
    billing_sub_district VARCHAR(100) DEFAULT '',
    billing_district VARCHAR(100) DEFAULT '',
    billing_province VARCHAR(100) DEFAULT '',
    billing_postal_code VARCHAR(20) DEFAULT '',
    same_as_billing BOOLEAN DEFAULT TRUE,
    shipping_address TEXT DEFAULT '',
    other_info TEXT DEFAULT '',
    citizenship VARCHAR(20) DEFAULT 'indonesian',
    npwp VARCHAR(20) DEFAULT '',
    nitku VARCHAR(10) DEFAULT '',
    tin VARCHAR(50) DEFAULT '',
    receivable_account_id VARCHAR(50) DEFAULT '1-10100',
    payable_account_id VARCHAR(50) DEFAULT '2-20100',
    has_max_receivable BOOLEAN DEFAULT FALSE,
    max_receivable_amount NUMERIC(18, 2) DEFAULT 0.00,
    payment_term VARCHAR(30) DEFAULT 'net30',
    balance NUMERIC(18, 2) DEFAULT 0.00,
    is_archived BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Relasi Kontak <-> Grup Kontak (Maksimal 3 grup)
CREATE TABLE IF NOT EXISTS contact_group_members (
    id BIGSERIAL PRIMARY KEY,
    contact_id BIGINT NOT NULL REFERENCES contacts(id) ON DELETE CASCADE,
    group_id BIGINT NOT NULL REFERENCES contact_groups(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_contact_group UNIQUE (contact_id, group_id)
);

-- Rekening Bank Kontak (One-to-Many, Maksimal 3 rekening)
CREATE TABLE IF NOT EXISTS contact_bank_accounts (
    id BIGSERIAL PRIMARY KEY,
    contact_id BIGINT NOT NULL REFERENCES contacts(id) ON DELETE CASCADE,
    bank_name VARCHAR(150) NOT NULL,
    branch VARCHAR(100) DEFAULT '',
    holder_name VARCHAR(150) NOT NULL,
    account_number VARCHAR(50) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ========================================================================
-- 2. TABEL MODUL PRODUK & PERSEDIAAN (PRODUCTS & INVENTORY)
-- ========================================================================

-- Kategori Produk
CREATE TABLE IF NOT EXISTS product_categories (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT DEFAULT '',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Satuan Unit Produk
CREATE TABLE IF NOT EXISTS product_units (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    symbol VARCHAR(20) DEFAULT '',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Master Produk (Single & Bundle)
CREATE TABLE IF NOT EXISTS products (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    code VARCHAR(100) UNIQUE,
    barcode VARCHAR(100) DEFAULT '',
    unit_id BIGINT REFERENCES product_units(id) ON DELETE SET NULL,
    category_id BIGINT REFERENCES product_categories(id) ON DELETE SET NULL,
    description TEXT DEFAULT '',
    product_type VARCHAR(20) NOT NULL DEFAULT 'Single',
    image VARCHAR(255) DEFAULT '',
    inventory_tracking VARCHAR(20) NOT NULL DEFAULT 'tracked',
    track_mode VARCHAR(30) DEFAULT 'no_tracking',
    minimum_stock NUMERIC(14, 2) DEFAULT 0.00,
    inventory_account_id VARCHAR(50) DEFAULT '1-10200',
    is_purchased BOOLEAN DEFAULT TRUE,
    buy_price NUMERIC(18, 2) DEFAULT 0.00,
    buy_account_id VARCHAR(50) DEFAULT '5-50000',
    buy_tax VARCHAR(50) DEFAULT '',
    last_buy_price NUMERIC(18, 2) DEFAULT 0.00,
    is_sold BOOLEAN DEFAULT TRUE,
    sell_price NUMERIC(18, 2) DEFAULT 0.00,
    sell_account_id VARCHAR(50) DEFAULT '4-40000',
    sell_tax VARCHAR(50) DEFAULT '',
    total_stock NUMERIC(14, 2) DEFAULT 0.00,
    available_qty NUMERIC(14, 2) DEFAULT 0.00,
    is_archived BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Komponen Produk Paket (Bundle Components)
CREATE TABLE IF NOT EXISTS product_bundle_items (
    id BIGSERIAL PRIMARY KEY,
    bundle_product_id BIGINT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    component_product_id BIGINT NOT NULL REFERENCES products(id) ON DELETE RESTRICT,
    quantity NUMERIC(14, 2) NOT NULL DEFAULT 1.00,
    unit_cost_allocation NUMERIC(18, 2) DEFAULT 0.00,
    extra_cost_account_id VARCHAR(50) DEFAULT '',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ========================================================================
-- 3. TABEL MODUL GUDANG, PENYESUAIAN STOK & TRANSFER
-- ========================================================================

-- Master Gudang
CREATE TABLE IF NOT EXISTS warehouses (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    code VARCHAR(50) UNIQUE,
    address TEXT DEFAULT '',
    description TEXT DEFAULT '',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- PIC Gudang (Maks 5 PIC per gudang)
CREATE TABLE IF NOT EXISTS warehouse_pics (
    id BIGSERIAL PRIMARY KEY,
    warehouse_id BIGINT NOT NULL REFERENCES warehouses(id) ON DELETE CASCADE,
    user_id BIGINT NOT NULL REFERENCES accounts_customuser(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_warehouse_pic UNIQUE (warehouse_id, user_id)
);

-- Saldo Stok per Gudang
CREATE TABLE IF NOT EXISTS warehouse_stocks (
    id BIGSERIAL PRIMARY KEY,
    warehouse_id BIGINT NOT NULL REFERENCES warehouses(id) ON DELETE CASCADE,
    product_id BIGINT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    quantity NUMERIC(14, 2) NOT NULL DEFAULT 0.00,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_warehouse_product_stock UNIQUE (warehouse_id, product_id)
);

-- Header Penyesuaian Stok (Stok Opname)
CREATE TABLE IF NOT EXISTS stock_adjustments (
    id BIGSERIAL PRIMARY KEY,
    transaction_no VARCHAR(100) NOT NULL UNIQUE,
    date DATE NOT NULL,
    adjustment_type VARCHAR(30) NOT NULL,
    category VARCHAR(50) NOT NULL,
    account_id VARCHAR(50) NOT NULL,
    warehouse_id BIGINT NOT NULL REFERENCES warehouses(id) ON DELETE RESTRICT,
    status VARCHAR(30) NOT NULL DEFAULT 'APPROVED',
    tags TEXT[] DEFAULT '{}',
    notes TEXT DEFAULT '',
    created_by_id BIGINT REFERENCES accounts_customuser(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Detail Item Penyesuaian Stok
CREATE TABLE IF NOT EXISTS stock_adjustment_items (
    id BIGSERIAL PRIMARY KEY,
    adjustment_id BIGINT NOT NULL REFERENCES stock_adjustments(id) ON DELETE CASCADE,
    product_id BIGINT NOT NULL REFERENCES products(id) ON DELETE RESTRICT,
    system_quantity NUMERIC(14, 2) NOT NULL DEFAULT 0.00,
    actual_quantity NUMERIC(14, 2) NOT NULL DEFAULT 0.00,
    difference_quantity NUMERIC(14, 2) NOT NULL DEFAULT 0.00,
    unit_cost NUMERIC(18, 2) NOT NULL DEFAULT 0.00,
    total_amount NUMERIC(18, 2) NOT NULL DEFAULT 0.00
);

-- Header Transfer Antar Gudang
CREATE TABLE IF NOT EXISTS warehouse_transfers (
    id BIGSERIAL PRIMARY KEY,
    transaction_no VARCHAR(100) NOT NULL UNIQUE,
    date DATE NOT NULL,
    from_warehouse_id BIGINT NOT NULL REFERENCES warehouses(id) ON DELETE RESTRICT,
    to_warehouse_id BIGINT NOT NULL REFERENCES warehouses(id) ON DELETE RESTRICT,
    memo TEXT DEFAULT '',
    status VARCHAR(30) NOT NULL DEFAULT 'APPROVED',
    created_by_id BIGINT REFERENCES accounts_customuser(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Detail Item Transfer Antar Gudang
CREATE TABLE IF NOT EXISTS warehouse_transfer_items (
    id BIGSERIAL PRIMARY KEY,
    transfer_id BIGINT NOT NULL REFERENCES warehouse_transfers(id) ON DELETE CASCADE,
    product_id BIGINT NOT NULL REFERENCES products(id) ON DELETE RESTRICT,
    quantity NUMERIC(14, 2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Lampiran Berkas Transfer
CREATE TABLE IF NOT EXISTS warehouse_transfer_attachments (
    id BIGSERIAL PRIMARY KEY,
    transfer_id BIGINT NOT NULL REFERENCES warehouse_transfers(id) ON DELETE CASCADE,
    file_name VARCHAR(255) NOT NULL,
    file_path VARCHAR(255) NOT NULL,
    file_size BIGINT NOT NULL,
    uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ========================================================================
-- 4. TABEL MODUL ATURAN HARGA (PRICE RULES)
-- ========================================================================

-- Master Aturan Harga
CREATE TABLE IF NOT EXISTS price_rules (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(250) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    rule_type VARCHAR(50) NOT NULL,
    value NUMERIC(18, 2) NOT NULL DEFAULT 0.00,
    is_active BOOLEAN DEFAULT TRUE,
    apply_to_all_contacts BOOLEAN DEFAULT FALSE,
    apply_to_all_products BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Target Kontak Aturan Harga
CREATE TABLE IF NOT EXISTS price_rule_contacts (
    id BIGSERIAL PRIMARY KEY,
    price_rule_id BIGINT NOT NULL REFERENCES price_rules(id) ON DELETE CASCADE,
    contact_id BIGINT REFERENCES contacts(id) ON DELETE CASCADE,
    group_id BIGINT REFERENCES contact_groups(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Target Produk Aturan Harga
CREATE TABLE IF NOT EXISTS price_rule_products (
    id BIGSERIAL PRIMARY KEY,
    price_rule_id BIGINT NOT NULL REFERENCES price_rules(id) ON DELETE CASCADE,
    product_id BIGINT REFERENCES products(id) ON DELETE CASCADE,
    category_id BIGINT REFERENCES product_categories(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ========================================================================
-- 5. PENGISIAN DATA DUMMY (1 ATAU 2 DATA TIAP TABEL)
-- ========================================================================

-- 1. Grup Kontak
INSERT INTO contact_groups (id, name) VALUES
(1, 'VIP Client'),
(2, 'Supplier Utama')
ON CONFLICT (id) DO NOTHING;

-- 2. Kontak
INSERT INTO contacts (
    id, display_name, contact_types, title, first_name, last_name,
    identity_type, identity_number, emails, company_name, phone, billing_address,
    citizenship, npwp, receivable_account_id, payable_account_id, payment_term, balance
) VALUES
(1, 'PT Sinar Abadi Sentosa', ARRAY['customer'], 'Mr.', 'Budi', 'Santoso', 'KTP', '3271012345670001', ARRAY['finance@sinarabadi.com', 'budi@sinarabadi.com'], 'PT Sinar Abadi Sentosa', '081298765432', 'Jl. Jend. Sudirman Kav 21, Jakarta Selatan', 'indonesian', '1234567890123456', '1-10100', '2-20100', 'net30', 25000000.00),
(2, 'CV Maju Jaya Supplier', ARRAY['vendor'], 'Mr.', 'Hendra', 'Kurniawan', 'KTP', '3171098765430002', ARRAY['sales@majujaya.co.id'], 'CV Maju Jaya Supplier', '081345678901', 'Jl. Industri No. 45, Kawasan MM2100, Bekasi', 'indonesian', '9876543210987654', '1-10100', '2-20100', 'net15', -15000000.00)
ON CONFLICT (id) DO NOTHING;

-- 3. Anggota Grup Kontak
INSERT INTO contact_group_members (contact_id, group_id) VALUES
(1, 1),
(2, 2)
ON CONFLICT DO NOTHING;

-- 4. Rekening Bank Kontak
INSERT INTO contact_bank_accounts (contact_id, bank_name, branch, holder_name, account_number) VALUES
(1, 'PT. BANK CENTRAL ASIA TBK.', 'KCP Sudirman', 'PT Sinar Abadi Sentosa', '8870123456'),
(2, 'PT. BANK MANDIRI (PERSERO) TBK.', 'KC Bekasi', 'CV Maju Jaya Supplier', '1560009876543')
ON CONFLICT DO NOTHING;

-- 5. Kategori Produk
INSERT INTO product_categories (id, name, description) VALUES
(1, 'Elektronik & Aksesoris', 'Komponen dan perangkat elektronik'),
(2, 'Alat Tulis Kantor', 'Kebutuhan administrasi dan ATK')
ON CONFLICT (id) DO NOTHING;

-- 6. Satuan Unit Produk
INSERT INTO product_units (id, name, symbol) VALUES
(1, 'Pieces', 'Pcs'),
(2, 'Box', 'Box')
ON CONFLICT (id) DO NOTHING;

-- 7. Master Produk
INSERT INTO products (
    id, name, code, barcode, unit_id, category_id, description, product_type,
    inventory_tracking, track_mode, minimum_stock, buy_price, sell_price, total_stock, available_qty
) VALUES
(1, 'Laptop Stand Aluminium Adjustable', 'SKU-LSA-01', '899123456701', 1, 1, 'Stand laptop ergonomis bahan aluminium alloy', 'Single', 'tracked', 'no_tracking', 10.00, 150000.00, 250000.00, 85.00, 85.00),
(2, 'Paket Work From Home Ergonomic', 'BNDL-WFH-01', '899123456702', 2, 1, 'Paket bundle stand laptop + wireless mouse', 'Bundle', 'tracked', 'no_tracking', 5.00, 250000.00, 399000.00, 20.00, 20.00)
ON CONFLICT (id) DO NOTHING;

-- 8. Komponen Bundle
INSERT INTO product_bundle_items (bundle_product_id, component_product_id, quantity, unit_cost_allocation) VALUES
(2, 1, 1.00, 150000.00)
ON CONFLICT DO NOTHING;

-- 9. Gudang
INSERT INTO warehouses (id, name, code, address, description, is_active) VALUES
(1, 'Gudang Pusat Cengkareng', 'WH-CGK-01', 'Kawasan Pergudangan Daan Mogot KM 12, Jakarta Barat', 'Gudang operasional pusat jabodetabek', TRUE),
(2, 'Gudang Transit Surabaya', 'WH-SUB-01', 'Jl. Rungkut Industri Raya No. 10, Surabaya', 'Gudang distribusi wilayah Jawa Timur', TRUE)
ON CONFLICT (id) DO NOTHING;

-- 10. Saldo Stok Gudang
INSERT INTO warehouse_stocks (warehouse_id, product_id, quantity) VALUES
(1, 1, 55.00),
(2, 1, 30.00)
ON CONFLICT DO NOTHING;

-- 11. Penyesuaian Stok (Stok Opname)
INSERT INTO stock_adjustments (
    id, transaction_no, date, adjustment_type, category, account_id, warehouse_id, status, notes
) VALUES
(1, 'ADJ-202610-0001', '2026-10-20', 'stock_count', 'General', '8-80100', 1, 'APPROVED', 'Penyesuaian stok berkala akhir kuartal 3')
ON CONFLICT (id) DO NOTHING;

-- 12. Detail Item Penyesuaian Stok
INSERT INTO stock_adjustment_items (
    adjustment_id, product_id, system_quantity, actual_quantity, difference_quantity, unit_cost, total_amount
) VALUES
(1, 1, 57.00, 55.00, -2.00, 150000.00, -300000.00)
ON CONFLICT DO NOTHING;

-- 13. Transfer Gudang
INSERT INTO warehouse_transfers (
    id, transaction_no, date, from_warehouse_id, to_warehouse_id, memo, status
) VALUES
(1, 'TRF-202610-0001', '2026-10-22', 1, 2, 'Relokasi stok Stand Laptop ke cabang Surabaya', 'APPROVED')
ON CONFLICT (id) DO NOTHING;

-- 14. Detail Item Transfer
INSERT INTO warehouse_transfer_items (transfer_id, product_id, quantity) VALUES
(1, 1, 20.00)
ON CONFLICT DO NOTHING;

-- 15. Lampiran Berkas Transfer
INSERT INTO warehouse_transfer_attachments (transfer_id, file_name, file_path, file_size) VALUES
(1, 'surat_jalan_TRF001.pdf', 'transfers/surat_jalan_TRF001.pdf', 245760)
ON CONFLICT DO NOTHING;

-- 16. Aturan Harga
INSERT INTO price_rules (
    id, name, start_date, end_date, rule_type, value, is_active, apply_to_all_contacts, apply_to_all_products
) VALUES
(1, 'Promo Akhir Tahun VIP 15%', '2026-11-01', '2026-12-31', 'percentage_discount', 15.00, TRUE, FALSE, TRUE),
(2, 'Diskon Supplier Grosir Rp 20.000', '2026-10-01', '2026-11-30', 'fixed_discount', 20000.00, TRUE, FALSE, FALSE)
ON CONFLICT (id) DO NOTHING;

-- 17. Target Kontak Aturan Harga
INSERT INTO price_rule_contacts (price_rule_id, group_id) VALUES
(1, 1)
ON CONFLICT DO NOTHING;

-- 18. Target Produk Aturan Harga
INSERT INTO price_rule_products (price_rule_id, product_id) VALUES
(2, 1)
ON CONFLICT DO NOTHING;

-- Reset Sequence Generator PostgreSQL
SELECT setval('contact_groups_id_seq', COALESCE((SELECT MAX(id) FROM contact_groups), 1));
SELECT setval('contacts_id_seq', COALESCE((SELECT MAX(id) FROM contacts), 1));
SELECT setval('product_categories_id_seq', COALESCE((SELECT MAX(id) FROM product_categories), 1));
SELECT setval('product_units_id_seq', COALESCE((SELECT MAX(id) FROM product_units), 1));
SELECT setval('products_id_seq', COALESCE((SELECT MAX(id) FROM products), 1));
SELECT setval('warehouses_id_seq', COALESCE((SELECT MAX(id) FROM warehouses), 1));
SELECT setval('stock_adjustments_id_seq', COALESCE((SELECT MAX(id) FROM stock_adjustments), 1));
SELECT setval('warehouse_transfers_id_seq', COALESCE((SELECT MAX(id) FROM warehouse_transfers), 1));
SELECT setval('price_rules_id_seq', COALESCE((SELECT MAX(id) FROM price_rules), 1));
