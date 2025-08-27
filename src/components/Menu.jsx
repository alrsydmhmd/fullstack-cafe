// src/components/Menu.jsx
const menuItems = [
  {
    name: "Espresso",
    description: "Strong and bold single shot coffee.",
    price: "$50.00",
  },
  {
    name: "Caffe Latte",
    description: "Espresso with steamed milk and foam.",
    price: "$35.00",
  },
  {
    name: "Strawberry Mocktail",
    description: "The ideal drink for a warm summer day.",
    price: "$35.00",
  },
  {
    name: "Croissant",
    description: "Famous cookies from France.",
    price: "$30.00",
  },
  {
    name: "Sushi",
    description: "A Japanese dish with vinegared rice and various toppings.",
    price: "$50.00",
  },
  {
    name: "Burger King",
    description: "A sandwich with grilled beef patty in a bun.",
    price: "$50.00",
  },
];

export default function Menu() {
  return (
    <section className="bg-white py-16" id="menu">
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
