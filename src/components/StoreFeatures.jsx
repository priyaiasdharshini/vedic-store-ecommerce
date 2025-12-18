// src/components/SpiritualStore.jsx
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import ProductCarousel from '../components/ProductCarousel';
import Healthy from '../components/Healthy';

const SpiritualStore = () => {
  const [hoveredItem, setHoveredItem] = useState(null);

  // ✅ SEO using useEffect
  useEffect(() => {
    document.title = "Spiritual Store | AathiLife - Rudraksha, Karungali & Divine Collections";

    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.name = "description";
      document.head.appendChild(metaDesc);
    }
    metaDesc.content =
      "Discover sacred spiritual items at AathiLife Spiritual Store. Explore Rudraksha beads, Karungali malas, gemstones, divine idols, puja kits, and more infused with Vedic blessings.";

    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement("meta");
      metaKeywords.name = "keywords";
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.content =
      "AathiLife, Spiritual Store, Rudraksha, Karungali, Gemstones, Puja Kits, Divine Idols, Vedic Items, Meditation, Sacred Collections";

    let metaRobots = document.querySelector('meta[name="robots"]');
    if (!metaRobots) {
      metaRobots = document.createElement("meta");
      metaRobots.name = "robots";
      document.head.appendChild(metaRobots);
    }
    metaRobots.content = "index, follow";
  }, []);

  return (
    <div className="relative overflow-hidden py-0 bg-white">
      {/* Floating Divine Symbols */}
      <motion.div
        animate={{ y: [0, -25, 0], rotate: [0, 10, -5, 0], opacity: [0.05, 0.15, 0.05] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 text-6xl text-[#FDBA74]/20"
      >
        ॐ
      </motion.div>

      <motion.div
        animate={{ x: [0, 20, 0], y: [0, 15, 0], rotate: [0, -15, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/3 right-1/4 text-7xl text-[#16A34A]/20"
      >
        ✸
      </motion.div>

      {/* =================== Categories Section =================== */}
      <section className="my-5 px-4 sm:px-6 lg:px-12">
  <div className="text-center mb-5">
    <section className="flex justify-center my-3 sm:my-4">
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
          Explore Our Collections
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
  </div>

  {/* Categories Grid */}
  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 sm:gap-4 justify-center">
    {[
      { name: "Rudraksha", image: "/rudrakshamai.jpeg", link: "/category/rudraksha" },
      { name: "Karungali", image: "/kar.jpeg", link: "/category/karungali" },
      { name: "Gemstones", image: "/gemsm.jpeg", link: "/category/gemstone" },
      { name: "Spadingam", image: "/spadingam.jpeg", link: "/category/uniques" },
      { name: "Sandalwoods", image: "/sand.jpeg", link: "/category/sandalwood" },
       { name: "RedSandalwoods", image: "/reds.jpeg", link: "/category/sandalwood" },
      { name: "Pendants & Rings", image: "/pend.jpeg", link: "/category/pendant&ring" },
        { name: "Copper", image: "/copperr.jpeg", link: "/category/women" },
      { name: "Silver(92.5)", image: "/silverr.jpeg", link: "/category/silver" },
       { name: "Impone", image: "/imponee.png", link: "/category/Impone" },
         { name: "Men", image: "/divinelife/img6.webp", link: "/category/Men" },
         { name: "Women", image: "/girl.jpeg", link: "/category/women" },
      { name: "Home Decor", image: "/homedec.png", link: "/category/Men" },
      { name: "Dharbha-Mat", image: "/dharba mat/Darbha grass mat for good sleep- 3ft x 6ft 2800.jpg", link: "/category/dharbha" },
      { name: "Vettiver", image: "/vetti.jpeg", link: "/category/vettiver" },
       { name: "Organic Oils", image: "/oils.png", link: "/category/body-essentials" },
      { name: "Honey", image: "/honeyy.png", link: "/category/Honey" },
      { name: "Statue", image: "/stat.jpeg", link: "/category/Statue" },

    ].map((category, index) => {
      // decide background color based on category name
      const bgColor =
        category.name === "Rudraksha" ? "bg-white" :
        category.name === "Karungali" ? "bg-white" :
        category.name === "Gemstones" ? "bg-white" :
        category.name === "Sandalwoods" ? "bg-white" :
        category.name === "Pendants & Rings" ? "bg-white" :
        category.name === "Unique Products" ? "bg-white" :
        category.name === "Silver(92.5)" ? "bg-white" :
        category.name === "Women" ? "bg-white" :
        category.name === "Organic Oils" ? "bg-white" :
        category.name === "Men" ? "bg-white" :
        category.name === "Dharbha-Mat" ? "bg-white" :
        category.name === "Vettiver" ? "bg-white" :

        "bg-white"; // default

      return (
        <Link to={category.link} key={index} className="flex justify-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`cursor-pointer ${bgColor} rounded-xl shadow hover:shadow-lg transition-all overflow-hidden border border-gray-200 flex flex-col max-w-[90px] sm:max-w-[110px]`}
          >
            <div className="w-full aspect-square overflow-hidden rounded-full">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover transform hover:scale-105 transition duration-500"
              />
            </div>
            <div className="p-1 text-center flex-1 flex items-center justify-center">
              <h3 className="text-xs font-bold text-gray-700">
                {category.name}
              </h3>
            </div>
          </motion.div>
        </Link>
      );
    })}
  </div>
</section>


      {/* =================== Carousels =================== */}
      {/* <ProductCarousel categoryName='Karungali' />
      <ProductCarousel categoryName='Rudraksha' />
      <ProductCarousel categoryName='Gemstone'/>
      <ProductCarousel categoryName='Sandalwood'/>
      <ProductCarousel categoryName='Red-sandalwood'/>
      <ProductCarousel categoryName='Body-essentials'/> */}
      
      {/* //healthy products */}
      <Healthy />

      {/* =================== Sacred Collections Marquee =================== */}
      <section className="bg-white py-10 overflow-hidden">
        <style>
          {`
            @keyframes marquee {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .marquee-track {
              display: flex;
              gap: 1rem;
              width: max-content;
              animation: marquee 40s linear infinite;
            }
            .marquee-track:hover {
              animation-play-state: paused;
            }
          `}
        </style>

        <div className="text-center mb-6">
          <section className="flex justify-center my-2 sm:my-6">
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
                Sacred Collections
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
          <p className="text-black text-sm sm:text-base">Blessings crafted into every piece</p>
        </div>

        <div className="overflow-hidden">
          <div className="marquee-track">
            {[
              { name: "Mala", image: "/rudraksha/karungali & rudraksha  panchaloha (impon) mala -8mm 2700.jpg", link: "/category/Men" },
              { name: "Bracelet", image: "/brace.jpg", link: "/category/Men" },
              { name: "Gemstone", image: "/gem.jpg", link: "/category/gemstone" },
              { name: "Rudraksha", image: "/rud.jpg", link: "/category/rudraksha" },
              { name: "Karungali", image: "/karungali products/karungali with seven chakra bracelet - 8mm 800.jpg", link: "/category/karungali" },
              { name: "God Statue", image: "/statue.jpg", link: "/category/karungali" },
              { name: "Idols", image: "/idolss.webp", link: "/category/karungali" },
              // Duplicate for infinite scroll
              { name: "Mala", image: "/rudraksha/karungali & rudraksha  mala -8mm 950.jpg", link: "/category/Men" },
              { name: "Bracelet", image: "/brace.jpg", link: "/category/Men" },
              { name: "Gemstone", image: "/gem.jpg", link: "/category/gemstone" },
              { name: "Rudraksha", image: "/rud.jpg", link: "/category/rudraksha" },
              { name: "Karungali", image: "/karungali products/karungali, tiger eye & hematite bracelet  - 8mm 800.jpg", link: "/category/karungali" },
              { name: "God Statue", image: "/statue.jpg", link: "/category/karungali" },
              { name: "Idols", image: "/idolss.webp", link: "/category/karungali" },
            ].map((item, index) => (
              <a href={item.link} key={index}>
                <div className="flex flex-col items-center bg-white px-3 py-3 rounded-lg shadow-md border border-amber-200 hover:shadow-xl min-w-[110px] cursor-pointer">
                  <div className="relative">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 sm:w-20 sm:h-20 object-contain bg-amber-50 p-1.5 rounded-full shadow"
                    />
                    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-amber-200/30 to-yellow-200/20 blur-xl opacity-60" />
                  </div>
                  <p className="mt-2 text-xs sm:text-sm font-semibold text-black text-center">
                    {item.name}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* =================== Divine Blessing Section =================== */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative py-9 px-6 text-center overflow-hidden"
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-tr from-amber-50 via-yellow-100 to-orange-50 opacity-80 blur-2xl -z-10"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        ></motion.div>

        {/* Concentric sacred rings */}
        <motion.div
          className="absolute top-1/2 left-1/2 w-96 h-96 sm:w-[28rem] sm:h-[28rem] border border-amber-400/30 rounded-full -translate-x-1/2 -translate-y-1/2"
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        ></motion.div>
        <motion.div
          className="absolute top-1/2 left-1/2 w-72 h-72 sm:w-96 sm:h-96 border border-amber-300/20 rounded-full -translate-x-1/2 -translate-y-1/2"
          animate={{ rotate: -360 }}
          transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
        ></motion.div>

        <motion.div
          animate={{ scale: [1, 1.12, 1], opacity: [0.9, 1, 0.9] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="relative mb-4 drop-shadow-[0_0_25px_rgba(245,158,11,0.6)]"
        >
          <img
            src="\logo-removebg-preview.png"
            alt="AathiYoga & Life"
            className="mx-auto w-40 sm:w-52 md:w-64 object-contain"
            style={{ mixBlendMode: "multiply", background: "transparent" }}
          />
        </motion.div>

        <motion.h3
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="text-xl sm:text-3xl md:text-4xl font-bold text-black mb-6 relative"
        >
          Eternal Flow of Divine Energy
          <motion.span
            className="block h-[3px] w-32 mx-auto mt-3 bg-gradient-to-r from-amber-400 via-yellow-500 to-orange-400 rounded-full"
            animate={{ width: ["4rem", "8rem", "6rem"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          ></motion.span>
        </motion.h3>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-base sm:text-lg md:text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed px-4"
        >
          Every offering here is imbued with{" "}
          <span className="text-[#f8b042] font-semibold">spiritual purity</span>,
          carrying blessings from ancient <span className="italic text-[#f8b042]">Vedic rituals</span>.
          Like sacred mantras, these creations vibrate with{" "}
          <span className="underline decoration-amber-400">divine resonance</span>,
          guiding your path toward harmony and enlightenment. ✨
        </motion.p>

        <motion.div
          className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-6 text-2xl text-amber-500/70"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <span>🌸</span>
          <span>🌼</span>
          <span>🌺</span>
        </motion.div>
      </motion.section>
    </div>
  );
};

export default SpiritualStore;
