import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import cartRoutes from "./routes/cartRoutes.js";
import transaksiRoutes from "./routes/transaksiRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import auth from "./routes/auth.js";

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/cart", cartRoutes);
app.use("/api/transaksi", transaksiRoutes);
app.use("/api/users", userRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/auth", auth);
app.use("/api/auth/login", auth);
app.use("/api/auth/signup", auth);

// Root route
app.get("/", (req, res) => {
  res.send("Server Fullstack Cafe berjalan!");
});

app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
