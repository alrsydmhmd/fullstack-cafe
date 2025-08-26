// src/components/Menu.jsx
const menuItems = [
  {
    name: "Espresso",
    description: "Rich and bold espresso shot.",
    price: "$3.00",
  },
  {
    name: "Cappuccino",
    description: "Espresso with steamed milk and foam.",
    price: "$4.00",
  },
  {
    name: "Latte",
    description: "Espresso with steamed milk and a light layer of foam.",
    price: "$4.50",
  },
  {
    name: "Mocha",
    description: "Espresso with steamed milk, chocolate syrup, and whipped cream.",
    price: "$5.00",
  },
  {
    name: "Croissant",
    description: "Flaky and buttery pastry.",
    price: "$2.50",
  },
  {
    name: "Chocolate Chip Cookie",
    description: "Freshly baked cookie with chocolate chips.",
    price: "$1.50",
  },
];

export default function Menu() {
  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-8">Our Menu</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {menuItems.map((item, index) => (
            <div key={index} className="border rounded-lg p-4 shadow-md">
              <h3 className="text-xl font-semibold">{item.name}</h3>
              <p className="text-gray-600">{item.description}</p>
              <p className="text-lg font-bold mt-2">{item.price}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
