// src/pages/Dashboard.jsx
import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar"; 
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

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("userData"));
    if (!data || localStorage.getItem("isAuthenticated") !== "true") {
      window.location.href = "/login";
    } else {
      setUserData(data);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userData");
    window.location.href = "/login";
  };

  // Data dummy untuk chart
  const salesData = [
    { month: "Jan", sales: 400, orders: 240 },
    { month: "Feb", sales: 300, orders: 139 },
    { month: "Mar", sales: 200, orders: 980 },
    { month: "Apr", sales: 278, orders: 390 },
    { month: "May", sales: 189, orders: 480 },
    { month: "Jun", sales: 239, orders: 380 },
  ];

  return (
    <div className="flex">
      <Sidebar />
      <section className="flex-1 min-h-screen p-8 bg-gray-900">
        <h1 className="text-2xl font-bold text-white mb-6">Dashboard</h1>

        {userData && (
          <div className="text-white mb-6">
            <p className="font-semibold">Welcome, {userData.username}!</p>
            <p>Email: {userData.email}</p>
          </div>
        )}

        {/* Chart Container */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Line Chart */}
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
            <h2 className="text-lg text-white mb-4">Sales Overview</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis dataKey="month" stroke="#aaa" />
                <YAxis stroke="#aaa" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="sales" stroke="#82ca9d" strokeWidth={2} />
                <Line type="monotone" dataKey="orders" stroke="#8884d8" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Bar Chart */}
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
            <h2 className="text-lg text-white mb-4">Orders Breakdown</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis dataKey="month" stroke="#aaa" />
                <YAxis stroke="#aaa" />
                <Tooltip />
                <Legend />
                <Bar dataKey="orders" fill="#8884d8" />
                <Bar dataKey="sales" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Logout Button */}
        <div className="mt-8">
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-400"
          >
            Logout
          </button>
        </div>
      </section>
    </div>
  );
}
