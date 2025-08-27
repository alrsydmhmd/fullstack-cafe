// src/pages/Dashboard.jsx
import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import DashboardHeader from "../components/DashboardHeader";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function Dashboard() {
  const [salesData, setSalesData] = useState([]);
  const [totalSales, setTotalSales] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [pageViews, setPageViews] = useState(0);
  const [downloads, setDownloads] = useState(0);
  const [loading, setLoading] = useState(true);
  const [activeUsers, setActiveUsers] = useState([]);

  const loadSalesData = () => {
    const salesHistory = JSON.parse(localStorage.getItem("salesHistory")) || [];

    const grouped = {};
    let salesSum = 0;
    let ordersCount = 0;

    salesHistory.forEach((sale) => {
      const month = new Date(sale.date).toLocaleString("default", {
        month: "short",
      });
      if (!grouped[month]) {
        grouped[month] = { month, sales: 0, orders: 0 };
      }
      grouped[month].sales += sale.price;
      grouped[month].orders += 1;

      salesSum += sale.price;
      ordersCount += 1;
    });

    setTotalSales(salesSum);
    setTotalOrders(ordersCount);
    setSalesData(Object.values(grouped));
    setLoading(false);
  };

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("userData"));
    if (!data || localStorage.getItem("isAuthenticated") !== "true") {
      window.location.href = "/login";
      return;
    }

    setPageViews(parseInt(localStorage.getItem("pageViews") || 0));
    setDownloads(parseInt(localStorage.getItem("downloads") || 0));

    // Ambil data pegawai dari localStorage
    const storedUsers = JSON.parse(localStorage.getItem("activeUsers")) || [];
    setActiveUsers(storedUsers);

    loadSalesData();
  }, []);

  const handleResetSales = () => {
    if (window.confirm("Yakin ingin menghapus semua data penjualan?")) {
      localStorage.removeItem("salesHistory");
      setSalesData([]);
      setTotalSales(0);
      setTotalOrders(0);
    }
  };

  const handleDeleteUser = (id) => {
    if (window.confirm("Hapus pegawai ini?")) {
      const updatedUsers = activeUsers.filter((user) => user.id !== id);
      setActiveUsers(updatedUsers);
      localStorage.setItem("activeUsers", JSON.stringify(updatedUsers));
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-900">
      <Sidebar />

      <section className="flex-1 p-6">
        <DashboardHeader />

        <div className="flex justify-between items-center mb-6">
          <button
            onClick={handleResetSales}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Reset Penjualan
          </button>
        </div>

        {/* Top Cards */}
        <div className="grid gap-6 md:grid-cols-4 mb-6">
          <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
            <p className="text-orange-400 text-xl font-bold">
              ${totalSales.toLocaleString()}
            </p>
            <p className="text-gray-300">Total Perhari</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
            <p className="text-green-400 text-xl font-bold">{pageViews}+</p>
            <p className="text-gray-300">Pemasukan Perbulan</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
            <p className="text-red-400 text-xl font-bold">{totalOrders}</p>
            <p className="text-gray-300">Pengeluaran Perbulan</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
            <p className="text-cyan-400 text-xl font-bold">{downloads}</p>
            <p className="text-gray-300">Omset</p>
          </div>
        </div>

        {loading ? (
          <div className="text-white text-center py-20">Loading charts...</div>
        ) : (
          <>
            {/* Charts */}
            <div className="grid gap-6 lg:grid-cols-3 mb-6">
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg lg:col-span-2">
                <h2 className="text-lg text-white mb-4">Visitors</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
                    <XAxis dataKey="month" stroke="#D1D5DB" />
                    <YAxis stroke="#D1D5DB" />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="sales" stroke="#82ca9d" />
                    <Line type="monotone" dataKey="orders" stroke="#8884d8" />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h2 className="text-lg text-white mb-4">Orders Breakdown</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
                    <XAxis dataKey="month" stroke="#D1D5DB" />
                    <YAxis stroke="#D1D5DB" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="orders" fill="#8884d8" />
                    <Bar dataKey="sales" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Active Employees Table */}
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h2 className="text-lg text-white mb-4">Pegawai</h2>
              <table className="w-full text-gray-300 mb-4">
                <thead>
                  <tr className="bg-gray-700">
                    <th className="text-left py-2 px-3">Nama</th>
                    <th className="text-left py-2 px-3">Jabatan</th>
                    <th className="text-left py-2 px-3">Jam Masuk</th>
                    <th className="text-left py-2 px-3">Jam Keluar</th>
                    <th className="text-left py-2 px-3">Lembur</th>
                    <th className="text-left py-2 px-3">Cuti</th>
                    <th className="text-left py-2 px-3">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {activeUsers.length > 0 ? (
                    activeUsers.map((emp) => (
                      <tr key={emp.id} className="border-b border-gray-700">
                        <td className="py-2 px-3">{emp.name}</td>
                        <td className="py-2 px-3">{emp.role}</td>
                        <td className="py-2 px-3">{emp.jamMasuk || "-"}</td>
                        <td className="py-2 px-3">{emp.jamKeluar || "-"}</td>
                        <td className="py-2 px-3">{emp.lembur || "-"}</td>
                        <td className="py-2 px-3">{emp.cuti || "-"}</td>
                        <td className="py-2 px-3">
                          <button
                            onClick={() => handleDeleteUser(emp.id)}
                            className="bg-red-600 hover:bg-red-500 text-white px-3 py-1 rounded"
                          >
                            Hapus
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="text-center py-4">
                        Tidak ada pegawai aktif.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}
      </section>
    </div>
  );
}
