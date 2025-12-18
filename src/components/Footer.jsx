import React from "react";
import { Link } from "react-router-dom";
import { FaYoutube, FaInstagram, FaFacebook, FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#2b2522] text-white py-12 px-4 sm:px-6 md:px-12 lg:px-20">
      {/* Logo Section */}
      <div className="max-w-6xl mx-auto mb-8 text-center">
        <img
          src="\logo-removebg-preview.png" // Replace with your actual logo path
          alt="Aathi Life Logo"
          className="h-16 sm:h-20 md:h-24 mx-auto mb-4 filter invert"
          style={{ filter: "invert(1)" }}
        />
        <p className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto">
          Your trusted partner for quality products and exceptional service.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        {/* Contact Info */}
        <div className="text-center sm:text-left">
          <h3 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">Contact</h3>
          <p className="mb-2 text-sm sm:text-base">
            Our support Hotline is available 10am-5pm & WhatsApp us 24 Hours a
            day:
          </p>
          <p className="mb-2 font-medium text-orange-400 text-sm sm:text-base">
            +91 8807695607
          </p>
          <p className="mb-4 sm:mb-6 underline underline-offset-2 hover:text-orange-400 cursor-pointer text-sm sm:text-base transition-colors duration-300">
            info@aathilife.com
          </p>
        </div>

        {/* Address */}
        <div className="text-center sm:text-left">
          <h4 className="text-lg sm:text-xl font-semibold mb-3">Building Address</h4>
          <p className="text-sm sm:text-base">3/33 Manakkarai Villukuri,</p>
          <p className="text-sm sm:text-base">Kanyakumari district,</p>
          <p className="text-sm sm:text-base">Tamil Nadu 629180</p>
        </div>

        {/* Policies */}
        <div className="text-center sm:text-left">
          <h4 className="text-lg sm:text-xl font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2">
            <li>
              <Link
                to="/refundpolicy"
                className="hover:text-orange-400 underline underline-offset-2 text-sm sm:text-base transition-colors duration-300"
              >
                Refund Policy
              </Link>
            </li>
            <li>
              <Link
                to="/privacypolicy"
                className="hover:text-orange-400 underline underline-offset-2 text-sm sm:text-base transition-colors duration-300"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                to="/termsandconditions"
                className="hover:text-orange-400 underline underline-offset-2 text-sm sm:text-base transition-colors duration-300"
              >
                Terms & Conditions
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Media Links */}
        <div className="text-center sm:text-left">
          <h4 className="text-lg sm:text-xl font-semibold mb-3">Follow Us</h4>
          <div className="flex justify-center sm:justify-start space-x-4 mb-4">
            <a
              href="https://youtube.com/@aathilife"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-orange-400 transition-colors duration-300 p-2 hover:bg-orange-400/10 rounded-full"
              aria-label="YouTube"
            >
              <FaYoutube size={24} />
            </a>
            <a
              href="https://instagram.com/aathilife"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-orange-400 transition-colors duration-300 p-2 hover:bg-orange-400/10 rounded-full"
              aria-label="Instagram"
            >
              <FaInstagram size={24} />
            </a>
            <a
              href="https://facebook.com/aathilife"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-orange-400 transition-colors duration-300 p-2 hover:bg-orange-400/10 rounded-full"
              aria-label="Facebook"
            >
              <FaFacebook size={24} />
            </a>
          </div>
          <p className="text-xs sm:text-sm text-gray-300">
            Stay connected for updates and offers
          </p>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="text-center mt-8 sm:mt-10 pt-6 border-t border-gray-600">
        <p className="text-xs sm:text-sm text-orange-400">
          © {new Date().getFullYear()} Aathi Life. All rights reserved.
        </p>
      </div>

      {/* ✅ WhatsApp Floating Button */}
      <a
        href="https://wa.me/918807695607"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 bg-green-500 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:bg-green-600 transition-colors duration-300 z-50"
        aria-label="WhatsApp"
      >
        <FaWhatsapp size={30} />
      </a>
    </footer>
  );
};

export default Footer;
