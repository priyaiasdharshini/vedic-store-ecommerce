// src/pages/PrivacyPolicy.jsx
import React, { useEffect } from "react";

const PrivacyPolicy = () => {
  useEffect(() => {
    // Set page title
    document.title = "Privacy Policy | Aathi Life";

    // Set meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Read Aathi Life's Privacy Policy to understand how we collect, use, and protect your personal information."
      );
    } else {
      const meta = document.createElement("meta");
      meta.name = "description";
      meta.content =
        "Read Aathi Life's Privacy Policy to understand how we collect, use, and protect your personal information.";
      document.head.appendChild(meta);
    }
  }, []);

  return (
    <section className="bg-amber-50 min-h-screen py-16 px-6 md:px-20">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-8 md:p-12">
        <h1 className="text-3xl font-bold text-amber-900 mb-6">
          Privacy Policy of Aathi Life
        </h1>

        <p className="text-gray-700 mb-4">
          This Privacy Policy describes Our policies and procedures on the
          collection, use and disclosure of Your information when You use the
          Service and tells You about Your privacy rights and how the law
          protects You.
        </p>
        <p className="text-gray-700 mb-4">
          We use Your Personal data to provide and improve the Service. By using
          the Service, You agree to the collection and use of information in
          accordance with this Privacy Policy.
        </p>

        {/* The rest of your Privacy Policy content */}
      </div>
    </section>
  );
};

export default PrivacyPolicy;
