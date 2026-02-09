import React, { useState, useEffect } from "react";
import Navbar from "../components/layout/NavBar";
import Footer from "../components/layout/Footer";
import { useAuth } from "../context/AuthContext";
import SessionAppointments from "../components/therapist/SessionAppointments";
import { userService, therapistService } from "../services";

const Sessions = () => {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const [fullUserData, setFullUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      if (isAuthenticated && user?.email) {
        try {
          let data;
          if (user.roles?.includes("THERAPIST")) {
            data = await therapistService.getByEmail(user.email);
          } else {
            data = await userService.getProfile(user.email);
          }
          setFullUserData(data);
        } catch (error) {
          console.error("Error fetching user details:", error);
        } finally {
          setLoading(false);
        }
      } else if (!authLoading) {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [isAuthenticated, user, authLoading]);

  if (authLoading || loading) {
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
        userName={fullUserData?.name || user?.name}
        avatar={fullUserData?.profilePicture || ""}
        role={user?.roles?.[0]}
      />

      <main className="flex-grow bg-gray-50 pb-12">
        <SessionAppointments />
      </main>

      <Footer />
    </div>
  );
};

export default Sessions;
