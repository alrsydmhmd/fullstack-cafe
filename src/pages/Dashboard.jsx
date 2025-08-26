import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar"; // Ensure this path is correct

export default function Dashboard() {
  const [userData, setUserData] = useState(null); // Correct state naming

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("userData"));
    if (!data || localStorage.getItem("isAuthenticated") !== "true") {
      window.location.href = "/login";
    } else {
      setUserData(data); // Correct state update
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userData");
    window.location.href = "/login";
  };

  return (
    <div className="flex">
      <Sidebar />
      <section className="flex-1 min-h-screen p-8 bg-gray-900">
        <h1 className="text-2xl font-bold text-white mb-6">Dashboard</h1>
        {userData && (
          <div className="text-white mb-4">
            <p>Welcome, {userData.username}!</p>
            <p>Email: {userData.email}</p>
          </div>
        )}
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-400"
        >
          Logout
        </button>
      </section>
    </div>
  );
}
