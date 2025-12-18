// src/pages/Contact.jsx
import React, { useEffect } from "react";
import { Phone, Mail, MapPin, MessageSquare } from "lucide-react";

const Contact = () => {
  // ✅ SEO setup
  useEffect(() => {
    document.title = "Contact Us | Aathi Life";

    const metaDescription = document.querySelector('meta[name="description"]');
    const descriptionContent =
      "Get in touch with Aathi Life. Contact us via phone, email, WhatsApp, or visit our office for inquiries about products and wellness services.";

    if (metaDescription) {
      metaDescription.setAttribute("content", descriptionContent);
    } else {
      const meta = document.createElement("meta");
      meta.name = "description";
      meta.content = descriptionContent;
      document.head.appendChild(meta);
    }
  }, []);

  return (
    <section className="relative bg-white min-h-screen flex items-center py-12 px-6 overflow-hidden">
      
      {/* Decorative Leaves - Top Left */}
      <img
        src="\tropical-leaves_7409162.png"
        alt="Leaf Decoration"
        className="absolute top-0 left-0 w-28 opacity-20 animate-pulse"
      />
      
      {/* Decorative Leaves - Bottom Right */}
      <img
        src="\tropical-leaves_7409162.png"
        alt="Leaf Decoration"
        className="absolute bottom-0 right-0 w-32 opacity-25 rotate-180 animate-pulse"
      />

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center relative z-10">
        
        {/* Left Side (Image) */}
        <div className="flex justify-center">
          <img
            src="\contactus.jpg"
            alt="Contact"
            className="rounded-3xl shadow-2xl w-full md:w-4/5 object-cover"
          />
        </div>

        {/* Right Side (Details) */}
        <div className="space-y-6 text-black">
          <h2 className="text-4xl font-extrabold mb-4">Contact Us</h2>
          <p className="text-lg text-slate-700">
            Our support Hotline is available{" "}
            <span className="font-semibold">10am-5pm</span> &amp; WhatsApp us{" "}
            <span className="font-semibold">24 Hours a day</span>:
          </p>

          <div className="space-y-5">
            <div className="flex items-center gap-4">
              <Phone className="w-6 h-6 text-green-700" />
              <span className="text-lg font-medium">+91 8807695607</span>
            </div>
            <div className="flex items-center gap-4">
              <Mail className="w-6 h-6 text-blue-700" />
              <span className="text-lg font-medium">info@aathilife.com</span>
            </div>
            <div className="flex items-center gap-4">
              <MessageSquare className="w-6 h-6 text-green-600" />
              <span className="text-lg font-medium">Available 24/7 on WhatsApp</span>
            </div>
            <div className="flex items-start gap-4">
              <MapPin className="w-6 h-6 text-red-700 mt-1" />
              <span className="text-lg leading-relaxed">
                <strong>Building Address</strong>
                <br />
                3/33 Manakkarai, Villukuri
                <br />
                Kanyakumari District,
                <br />
                Tamil Nadu – 629180
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
