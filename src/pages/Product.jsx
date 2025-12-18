// src/pages/ProductPage.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { useProduct } from "../contexts/ProductContext";
import api from "../utils/api";
import imgUrl from "../assets/yogapose.jpg";
import { ShoppingCart, CircleCheckBig } from "lucide-react";
import redSandalwoodCert from "/wood certificates/redsandalwood certificate.jpeg";
import sandalwoodCert from "/wood certificates/sandalwood certificate.jpeg";
import ebonyWoodCert from "/wood certificates/wood certificate.jpeg";

const ProductPage = () => {
  const { productId } = useParams();
  const { products } = useProduct();
  const { addToCart, getItemQuantity } = useCart();
  const navigate = useNavigate();

  const [addedToCart, setAddedToCart] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [cartError, setCartError] = useState("");

  const product = products.find((p) => p.id === parseInt(productId));

  // Update page metadata
  useEffect(() => {
    if (!product) return;
    document.title = `${product.display_name || product.product_name} - Aathi Life`;
    const description = `${product.display_name || product.product_name} - Buy authentic, spiritually crafted products from Aathi Life.`;
    let metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", description);
    else {
      metaDesc = document.createElement("meta");
      metaDesc.name = "description";
      metaDesc.content = description;
      document.head.appendChild(metaDesc);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="bg-amber-50 min-h-screen flex flex-col items-center justify-center">
        <p className="text-2xl text-amber-800 mb-4">Product not found</p>
        <Link
          to="/"
          className="bg-amber-600 text-white px-6 py-2 rounded-lg hover:bg-amber-700 transition"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  const handleAddToCart = async () => {
    if (!product || product.stock === 0) return;

    try {
      setLoading(true);
      setCartError("");
      await addToCart({
        product_id: product.product_id,
        product_variant_id: product.id,
        quantity: 1,
      })     
      console.log("Add to cart success");
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 3000);
    } catch (err) {
      console.error("Failed to add item:", err);
      setCartError(
        err.response?.data?.detail || err.response?.data?.error || "Failed to add item. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleBuyNow = () => {
    if (getItemQuantity(product.id) === 0) addToCart(product, 1);
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

  // Certificate selection
  let certificateImage = null;
  const catName = (product.category?.name || product.category || "").toLowerCase();
  if (catName.includes("red-sandalwood")) certificateImage = redSandalwoodCert;
  else if (catName.includes("sandalwood")) certificateImage = sandalwoodCert;
  else if (catName.includes("karungali")) certificateImage = ebonyWoodCert;

   const formatPrice = (price) => {
    if (!price) return "Price on request"
    return `₹${parseFloat(price).toFixed(2)}`
  }

  return (
    <div className="bg-amber-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm text-amber-600 flex items-center space-x-2">
          <Link to="/" className="hover:text-amber-800">Home</Link>
          {catName && (
            <>
              <span>/</span>
              <Link to={`/category/${catName}`} className="hover:text-amber-800 capitalize">
                {catName}
              </Link>
            </>
          )}
          <span>/</span>
          <span className="text-gray-500">{product.display_name || product.product_name}</span>
        </nav>

        <div className="bg-white rounded-xl shadow-md overflow-hidden max-w-5xl mx-auto hover:shadow-lg transition-all duration-300 md:flex">
          {/* Left: Image & Certificate */}
          <div className="md:w-1/2 p-4 space-y-4">
            <div className="relative w-full aspect-square overflow-hidden rounded-xl border">
              <img
                src={imageSrc}
                alt={product.display_name || product.product_name}
                onError={handleImageError}
                className="w-full h-[250px] md:h-full object-cover"
              />

              {/* Quantity badge */}
              {currentQuantityInCart > 0 && (
                <div className="absolute top-2 right-2">
                  <span className="bg-amber-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">
                    {currentQuantityInCart}
                  </span>
                </div>
              )}

              {/* Stock badge */}
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

            {/* Certificate */}
            {certificateImage && (
              <div className="bg-gray-50 rounded-lg shadow-md p-3 border text-center">
                <h3 className="text-sm font-semibold text-gray-700 mb-2">
                  Govt. Testing Certificate
                </h3>
                <img
                  src={certificateImage}
                  alt="Govt. Certificate"
                  className="w-full h-32 object-contain rounded-md mb-3"
                />
                <a
                  href={certificateImage}
                  download
                  className="inline-block mt-2 text-sm text-amber-700 font-semibold hover:underline"
                >
                  ⬇ Click here to download
                </a>
              </div>
            )}
          </div>

          {/* Right: Details */}
          <div className="md:w-1/2 p-8 flex flex-col justify-between">
            <div>
              <h1 className="text-3xl font-bold text-black mb-2">
                {product.display_name || product.product_name}
              </h1>
              <p className="text-gray-700 mb-4">{product.description}</p>

              <div className="flex items-center gap-3 mb-3">
                {product.stock > 0 ? (
                  <span className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">
                    In Stock
                  </span>
                ) : (
                  <span className="text-sm bg-red-100 text-red-700 px-3 py-1 rounded-full font-medium">
                    Out of Stock
                  </span>
                )}
                {product.variant_display && (
                  <span className="text-sm bg-amber-100 text-amber-700 px-3 py-1 rounded-full">
                    {product.variant_display}
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between pt-1 gap-2">
          <span className="font-bold text-black text-lg">{formatPrice(product.price)}</span>
          <span className="font-bold text-gray-500 line-through text-base">{formatPrice(product.striked_price)}</span>
        </div>

              {/* Buttons */}
              <div className="flex gap-2 mb-4">
                <button
                  onClick={handleAddToCart}
                  disabled={addedToCart || loading || product.stock === 0}
                  className={`flex-1 flex justify-center items-center px-4 py-3 rounded-md text-sm font-medium transition-all duration-300 ${
                    addedToCart
                      ? "bg-slate-800 text-white scale-95"
                      : loading
                      ? "bg-gray-400 text-white cursor-wait"
                      : product.stock === 0
                      ? "bg-gray-400 text-white cursor-not-allowed"
                      : "bg-[#f8b042] hover:bg-amber-500 text-white hover:scale-105 active:scale-95"
                  }`}
                >
                  {addedToCart ? <CircleCheckBig size={16} /> : <ShoppingCart size={16} />}
                  <span className="ml-2">
                    {addedToCart ? "Added" : loading ? "Adding..." : "Add to Cart"}
                  </span>
                </button>

                <button
                  onClick={handleBuyNow}
                  disabled={product.stock === 0}
                  className={`flex-1 px-4 py-3 rounded-md text-sm font-medium text-white ${
                    product.stock === 0
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-green-600 hover:bg-green-700"
                  }`}
                >
                  Buy Now
                </button>
              </div>

              {cartError && (
                <p className="text-red-600 text-sm text-center mb-4">{cartError}</p>
              )}

              {catName && (
                <Link
                  to={`/category/${catName}`}
                  className="block text-center bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded hover:bg-gray-300 transition duration-300 mb-4"
                >
                  ← Back to {catName} Products
                </Link>
              )}

              {/* Product details */}
              <div className="border-t border-gray-200 pt-4">
                <h3 className="text-lg font-semibold text-black mb-2">Product Details</h3>
                <ul className="text-gray-600 space-y-1">
                  <li>• Authentic spiritual item</li>
                  <li>• Handcrafted with devotion</li>
                  <li>• Blessed according to tradition</li>
                  <li>• Free shipping on orders over ₹200</li>
                  {product.id && <li>• Product ID: #{product.id}</li>}
                  {product.created_at && (
                    <li>
                      • Added on:{" "}
                      {new Date(product.created_at).toLocaleDateString("en-IN", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
