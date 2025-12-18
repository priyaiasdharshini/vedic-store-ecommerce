import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What is Karungali Malai and its traditional use?",
    answer:
      'Karungali Malai, also known as "EBONY WOOD," refers to a type of wood traditionally used in cultural and spiritual practices in certain regions of India.',
  },
  {
    question: "What is use of Karungali Malai?",
    answer:
      "Karungali brings Positive Energy and avoids Negative Energy, Dhrishti, and Evil eye. It is also believed to have purifying and healing qualities, commonly used in remedies for digestive issues, skin ailments, and overall wellness.",
  },
  {
    question: "How to identify the original Karungali?",
    answer:
      "You can identify original Karungali by:\n- Rubbing the beads on a rough surface (inside remains black)\n- Soaking in water for 5–10 minutes (slight color change in water)\n- Smelling (mild sandalwood-like fragrance)\n- Checking weight (heavier than normal wood)\n- Observing color (charcoal black, not shiny jet black).",
  },
  {
    question: "How to buy good quality Karungali Malai?",
    answer:
      "It is recommended to buy from trusted sources with knowledge in spiritual and traditional practices, as they can provide pre-energized Karungali products.",
  },
  {
    question: "What are benefits of buying pre-energized Karungali Malai?",
    answer:
      "Pre-energized malas are blessed with mantras, balancing the sin of tree cutting and giving continuous positive vibrations. Without energizing, the mala may absorb negative energy instead of spreading positivity.",
  },
  {
    question: "How to use the Karungali Malai?",
    answer:
      "1. Soak it in a glass of water for 5–10 minutes.\n2. Remove the mala and pour the water into a plant.\n3. Chant your favorite mantra or say:\n   'Om Namachivaya namaga, Aathiye ooo Anthamum Anthamum ooo Aathiye' (3 times).\n4. Then wear the mala with devotion.",
  },
  {
    question: "Can women use Karungali Malai?",
    answer:
      "Yes, women can use it. However, it is recommended to avoid wearing it during periods, pregnancy, or while breastfeeding.",
  },
  {
    question:
      "What other restrictions? Can we eat non-veg or consume alcohol when using Karungali?",
    answer:
      "Karungali does not impose strict restrictions like Rudraksha. Eating non-veg or drinking alcohol will not reduce its effects, though some prefer avoiding them for spiritual reasons.",
  },
  {
    question: "What is the price of original Karungali Malai? Is it expensive?",
    answer:
      "A genuine Karungali Malai usually costs between ₹1000 to ₹2000. If priced higher than ₹2000, it may be fake. Extremely cheap options are also suspicious.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  // ✅ SEO Meta Tags for AathiLife Karungali FAQ
  useEffect(() => {
    document.title = "Karungali Malai FAQs | AathiLife";

    // Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.name = "description";
      document.head.appendChild(metaDesc);
    }
    metaDesc.content =
      "Frequently asked questions about Karungali Malai, its uses, benefits, identification tips, and how to buy genuine products from AathiLife.";

    // Meta Keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement("meta");
      metaKeywords.name = "keywords";
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.content =
      "Karungali Malai FAQ, AathiLife Karungali, Ebony Wood, Spiritual Beads, Positive Energy, Kundalini, Wellness Products";

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
    <section className="py-1 bg-gradient-to-b from-white to-white text-gray-800">
      <div className="max-w-3xl mx-auto px-4">
        {/* Title */}
        <section className="flex justify-center my-5 sm:my-6">
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
              Karungali FAQs
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

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg shadow-sm overflow-hidden"
            >
              <button
                className="flex justify-between items-center w-full px-4 py-3 text-left font-medium text-gray-700 hover:bg-[#f8b042]"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                {faq.question}
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-5 h-5 text-green-600" />
                </motion.div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="px-4 pb-3 text-gray-600 whitespace-pre-line"
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
