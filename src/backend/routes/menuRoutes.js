import express from "express";
import db from "../db.js";

const router = express.Router();

// GET semua menu items
router.get("/", async (req, res) => {
  try {
    const [results] = await db.query("SELECT * FROM menu_items");
    res.json(results);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST add menu
router.post("/", async (req, res) => {
  try {
    const { name, price, description, img } = req.body;
    const [result] = await db.query(
      "INSERT INTO menu_items (name, price, description, img) VALUES (?, ?, ?, ?)",
      [name, price, description, img]
    );
    res.json({ id: result.insertId, name, price, description, img });
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE menu by ID
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await db.query("DELETE FROM menu_items WHERE id = ?", [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Menu not found" });
    }
    res.json({ message: "Menu deleted successfully", id });
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
