import { FaEye, FaEyeSlash } from "react-icons/fa6";
import Image from "../assets/login_hero.png";
import Logo from "../assets/logo.png";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/api.js";

const Login = () => {
  const [loginCredentials, setLoginCredentials] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await API.post("/auth/login", loginCredentials);

      if (response.status === 200) {
        const { token, roles, name } = response.data;

        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify({ name, roles, email: loginCredentials.email }));

        if (roles[0] === "USER") {
          window.location.href = "/userDb";
        } else if (roles[0] === "THERAPIST") {
          window.location.href = "/therapistDb";
        } else {
          setMessage({ text: "Invalid role detected.", type: "error" });
        }
      }
    } catch (error) {
      const errorMsg = error.response?.data || "Login failed.";
      setMessage({ text: errorMsg, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setLoginCredentials((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative">
      {/* Background Image & Overlay */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat fixed"
        style={{ backgroundImage: `url(${Image})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/40 via-black/20 to-emerald-900/40 backdrop-blur-sm"></div>
      </div>

      {/* Centered Login Card */}
      <div className="relative z-10 w-full max-w-md mx-4">
        <div className="bg-white/95 backdrop-blur-xl p-8 sm:p-10 rounded-3xl shadow-2xl border border-white/20 animate-slide-up">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-block p-3 rounded-full bg-emerald-50 mb-4 shadow-sm">
              <img
                src={Logo}
                alt="Synapse Logo"
                className="w-12 h-12 transform hover:rotate-12 transition-transform duration-300"
              />
            </div>
            <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-500 text-sm">
              Your safe space for mental wellness
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide ml-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                placeholder="name@example.com"
                value={loginCredentials.email}
                onChange={handleInput}
                required
                className="w-full px-5 py-3.5 rounded-2xl border border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all duration-200 outline-none bg-gray-50/50 hover:bg-white focus:bg-white text-gray-800 placeholder-gray-400"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center ml-1">
                <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                  Password
                </label>
                <a href="#" className="text-xs text-emerald-600 hover:text-emerald-700 font-medium">Forgot?</a>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={loginCredentials.password}
                  onChange={handleInput}
                  required
                  className="w-full px-5 py-3.5 rounded-2xl border border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all duration-200 outline-none bg-gray-50/50 hover:bg-white focus:bg-white text-gray-800 placeholder-gray-400 pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-emerald-600 transition-colors p-1"
                >
                  {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                </button>
              </div>
            </div>

            {message && (
              <div className={`p-4 rounded-2xl text-sm flex items-center gap-3 shadow-sm ${message.type === 'error' ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-green-50 text-green-600 border border-green-100'}`}>
                <span className="text-lg">{message.type === 'error' ? '!' : '✓'}</span>
                {message.text}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-2xl transition-all duration-200 shadow-lg shadow-emerald-600/20 hover:shadow-emerald-600/30 disabled:opacity-70 disabled:cursor-not-allowed transform active:scale-[0.98] mt-2 text-base"
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Signing In...</span>
                </div>
              ) : (
                "Sign In"
              )}
            </button>

            <div className="pt-2 text-center">
              <p className="text-sm text-gray-600">
                New to Synapse?{" "}
                <Link
                  to="/signup"
                  className="text-emerald-600 font-bold hover:text-emerald-700 transition-colors"
                >
                  Create Account
                </Link>
              </p>
            </div>
          </form>
        </div>

        {/* Simple Footer under card */}
        <p className="text-center text-white/60 text-xs mt-8">
          &copy; 2024 Synapse. All rights reserved. <Link to="/sos" className="hover:text-white underline decoration-white/30">Emergency Support</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;