import express from "express";
import db from "../db.js";

const router = express.Router();

// GET all transactions
router.get("/", async (req, res) => {
  try {
    const [results] = await db.query("SELECT * FROM transactions ORDER BY created_at DESC");
    res.json(results);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST new transaction
router.post("/", async (req, res) => {
  try {
    const { menu_item_id, name, price, quantity = 1 } = req.body;
    const [result] = await db.query(
      "INSERT INTO transactions (menu_item_id, name, price, quantity) VALUES (?, ?, ?, ?)",
      [menu_item_id, name, price, quantity]
    );
    res.json({ id: result.insertId, menu_item_id, name, price, quantity, paid: false });
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE transaction by ID
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await db.query("DELETE FROM transactions WHERE id = ?", [id]);
    res.json({ message: "Transaction deleted" });
  } catch (err) {
    res.status(500).json(err);
  }
});

// PUT mark transaction as paid
router.put("/:id/pay", async (req, res) => {
  try {
    const { id } = req.params;
    await db.query("UPDATE transactions SET paid = 1 WHERE id = ?", [id]);
    res.json({ message: "Transaction paid" });
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
