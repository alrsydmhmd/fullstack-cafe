// src/pages/PaymentHistory.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import DashboardHeader from "../components/DashboardHeader";

export default function PaymentHistory() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("paymentHistory")) || [];
    setHistory(data);
  }, []);

  const handleDelete = (index) => {
    if (window.confirm("Yakin ingin menghapus transaksi ini dari riwayat?")) {
      const updated = [...history];
      updated.splice(index, 1);
      setHistory(updated);
      localStorage.setItem("paymentHistory", JSON.stringify(updated));
    }
  };

  const handleClearAll = () => {
    if (window.confirm("Yakin ingin menghapus semua riwayat pembayaran?")) {
      localStorage.removeItem("paymentHistory");
      setHistory([]);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      <Sidebar />

      <div className="flex-1 p-6">
        <DashboardHeader />

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Riwayat Pembayaran</h1>
          <div className="flex gap-2">
            <Link
              to="/admin/transaksi"
              className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded"
            >
              ← Kembali
            </Link>
            {history.length > 0 && (
              <button
                onClick={handleClearAll}
                className="bg-red-600 hover:bg-red-500 px-4 py-2 rounded"
              >
                Hapus Semua
              </button>
            )}
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg shadow-lg overflow-x-auto">
          <table className="w-full text-left text-gray-300">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="py-2 px-3">No</th>
                <th className="px-3">Tanggal</th>
                <th className="px-3">Nama Item</th>
                <th className="px-3">Harga</th>
                <th className="px-3">Qty</th>
                <th className="px-3">Total</th>
                <th className="px-3">Status</th>
                <th className="px-3">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {history.length > 0 ? (
                history.map((t, i) => (
                  <tr key={i} className="border-b border-gray-700 hover:bg-gray-700 bg-green-700">
                    <td className="py-2 px-3">{i + 1}</td>
                    <td className="px-3">
                      {new Date(t.date).toLocaleString("id-ID", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td className="px-3">{t.name}</td>
                    <td className="px-3">
                      {t.price.toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      })}
                    </td>
                    <td className="px-3">{t.quantity || 1}</td>
                    <td className="px-3">
                      {(t.price * (t.quantity || 1)).toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      })}
                    </td>
                    <td className="px-3">
                      <span className="bg-green-500 text-white px-2 py-1 rounded text-xs">
                        Lunas
                      </span>
                    </td>
                    <td className="px-3">
                      <button
                        onClick={() => handleDelete(i)}
                        className="bg-red-600 hover:bg-red-500 px-3 py-1 rounded text-sm"
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center py-4">
                    Belum ada riwayat pembayaran.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
