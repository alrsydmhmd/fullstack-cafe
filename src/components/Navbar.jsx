import { useState } from "react";
import { FiMenu, FiX, FiCoffee } from "react-icons/fi";
// src/components/Navbar.jsx

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-800 shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center text-white">
            <FiCoffee size={32} className="mr-2" />
            <span className="text-xl font-mono">FullStack Café</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <a href="#home" className="text-gray-300 hover:text-white font-medium">Home</a>
            <a href="/menu" className="text-gray-300 hover:text-white font-medium">Full Menu</a>
            <a href="#about" className="text-gray-300 hover:text-white font-medium">Our Story</a>
            <a href="#" className="text-gray-300 hover:text-white font-medium">Career</a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-300 focus:outline-none">
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-800 shadow-md">
          <a href="#home" className="block px-4 py-2 text-gray-300 hover:bg-gray-700">Home</a>
          <a href="/menu" className="block px-4 py-2 text-gray-300 hover:bg-gray-700">Full Menu</a>
          <a href="#about" className="block px-4 py-2 text-gray-300 hover:bg-gray-700">Our Story</a>
          <a href="/order" className="text-gray-300 hover:text-white font-medium">Career</a>
        </div>
      )}
    </nav>
  );
}
