import Latte from "../assets/CafeLatte.jpg";
// src/pages/FullMenu.jsx
export default function FullMenu() {
  const menuItems = [
    {
      name: "Espresso",
      price: "25K",
      desc: "Strong and bold single shot coffee.",
      img: "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=500"
    },
    {
      name: "Caffe Latte",
      price: "35K",
      desc: "Espresso with steamed milk & foam.",
      img: Latte
    },
    {
      name: "Latte",
      price: "35K",
      desc: "Smooth espresso with creamy milk.",
      img: "https://images.unsplash.com/photo-1541167760496-1628856ab772?w=500"
    },
    {
      name: "Mocha",
      price: "40K",
      desc: "Espresso, chocolate, and steamed milk.",
      img: "https://images.unsplash.com/photo-1523942839745-7848d4d2d23b?w=500"
    },
    {
      name: "Cold Brew",
      price: "30K",
      desc: "Brewed for 12 hours, smooth and rich.",
      img: "https://images.unsplash.com/photo-1561882468-9110e03e0f78?w=500"
    },
    {
      name: "Caramel Macchiato",
      price: "38K",
      desc: "Espresso, vanilla syrup, caramel drizzle.",
      img: "https://images.unsplash.com/photo-1534778101976-62847782c213?w=500"
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
                className="w-full h-65 object-cover"
              />
              <div className="p-6">
                <h2 className="text-xl font-semibold text-[#f1e0c5]">{item.name}</h2>
                <p className="text-[#d7b899] font-medium mb-2">{item.price}</p>
                <p className="text-gray-300 text-sm">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
