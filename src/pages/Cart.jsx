import { useCart } from "../context/UseCart";
import { Link } from "react-router-dom";

export default function Cart() {
  const { cart, removeFromCart, clearCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#3e2723] to-[#4e342e] text-white py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-[#d7b899] mb-10">
          Keranjang Belanja
        </h1>

        {cart.length === 0 ? (
          <div className="text-center">
            <p className="text-gray-300 text-lg mb-6">Keranjang kosong.</p>
            <Link
              to="/order"
              className="bg-[#d7b899] text-[#2e1c15] px-6 py-3 rounded-lg font-semibold hover:bg-[#c8a97e] transition"
            >
              Lanjut Belanja
            </Link>
          </div>
        ) : (
          <>
            <div className="bg-[#2e1c15] rounded-xl shadow-lg border border-[#d7b899] p-4">
              {cart.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-[#d7b899] py-4"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-20 h-20 rounded-lg object-cover border border-[#d7b899]"
                    />
                    <div>
                      <h2 className="font-semibold text-[#f1e0c5] text-lg">
                        {item.name}
                      </h2>
                      <p className="text-sm text-[#d7b899]">
                        {item.price.toLocaleString("id-ID")} IDR
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(index)}
                    className="mt-3 sm:mt-0 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                  >
                    Hapus
                  </button>
                </div>
              ))}
            </div>

            {/* Total, Clear Cart & Continue Shopping */}
            <div className="mt-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
              <h2 className="text-2xl font-bold text-[#f1e0c5]">
                Total: {total.toLocaleString("id-ID")} IDR
              </h2>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={clearCart}
                  className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition"
                >
                  Hapus Semua
                </button>
                <Link
                  to="/order"
                  className="bg-[#d7b899] text-[#2e1c15] px-6 py-2 rounded-lg font-semibold hover:bg-[#c8a97e] transition"
                >
                  Lanjut Belanja
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
