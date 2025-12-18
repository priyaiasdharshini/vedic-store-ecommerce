// src/pages/RefundPolicy.jsx
import React, { useEffect } from "react";

const RefundPolicy = () => {
  useEffect(() => {
    // Set page title
    document.title = "Refund & Cancellation Policy | Aathi Life";

    // Set meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Read Aathi Life's Refund & Cancellation Policy to understand eligibility, non-refundable items, and how to request a refund."
      );
    } else {
      const meta = document.createElement("meta");
      meta.name = "description";
      meta.content =
        "Read Aathi Life's Refund & Cancellation Policy to understand eligibility, non-refundable items, and how to request a refund.";
      document.head.appendChild(meta);
    }
  }, []);

  return (
    <section className="bg-amber-50 min-h-screen py-16 px-6 md:px-20">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8 md:p-12">
        <h1 className="text-3xl font-bold text-amber-900 mb-6">
          Refund & Cancellation Policy
        </h1>

        <p className="text-gray-700 mb-4">
          At <span className="font-semibold">Aathi Life</span>, we value our
          customers and aim to provide the best possible experience. If you are
          not satisfied with your purchase, please review our refund policy
          below.
        </p>

        <h2 className="text-xl font-semibold text-amber-800 mt-6 mb-3">
          1. Refund Eligibility
        </h2>
        <p className="text-gray-700 mb-4">
          • Refund requests must be made within{" "}
          <span className="font-semibold">7 days</span> of purchase. <br />
          • The product must be unused and in its original condition. <br />
          • Digital/downloadable items are non-refundable once accessed or
          downloaded.
        </p>

        <h2 className="text-xl font-semibold text-amber-800 mt-6 mb-3">
          2. Non-Refundable Items
        </h2>
        <p className="text-gray-700 mb-4">
          • Gift cards or promotional items. <br />
          • Discounted or clearance products. <br />
          • Services already rendered.
        </p>

        <h2 className="text-xl font-semibold text-amber-800 mt-6 mb-3">
          3. How to Request a Refund
        </h2>
        <p className="text-gray-700 mb-4">
          To initiate a refund, please contact us at{" "}
          <a
            href="mailto:info@aathilife.com"
            className="text-orange-600 underline"
          >
            info@aathilife.com
          </a>{" "}
          with your order details. Our support team will review your request and
          respond within <span className="font-semibold">3-5 business days</span>.
        </p>

        <h2 className="text-xl font-semibold text-amber-800 mt-6 mb-3">
          4. Cancellations
        </h2>
        <p className="text-gray-700 mb-4">
          Orders can be cancelled within{" "}
          <span className="font-semibold">24 hours</span> of placement. Once
          processed or shipped, cancellation requests cannot be accepted.
        </p>

        <h2 className="text-xl font-semibold text-amber-800 mt-6 mb-3">
          5. Contact Us
        </h2>
        <p className="text-gray-700">
          If you have any questions about our Refund Policy, please reach out at{" "}
          <a
            href="mailto:info@aathilife.com"
            className="text-orange-600 underline"
          >
            info@aathilife.com
          </a>{" "}
          or call us at{" "}
          <span className="font-semibold text-orange-600">+91 8807695607</span>.
        </p>
      </div>
    </section>
  );
};

export default RefundPolicy;
