import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import imgUrl from "../assets/yogapose.jpg";
import { ShoppingCart, CircleCheckBig } from "lucide-react";

const ProductCard = ({ product }) => {
  const { addToCart, getItemQuantity } = useCart();
  const [addedToCart, setAddedToCart] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [cartError, setCartError] = useState("");
  const navigate = useNavigate();

  if (!product) return null;

  const handleAddToCart = async (e) => {
    e.stopPropagation();
    if (!product || product.stock === 0) return;

    try {
      setLoading(true);
      setCartError("");
      console.log('from card page', product)
      await addToCart({
        product_id: product.product_id,
        product_variant_id: product.id,
        quantity: 1,
      });

      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 3000);
    } catch (err) {
      console.error("Failed to add item:", err);
      setCartError(
        err.response?.data?.detail ||
        err.response?.data?.error ||
        "Failed to add item. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleBuyNow = (e) => {
    e.stopPropagation();
    if (getItemQuantity(product.id) === 0)
      addToCart({
        product_id: product.id,
        product_variant_id:
          product.product_variant_id || product.variant_id || product.id,
        quantity: 1,
      });
    navigate("/checkout");
  };

  const handleImageError = () => setImageError(true);
  const currentQuantityInCart = getItemQuantity(product.id);

  const imageSrc =
    !imageError && product.product_image
      ? product.product_image.startsWith("http")
        ? product.product_image
        : `http://127.0.0.1:8000${product.product_image}`
      : imgUrl;

  const formatPrice = (price) => {
    if (!price) return "Price on request"
    return `₹${parseFloat(price).toFixed(2)}`
  }


  return (
    <article
      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 w-full max-w-[280px] mx-auto"
      onClick={() => navigate(`/product/${product.id}`)}
    >
      <div className="relative w-full aspect-square overflow-hidden">
        <img
          src={imageSrc}
          alt={product.display_name || "Product image"}
          onError={handleImageError}
          className="w-full h-[250px] object-cover rounded-xl"
        />

        {currentQuantityInCart > 0 && (
          <div className="absolute top-2 right-2">
            <span className="bg-amber-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">
              {currentQuantityInCart}
            </span>
          </div>
        )}

        <div className="absolute top-2 left-2">
          {product.stock > 0 ? (
            <span className="bg-green-600 text-white text-[11px] font-semibold px-2 py-1 rounded-full shadow-md">
              In Stock
            </span>
          ) : (
            <span className="bg-red-600 text-white text-[11px] font-semibold px-2 py-1 rounded-full shadow-md">
              Out of Stock
            </span>
          )}
        </div>
      </div>

      <div className="p-3 space-y-1">
        <h3 className="font-semibold text-gray-900 text-sm leading-tight line-clamp-2 min-h-[2.5rem] capitalize">
          {product.display_name || "Unnamed Product"}
        </h3>

        {product.sku && (
          <p className="text-xs text-gray-500">SKU: {product.sku}</p>
        )}

        <div className="flex items-center justify-between pt-1 gap-2">
          <span className="font-bold text-black text-lg">{formatPrice(product.price)}</span>
          <span className="font-bold text-gray-500 line-through text-base">{formatPrice(product.striked_price)}</span>
        </div>

        {product.tax && product.tax !== "0.00" && (
          <p className="text-[11px] text-gray-500">
            + Tax: ₹{parseFloat(product.tax).toFixed(2)}
          </p>
        )}
      </div>

      <div className="p-3 pt-0 flex gap-2 justify-center">
        <button
          onClick={handleAddToCart}
          disabled={addedToCart || loading || product.stock === 0}
          className={`flex justify-center items-center px-3 py-1 rounded-md text-xs font-medium transition-all duration-300 ${addedToCart
              ? "bg-slate-800 text-white scale-95"
              : loading
                ? "bg-gray-400 text-white cursor-wait"
                : product.stock === 0
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : "bg-[#f8b042] hover:bg-amber-500 text-white hover:scale-105 active:scale-95"
            }`}
        >
          {addedToCart ? <CircleCheckBig size={14} /> : <ShoppingCart size={14} />}
        </button>

        <button
          onClick={handleBuyNow}
          disabled={product.stock === 0}
          className={`flex justify-center items-center px-3 py-1 rounded-md text-xs font-medium transition-all duration-300 ${product.stock === 0
              ? "bg-gray-400 text-white cursor-not-allowed"
              : "bg-green-600 text-white hover:bg-green-700"
            }`}
        >
          Buy&nbsp;Now
        </button>
      </div>

      {cartError && (
        <p className="text-red-600 text-xs text-center pb-2">{cartError}</p>
      )}
    </article>
  );
};

export default React.memo(ProductCard);
