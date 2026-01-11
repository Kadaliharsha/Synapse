import React, { useState } from "react";
import API from "../../api/api";
import { useNavigate } from "react-router-dom";
import GlassCard from "./GlassCard";
import { FaHandHoldingHeart, FaUserMd, FaCalendarCheck } from "react-icons/fa"; // Importing updated icons

const Support = () => {
  const navigate = useNavigate();

  const handleFindSupportClick = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login for booking appointment ")
      navigate("/login?redirect=/");
      return;
    }

    // Real-world flow: Scroll to the therapist section
    const element = document.getElementById("meet-therapists");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    } else {
      // Fallback if not on home page
      navigate("/userDb");
    }
  };

  return (
    <GlassCard className="h-full !p-0 overflow-hidden group hover:ring-2 hover:ring-emerald-500/30 transition-all duration-500">
      <div className="flex flex-col lg:flex-row h-full">
        {/* Visual/Icon Section */}
        <div className="lg:w-1/2 bg-gradient-to-br from-teal-50 to-emerald-50 flex flex-col justify-center items-center p-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/60 via-transparent to-transparent"></div>

          <div className="w-24 h-24 bg-white rounded-2xl shadow-xl shadow-emerald-100 flex items-center justify-center mb-6 relative z-10 transform group-hover:rotate-6 transition-transform duration-500">
            <FaHandHoldingHeart className="text-5xl text-emerald-500" />
          </div>

          <div className="space-y-4 text-center relative z-10">
            <div className="bg-white/60 backdrop-blur-md px-4 py-2 rounded-lg shadow-sm flex items-center gap-3 w-fit mx-auto">
              <FaUserMd className="text-teal-500" />
              <span className="text-sm font-medium text-gray-600">Licensed Therapists</span>
            </div>
            <div className="bg-white/60 backdrop-blur-md px-4 py-2 rounded-lg shadow-sm flex items-center gap-3 w-fit mx-auto">
              <FaCalendarCheck className="text-teal-500" />
              <span className="text-sm font-medium text-gray-600">Easy Scheduling</span>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="lg:w-1/2 p-8 lg:p-10 flex flex-col bg-white/50 backdrop-blur-sm">
          <h2 className="text-3xl font-display font-bold text-gray-800 mb-4 leading-tight">
            Need someone to <span className="text-teal-600">talk to?</span>
          </h2>

          <p className="text-gray-600 mb-8 leading-relaxed">
            Healing takes time, but you don't have to do it alone. Connect with our professionals today.
          </p>

          <div className="mt-auto">
            <button
              onClick={handleFindSupportClick}
              className="w-full sm:w-auto px-8 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-semibold shadow-lg shadow-teal-200 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2"
            >
              <span>Find Support</span>
            </button>
          </div>
        </div>
      </div>
    </GlassCard>
  );
};

export default Support;
