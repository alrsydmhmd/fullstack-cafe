// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import About from "./components/About";
import Menu from "./components/Menu";
import Footer from "./components/Footer";
import Contact from "./components/Contact";

// Pages
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Dashboard from "./pages/Dashboard.jsx";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Routes>
        {/* Halaman Utama */}
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Header />
              <About />
              <Menu />
              <Contact />
              <Footer />
            </>
          }
        />

        {/* Halaman Admin */}
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin/signup" element={<Signup />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />

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
