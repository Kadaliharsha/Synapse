import React, { useState } from "react";
import Navbar from "../components/layout/NavBar";
import Footer from "../components/layout/Footer";
import { useAuth } from "../context/AuthContext";
import PendingAppointments from "../components/therapist/PendingAppointments";

const Appointment = () => {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="w-full max-w-md">
          <div className="h-1.5 w-full bg-emerald-100 overflow-hidden rounded-full">
            <div className="animate-progress w-full h-full bg-emerald-500 origin-left-right"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar
        isLoggedIn={isAuthenticated}
        userName={user?.name}
        avatar={user?.profilePicture || ""}
        role={user?.roles?.[0]}
      />

      <main className="flex-grow bg-gray-50 pb-12">
        <PendingAppointments />
      </main>

      <Footer />
    </div>
  );
};

export default Appointment;
