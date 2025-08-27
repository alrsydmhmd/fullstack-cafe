// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartProvider.jsx"; // ⬅️ Tambah import provider
import Cart from "./pages/Cart.jsx";

// Components
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import About from "./components/About";
import Menu from "./components/Menu.jsx";
import Footer from "./components/Footer";
import Contact from "./components/Contact";
import Profile from "./pages/Profile.jsx";
import Calendar from "./pages/Calender.jsx";
import Documents from "./pages/Documents.jsx";
import Transaksi from "./pages/Transaksi.jsx";
import Payment from "./pages/Payments.jsx";

// Pages
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import FullMenu from "./pages/FullMenu.jsx";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CartProvider> {/* ⬅️ Bungkus semua route */}
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
          <Route path="/order" element={<FullMenu />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/admin/profile" element={<Profile />} />
          <Route path="/admin/calendar" element={<Calendar />} />
          <Route path="/admin/documents" element={<Documents />} />
          <Route path="/admin/transaksi" element={<Transaksi />} />
          <Route path="/admin/payment" element={<Payment />} />

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
    </CartProvider>
  </React.StrictMode>
);
