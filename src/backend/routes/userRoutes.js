import express from "express";
import db from "../db.js";

const router = express.Router();

// GET all users
router.get("/", async (req, res) => {
  const [rows] = await db.query("SELECT * FROM users");
  res.json(rows);
});

// POST add user
router.post("/", async (req, res) => {
  const { name, role, jamMasuk, jamKeluar, lembur, cuti } = req.body;
  const [result] = await db.query(
    "INSERT INTO users (name, role, jamMasuk, jamKeluar, lembur, cuti) VALUES (?, ?, ?, ?, ?, ?)",
    [name, role, jamMasuk, jamKeluar, lembur, cuti]
  );
  res.json({ id: result.insertId, name, role, jamMasuk, jamKeluar, lembur, cuti });
});

// DELETE user
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await db.query("DELETE FROM users WHERE id = ?", [id]);
  res.json({ message: "User deleted" });
});

// EDIT pegawai
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, role, jamMasuk, jamKeluar, lembur, cuti } = req.body;

  if (!name || !role || !jamMasuk || !jamKeluar) {
    return res.status(400).json({ success: false, message: "Nama, Role, Jam Masuk, dan Jam Keluar wajib diisi" });
  }

  try {
    await db.query(
      "UPDATE users SET name = ?, role = ?, jamMasuk = ?, jamKeluar = ?, lembur = ?, cuti = ? WHERE id = ?",
      [name, role, jamMasuk, jamKeluar, lembur, cuti, id]
    );

    const [rows] = await db.query("SELECT * FROM users WHERE id = ?", [id]);

    res.json({ success: true, user: rows[0], message: "Pegawai berhasil diupdate" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});


export default router;
