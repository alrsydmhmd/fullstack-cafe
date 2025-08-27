// src/components/Sidebar.jsx
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  HomeIcon,
  UsersIcon,
  CalendarIcon,
  DocumentIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { FiCoffee } from "react-icons/fi";

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm("Yakin ingin logout?")) {
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("userData");
      navigate("/admin/login");
    }
  };

  return (
    <div className="bg-indigo-700 w-64 min-h-screen flex flex-col">
      {/* Logo */}
      <div className="p-4 flex items-center space-x-2">
        <FiCoffee className="w-8 h-8 text-white" />
        <span className="text-white font-bold text-lg">Fullstack Café</span>
      </div>

      {/* Menu Utama */}
      <nav className="flex-1 px-3 mt-4 space-y-1">
        <Link
          to="/admin/dashboard"
          className="flex items-center gap-3 px-3 py-2 rounded-md text-white bg-indigo-800"
        >
          <HomeIcon className="w-5 h-5" />
          Dashboard
        </Link>
        <Link
          to="/admin/team"
          className="flex items-center gap-3 px-3 py-2 rounded-md text-indigo-100 hover:bg-indigo-600"
        >
          <UsersIcon className="w-5 h-5" />
          Team
        </Link>
        <Link
          to="/admin/calendar"
          className="flex items-center gap-3 px-3 py-2 rounded-md text-indigo-100 hover:bg-indigo-600"
        >
          <CalendarIcon className="w-5 h-5" />
          Calendar
        </Link>
        <Link
          to="/admin/documents"
          className="flex items-center gap-3 px-3 py-2 rounded-md text-indigo-100 hover:bg-indigo-600"
        >
          <DocumentIcon className="w-5 h-5" />
          Documents
        </Link>
        <Link
          to="/admin/reports"
          className="flex items-center gap-3 px-3 py-2 rounded-md text-indigo-100 hover:bg-indigo-600"
        >
          <ChartBarIcon className="w-5 h-5" />
          Reports
        </Link>
      </nav>

      {/* Tombol Settings */}
      <div className="mt-auto p-3">
        <Link
          to="/admin/settings"
          className="flex items-center gap-3 px-3 py-2 rounded-md text-indigo-100 hover:bg-indigo-600"
        >
          <Cog6ToothIcon className="w-5 h-5" />
          Settings
        </Link>
         <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2 rounded-md text-indigo-100 hover:bg-red-600 w-full text-left"
        >
          <ArrowRightOnRectangleIcon className="w-5 h-5" />
          Logout
        </button>
      </div>
    </div>
  );
}
