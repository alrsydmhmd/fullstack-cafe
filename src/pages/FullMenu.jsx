import Latte from "../assets/CaffeLatte.jpg";
import Espresso from "../assets/Espresso.jpg";
import Croissant from "../assets/Croissant.jpg";
import Mocktail from "../assets/Mocktail.jpg";
import Sushi from "../assets/Sushi.jpg";
import Burger from "../assets/Burger.jpg";
import { useCart } from "../context/UseCart"; 
import { Link, useNavigate } from "react-router-dom";

export default function FullMenu() {
  const { cart, addToCart } = useCart();
  const navigate = useNavigate();

  const menuItems = [
    { name: "Espresso", price: 50, desc: "Strong and bold single shot coffee.", img: Espresso },
    { name: "Caffe Latte", price: 35, desc: "Espresso with steamed milk & foam.", img: Latte },
    { name: "Croissant", price: 30, desc: "Famous cookies from France", img: Croissant },
    { name: "Strawberry Mocktail", price: 35, desc: "The ideal drink for a warm summer day.", img: Mocktail },
    { name: "Sushi", price: 50, desc: "A Japanese dish with vinegared rice and various toppings.", img: Sushi },
    { name: "Burger King", price: 50, desc: "A sandwich with grilled beef patty in a bun.", img: Burger },
  ];

  const handleAdd = (item) => {
    addToCart(item);

    const salesHistory = JSON.parse(localStorage.getItem("salesHistory")) || [];
    salesHistory.push({
      date: new Date().toISOString(),
      name: item.name,
      price: item.price,
    });
    localStorage.setItem("salesHistory", JSON.stringify(salesHistory));

    const updatedCart = [...cart, item];
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#3e2723] to-[#4e342e] text-white py-12 px-6">
      
      {/* Keranjang Kuning */}
      <div
        id="cart-icon"
        className="fixed top-4 right-4 bg-yellow-400 text-black p-3 rounded-full shadow-lg cursor-pointer"
        onClick={() => navigate("/cart")}
      >
        🛒
        {cart.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
            {cart.length}
          </span>
        )}
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Tombol Kembali */}
        <div className="mb-6">
          <Link
            to="/"
            className="bg-[#d7b899] text-[#2e1c15] px-6 py-3 rounded-lg font-semibold hover:bg-[#c8a97e] transition"
          >
            ← Kembali ke Halaman Utama
          </Link>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-center text-[#d7b899] mb-10">
          Fullstack Café Menu
        </h1>

        {/* Menu Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {menuItems.map((item, index) => (
            <div
              key={index}
              className="bg-[#2e1c15] rounded-xl shadow-lg border border-[#d7b899] overflow-hidden hover:scale-105 transition-transform"
            >
              <img
                src={item.img}
                alt={item.name}
                className="w-full h-[260px] object-cover"
              />
              <div className="p-6">
                <h2 className="text-xl font-semibold text-[#f1e0c5]">
                  {item.name}
                </h2>
                <p className="text-[#d7b899] font-medium mb-2">
                  {item.price.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </p>
                <p className="text-gray-300 text-sm">{item.desc}</p>
                <button
                  onClick={() => handleAdd(item)}
                  className="mt-2 bg-[#d7b899] text-[#2e1c15] px-4 py-2 rounded hover:bg-[#c8a97e] font-semibold"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
