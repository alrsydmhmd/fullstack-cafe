import { useState } from "react";
import { FiMenu, FiX, FiCoffee } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-800 shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex items-center text-white font-bold">
            <FiCoffee size={28} className="mr-2" />
            FullStack Café
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 items-center">
            <a href="#home" className="text-white hover:text-yellow-400">Home</a>
            <a href="#about" className="text-white hover:text-yellow-400">About</a>
            <a href="#menu" className="text-white hover:text-yellow-400">Menu</a>
            <a href="#contact" className="text-white hover:text-yellow-400">Contact</a>

            {/* Admin Buttons */}
            <div className="flex space-x-3 ml-6">
              <Link
                to="/admin/login"
                className="text-white px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600"
              >
                Login
              </Link>
              <Link
                to="/admin/signup"
                className="px-4 py-2 rounded-lg bg-yellow-500 font-semibold hover:bg-yellow-400"
              >
                Sign Up
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white focus:outline-none"
            >
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-800 shadow-md">
          <a href="#home" className="block px-4 py-2 text-white hover:bg-gray-700">Home</a>
          <a href="#about" className="block px-4 py-2 text-white hover:bg-gray-700">About</a>
          <a href="#menu" className="block px-4 py-2 text-white hover:bg-gray-700">Menu</a>
          <a href="#contact" className="block px-4 py-2 text-white hover:bg-gray-700">Contact</a>
          <Link to="/admin/login" className="block px-4 py-2 text-white hover:bg-gray-700">
            Login
          </Link>
          <Link to="/admin/signup" className="block px-4 py-2 hover:bg-gray-700">
            Sign Up
          </Link>
        </div>
      )}
    </nav>
  );
}
