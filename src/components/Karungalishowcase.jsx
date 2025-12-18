import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const STEPS = [
  {
    title: "Wood Selection",
    desc: "Choose ethically sourced Karungali suitable for temple use.",
    longDesc:
      "The journey begins with the careful selection of premium Karungali wood. Our artisans examine each piece for its grain quality, spiritual energy, and suitability for sacred purposes.",
    img: "/spiritualshowcase/woodtree.jpeg",
  },
  {
    title: "Purification",
    desc: "Cleanse with water, turmeric, and incense to sanctify the wood.",
    longDesc:
      "The selected wood undergoes sacred purification rituals. Using holy water, turmeric paste, and incense, the wood is cleansed of all negative energies.",
    img: "/divinelife/img1.webp",
  },
  {
    title: "Carving & Shaping",
    desc: "Artisans carve divine forms with devotion and precision.",
    longDesc:
      "Master craftsmen carefully carve the purified wood. Each stroke is made with devotion, shaping it into a divine form with meticulous detail.",
    img: "/spiritualshowcase/karungalimake.jpeg",
  },
  {
    title: "Spiritualizing",
    desc: "Smooth finish and natural polish to enhance the sacred grain.",
    longDesc:
      "The carved form is refined through traditional polishing. Natural oils enhance the wood's beauty and spiritual properties.",
    img: "/spiritualshowcase/innerpeace.jpeg",
  },
  {
    title: "Energizing",
    desc: "Priests invoke divine energy with mantras and rituals.",
    longDesc:
      "Priests perform Prāṇa Pratiṣṭhā, invoking divine life force with powerful mantras and rituals, transforming the wood into a sacred vessel.",
    img: "/spiritualshowcase/karungaliprayer.jpeg",
  },
  {
    title: "Divine Worship",
    desc: "Placed in sanctum with flowers, lamps, and auspicious timings.",
    longDesc:
      "The sacred form is ceremonially installed in the temple with flowers, oil lamps, and hymns, timed according to astrology.",
    img: "/spiritualshowcase/innerpeace2.jpeg",
  },
  {
    title: "Daily Pooja",
    desc: "Offer lamps, incense, flowers; maintain with devotion.",
    longDesc:
      "Devotees perform daily pooja with lamps, incense, and flowers, keeping the divine energy alive for generations.",
    img: "/spiritualshowcase/karungalipoojaattemple.jpeg",
  },
];

export default function KarungaliFlipkartStyle() {
  const [selectedStep, setSelectedStep] = useState(null);

  // ✅ SEO useEffect
  useEffect(() => {
    document.title = "Divine Path of Karungali | AathiLife";

    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.name = "description";
      document.head.appendChild(metaDesc);
    }
    metaDesc.content =
      "Explore the sacred journey of Karungali with AathiLife. From wood selection, purification, carving, energizing, to daily pooja rituals, experience the divine path of spirituality.";

    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement("meta");
      metaKeywords.name = "keywords";
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.content =
      "AathiLife, Karungali, Spiritual Journey, Karungali Malai, Sacred Rituals, Meditation, Pooja, Divine Items, Temple Crafts";

    let metaRobots = document.querySelector('meta[name="robots"]');
    if (!metaRobots) {
      metaRobots = document.createElement("meta");
      metaRobots.name = "robots";
      document.head.appendChild(metaRobots);
    }
    metaRobots.content = "index, follow";
  }, []);

  const openModal = (step) => {
    setSelectedStep(step);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setSelectedStep(null);
    document.body.style.overflow = "unset";
  };

  return (
    <section className="bg-white py-0 sm:py-0">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
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
              Divine Path of Karungali
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

        {/* Horizontal Scroll Cards */}
        <div className="flex gap-4 overflow-x-auto scrollbar-hide">
          {STEPS.map((step, idx) => (
            <div
              key={idx}
              onClick={() => openModal(step)}
              className="min-w-[140px] sm:min-w-[180px] bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition flex-shrink-0 cursor-pointer"
            >
              <div className="w-full h-32 sm:h-40 overflow-hidden rounded-t-lg">
                <img
                  src={step.img}
                  alt={step.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-2 text-center">
                <p className="text-sm sm:text-base font-medium text-gray-800 truncate">
                  {step.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Popup Modal */}
      {selectedStep && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden relative">
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
            >
              ✕
            </button>

            <div className="grid md:grid-cols-2">
              <div className="h-56 md:h-full">
                <img
                  src={selectedStep.img}
                  alt={selectedStep.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 overflow-y-auto">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {selectedStep.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">{selectedStep.desc}</p>
                <p className="text-gray-700 leading-relaxed text-base">
                  {selectedStep.longDesc}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
