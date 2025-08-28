// routes/auth.js
import express from "express";
import db from "../db.js";

const router = express.Router();

// GET all admins
router.get("/", async (req, res) => {
  const [rows] = await db.query("SELECT * FROM admins");
  res.json(rows);
});

// SIGNUP admin baru
router.post("/signup", async (req, res) => {
  const { email, username, password } = req.body;

  if (!email || !username || !password) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  try {
    // Cek apakah email sudah terdaftar
    const [existing] = await db.query("SELECT * FROM admins WHERE email = ?", [email]);
    if (existing.length > 0) {
      return res.status(400).json({ success: false, message: "Email already registered" });
    }

    // Simpan ke database
    await db.query(
      "INSERT INTO admins (email, username, password) VALUES (?, ?, ?)",
      [email, username, password]
    );

    // Ambil data admin yang baru dibuat
    const [rows] = await db.query("SELECT * FROM admins WHERE email = ?", [email]);

    res.status(201).json({
      success: true,
      user: rows[0],
      message: "Signup successful"
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const [rows] = await db.query(
      "SELECT * FROM admins WHERE email = ? AND password = ?",
      [email, password]
    );
    if (rows.length > 0) {
      res.json({
        success: true,
        user: rows[0],
        message: "Login successful"
      });
    } else {
      res.status(401).json({ success: false, message: "Invalid email or password" });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// EDIT akun
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  try {
    await db.query(
      "UPDATE admins SET username = ?, email = ?, password = ? WHERE id = ?",
      [username, email, password, id]
    );

    const [rows] = await db.query("SELECT * FROM admins WHERE id = ?", [id]);

    res.json({ success: true, user: rows[0], message: "Akun berhasil diupdate" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// DELETE akun
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.query("DELETE FROM admins WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: "Akun tidak ditemukan" });
    }

    res.json({ success: true, message: "Akun berhasil dihapus" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});


export default router;
