import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 text-gray-800">
      <h1 className="text-3xl font-bold mb-4">☕ Admin Dashboard</h1>
      <p>Selamat datang di panel admin FullStack Café.</p>
      <button
        onClick={handleLogout}
        className="mt-6 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-500"
      >
        Logout
      </button>
    </div>
  );
}
