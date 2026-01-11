import React from "react";
import { useNavigate } from "react-router-dom";
import GlassCard from "./GlassCard";
import { FaSmile, FaShieldAlt, FaBrain, FaUserMd, FaCalendarCheck } from "react-icons/fa";

const Assessment = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to track your mood.");
      navigate("/login?redirect=/feedBack");
      return;
    }
    navigate("/feedBack");
  };

  return (
    <GlassCard className="h-full !p-0 overflow-hidden group hover:ring-2 hover:ring-emerald-500/30 transition-all duration-500">
      <div className="flex flex-col lg:flex-row h-full">
        {/* Content Section */}
        <div className="lg:w-1/2 p-8 lg:p-10 flex flex-col relative z-10">
          <div className="absolute top-0 left-0 w-32 h-32 bg-emerald-400/10 rounded-full blur-3xl -z-10"></div>

          <h2 className="text-3xl font-display font-bold text-gray-800 mb-4 leading-tight">
            How are you feeling <span className="text-emerald-600">today?</span>
          </h2>

          <p className="text-gray-600 mb-8 leading-relaxed">
            Your emotional well-being matters. Check in with yourself and track your journey.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-auto">
            <button
              onClick={handleButtonClick}
              className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold shadow-lg shadow-emerald-200 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2 group/btn"
            >
              <FaSmile className="text-lg group-hover/btn:rotate-12 transition-transform" />
              <span>Share Mood</span>
            </button>
          </div>


        </div>

        {/* Visual/Icon Section */}
        <div className="lg:w-1/2 relative min-h-[250px] lg:min-h-full bg-gradient-to-br from-emerald-50 to-teal-50 overflow-hidden flex flex-col justify-center items-center p-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-emerald-200/40 via-transparent to-transparent"></div>

          <div className="w-24 h-24 bg-white rounded-2xl shadow-xl shadow-emerald-100 flex items-center justify-center mb-6 relative z-10 transform group-hover:-rotate-6 transition-transform duration-500">
            <FaBrain className="text-5xl text-emerald-500" />
          </div>

          <div className="space-y-4 text-center relative z-10">
            <div className="bg-white/60 backdrop-blur-md px-4 py-2 rounded-lg shadow-sm flex items-center gap-3 w-fit mx-auto">
              <FaUserMd className="text-teal-500" />
              <span className="text-sm font-medium text-gray-600">Quick Check-in</span>
            </div>
            <div className="bg-white/60 backdrop-blur-md px-4 py-2 rounded-lg shadow-sm flex items-center gap-3 w-fit mx-auto">
              <FaCalendarCheck className="text-teal-500" />
              <span className="text-sm font-medium text-gray-600">Private</span>
            </div>
          </div>
        </div>
      </div>
    </GlassCard>
  );
};

export default Assessment;
