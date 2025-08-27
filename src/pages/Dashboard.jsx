import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar"; // pakai sidebar ungu yang baru
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
  const [userData, setUserData] = useState(null);
  const [salesData, setSalesData] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadSalesData = () => {
    const salesHistory = JSON.parse(localStorage.getItem("salesHistory")) || [];

    const grouped = {};
    salesHistory.forEach((sale) => {
      const month = new Date(sale.date).toLocaleString("default", {
        month: "short",
      });
      if (!grouped[month]) {
        grouped[month] = { month, sales: 0, orders: 0 };
      }
      grouped[month].sales += sale.price;
      grouped[month].orders += 1;
    });

    setSalesData(Object.values(grouped));
    setLoading(false);
  };

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("userData"));
    if (!data || localStorage.getItem("isAuthenticated") !== "true") {
      window.location.href = "/login";
      return;
    }
    setUserData(data);

    loadSalesData();
  }, []);

  const handleResetSales = () => {
    if (window.confirm("Yakin ingin menghapus semua data penjualan?")) {
      localStorage.removeItem("salesHistory");
      setSalesData([]);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-900">
      {/* Sidebar Ungu */}
      <Sidebar />

      {/* Konten Dashboard */}
      <section className="flex-1 p-6">
        <DashboardHeader />
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <button
            onClick={handleResetSales}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Reset Penjualan
          </button>
        </div>

        {userData && (
          <div className="text-white mb-6">
            <p className="font-semibold">Welcome, {userData.username}!</p>
            <p>Email: {userData.email}</p>
          </div>
        )}

        {loading ? (
          <div className="text-white text-center py-20">Loading charts...</div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-2 ">
            {/* Line Chart */}
            <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
              <h2 className="text-lg text-white mb-4">Sales Overview</h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
                  <XAxis dataKey="month" stroke="#D1D5DB" />
                  <YAxis stroke="#D1D5DB" />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="sales"
                    stroke="#82ca9d"
                    strokeWidth={2}
                    animationDuration={800}
                  />
                  <Line
                    type="monotone"
                    dataKey="orders"
                    stroke="#8884d8"
                    strokeWidth={2}
                    animationDuration={800}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Bar Chart */}
            <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
              <h2 className="text-lg text-white mb-4">Orders Breakdown</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
                  <XAxis dataKey="month" stroke="#D1D5DB" />
                  <YAxis stroke="#D1D5DB" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="orders" fill="#8884d8" animationDuration={800} />
                  <Bar dataKey="sales" fill="#82ca9d" animationDuration={800} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
