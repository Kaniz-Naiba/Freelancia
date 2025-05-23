import React from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 text-sm mt-10 px-6 py-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
        {/* Contact Details */}
        <div>
          <h4 className="font-semibold mb-2 text-gray-800 dark:text-white">Contact Us</h4>
          <p>Email: support@freelancemarket.com</p>
          <p>Phone: +1 (123) 456-7890</p>
          <p>Location: 123 Market Street, NY</p>
        </div>

        {/* Terms & Conditions */}
        <div>
          <h4 className="font-semibold mb-2 text-gray-800 dark:text-white">Quick Links</h4>
          <a href="/terms" className="hover:underline block">Terms & Conditions</a>
          <a href="/privacy" className="hover:underline block">Privacy Policy</a>
        </div>

        {/* Social Media */}
        <div>
          <h4 className="font-semibold mb-2 text-gray-800 dark:text-white">Follow Us</h4>
          <div className="flex justify-center md:justify-start gap-4 mt-2">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
              <FaFacebookF />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
              <FaTwitter />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-700">
              <FaLinkedinIn />
            </a>
            <a href="mailto:support@freelancemarket.com" className="hover:text-red-500">
              <FaEnvelope />
            </a>
          </div>
        </div>
      </div>

      <div className="mt-6 text-center border-t pt-4 text-gray-500 text-xs dark:border-gray-700">
        © {new Date().getFullYear()} FreelanceMarket — All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
