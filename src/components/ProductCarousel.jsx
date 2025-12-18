import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const CATEGORY_MAP = {
  Karungali: 1,
  Rudraksha: 2,
  Gemstone: 3,
  Sandalwood: 4,
  "Red-sandalwood": 5,
  "Body-essentials": 6,
};

const ProductCarousel = ({ categoryName = "Featured Products" }) => {
  const [products, setProducts] = useState([]);
  const [slidePercentage, setSlidePercentage] = useState(100);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const categoryId = CATEGORY_MAP[categoryName];
        if (!categoryId) {
          console.warn("No category ID found for", categoryName);
          return;
        }

        const res = await api.post("/api/product-by-category", {
          category_id: categoryId,
        });

        console.log(`API response for ${categoryName}:`, res.data);

        // ✅ Handle different possible response formats
        const productList =
          res.data.products ||
          res.data.results ||
          res.data.data ||
          res.data ||
          [];

        if (Array.isArray(productList)) {
          setProducts(productList);
        } else if (Array.isArray(productList.results)) {
          setProducts(productList.results);
        } else {
          setProducts([]);
        }
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchProducts();
  }, [categoryName]);

  useEffect(() => {
    const updateSlidePercentage = () => {
      const width = window.innerWidth;
      if (width >= 1024) setSlidePercentage(20);
      else if (width >= 768) setSlidePercentage(25);
      else setSlidePercentage(65);
    };
    updateSlidePercentage();
    window.addEventListener("resize", updateSlidePercentage);
    return () => window.removeEventListener("resize", updateSlidePercentage);
  }, []);

  const handleClick = () => {
    navigate(`/category/${categoryName.toLowerCase()}`);
  };

  return (
    <section className="w-full py-6 px-4 sm:px-6 lg:px-12 bg-white">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-black">
          {categoryName}
        </h2>
        <button
          onClick={handleClick}
          className="text-white bg-[#f8b042] hover:bg-[#e39b36] px-4 py-2 rounded-md text-sm font-medium transition"
        >
          View All Products
        </button>
      </div>

      {products.length > 0 ? (
        <Carousel
          showArrows
          showStatus={false}
          showIndicators={false}
          showThumbs={false}
          infiniteLoop={false}
          swipeable
          emulateTouch
          centerMode
          autoPlay
          interval={3000}
          stopOnHover
          centerSlidePercentage={slidePercentage}
          className="w-full"
        >
          {products.map((product, index) => (
            <div key={`${product.id}-${index}`} className="px-2">
              <ProductCard product={product} />
            </div>
          ))}
        </Carousel>
      ) : (
        <p className="text-gray-500 text-center">No products available.</p>
      )}
    </section>
  );
};

export default ProductCarousel;
