import express from "express";
import db from "../db.js"; // koneksi mysql
const router = express.Router();

// Data penjualan per bulan
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT DATE_FORMAT(date, '%b') as month, SUM(price) as sales, COUNT(*) as orders
      FROM sales
      GROUP BY DATE_FORMAT(date, '%b')
      ORDER BY MIN(date)
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Data pegawai
router.get("/users", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM users");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
