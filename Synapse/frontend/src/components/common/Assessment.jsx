import React from "react";
import { useNavigate } from "react-router-dom"; // Importing useNavigate
import mood from "../../assets/mood.png";

const Assement = () => {
  const navigate = useNavigate(); // Initializing useNavigate

  // Handle the button click to navigate to the feedback page
  const handleButtonClick = () => {
    navigate("/feedBack"); // Redirects to the feedback page
  };

  return (
    <div className="card card-hover overflow-hidden group">
      <div className="flex flex-col lg:flex-row h-full">
        {/* Image Section */}
        <div className="lg:w-1/2 relative overflow-hidden">
          <img
            src={mood}
            alt="Mood assessment illustration"
            className="w-full h-64 lg:h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>

        {/* Content Section */}
        <div className="lg:w-1/2 p-8 bg-gradient-to-br from-primary-500 to-secondary-600 text-white flex flex-col justify-center">
          <div className="text-center lg:text-left">
            <h2 className="text-3xl lg:text-4xl font-display font-bold mb-6 leading-tight">
              How are you feeling today?
            </h2>

            <p className="text-lg lg:text-xl mb-8 leading-relaxed opacity-90">
              Your emotional well-being matters. Take a moment to check in with yourself
              and let us provide the right support for your mental health journey.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                type="button"
                className="btn-accent group-hover:shadow-glow transition-all duration-300"
                onClick={handleButtonClick}
              >
                <span className="flex items-center space-x-2">
                  <span>💭</span>
                  <span>Share Your Mood</span>
                </span>
              </button>

              <div className="flex items-center justify-center space-x-4 text-sm opacity-80">
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  <span>Confidential</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  <span>Quick & Easy</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Assement;
