// src/pages/TermsAndConditions.jsx
import React, { useEffect } from "react";

const TermsAndConditions = () => {
  useEffect(() => {
    // Set page title
    document.title = "Terms & Conditions | Aathi Life";

    // Set meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Read the Terms & Conditions of Aathi Life to understand your rights, obligations, and usage rules for our website and services."
      );
    } else {
      const meta = document.createElement("meta");
      meta.name = "description";
      meta.content =
        "Read the Terms & Conditions of Aathi Life to understand your rights, obligations, and usage rules for our website and services.";
      document.head.appendChild(meta);
    }
  }, []);

  return (
    <section className="bg-amber-50 min-h-screen py-16 px-6 md:px-20">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-8 md:p-12">
        <h1 className="text-3xl font-bold text-amber-900 mb-6">
          Terms and Conditions
        </h1>
        <p className="text-gray-700 mb-4">
          Please read these terms and conditions carefully before using Our
          Service.
        </p>

        {/* Interpretation & Definitions */}
        <h2 className="text-xl font-semibold text-amber-800 mt-8 mb-3">
          Interpretation and Definitions
        </h2>
        <h3 className="font-semibold text-gray-800 mt-4 mb-2">Interpretation</h3>
        <p className="text-gray-700 mb-4">
          The words of which the initial letter is capitalized have meanings
          defined under the following conditions. The following definitions
          shall have the same meaning regardless of whether they appear in
          singular or in plural.
        </p>

        <h3 className="font-semibold text-gray-800 mt-4 mb-2">Definitions</h3>
        <ul className="list-disc list-inside text-gray-700 mb-6 space-y-1">
          <li>
            <strong>Affiliate</strong> means an entity that controls, is
            controlled by or is under common control with a party.
          </li>
          <li>
            <strong>Country</strong> refers to: Tamil Nadu, India.
          </li>
          <li>
            <strong>Company</strong> (referred to as “the Company”, “We”, “Us” or “Our”) refers to Aathi Life.
          </li>
          <li>
            <strong>Device</strong> means any device that can access the Service such as a computer, cellphone, or tablet.
          </li>
          <li>
            <strong>Service</strong> refers to the Website.
          </li>
          <li>
            <strong>Terms and Conditions</strong> (also referred to as “Terms”) form the entire agreement between You and the Company regarding the use of the Service.
          </li>
          <li>
            <strong>Third-party Social Media Service</strong> means any services or content provided by a third party that may be displayed or included by the Service.
          </li>
          <li>
            <strong>Website</strong> refers to Aathi Life, accessible from{" "}
            <a
              href="https://aathilife.com/"
              className="text-orange-600 underline"
              target="_blank"
              rel="noreferrer"
            >
              https://aathilife.com/
            </a>
            .
          </li>
          <li>
            <strong>You</strong> means the individual or entity accessing or using the Service.
          </li>
        </ul>

        {/* Acknowledgment */}
        <h2 className="text-xl font-semibold text-amber-800 mt-8 mb-3">
          Acknowledgment
        </h2>
        <p className="text-gray-700 mb-4">
          These are the Terms and Conditions governing the use of this Service
          and the agreement that operates between You and the Company. Your
          access to and use of the Service is conditioned on Your acceptance of
          and compliance with these Terms and Conditions.
        </p>
        <p className="text-gray-700 mb-4">
          By accessing or using the Service You agree to be bound by these
          Terms. If You disagree with any part of these Terms, You may not
          access the Service.
        </p>
        <p className="text-gray-700 mb-4">
          You represent that You are over the age of 18. The Company does not
          permit those under 18 to use the Service. Your use is also conditioned
          on compliance with our{" "}
          <a
            href="/privacy-policy"
            className="text-orange-600 underline"
          >
            Privacy Policy
          </a>
          .
        </p>

        {/* Remaining sections stay the same */}
      </div>
    </section>
  );
};

export default TermsAndConditions;
