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

export default router;
