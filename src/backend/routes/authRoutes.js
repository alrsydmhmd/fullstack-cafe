import express from "express";
import db from "../db.js";

const router = express.Router();

// Ambil data penjualan
router.get("/sales", (req, res) => {
  const query = `
    SELECT DATE_FORMAT(date, '%b') AS month, 
           SUM(price) AS sales, 
           COUNT(*) AS orders
    FROM sales
    GROUP BY month
    ORDER BY date ASC
  `;
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json(results);
  });
});

// Ambil semua pegawai
router.get("/employees", (req, res) => {
  db.query("SELECT * FROM employees", (err, results) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json(results);
  });
});

// Tambah pegawai
router.post("/employees", (req, res) => {
  const { name, role } = req.body;
  db.query(
    "INSERT INTO employees (name, role) VALUES (?, ?)",
    [name, role],
    (err, result) => {
      if (err) return res.status(500).json({ message: err.message });
      res.json({ id: result.insertId, name, role });
    }
  );
});

// Hapus pegawai
router.delete("/employees/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM employees WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json({ message: "Pegawai dihapus" });
  });
});

export default router;
