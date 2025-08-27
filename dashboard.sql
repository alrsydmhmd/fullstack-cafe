-- Buat database
CREATE DATABASE fullstack_cafe;
USE fullstack_cafe;

-- Tabel user / admin
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin','staff') DEFAULT 'staff',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabel salesHistory / transaksi
CREATE TABLE sales_history (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,         -- nama item
    price DECIMAL(12,2) NOT NULL,
    quantity INT DEFAULT 1,
    date DATETIME DEFAULT CURRENT_TIMESTAMP,
    paid BOOLEAN DEFAULT FALSE
);

-- Tabel pegawai aktif
CREATE TABLE active_users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    role VARCHAR(50) NOT NULL,
    jam_masuk TIME,
    jam_keluar TIME,
    lembur INT DEFAULT 0,
    cuti INT DEFAULT 0
);

-- Tabel statistik sederhana
CREATE TABLE stats (
    id INT AUTO_INCREMENT PRIMARY KEY,
    page_views INT DEFAULT 0,
    downloads INT DEFAULT 0,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
-- Tambah admin
INSERT INTO users (username, password, role) VALUES
('admin', 'hashed_password', 'admin');

-- Tambah beberapa transaksi contoh
INSERT INTO sales_history (name, price, quantity, date, paid) VALUES
('Caffe Latte', 25000, 2, '2025-08-27 09:30:00', TRUE),
('Espresso', 18000, 1, '2025-08-27 10:00:00', FALSE);

-- Tambah pegawai
INSERT INTO active_users (name, role, jam_masuk, jam_keluar, lembur, cuti) VALUES
('Budi', 'Barista', '08:00:00', '17:00:00', 2, 0),
('Siti', 'Kasir', '09:00:00', '18:00:00', 1, 0);

-- Tambah statistik awal
INSERT INTO stats (page_views, downloads) VALUES (120, 50);
SELECT * FROM users
