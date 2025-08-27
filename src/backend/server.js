import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import cartRoutes from "./routes/cartRoutes.js";
import transaksiRoutes from "./routes/transaksiRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/cart", cartRoutes);
app.use("/api/transaksi", transaksiRoutes);
app.use("/api/users", userRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("Server Fullstack Cafe berjalan!");
});

app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
