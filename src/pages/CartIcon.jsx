import { useCart } from "../context/UseCart";
import { FaShoppingCart } from "react-icons/fa";

export default function CartIcon() {
  const { cart } = useCart();

  return (
    <div
      id="cart-icon"
      className="fixed top-4 right-4 bg-yellow-400 text-black p-3 rounded-full shadow-lg cursor-pointer"
    >
      <FaShoppingCart size={24} />
      {cart.length > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
          {cart.length}
        </span>
      )}
    </div>
  );
}
