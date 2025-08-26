import Background from '../assets/background.jpg';
import { Link } from 'react-router-dom';

// src/components/Header.jsx
export default function Header() {
  return (
    <section
      className="relative bg-gray-800 text-white h-screen flex items-center justify-center"
      id="home"
    >
      <div className="absolute inset-0">
        <img
          src={Background}
          alt="Coffee Shop Background"
          className="w-full h-full object-cover opacity-50"
        />
      </div>
      <div className="relative z-10 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">
          Welcome to FullStack Café
        </h1>
        <p className="text-lg md:text-xl mb-8">"Here, Java means more than just a programming language — it’s a cup of happiness."</p>
        <Link
          to="/order"
          className="bg-yellow-500 text-gray-800 font-semibold py-2 px-4 rounded hover:bg-yellow-400 transition duration-300"
        >
          Order Now
        </Link>
      </div>
    </section>
  );
}