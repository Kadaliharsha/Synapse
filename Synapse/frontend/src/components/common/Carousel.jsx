import React, { useEffect, useState } from "react";
import home1 from "../../assets/home1.jpg";
import home2 from "../../assets/Home2.jpg";
import home3 from "../../assets/Home3.jpg";
import home4 from "../../assets/Home4.jpg";

import Assement from "./Assessment";
import Support from "./Support";
import API from "../../api/api"; // Assuming you have a configured API instance
import Cookies from "js-cookie"; // For handling cookies (if needed for login status)
import ImgCarousel from "../layout/ImageCarousel";

export default function Carsoule() {
  const [userName, setUserName] = useState(""); // State to store username
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const images = [home1, home2, home3, home4];

  useEffect(() => {
    const email = Cookies.get("email"); // Checking login status through cookies (or use sessionStorage if preferred)

    if (email) {
      setIsLoggedIn(true);
      // Fetch user details from the backend
      const fetchUserName = async () => {
        try {
          const response = await API.get(`/user/${email}`); // Fetch user details using email
          if (response.status === 200) {
            setUserName(response.data.name); // Assuming `name` is returned in the response
          } else {
            console.error("Failed to fetch user details");
          }
        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      };

      fetchUserName();
    }
  }, []);

  return (
    <div className="relative">
      <ImgCarousel images={images} />
      <div className="relative bg-gradient-to-br from-white via-blue-50 to-purple-50 min-h-screen">
        <div className="container mx-auto px-6 py-16">
          <div className="text-center max-w-4xl mx-auto animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">
              <span className="gradient-text">
                Hello{isLoggedIn ? `, ${userName}` : ""}!
              </span>
            </h1>
            <h2 className="text-2xl md:text-3xl font-medium text-neutral-700 mb-8">
              How are you feeling today?
            </h2>
            <p className="text-lg text-neutral-600 mb-12 max-w-2xl mx-auto leading-relaxed">
              Take a moment to check in with yourself. Your mental wellness matters,
              and we're here to support you on your journey to emotional well-being.
            </p>

            <div className="flex flex-col md:flex-row gap-6 justify-center items-center mb-16">
              <div className="flex items-center space-x-2 text-success-600">
                <div className="w-3 h-3 bg-success-500 rounded-full animate-pulse"></div>
                <span className="font-medium">Safe & Confidential</span>
              </div>
              <div className="flex items-center space-x-2 text-primary-600">
                <div className="w-3 h-3 bg-primary-500 rounded-full animate-pulse"></div>
                <span className="font-medium">Professional Support</span>
              </div>
              <div className="flex items-center space-x-2 text-secondary-600">
                <div className="w-3 h-3 bg-secondary-500 rounded-full animate-pulse"></div>
                <span className="font-medium">24/7 Available</span>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <div className="animate-slide-up">
              <Assement />
            </div>
            <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <Support />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
