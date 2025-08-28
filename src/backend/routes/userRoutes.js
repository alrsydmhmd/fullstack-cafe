import express from "express";
const router = express.Router();

// Data sementara (bisa diganti DB nanti)
let users = [
  { id: 1, name: "Ali", role: "Kasir", jamMasuk: "08:00", jamKeluar: "16:00", lembur: "2", cuti: "0" }
];

// GET semua users
router.get("/", (req, res) => {
  res.json(users);
});

// POST tambah user
router.post("/", (req, res) => {
  const newUser = { id: Date.now(), ...req.body };
  users.push(newUser);
  res.status(201).json(newUser);
});

// DELETE user
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  users = users.filter(u => u.id !== id);
  res.json({ message: "User deleted" });
});

export default router;
