import Latte from "../assets/CaffeLatte.jpg";
import Espresso from "../assets/Espresso.jpg"
import Croissant from "../assets/Croissant.jpg"
import Mocktail from "../assets/Mocktail.jpg"
import Sushi from "../assets/Sushi.jpg"
import Burger from "../assets/Burger.jpg"
import { useCart } from "../context/CartContext";


// src/pages/FullMenu.jsx
export default function FullMenu() {
  const { addToCart } = useCart();
  const menuItems = [
    {
      name: "Espresso",
      price: "50K",
      desc: "Strong and bold single shot coffee.",
      img: Espresso
    },
    {
      name: "Caffe Latte",
      price: "35K",
      desc: "Espresso with steamed milk & foam.",
      img: Latte
    },
    {
      name: "Croissant",
      price: "30K",
      desc: "Famous cookies from France",
      img: Croissant
    },
    {
      name: "Strawberry Mocktail",
      price: "35K",
      desc: "The ideal drink for a warm summer day.",
      img: Mocktail
    },
    {
      name: "Sushi",
      price: "50K",
      desc: "A Japanese dish consisting primarily of vinegared rice (shari) combined with various other ingredients such as raw or cooked fish, seafood, meat, or vegetables (neta).",
      img: Sushi
    },
    {
      name: "Burger King",
      price: "50",
      desc: "a type of sandwich consisting of a round slice of bread filled with a grilled meat (usually beef) patty",
      img: Burger 
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#3e2723] to-[#4e342e] text-white py-12 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <h1 className="text-4xl font-bold text-center text-[#d7b899] mb-10">
          Fullstack Cafe Menu
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
                <h2 className="text-xl font-semibold text-[#f1e0c5]">{item.name}</h2>
                <p className="text-[#d7b899] font-medium mb-2">{item.price}</p>
                <p className="text-gray-300 text-sm">{item.desc}</p>
                <button
                onClick={() => addToCart(item)}
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
