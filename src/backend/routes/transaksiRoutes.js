import express from "express";
import db from "../db.js";

const router = express.Router();

// GET all transactions
router.get("/", async (req, res) => {
  const [rows] = await db.query("SELECT * FROM transaksi");
  res.json(rows);
});

// POST add transaction (pay)
router.post("/", async (req, res) => {
  const { name, price, quantity } = req.body;
  const [result] = await db.query(
    "INSERT INTO transaksi (name, price, quantity, paid) VALUES (?, ?, ?, ?)",
    [name, price, quantity, true]
  );
  // Delete item from cart after pay
  await db.query("DELETE FROM cart WHERE name = ? AND price = ? LIMIT 1", [name, price]);
  res.json({ id: result.insertId, name, price, quantity, paid: true });
});

export default router;
