import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTestimonials } from "../contexts/Testimonialcontext";

const CustomerReviews = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const { testimonials, fetchTestimonials } = useTestimonials();

  // ✅ Fetch testimonials when component mounts
  useEffect(() => {
    fetchTestimonials();
  }, []);

  // ✅ SEO Meta Tags for AathiLife
  useEffect(() => {
    document.title = "Customer Reviews | AathiLife";

    const setMeta = (name, content) => {
      let tag = document.querySelector(`meta[name="${name}"]`);
      if (!tag) {
        tag = document.createElement("meta");
        tag.name = name;
        document.head.appendChild(tag);
      }
      tag.content = content;
    };

    setMeta(
      "description",
      "Read authentic customer reviews of AathiLife products. See feedback and photos from happy customers about wellness, meditation, and natural living."
    );
    setMeta(
      "keywords",
      "AathiLife Reviews, Customer Feedback, Wellness Products Reviews, Meditation Products, Natural Living"
    );
    setMeta("robots", "index, follow");
  }, []);

  // ✅ Backend base URL (adjust if needed)
  const BASE_URL = "http://127.0.0.1:8000";

  return (
    <div className="relative bg-white py-6">
      {/* 🌿 Header */}
      <section className="flex justify-center my-3 sm:my-3">
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
            Customer Reviews
          </motion.h2>

          <motion.div
            animate={{ opacity: [0.2, 0.5, 0.2], scale: [1, 1.03, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 -z-10 rounded-lg bg-[#f8b042] blur-xl opacity-25"
          ></motion.div>
        </motion.div>
      </section>

      {/* 🧘 Customer Reviews Carousel */}
      <div className="relative overflow-hidden py-7">
        {testimonials.length > 0 ? (
          <div
            className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory px-2"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id || index}
                className="min-w-[160px] sm:min-w-[200px] md:min-w-[250px] max-w-sm snap-start flex-shrink-0 transform hover:scale-105 transition-transform duration-500"
                onClick={() =>
                  setSelectedImage(
                    testimonial.image.startsWith("http")
                      ? testimonial.image
                      : `${BASE_URL}${testimonial.image}`
                  )
                }
              >
                <img
                  src={
                    testimonial.image.startsWith("http")
                      ? testimonial.image
                      : `${BASE_URL}${testimonial.image}`
                  }
                  alt={`Customer Review ${index + 1}`}
                  className="w-full h-[180px] sm:h-[220px] md:h-[280px] object-cover rounded-xl shadow-xl border border-amber-200 cursor-pointer"
                />
                <div className="text-center mt-2">
                  <p className="text-sm font-medium text-gray-800 line-clamp-2">
                    {testimonial.text || "Happy Customer!"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 py-10">
            No customer reviews available.
          </div>
        )}

        {/* 🖼️ Fullscreen Image Modal */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
            onClick={() => setSelectedImage(null)}
          >
            <img
              src={selectedImage}
              alt="Full Review"
              className="max-w-[90%] max-h-[90%] rounded-xl shadow-2xl animate-zoomIn"
            />
          </div>
        )}
      </div>

      {/* ✨ Animations + Hide Scrollbar */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        @keyframes zoomIn {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-zoomIn {
          animation: zoomIn 0.3s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default CustomerReviews;
