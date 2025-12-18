// src/components/BlogSection.jsx
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import blogPosts from "../data/blogPosts";
import { motion } from "framer-motion";

const BlogSection = () => {
  // SEO
  useEffect(() => {
    document.title = "AathiLife Blogs | Wellness, Meditation & Natural Living";
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.name = "description";
      document.head.appendChild(metaDescription);
    }
    metaDescription.content =
      "Explore AathiLife blogs on meditation, natural products, spiritual rituals, and healthy living.";
  }, []);

  return (
    <section className="bg-white py-1 px-4 md:px-12 lg:px-20">
      {/* Header */}
      <div className="text-center mb-8">
        <section className="flex justify-center my-2 sm:my-5">
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
                      🌿 Blog posts
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
        <p className="text-gray-600 max-w-2xl mx-auto">
          Explore tips, traditions, and insights to live a balanced and healthy life.
        </p>
      </div>

      {/* Blog cards */}
      <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogPosts.map((blog) => (
          <motion.div
            key={blog.slug}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col"
          >
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-48 md:h-56 object-cover rounded-t-2xl"
            />
            <div className="p-4 flex flex-col flex-grow">
              <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-1">
                {blog.title}
              </h3>
              <p className="text-gray-600 text-sm flex-grow">{blog.description}</p>
              <Link
                to={`/blogs/${blog.slug}`}
                className="mt-3 inline-block text-green-600 font-medium hover:text-green-800 text-sm"
              >
                READ NOW →
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default BlogSection;
