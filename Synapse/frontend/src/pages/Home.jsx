import React, { useState, useEffect } from "react";
import Navbar from "../components/layout/NavBar";
import Meet from "../components/therapist/Meet";
import Footer from "../components/layout/Footer";
import API from "../api/api";
import ImgCarousel from "../components/layout/ImageCarousel";
import TherapistHome from "../components/therapist/TherapistHome";
import Assessment from "../components/common/Assessment";
import Support from "../components/common/Support";

// Assets
import home1 from "../assets/home1.jpg";
import home2 from "../assets/Home2.jpg";
import home3 from "../assets/Home3.jpg";
import home4 from "../assets/Home4.jpg";

const Home = () => {
  const [user, setUser] = useState("");
  const [avatar, setAvatar] = useState("");
  const [role, setRole] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  const heroImages = [home1, home2, home3, home4];

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (storedUser && token) {
      try {
        const parsedUser = JSON.parse(storedUser);
        const userEmail = parsedUser.email;
        const userRole = Array.isArray(parsedUser.roles) ? parsedUser.roles[0] : parsedUser.role;

        if (userEmail && userRole) {
          setRole(userRole);
          setIsLoggedIn(true);

          const fetchUserDetails = async () => {
            try {
              const response =
                userRole === "USER"
                  ? await API.get(`/user/${userEmail}`)
                  : await API.get(`/therapist/${userEmail}`);

              if (response.status === 200) {
                setUser(response.data.name);
                setAvatar(response.data.profilePicture || "");
              }
            } catch (error) {
              console.error("Error fetching user details:", error);
            } finally {
              setLoading(false);
            }
          };
          fetchUserDetails();
        } else {
          setLoading(false);
        }
      } catch (e) {
        console.error("Error parsing user data", e);
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin"></div>
          <p className="text-emerald-800 font-medium animate-pulse">Loading Synapse...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800 flex flex-col">
      <Navbar
        isLoggedIn={isLoggedIn}
        userName={user}
        avatar={avatar}
        role={role}
      />

      <main className="flex-grow pt-24">
        {/* Hero Headline - Moved outside Carousel */}
        {!isLoggedIn && (
          <div className="text-center max-w-4xl mx-auto px-4 mb-4 animate-fade-in-up">
            <h1 className="text-xl md:text-3xl font-display font-bold text-gray-900 mb-3 leading-tight">
              Your Holistic Ecosystem for <span className="text-emerald-600 block sm:inline">Mental Wellness</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto font-medium leading-relaxed">
              Combine professional therapy with intelligent mood tracking and curated self-care resources.
            </p>
          </div>
        )}

        {/* Hero Section */}
        <div className="relative mb-16 px-4 sm:px-6 lg:px-8">
          <ImgCarousel images={heroImages} />
        </div>

        {/* User Content */}
        {role !== "THERAPIST" && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 pb-20">

            {/* Welcome Message */}
            {isLoggedIn && (
              <div className="text-center max-w-3xl mx-auto animate-fade-in-up">
                <h1 className="text-lg md:text-2xl font-display font-bold mb-4 text-gray-900">
                  Welcome back, <span className="text-emerald-600">{user.split(' ')[0]}</span>
                </h1>
                <p className="text-lg text-gray-500">
                  How are you feeling today? Take a moment to check in with yourself.
                </p>
              </div>
            )}

            {/* Assessment & Support Grid */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="animate-slide-up hover:transform hover:-translate-y-1 transition-transform duration-300">
                <Assessment />
              </div>
              <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
                <Support />
              </div>
            </div>

            {/* Therapists Section */}
            <div id="meet-therapists">
              <Meet />
            </div>
          </div>
        )}

        {/* Therapist Content */}
        {role === "THERAPIST" && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <TherapistHome />
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Home;
