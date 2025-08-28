import express from "express";
import db from "../db.js";

const router = express.Router();

// GET cart items
router.get("/", async (req, res) => {
  try {
    const [results] = await db.query(`
      SELECT c.id, m.name, m.price, m.img, c.quantity 
      FROM cart c 
      JOIN menu_items m ON c.menu_item_id = m.id
    `);
    res.json(results);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST add to cart
router.post("/", async (req, res) => {
  try {
    const { name, quantity = 1 } = req.body;

    // Cari menu_item_id dari nama
    const [menu] = await db.query("SELECT id, price, img FROM menu_items WHERE name = ?", [name]);
    if (menu.length === 0) return res.status(404).json({ message: "Menu item not found" });

    const menu_item_id = menu[0].id;
    const price = menu[0].price;
    const img = menu[0].img;

    // Masukkan ke cart
    const [result] = await db.query(
      "INSERT INTO cart (menu_item_id, quantity) VALUES (?, ?)",
      [menu_item_id, quantity]
    );

    res.json({ id: result.insertId, menu_item_id, name, price, img, quantity });
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE cart item by ID
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await db.query("DELETE FROM cart WHERE id = ?", [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Cart item not found" });
    }
    res.json({ message: "Cart item deleted successfully", id });
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
