import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="bg-gray-800 w-64 h-full p-5">
      <h2 className="text-white text-2xl font-bold mb-6">Dashboard</h2>
      <ul className="space-y-4">
        <li>
          <Link to="/admin/profile" className="text-gray-300 hover:text-white">
            Profile
          </Link>
        </li>
        <li>
          <Link to="/admin/login" className="text-gray-300 hover:text-white">
            Logout
          </Link>
        </li>
      </ul>
    </div>
  );
}
