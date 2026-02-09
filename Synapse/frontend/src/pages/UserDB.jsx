import React, { useState, useEffect } from "react";
import Navbar from "../components/layout/NavBar";
import Profile from "../components/profile/Profile";
import UserAnalysis from "../components/feedback/UserAnalysis";
import Footer from "../components/layout/Footer";
import { userService } from "../services";
import { useAuth } from "../context/AuthContext";
import UserAppointments from "../components/appointments/UserAppointments";
import Image from "../assets/login_hero.png";

const UserDB = () => {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const [userData, setUserData] = useState(null);
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      if (isAuthenticated && user?.email) {
        try {
          const data = await userService.getProfile(user.email);
          setUserData(data);
        } catch (error) {
          console.error("Error fetching user profile:", error);
        } finally {
          setPageLoading(false);
        }
      } else if (!authLoading) {
        setPageLoading(false);
      }
    };

    loadData();
  }, [isAuthenticated, user, authLoading]);

  // Combined loading state
  if (authLoading || pageLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-emerald-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin"></div>
          <p className="text-emerald-800 font-medium animate-pulse">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // If we're not authenticated after loading (should be handled by ProtectedRoute but good safety)
  if (!isAuthenticated) return null;

  return (
    <div className="relative min-h-screen flex flex-col font-sans text-gray-800">
      <div
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${Image})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/90 via-white/80 to-emerald-50/90 backdrop-blur-sm"></div>
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar
          isLoggedIn={isAuthenticated}
          userName={userData?.name || user?.name || "User"}
          avatar={userData?.profilePicture || ""}
          role="USER"
        />

        <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24 space-y-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 animate-fade-in-up">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Hello, <span className="text-emerald-700">{userData?.name?.split(' ')[0] || user?.name?.split(' ')[0] || 'Friend'}</span> 👋
              </h1>
              <p className="text-gray-500 mt-1">Here's your wellness overview for today.</p>
            </div>
            <div className="text-right hidden md:block">
              <p className="text-sm font-semibold text-emerald-800 bg-emerald-100 px-4 py-2 rounded-full shadow-sm border border-emerald-200">
                {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
              </p>
            </div>
          </div>

          <section className="animate-fade-in-up delay-100">
            {userData && <Profile userData={userData} />}
          </section>

          <section className="animate-fade-in-up delay-200">
            <UserAnalysis />
          </section>

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
