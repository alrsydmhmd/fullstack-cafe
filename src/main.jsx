// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import PublicLayout from "./layouts/PublicLayouts.jsx";
import AdminLayout from "./layouts/AdminLayout.jsx";

import Navbar from "./components/Navbar";
import Header from "./components/Header";
import About from "./components/About";
import Menu from "./components/Menu";
import Footer from "./components/Footer";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import Dashboard from "./pages/Dashboard.jsx";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Navbar />
      <Routes>
        {/* Halaman Utama */}
        <Route
          path="/"
          element={
            <PublicLayout>
              <Header />
              <About />
              <Menu />
              <Footer />
            </PublicLayout>
          }
        />

        {/* Halaman Admin */}
        <Route path="/admin/login" element={<AdminLayout><Login /></AdminLayout>} />
        <Route path="/admin/signup" element={<AdminLayout><Signup /></AdminLayout>} />
        <Route path="/admin/dashboard" element={<AdminLayout><Dashboard /></AdminLayout>} />

        {/* 404 */}
        <Route
          path="*"
          element={
            <h1 className="text-center text-2xl mt-20 text-red-500">
              Page Not Found
            </h1>
          }
        />
      </Routes>
    </Router>
  </React.StrictMode>
);
