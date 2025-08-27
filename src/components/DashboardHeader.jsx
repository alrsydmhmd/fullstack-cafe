import { BellIcon, MagnifyingGlassIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { FiCoffee } from "react-icons/fi";
import Gua from "../assets/gua.jpg";

export default function DashboardHeader() {
  return (
    <header className="flex items-center justify-between bg-gray-900 px-4 py-3 border-b border-gray-800">
      {/* Logo kiri */}
      <div className="flex items-center">
        <FiCoffee className="w-8 h-8 text-indigo-500" />
      </div>

      {/* Search */}
      <div className="flex items-center flex-1 max-w-md mx-4">
        <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 mr-2" />
        <input
          type="text"
          placeholder="Search"
          className="bg-gray-800 text-white px-3 py-2 rounded-md w-full
                     focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Right: bell + profile */}
      <div className="flex items-center gap-4">
        <BellIcon className="w-6 h-6 text-gray-300 hover:text-white cursor-pointer" />
        <div className="flex items-center gap-2">
          <img
            className="w-8 h-8 rounded-full"
            src={Gua}
            alt="User avatar"
          />
          <span className="text-white font-semibold">Muhamad Zamzam Alrasyd</span>
          <ChevronDownIcon className="w-4 h-4 text-gray-300" />
        </div>
      </div>
    </header>
  );
}
