import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const products = [
  {
    id: "dharbha",
    image: "/dharbha mat1.jpeg",
    title: "Dharbha Mat",
    subtitle: "For meditation & inner balance",
  },
  {
    id: "body-essentials",
    image: "/body essentials/Hair growth oil 690.jpg",
    title: "Herbal Hair Oil",
    subtitle: "Nourishes & strengthens hair roots",
  },
  {
    id: "body-essentials",
    image: "/Honey 100 natural - 1kg 1090.jpg",
    title: "Pure Healthy Honey",
    subtitle: "Immunity-boosting natural sweetness",
  },
  {
    id: "body-essentials",
    image: "/body essentials/Yoga stress relief oil -100ml 790.jpg",
    title: "Stress Relief Oil",
    subtitle: "Calms mind & promotes relaxation",
  },
  {
    id: "dharbha",
    image: "/dharbha mat3.jpeg",
    title: "Dharbha Mat",
    subtitle: "For meditation & inner balance",
  },
  {
    id: "body-essentials",
    image: "/wild forest honey(500 ml) 1600.jpg",
    title: "Pure Healthy Honey",
    subtitle: "Immunity-boosting natural sweetness",
  },
];

const HealthyProducts = () => {
  useEffect(() => {
    // ✅ Set SEO title
    document.title = "Healthy Products | AathiLife";

    // ✅ Meta description
    const metaDescription = document.createElement("meta");
    metaDescription.name = "description";
    metaDescription.content =
      "Explore AathiLife's healthy and natural products including herbal oils, honey, and meditation essentials. Enhance your wellness journey with authentic spiritual and health products.";
    document.head.appendChild(metaDescription);

    // ✅ Canonical link
    const linkCanonical = document.createElement("link");
    linkCanonical.rel = "canonical";
    linkCanonical.href = window.location.href;
    document.head.appendChild(linkCanonical);

    // Cleanup on unmount
    return () => {
      document.head.removeChild(metaDescription);
      document.head.removeChild(linkCanonical);
    };
  }, []);

  return (
    <section className="relative w-full bg-white py-0.5">
      {/* Inline CSS keyframes */}
      <style>
        {`
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .scroll-row {
            display: flex;
            gap: 1.5rem;
            animation: scroll 25s linear infinite;
            width: max-content;
          }
        `}
      </style>

      {/* Section Heading */}
      <section className="flex justify-center my-7 sm:my-3">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative bg-[#f8b042] px-6 py-2 sm:px-6 sm:py-3 rounded-lg shadow-md text-center inline-block"
        >
          <motion.h2
            initial={{ y: 8, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg sm:text-xl md:text-2xl font-bold text-white tracking-wide"
          >
            Aathilife's Healthy Products
          </motion.h2>
          {/* <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "50%" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-1 sm:mt-2 h-[2px] sm:h-[3px] bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-400 mx-auto rounded-full"
          ></motion.div> */}
          <motion.div
            animate={{ opacity: [0.2, 0.5, 0.2], scale: [1, 1.03, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 -z-10 rounded-lg bg-[#f8b042] blur-xl opacity-25"
          ></motion.div>
        </motion.div>
      </section>

      {/* Smooth infinite scroll row */}
      <div className="overflow-hidden">
        <div className="scroll-row">
          {[...products, ...products].map((product, index) => (
            <Link
              to={`/category/${product.id}`}
              key={index}
              className="flex-shrink-0 w-[220px] sm:w-[260px] bg-white rounded-xl shadow-lg overflow-hidden hover:scale-105 transition-transform duration-300"
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-44 sm:h-56 object-cover"
              />
              <div className="p-4 text-center">
                <h3 className="text-lg font-semibold text-black">
                  {product.title}
                </h3>
                <p className="text-sm text-gray-600">{product.subtitle}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HealthyProducts;
