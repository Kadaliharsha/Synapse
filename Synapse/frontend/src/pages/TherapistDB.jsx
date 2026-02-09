import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Navbar from "../components/layout/NavBar";
import Footer from "../components/layout/Footer";
import { useAuth } from "../context/AuthContext";
import { therapistService, userService } from "../services";

import TherapistProfile from "../components/therapist/TherapistProfile";
import FeedbackAnalysis from "../components/feedback/FeedbackAnalysis";
import AvailabilityManager from "../components/therapist/AvailabilityManager";

const TherapistDB = () => {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const [therapistData, setTherapistData] = useState(null);
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      // If auth is done loading and we have a user
      if (isAuthenticated && user?.email) {
        try {
          // Check role to determine which service to call (though this page should be protected for THERAPIST role)
          let data;
          if (user.roles?.includes("THERAPIST")) {
            data = await therapistService.getByEmail(user.email);
          } else {
            // Fallback or redirect if user accessed purely by URL without protection (though protected route handles this)
            data = await userService.getProfile(user.email);
          }
          setTherapistData(data);
        } catch (error) {
          console.error("Error fetching therapist profile:", error);
        } finally {
          setPageLoading(false);
        }
      } else if (!authLoading) {
        // Auth finished but no user (or failed)
        setPageLoading(false);
      }
    };

    loadData();
  }, [isAuthenticated, user, authLoading]);

  // Combined loading state
  if (authLoading || pageLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="w-full max-w-md">
          <div className="h-1.5 w-full bg-emerald-100 overflow-hidden rounded-full">
            <div className="animate-progress w-full h-full bg-emerald-500 origin-left-right"></div>
          </div>
          <p className="text-center text-emerald-600 mt-2 font-medium">Loading therapist dashboard...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) return null;

  return (
    <>
      <Navbar
        isLoggedIn={isAuthenticated}
        userName={therapistData?.name || user?.name}
        avatar={therapistData?.profilePicture || ""}
        role={user?.roles?.[0]}
      />

      {therapistData ? (
        <>
          <TherapistProfile userData={therapistData} />

          {therapistData.id && (
            <div className="w-[90%] mx-auto mt-10 mb-10">
              <AvailabilityManager therapistId={therapistData.id} />
            </div>
          )}

          <FeedbackAnalysis />
        </>
      ) : (
        <div className="min-h-[50vh] flex items-center justify-center">
          <p className="text-gray-500">No therapist data available. Please complete your profile.</p>
        </div>
      )}

      <Footer />
    </>
  );
};

export default TherapistDB;
