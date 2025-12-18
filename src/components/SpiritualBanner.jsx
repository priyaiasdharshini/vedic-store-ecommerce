import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const banners = [
  {
    id: "sandalwood",
    image: "/spiritualshowcase/karungalipoojaattemple.jpeg",
    title: "Sacred Karungali",
    subtitle: "Experience divine strength & balance",
  },
  {
    id: "dharbha",
    image: "/public/dharbha mat.jpeg",
    title: "Inner Peace",
    subtitle: "Meditation and harmony within",
  },
  {
    id: "karungali",
    image: "/spiritualshowcase/karungalimake.jpeg",
    title: "Spiritual Craft",
    subtitle: "Handcrafted blessings in every piece",
  },
];

const DivineBanner = () => {
  useEffect(() => {
    document.title = "Explore New Spiritual Products | AathiLife";

    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.name = "description";
      document.head.appendChild(metaDesc);
    }
    metaDesc.content =
      "Discover the latest spiritual products at AathiLife. Sacred Karungali, Dharbha mats, handcrafted spiritual items, and more to enhance your meditation and wellness experience.";

    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement("meta");
      metaKeywords.name = "keywords";
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.content =
      "AathiLife, Spiritual Products, Karungali, Dharbha Mat, Meditation, Handcrafted Spiritual Items, Divine Products";

    let metaRobots = document.querySelector('meta[name="robots"]');
    if (!metaRobots) {
      metaRobots = document.createElement("meta");
      metaRobots.name = "robots";
      document.head.appendChild(metaRobots);
    }
    metaRobots.content = "index, follow";
  }, []);

  return (
    <section className="relative w-full bg-white py-1">
      {/* Heading */}
      <section className="flex justify-center my-7 sm:my-7">
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
            Explore our New Product
          </motion.h2>

          <motion.div
            animate={{ opacity: [0.2, 0.5, 0.2], scale: [1, 1.03, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 -z-10 rounded-lg bg-[#f8b042] blur-xl opacity-25"
          ></motion.div>
        </motion.div>
      </section>

      {/* Responsive Banner */}
      <div className="px-4">
        {/* On small screens: horizontal scroll; On md+ screens: grid */}
        <div className="flex md:hidden overflow-x-auto space-x-4 scrollbar-hide">
          {banners.map((banner) => (
            <motion.div
              key={banner.id}
              whileHover={{ scale: 1.05 }}
              className="min-w-[260px] bg-white rounded-xl shadow-lg overflow-hidden flex-shrink-0"
            >
              <img
                src={banner.image}
                alt={banner.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 text-center">
                <h3 className="text-base sm:text-lg font-semibold text-black">
                  {banner.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600">
                  {banner.subtitle}
                </p>
                <Link to={`/category/${banner.id}`}>
                  <button className="mt-3 px-4 py-2 bg-green-600 text-white font-semibold rounded-full shadow hover:shadow-md">
                    Explore
                  </button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Grid layout for md and above */}
        <div className="hidden md:grid md:grid-cols-3 md:gap-6">
          {banners.map((banner) => (
            <motion.div
              key={banner.id}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <img
                src={banner.image}
                alt={banner.title}
                className="w-full h-64 object-cover"
              />
              <div className="p-6 text-center">
                <h3 className="text-lg font-semibold text-black">
                  {banner.title}
                </h3>
                <p className="text-sm text-gray-600">{banner.subtitle}</p>
                <Link to={`/category/${banner.id}`}>
                  <button className="mt-4 px-6 py-2 bg-green-600 text-white font-semibold rounded-full shadow hover:shadow-md">
                    Explore
                  </button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DivineBanner;
