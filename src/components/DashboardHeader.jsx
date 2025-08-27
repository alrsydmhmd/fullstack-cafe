import { useState, useEffect } from "react";
import {
  BellIcon,
  ChatBubbleOvalLeftIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import Gua from "../assets/gua.jpg";

export default function DashboardHeader() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("userData"));
    setUserData(data);
  }, []);

  return (
    <header className="flex flex-col sm:flex-row justify-between items-center bg-gray-800 p-4 rounded-lg mb-6 shadow-lg gap-4">
      {/* Search Bar */}
      <div className="flex items-center bg-gray-700 px-3 py-2 rounded-lg w-full sm:w-auto sm:flex-1">
        <MagnifyingGlassIcon className="w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search"
          className="bg-transparent outline-none text-gray-200 px-2 w-full"
        />
      </div>

      {/* Right Icons & Profile */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <div className="relative cursor-pointer">
          <BellIcon className="w-6 h-6 text-gray-300 hover:text-white" />
          <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
            5
          </span>
        </div>

        {/* Messages */}
        <div className="relative cursor-pointer">
          <ChatBubbleOvalLeftIcon className="w-6 h-6 text-gray-300 hover:text-white" />
          <span className="absolute -top-1 -right-2 bg-green-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
            3
          </span>
        </div>

        {/* Profile */}
        {userData && (
          <div className="flex items-center gap-2 cursor-pointer">
            <img
              src={Gua}
              alt="User"
              className="w-8 h-8 rounded-full border border-gray-500"
            />
            <span className="text-white font-semibold">{userData.username}</span>
          </div>
        )}
      </div>
    </header>
  );
}
