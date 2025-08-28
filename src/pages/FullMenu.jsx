import { useState, useEffect } from "react";
import { useCart } from "../context/UseCart";
import { Link, useNavigate } from "react-router-dom";

export default function FullMenu() {
  const { cart, addToCart } = useCart();
  const navigate = useNavigate();

  const [menuItems, setMenuItems] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newMenu, setNewMenu] = useState({
    name: "",
    price: "",
    desc: "",
    img: "",
  });

  // Fetch menu dari backend
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/menu");
        const data = await res.json();
        setMenuItems(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchMenu();
  }, []);

  // Tambah menu baru
  const handleAddMenu = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/menu", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newMenu.name,
          price: parseFloat(newMenu.price),
          description: newMenu.desc,
          img: newMenu.img,
        }),
      });
      if (!res.ok) throw new Error("Gagal menambahkan menu");
      const data = await res.json();
      setMenuItems([...menuItems, data]); // update state menu
      setShowForm(false);
      setNewMenu({ name: "", price: "", desc: "", img: "" });
    } catch (err) {
      console.error(err);
    }
  };

  // Tambah ke cart
  const handleAdd = async (item) => {
  try {
    // 1. Simpan ke cart
    const resCart = await fetch("http://localhost:5000/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: item.name,
        quantity: 1,
        price: item.price,
        img: item.img,
      }),
    });
    if (!resCart.ok) throw new Error("Gagal menambahkan ke cart");
    const cartData = await resCart.json();

    // 2. Simpan ke transaksi langsung
    const resTransaksi = await fetch("http://localhost:5000/api/transaksi", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: item.name,
        quantity: 1,
        price: item.price,
      }),
    });
    if (!resTransaksi.ok) throw new Error("Gagal menambahkan ke transaksi");

    // 3. Update state cart frontend
    addToCart(cartData);

  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

  // Tambahkan fungsi delete
  const handleDelete = async (id) => {
    if (!window.confirm("Apakah yakin ingin menghapus menu ini?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/menu/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Gagal menghapus menu");
      // Update state menuItems setelah delete
      setMenuItems(menuItems.filter((item) => item.id !== id));
    } catch (err) {
      console.error(err);
    }
  };


  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#3e2723] to-[#4e342e] text-white py-12 px-6">
      {/* Keranjang */}
      <div
        id="cart-icon"
        className="fixed top-4 right-4 bg-yellow-400 text-black p-3 rounded-full shadow-lg cursor-pointer hover:scale-110 transition-transform"
        onClick={() => navigate("/cart")}
      >
        🛒
        {cart.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
            {cart.reduce((sum, item) => sum + (item.quantity || 1), 0)}
          </span>
        )}
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Tombol Kembali */}
        <div className="mb-6 flex justify-between items-center">
          <Link
            to="/"
            className="bg-[#d7b899] text-[#2e1c15] px-6 py-3 rounded-lg font-semibold hover:bg-[#c8a97e] transition"
          >
            ← Kembali ke Halaman Utama
          </Link>

          {/* Tombol Add Menu */}
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-green-500 px-4 py-2 rounded hover:bg-green-600 font-semibold"
          >
            {showForm ? "Tutup Form" : "Add Menu"}
          </button>
        </div>

        {/* Form Add Menu */}
        {showForm && (
          <form
            onSubmit={handleAddMenu}
            className="bg-[#2e1c15] p-6 text-white rounded-xl mb-6 grid gap-4"
          >
            <input
              type="text"
              placeholder="Name"
              value={newMenu.name}
              onChange={(e) => setNewMenu({ ...newMenu, name: e.target.value })}
              className="p-2 rounded text-white"
              required
            />
            <input
              type="number"
              placeholder="Price"
              value={newMenu.price}
              onChange={(e) => setNewMenu({ ...newMenu, price: e.target.value })}
              className="p-2 rounded text-white"
              required
            />
            <input
              type="text"
              placeholder="Description"
              value={newMenu.desc}
              onChange={(e) => setNewMenu({ ...newMenu, desc: e.target.value })}
              className="p-2 rounded text-white"
            />
            <input
              type="text"
              placeholder="Image URL"
              value={newMenu.img}
              onChange={(e) => setNewMenu({ ...newMenu, img: e.target.value })}
              className="p-2 rounded text-white"
            />
            <button
              type="submit"
              className="bg-[#d7b899] text-white px-4 py-2 rounded hover:bg-[#c8a97e] font-semibold"
            >
              Submit
            </button>
          </form>
        )}

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
              {item.img && (
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-full h-[260px] object-cover"
                />
              )}
              <div className="p-6">
                <h2 className="text-xl font-semibold text-[#f1e0c5]">{item.name}</h2>
                <p className="text-[#d7b899] font-medium mb-2">
                  {item.price.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </p>
                <p className="text-gray-300 text-sm">{item.description || item.desc}</p>
                <button
                  onClick={() => handleAdd(item)}
                  className="mt-2 bg-[#d7b899] text-[#2e1c15] px-4 py-2 rounded hover:bg-[#c8a97e] font-semibold"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="mt-2 bg-[#ff0000] text-[#2e1c15] px-4 py-2 rounded font-semibold"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
