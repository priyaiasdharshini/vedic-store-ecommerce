// src/pages/BlogDetails.jsx
import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import blogPosts from "../data/blogPosts";

const BlogDetails = () => {
  const { slug } = useParams();
  const blog = blogPosts.find((post) => post.slug === slug);

  useEffect(() => {
    if (blog) {
      document.title = `${blog.title} | AathiLife Blog`;
      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement("meta");
        metaDescription.name = "description";
        document.head.appendChild(metaDescription);
      }
      metaDescription.content = blog.description;
    }
  }, [blog]);

  if (!blog) {
    return (
      <div className="p-10 text-center">
        <h2 className="text-2xl font-bold text-gray-700">Blog not found</h2>
        <Link
          to="/blogs"
          className="text-green-600 hover:text-green-800 mt-4 inline-block"
        >
          ← Back to Blogs
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <img
        src={blog.image}
        alt={blog.title}
        className="rounded-2xl w-full h-64 object-cover mb-8 shadow-md"
      />
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
        {blog.title}
      </h1>
      <div
        className="prose prose-lg text-gray-700 max-w-none"
        dangerouslySetInnerHTML={{ __html: blog.content.replace(/\n/g, "<br/>") }}
      />
      <Link
        to="/blogs"
        className="mt-10 inline-block text-green-600 font-medium hover:text-green-800"
      >
        ← Back to Blogs
      </Link>
    </div>
  );
};

export default BlogDetails;
