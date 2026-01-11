import React, { useState, useEffect } from "react";
import logo from "../../assets/logo.png";
import { FaUserLarge, FaBars, FaXmark } from "react-icons/fa6";
import { useNavigate, useLocation, Link } from "react-router-dom";
import Cookies from "js-cookie";
import Avatar from "@mui/material/Avatar";

const Navbar = ({ isLoggedIn, userName, avatar, role }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setShowProfileDropdown(false);
  }, [location]);

  const handleLogout = () => {
    Cookies.remove("email");
    Cookies.remove("role");
    Cookies.remove("userName");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
    window.location.reload();
  };

  const handleUser = () => {
    if (role === "USER") navigate("/userDb");
    else if (role === "THERAPIST") navigate("/therapistDb");
  };

  const isActive = (path) => location.pathname === path;

  const NavLink = ({ to, children, isMobile = false }) => {
    const active = isActive(to);
    const baseClasses = "relative font-medium transition-colors duration-300";
    const desktopClasses = `${active ? "text-emerald-700 font-bold" : "text-gray-600 hover:text-emerald-600"}`;
    const mobileClasses = `block px-4 py-3 rounded-xl text-lg ${active ? "bg-emerald-50 text-emerald-700 font-bold" : "text-gray-600 hover:bg-gray-50 hover:text-emerald-600"}`;

    return (
      <Link to={to} className={isMobile ? mobileClasses : `${baseClasses} ${desktopClasses} group`}>
        {children}
        {!isMobile && (
          <span className={`absolute -bottom-1 left-0 h-0.5 bg-emerald-500 transition-all duration-300 ${active ? "w-full" : "w-0 group-hover:w-full"}`}></span>
        )}
      </Link>
    );
  };

  return (
    <nav className="fixed w-full top-0 z-50 transition-all duration-300 bg-white/80 backdrop-blur-xl border-b border-white/40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">

          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-emerald-200/50 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <img src={logo} alt="Synapse Logo" className="relative w-10 h-10 w-auto transform group-hover:scale-105 transition-transform duration-300" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold bg-gradient-to-r from-emerald-800 to-teal-600 bg-clip-text text-transparent font-display tracking-tight">Synapse</span>
              <span className="text-[0.65rem] uppercase tracking-widest text-emerald-600/80 font-semibold hidden sm:block">Mental Wellness</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink to="/">Home</NavLink>

            {/* Dashboard Link Removed (Access via Profile Dropdown) */}

            {role !== "THERAPIST" && (
              <>
                <NavLink to="/about">About Us</NavLink>
                <NavLink to="/feedBack">Self-Care</NavLink>
                <NavLink to="/blog">Blog</NavLink>
                <NavLink to="/sos"><span className="text-rose-500 hover:text-rose-600">Emergency</span></NavLink>
              </>
            )}

            {role === "THERAPIST" && (
              <>
                <NavLink to="/appointments">Appointments</NavLink>
                <NavLink to="/sessions">Sessions</NavLink>
                <NavLink to="/blog">Blog</NavLink>
              </>
            )}
          </div>

          {/* User Profile & Mobile Toggle */}
          <div className="flex items-center gap-4">

            {/* Desktop Profile / Login */}
            <div className="hidden md:block">
              {isLoggedIn ? (
                <div className="relative">
                  <button
                    onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                    className="flex items-center gap-3 p-1 pl-2 pr-1 rounded-full border border-gray-200 hover:border-emerald-200 bg-white/50 hover:bg-white hover:shadow-md transition-all duration-300 group"
                  >
                    <div className="text-right hidden lg:block">
                      <p className="text-xs font-bold text-gray-700 group-hover:text-emerald-700 transition-colors">{userName?.split(' ')[0]}</p>
                      <p className="text-[10px] text-gray-400 uppercase tracking-wide">{role === "USER" ? "Seeker" : "Therapist"}</p>
                    </div>
                    <Avatar
                      alt={userName}
                      src={avatar}
                      sx={{ width: 36, height: 36, bgcolor: '#10b981' }}
                      className="ring-2 ring-white"
                    >
                      {userName?.charAt(0)}
                    </Avatar>
                  </button>

                  {/* Dropdown */}
                  {showProfileDropdown && (
                    <div className="absolute right-0 mt-4 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-top-2">
                      <div className="p-4 border-b border-gray-50 bg-gray-50/50">
                        <p className="text-sm font-bold text-gray-800">{userName}</p>
                        <p className="text-xs text-gray-500 truncate">{Cookies.get("email") || "user@example.com"}</p>
                      </div>
                      <div className="p-2 space-y-1">
                        <button onClick={handleUser} className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-emerald-50 hover:text-emerald-700 rounded-xl transition-colors">
                          My Profile
                        </button>
                        <button onClick={handleLogout} className="w-full text-left px-3 py-2 text-sm text-rose-600 hover:bg-rose-50 hover:text-rose-700 rounded-xl transition-colors">
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link to="/login" className="px-6 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold shadow-lg shadow-emerald-200 hover:shadow-emerald-300 transition-all transform hover:-translate-y-0.5 active:translate-y-0">
                  Sign In
                </Link>
              )}
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-colors"
            >
              {isMobileMenuOpen ? <FaXmark size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-white/95 backdrop-blur-xl border-b border-gray-100 shadow-2xl animate-in slide-in-from-top-5">
          <div className="flex flex-col p-4 space-y-2 max-h-[80vh] overflow-y-auto">
            {isLoggedIn ? (
              <div className="flex items-center gap-4 px-4 py-4 mb-2 bg-emerald-50/50 rounded-2xl border border-emerald-100">
                <Avatar alt={userName} src={avatar} sx={{ width: 44, height: 44, bgcolor: '#10b981' }} />
                <div>
                  <p className="font-bold text-gray-800">{userName}</p>
                  <p className="text-xs text-emerald-600 font-medium">{role === "USER" ? "Wellness Seeker" : "Therapist"}</p>
                </div>
              </div>
            ) : (
              <Link to="/login" className="mb-4 w-full py-3.5 bg-emerald-600 text-center text-white font-bold rounded-xl shadow-lg shadow-emerald-200">
                Sign In to Synapse
              </Link>
            )}

            <NavLink to="/" isMobile>Home</NavLink>

            {isLoggedIn && (
              <NavLink to={role === "USER" ? "/userDb" : "/therapistDb"} isMobile>Dashboard</NavLink>
            )}

            {role !== "THERAPIST" && (
              <>
                <NavLink to="/about" isMobile>About Us</NavLink>
                <NavLink to="/feedBack" isMobile>Self-Care Tools</NavLink>
                <NavLink to="/blog" isMobile>Wellness Blog</NavLink>
                <NavLink to="/sos" isMobile><span className="text-rose-600 font-bold">Emergency Support</span></NavLink>
              </>
            )}

            {role === "THERAPIST" && (
              <>
                <NavLink to="/appointments" isMobile>Appointments</NavLink>
                <NavLink to="/sessions" isMobile>My Sessions</NavLink>
                <NavLink to="/blog" isMobile>Wellness Blog</NavLink>
              </>
            )}

            {isLoggedIn && (
              <button onClick={handleLogout} className="mt-4 w-full py-3 text-rose-600 font-bold bg-rose-50 hover:bg-rose-100 rounded-xl transition-colors">
                Sign Out
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
