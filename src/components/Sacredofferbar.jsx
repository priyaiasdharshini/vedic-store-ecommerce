import { useEffect } from "react";
import { motion } from "framer-motion";

const SacredOfferBar = () => {
  const sacredOffers = [
    "🕉️ Limited Time: 15% off on all Rudraksha Malas | Code: DIVINE15",
    "🌟 Buy 2 God Idols, Get 1 Free Puja Kit | Temple Blessed Items",
    "✨ Free Sacred Energization on orders above ₹1999 | Ends Soon",
    "📿 Special Discount on Navaratna Gemstones | Authentic & Certified"
  ];

  const offerText = sacredOffers.join("  •••  ");

  // ✅ SEO Meta Tags for Sacred Offers
  useEffect(() => {
    document.title = "Sacred Offers | AathiLife";

    // Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.name = "description";
      document.head.appendChild(metaDesc);
    }
    metaDesc.content =
      "Explore limited-time sacred offers at AathiLife. Discounts on Rudraksha Malas, God Idols, Puja Kits, Navaratna Gemstones, and more.";

    // Meta Keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement("meta");
      metaKeywords.name = "keywords";
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.content =
      "AathiLife Offers, Sacred Offers, Rudraksha Malas Discount, Puja Kits, Navaratna Gemstones, Spiritual Promotions";

    // Robots meta
    let metaRobots = document.querySelector('meta[name="robots"]');
    if (!metaRobots) {
      metaRobots = document.createElement("meta");
      metaRobots.name = "robots";
      document.head.appendChild(metaRobots);
    }
    metaRobots.content = "index, follow";
  }, []);

  return (
    <div
      className="relative overflow-hidden bg-white text-[#4B2E05] h-20 flex items-center border-y border-[#f8b042]/50 shadow-lg"
    >
      {/* Glowing background streaks */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#FDBA74]/80 to-transparent"
          animate={{ x: [-20, 400, -20] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#FCD34D]/30 to-transparent"
          animate={{ x: [-32, 450, -32] }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear", delay: 2 }}
        />
      </div>

      {/* Floating sacred icons */}
      <motion.div
        className="absolute left-4 text-3xl opacity-20"
        animate={{ y: [0, -8, 0], rotate: [0, 360, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      >
        ॐ
      </motion.div>
      <motion.div
        className="absolute right-8 text-2xl opacity-20"
        animate={{ y: [0, 8, 0], rotate: [0, -360, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear", delay: 3 }}
      >
        ☸️
      </motion.div>

      {/* Scrolling text */}
      <div className="w-full overflow-hidden">
        <div
          className="relative flex whitespace-nowrap text-base md:text-lg font-medium"
          style={{
            display: "inline-flex",
            minWidth: "200%",
            animation: "marquee 25s linear infinite",
            willChange: "transform"
          }}
        >
          <span className="mx-6 md:mx-10 flex items-center">
            {offerText}
            <span className="inline-block ml-6 md:ml-10 px-2 py-1 bg-[#FBBF24]/30 rounded-md text-xs md:text-sm text-[#4B2E05]">
              New
            </span>
          </span>
          <span className="mx-6 md:mx-10 flex items-center">
            {offerText}
            <span className="inline-block ml-6 md:ml-10 px-2 py-1 bg-[#FBBF24]/30 rounded-md text-xs md:text-sm text-[#4B2E05]">
              New
            </span>
          </span>
        </div>
      </div>

      {/* Glow sweep */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FDE68A]/20 to-transparent"
          animate={{ backgroundPositionX: ["0%", "100%", "0%"] }}
          transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Inline marquee keyframes */}
      <style>
        {`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}
      </style>
    </div>
  );
};

export default SacredOfferBar;
