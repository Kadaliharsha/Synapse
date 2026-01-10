import React, { useState } from "react";
import logo from "../../assets/logo.png";
import { FaUserLarge } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie"; // Import Cookies to manage cookies
import Avatar from "@mui/material/Avatar"; // Import Material UI Avatar component

const Navbar = ({ isLoggedIn, userName, avatar, role }) => {
  const [showDropdown, setShowDropdown] = useState(false); // Dropdown state
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("email");
    Cookies.remove("role");
    Cookies.remove("userName");
    navigate("/");
    window.location.reload();
  };

  const handleUser = () => {
    if (role === "USER") navigate("/userDb");
    else if (role === "THERAPIST") navigate("/therapistDb");
  };

  const handleToggleDropdown = () => {
    setShowDropdown((prev) => !prev); // Toggle the dropdown visibility
  };

  return (
    <nav className="bg-white/95 backdrop-blur-md text-neutral-800 p-4 flex justify-between items-center shadow-soft sticky top-0 z-50 border-b border-neutral-200">
      <div className="flex items-center space-x-4 ml-8">
        <div className="relative">
          <img src={logo} alt="Synapse Logo" className="w-12 h-12 animate-scale-in" />
        </div>
        <div className="text-2xl font-display font-bold gradient-text">
          Synapse
        </div>
        <div className="text-sm text-neutral-600 font-medium hidden md:block">
          Your Mental Wellness Companion
        </div>
      </div>

      <ul className="flex space-x-8 mr-8 text-base font-medium items-center">
        <li>
          <a href="/" className="hover:text-primary-600 transition-colors duration-200 relative group">
            Home
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-600 transition-all duration-300 group-hover:w-full"></span>
          </a>
        </li>

        {role !== "THERAPIST" && (
          <>
            <li>
              <a href="/about" className="hover:text-primary-600 transition-colors duration-200 relative group">
                About Us
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
            </li>
            <li>
              <a href="/feedBack" className="hover:text-primary-600 transition-colors duration-200 relative group">
                Self-Care Tools
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
            </li>
            <li>
              <a href="/blog" className="hover:text-primary-600 transition-colors duration-200 relative group">
                Wellness Blog
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
            </li>
            <li>
              <a href="/sos" className="hover:text-error-600 transition-colors duration-200 relative group">
                Emergency Support
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-error-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
            </li>
          </>
        )}

        {role === "THERAPIST" && (
          <>
            <li>
              <a href="/appointments" className="hover:text-primary-600 transition-colors duration-200 relative group">
                Appointments
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
            </li>
            <li>
              <a href="/sessions" className="hover:text-primary-600 transition-colors duration-200 relative group">
                Therapy Sessions
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
            </li>
            <li>
              <a href="/blog" className="hover:text-primary-600 transition-colors duration-200 relative group">
                Wellness Blog
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
            </li>
          </>
        )}

        <li className="relative">
          {isLoggedIn ? (
            <div className="flex items-center cursor-pointer group">
              <Avatar
                alt={userName}
                src={avatar || undefined}
                onClick={handleUser}
                sx={{
                  width: 48,
                  height: 48,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.1)',
                    boxShadow: '0 4px 20px rgba(14, 165, 233, 0.3)'
                  }
                }}
                className="group-hover:ring-2 group-hover:ring-primary-300"
              >
                {!avatar && userName.charAt(0)}
              </Avatar>
              <div className="ml-3 hidden lg:block">
                <div className="text-sm font-medium text-neutral-900">{userName}</div>
                <div className="text-xs text-neutral-500">{role === "USER" ? "Wellness Seeker" : "Mental Health Professional"}</div>
              </div>
            </div>
          ) : (
            <FaUserLarge
              className="cursor-pointer text-2xl text-neutral-600 hover:text-primary-600 transition-colors duration-200"
              onClick={handleToggleDropdown}
            />
          )}

          {showDropdown && !isLoggedIn && (
            <ul className="absolute right-0 mt-3 w-64 bg-white rounded-xl shadow-large border border-neutral-200 text-sm animate-slide-down">
              <li className="px-4 py-3 hover:bg-neutral-50 cursor-pointer transition-colors duration-200 rounded-t-xl">
                <a href="/signup/" className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                    <span className="text-primary-600 font-semibold">U</span>
                  </div>
                  <div>
                    <div className="font-medium text-neutral-900">Join as Wellness Seeker</div>
                    <div className="text-xs text-neutral-500">Start your mental wellness journey</div>
                  </div>
                </a>
              </li>
              <li className="px-4 py-3 hover:bg-neutral-50 cursor-pointer transition-colors duration-200">
                <a href="/signup/therapist" className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-secondary-100 rounded-full flex items-center justify-center">
                    <span className="text-secondary-600 font-semibold">T</span>
                  </div>
                  <div>
                    <div className="font-medium text-neutral-900">Join as Therapist</div>
                    <div className="text-xs text-neutral-500">Help others on their wellness path</div>
                  </div>
                </a>
              </li>
              <li className="px-4 py-3 hover:bg-neutral-50 cursor-pointer transition-colors duration-200 rounded-b-xl border-t border-neutral-100">
                <a href="/login" className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-accent-100 rounded-full flex items-center justify-center">
                    <span className="text-accent-600 font-semibold">→</span>
                  </div>
                  <div>
                    <div className="font-medium text-neutral-900">Sign In</div>
                    <div className="text-xs text-neutral-500">Access your wellness dashboard</div>
                  </div>
                </a>
              </li>
            </ul>
          )}
        </li>

        {isLoggedIn && (
          <li>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-error-500 hover:bg-error-600 text-white rounded-lg transition-all duration-300 font-medium shadow-soft hover:shadow-medium transform hover:-translate-y-0.5"
            >
              Sign Out
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
