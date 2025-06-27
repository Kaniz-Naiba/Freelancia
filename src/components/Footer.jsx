import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-purple-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 text-sm mt-10 px-6 py-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
        
        {/* Logo + Description */}
        <div>
          <Link to="/" className="flex items-center space-x-2">
  <img
    src="/Freelancia Logo with Pen Icon.png" // replace with your actual logo path or URL
    alt="Freelancia Logo"
    className="w-10 h-10 object-contain"
  />
  
</Link>

          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Your daily freelance partner. Organize, post, and get things done.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h4 className="font-semibold mb-2 text-gray-800 dark:text-white">Explore</h4>
          <Link to="/" className="hover:underline block">Home</Link>
          <Link to="/browse-tasks" className="hover:underline block">Browse Tasks</Link>
          <Link to="/add-task" className="hover:underline block">Add Task</Link>
          <Link to="/about" className="hover:underline block">About Us</Link>
        </div>

        {/* Policies */}
        <div>
          <h4 className="font-semibold mb-2 text-gray-800 dark:text-white">Legal</h4>
          <a href="/terms" className="hover:underline block">Terms & Conditions</a>
          <a href="/privacy" className="hover:underline block">Privacy Policy</a>
          <a href="/support" className="hover:underline block">Support</a>
        </div>

        {/* Social Media */}
        <div>
          <h4 className="font-semibold mb-2 text-gray-800 dark:text-white">Connect With Us</h4>
          <div className="flex justify-center md:justify-start gap-4 mt-3 text-lg">
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

      {/* Bottom Footer */}
      <div className="mt-10 text-center border-t pt-4 text-gray-500 text-xs dark:border-gray-700">
        © {new Date().getFullYear()} Freelancia — All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
