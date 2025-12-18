import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/core/carousel-images/";

const DivineGallery = () => {
  const [images, setImages] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const containerRef = useRef(null);

  // ✅ Fetch images from Django backend
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(API_URL);
        const imageUrls = response.data.map((item) => item.image);
        setImages(imageUrls);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };
    fetchImages();
  }, []);

  // ✅ SEO Meta Tags
  useEffect(() => {
    document.title = "Divine Gallery | AathiLife";
    const metaTags = [
      {
        name: "description",
        content:
          "Explore the Divine Gallery of AathiLife. View spiritual, wellness, and meditation experiences captured beautifully.",
      },
      {
        name: "keywords",
        content:
          "AathiLife Divine Gallery, Spiritual Images, Meditation, Wellness, Natural Living",
      },
      {
        name: "robots",
        content: "index, follow",
      },
    ];
    metaTags.forEach(({ name, content }) => {
      let meta = document.querySelector(`meta[name="${name}"]`);
      if (!meta) {
        meta = document.createElement("meta");
        meta.name = name;
        document.head.appendChild(meta);
      }
      meta.content = content;
    });
  }, []);

  // ✅ Autoplay Carousel
  useEffect(() => {
    if (images.length === 0) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images]);

  const getVisibleSlides = () => {
    if (window.innerWidth < 640) return 1;
    if (window.innerWidth < 768) return 2;
    if (window.innerWidth < 1024) return 3;
    if (window.innerWidth < 1280) return 4;
    return 5;
  };

  const scrollToIndex = (index) => {
    const container = containerRef.current;
    if (!container || images.length === 0) return;
    const itemWidth = container.offsetWidth / getVisibleSlides();
    container.scrollTo({
      left: itemWidth * index,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    scrollToIndex(current);
  }, [current, images]);

  return (
    <section className="py-8 bg-white">
      <div className="container mx-auto px-4">
        {/* 🌿 Heading */}
        <section className="flex justify-center my-8">
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
              Divine Gallery
            </motion.h2>

            <motion.div
              animate={{ opacity: [0.2, 0.5, 0.2], scale: [1, 1.03, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 -z-10 rounded-lg bg-[#f8b042] blur-xl opacity-25"
            ></motion.div>
          </motion.div>
        </section>

        {/* 🌸 Carousel */}
        {images.length > 0 ? (
          <div
            ref={containerRef}
            className="flex overflow-x-auto scroll-smooth no-scrollbar space-x-4"
          >
            {images.map((src, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-3/4 sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 cursor-pointer"
                onClick={() => setSelectedImage(src)}
              >
                <img
                  src={src}
                  alt={`Gallery ${index + 1}`}
                  className="w-full h-64 object-cover rounded-xl shadow hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-6">Loading images...</p>
        )}

        {/* Pagination Dots */}
        {images.length > 0 && (
          <div className="flex justify-center mt-4 space-x-2">
            {images.slice(0, 5).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-2 w-2 rounded-full ${
                  current === i ? "bg-gray-800" : "bg-gray-400"
                }`}
              ></button>
            ))}
          </div>
        )}
      </div>

      {/* 🌟 Lightbox Popup */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.img
              src={selectedImage}
              alt="Enlarged View"
              className="max-w-[90%] max-h-[80vh] rounded-xl shadow-2xl border-4 border-white"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            />

            <motion.button
              className="absolute top-6 right-6 text-white bg-black/40 hover:bg-black/70 rounded-full p-2"
              onClick={() => setSelectedImage(null)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              ✕
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default DivineGallery;
