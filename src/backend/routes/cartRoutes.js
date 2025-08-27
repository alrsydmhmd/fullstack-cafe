import express from "express";
import db from "../db.js";

const router = express.Router();

// GET all cart items
router.get("/", async (req, res) => {
  const [rows] = await db.query("SELECT * FROM cart");
  res.json(rows);
});

// POST add to cart
router.post("/", async (req, res) => {
  const { name, price, quantity, img } = req.body;
  const [result] = await db.query(
    "INSERT INTO cart (name, price, quantity, img) VALUES (?, ?, ?, ?)",
    [name, price, quantity, img]
  );
  res.json({ id: result.insertId, name, price, quantity, img });
});

// DELETE cart item
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await db.query("DELETE FROM cart WHERE id = ?", [id]);
  res.json({ message: "Cart item deleted" });
});

export default router;
