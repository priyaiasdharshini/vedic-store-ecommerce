import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Truck, Clock, RefreshCcw } from "lucide-react";

// India Flag Icon
const IndiaFlag = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="36"
    height="24"
    viewBox="0 0 36 24"
    className="shadow-sm border border-gray-300"
  >
    <rect width="36" height="8" y="0" fill="#FF9933" />
    <rect width="36" height="8" y="8" fill="#FFFFFF" />
    <rect width="36" height="8" y="16" fill="#138808" />
    <circle cx="18" cy="12" r="3" stroke="#000080" strokeWidth="1" fill="none" />
  </svg>
);

// Payment Icon
const PaymentIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="36"
    height="24"
    viewBox="0 0 36 24"
    className="shadow-sm border border-gray-300 rounded-sm"
  >
    <rect width="36" height="24" rx="3" fill="#fdfdfd" stroke="#444" strokeWidth="1" />
    <rect y="5" width="36" height="4" fill="#e2b203" />
    <circle cx="26" cy="16" r="3" fill="#FF6B35" />
    <circle cx="31" cy="16" r="3" fill="#FFD166" />
  </svg>
);

const StoreFeatures = () => {
  // SEO
  useEffect(() => {
    document.title = "Aathilife Store Features | Free Shipping, Secure Payments";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        "content",
        "Check out our store features including free shipping, 24/7 support, secure payments, easy replacement, and proudly made in India products."
      );
    } else {
      const meta = document.createElement("meta");
      meta.name = "description";
      meta.content =
        "Check out our store features including free shipping, 24/7 support, secure payments, easy replacement, and proudly made in India products.";
      document.head.appendChild(meta);
    }
  }, []);

  const features = [
    { icon: <Truck className="w-8 h-8 text-[#f8b042]" />, title: "Free Shipping", desc: "Free Shipping all over India." },
    { icon: <Clock className="w-8 h-8 text-[#f8b042]" />, title: "24/7 Support", desc: "Available 24 x 7" },
    { icon: <PaymentIcon />, title: "100% Secure Payments", desc: "COD / UPI / CARDS" },
    { icon: <RefreshCcw className="w-8 h-8 text-[#f8b042]" />, title: "Easy Replacement", desc: "Hassle-free product replacement." },
    { icon: <IndiaFlag />, title: "Made in India", desc: "Proudly Made in India" },
  ];

  return (
    <main className="bg-white min-h-screen">
      {/* Optional Hero Section */}
      <section className="py-16 text-center">
        <h1 className="text-4xl font-bold text-black">Our Store Features</h1>
        <p className="mt-2 text-gray-600">Discover why shopping with us is the best choice.</p>
      </section>

      {/* Features Section */}
      <section className="bg-white border-t border-b border-[#f8b042] py-14 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 text-center gap-6 px-4">
          {features.map((item, i) => (
            <motion.div
              key={i}
              className="flex flex-col items-center space-y-2 px-6 py-4 border-r last:border-r-0 border-[#f8b042]"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              whileHover={{ y: -5 }}
            >
              {/* Floating icon */}
              <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 3, repeat: Infinity }}>
                {item.icon}
              </motion.div>
              <h3 className="font-semibold text-lg text-black relative">
                {item.title}
                {/* Golden underline shimmer */}
                <motion.span
                  className="block h-[2px] w-10 mx-auto mt-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </h3>
              <p className="text-sm text-black">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Optional CTA / Footer */}
      <section className="py-16 text-center bg-white">
        <h2 className="text-2xl font-semibold text-black">Shop with Confidence</h2>
        <p className="mt-2 text-gray-600">Experience hassle-free shopping with our store features.</p>
      </section>
    </main>
  );
};

export default StoreFeatures;
