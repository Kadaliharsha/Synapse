import React, { useState, useEffect } from "react";
import Navbar from "../components/layout/NavBar";
import Profile from "../components/profile/Profile";
import UserAnalysis from "../components/feedback/UserAnalysis";
import Footer from "../components/layout/Footer";
import API from "../api/api";
import { useNavigate } from "react-router-dom";
import UserAppointments from "../components/appointments/UserAppointments";
import Image from "../assets/login_hero.png"; // Reusing the high-quality login background

const UserDB = () => {
  const [userData, setUserData] = useState(null); // Full user object from API
  const [localUser, setLocalUser] = useState(null); // Basic user info from localStorage
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setLocalUser(parsedUser);
      setIsLoggedIn(true);

      if (parsedUser.roles && parsedUser.roles.includes("THERAPIST")) {
        navigate("/403");
      }
    } else {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    if (localUser && localUser.email) {
      fetchUserDetails(localUser.email);
    } else {
      // Only set loading false if we've determined there is no user or handled the redirect
      if (!localStorage.getItem("user")) setLoading(false);
    }
  }, [localUser]);

  const fetchUserDetails = async (email) => {
    try {
      const response = await API.get(`/user/${email}`);
      console.log("User Details:", response.data);
      setUserData(response.data);
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 403) {
        navigate("/403"); // Redirect to forbidden if API denies access
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-emerald-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin"></div>
          <p className="text-emerald-800 font-medium animate-pulse">Loading generic dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen flex flex-col font-sans text-gray-800">
      {/* Background Image & Overlay */}
      <div
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${Image})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/90 via-white/80 to-emerald-50/90 backdrop-blur-sm"></div>
      </div>

      {/* Content Wrapper */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar
          isLoggedIn={isLoggedIn}
          userName={userData?.name || "User"}
          avatar={userData?.profilePicture || ""}
          role={localUser?.roles?.[0] || "USER"}
        />

        <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24 space-y-8">

          {/* Welcome Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 animate-fade-in-up">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Hello, <span className="text-emerald-700">{userData?.name?.split(' ')[0] || 'Friend'}</span> 👋
              </h1>
              <p className="text-gray-500 mt-1">Here's your wellness overview for today.</p>
            </div>
            <div className="text-right hidden md:block">
              <p className="text-sm font-semibold text-emerald-800 bg-emerald-100 px-4 py-2 rounded-full shadow-sm border border-emerald-200">
                {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
              </p>
            </div>
          </div>

          {/* Profile Section */}
          <section className="animate-fade-in-up delay-100">
            {userData && <Profile userData={userData} />}
          </section>

          {/* Analysis & Stats */}
          <section className="animate-fade-in-up delay-200">
            <UserAnalysis />
          </section>

          {/* Appointments */}
          <section className="animate-fade-in-up delay-300 mb-12">
            <UserAppointments />
          </section>
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default UserDB;
