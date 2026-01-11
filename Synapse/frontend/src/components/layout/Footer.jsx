import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaLeaf } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white text-neutral-600 pt-20 pb-10 border-t border-neutral-200">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-6 group">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center group-hover:bg-emerald-100 transition-all duration-300">
                <FaLeaf className="text-emerald-600 text-xl" />
              </div>
              <span className="text-2xl font-display font-bold text-neutral-900 tracking-tight">
                Synapse
              </span>
            </Link>
            <p className="text-neutral-500 leading-relaxed mb-6 text-sm">
              Empowering your mental wellness journey with professional care and compassion.
              We are here to listen, support, and guide you.
            </p>
            <div className="flex space-x-4">
              {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-500 hover:bg-emerald-600 hover:text-white transition-all duration-300"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-neutral-900 font-bold mb-6">Discovery</h4>
            <ul className="space-y-3 text-sm">
              {['Home', 'About Us', 'Our Therapists', 'Wellness Blog'].map((item) => (
                <li key={item}>
                  <Link
                    to={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`}
                    className="hover:text-emerald-600 transition-colors duration-200"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tools */}
          <div>
            <h4 className="text-neutral-900 font-bold mb-6">Self-Care</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/feedback" className="hover:text-emerald-600 transition-colors duration-200">
                  Mood Tracker
                </Link>
              </li>
              <li>
                <Link to="/resources" className="hover:text-emerald-600 transition-colors duration-200">
                  Resource Library
                </Link>
              </li>
              <li>
                <Link to="/meditation" className="hover:text-emerald-600 transition-colors duration-200">
                  Guided Meditation
                </Link>
              </li>
              <li>
                <Link to="/assessment" className="hover:text-emerald-600 transition-colors duration-200">
                  Self Assessment
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-neutral-900 font-bold mb-6">Support</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/contact" className="hover:text-emerald-600 transition-colors duration-200">
                  Contact Support
                </Link>
              </li>
              <li>
                <Link to="/emergency" className="text-amber-600 hover:text-amber-700 font-medium transition-colors duration-200 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                  Emergency Help
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-emerald-600 transition-colors duration-200">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-emerald-600 transition-colors duration-200">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-neutral-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-neutral-400">
          <div>
            © 2026 Synapse Mental Wellness. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span>Made with 💚 for better minds.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
