import { useCart } from "../contexts/CartContext";
import { useState } from "react";
import imgUrl from "../assets/yogapose.jpg";

export default function CartItemCard({ item }) {
  const { cartItemPlus, cartItemMinus, deleteCartItem } = useCart();
  const [isUpdating, setIsUpdating] = useState(false);

  // ✅ image path handling
  const imageSrc = item.product_image
    ? item.product_image.startsWith("http")
      ? item.product_image
      : `http://127.0.0.1:8000${item.product_image}`
    : imgUrl;

  // ✅ Event handlers with small loading state to prevent spam clicks
  const handleIncrease = async () => {
    if (isUpdating) return;
    setIsUpdating(true);
    try {
      await cartItemPlus(item.id);
    } catch (err) {
      console.error("Increase error:", err);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDecrease = async () => {
    if (isUpdating) return;
    setIsUpdating(true);
    try {
      await cartItemMinus(item.id);
    } catch (err) {
      console.error("Decrease error:", err);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (isUpdating) return;
    setIsUpdating(true);
    try {
      await deleteCartItem(item.id);
    } catch (err) {
      console.error("Delete error:", err);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div
      key={item.id}
      className="flex items-center space-x-4 border-b pb-4 transition-all duration-200 hover:bg-gray-50 rounded-md"
    >
      {/* ✅ Product Image */}
      <img
        src={imageSrc}
        alt={item.product_name || "Product"}
        className="w-16 h-16 object-cover rounded-lg shadow-sm"
      />

      {/* ✅ Product Info */}
      <div className="flex-1">
        <h3 className="font-semibold text-gray-900">
          {item.product_name || "Unnamed Product"}
        </h3>
        <p className="text-gray-600 text-sm">
          {item.price != null ? `₹${item.price}` : "Price unavailable"}
        </p>

        {/* ✅ Quantity Controls */}
        <div className="flex items-center space-x-2 mt-2">
          <button
            onClick={handleDecrease}
            disabled={isUpdating}
            className={`px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 ${
              isUpdating ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            −
          </button>
          <span className="px-3 font-semibold">{item.quantity}</span>
          <button
            onClick={handleIncrease}
            disabled={isUpdating}
            className={`px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 ${
              isUpdating ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            +
          </button>

          <button
            onClick={handleDelete}
            disabled={isUpdating}
            className="text-red-500 hover:text-red-700 text-sm ml-2"
          >
            Remove
          </button>
        </div>
      </div>

      {/* ✅ Price Summary */}
      <div className="text-right">
        <p className="font-semibold text-gray-900">
          {item.price != null
            ? `₹${(item.price * (item.quantity || 1)).toFixed(2)}`
            : "-"}
        </p>
      </div>
    </div>
  );
}
