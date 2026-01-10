import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-primary-700 via-primary-800 to-secondary-800 text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-display font-bold mb-4 gradient-text">
              Synapse
            </h3>
            <p className="text-neutral-200 mb-6 leading-relaxed">
              Your trusted partner in mental wellness. We're committed to providing
              compassionate support and professional guidance for your emotional well-being journey.
            </p>
            <div className="flex space-x-4">
              <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors duration-300 cursor-pointer">
                <span className="text-sm font-semibold">F</span>
              </div>
              <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors duration-300 cursor-pointer">
                <span className="text-sm font-semibold">T</span>
              </div>
              <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors duration-300 cursor-pointer">
                <span className="text-sm font-semibold">I</span>
              </div>
              <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors duration-300 cursor-pointer">
                <span className="text-sm font-semibold">L</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <a href="/" className="text-neutral-200 hover:text-white transition-colors duration-200">
                  Home
                </a>
              </li>
              <li>
                <a href="/about" className="text-neutral-200 hover:text-white transition-colors duration-200">
                  About Us
                </a>
              </li>
              <li>
                <a href="/blog" className="text-neutral-200 hover:text-white transition-colors duration-200">
                  Wellness Blog
                </a>
              </li>
              <li>
                <a href="/feedBack" className="text-neutral-200 hover:text-white transition-colors duration-200">
                  Self-Care Tools
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-3">
              <li>
                <a href="/sos" className="text-neutral-200 hover:text-white transition-colors duration-200">
                  Emergency Support
                </a>
              </li>
              <li>
                <a href="/contact" className="text-neutral-200 hover:text-white transition-colors duration-200">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="/help" className="text-neutral-200 hover:text-white transition-colors duration-200">
                  Help Center
                </a>
              </li>
              <li>
                <a href="/privacy" className="text-neutral-200 hover:text-white transition-colors duration-200">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-neutral-300 text-sm mb-4 md:mb-0">
            © 2026 Synapse. All rights reserved. Your mental wellness matters.
          </div>
          <div className="flex items-center space-x-6 text-sm">
            <span className="text-neutral-300">24/7 Crisis Support Available</span>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-success-400 rounded-full animate-pulse"></div>
              <span className="text-success-400 font-medium">Online</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
