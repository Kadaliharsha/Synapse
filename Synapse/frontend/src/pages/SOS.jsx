import React, { useState, useEffect } from "react";
import Navbar from "../components/layout/NavBar";
import SOSButton from "../components/common/SOSButton";
import EMSupport from "../components/common/EMSupport";
import Footer from "../components/layout/Footer";
import Cookies from "js-cookie";
import API from "../api/api";

const SOS = () => {
  const [user, setUser] = useState(""); // User name
  const [avatar, setAvatar] = useState(""); // Avatar URL
  const [role, setRole] = useState(""); // User role
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Login state
  const [loading, setLoading] = useState(true); // Loading state to handle async calls

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    let userEmail = null;
    let userRole = null;

    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        userEmail = user.email;
        userRole = user.roles && user.roles[0];
      } catch (e) {
        console.error(e);
      }
    }

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
            setUser(response.data.name); // Set the user name
            setAvatar(response.data.profilePicture || ""); // Set the avatar or fallback
          }
        } catch (error) {
          console.error("Error fetching user details:", error);
        } finally {
          setLoading(false); // Set loading to false once data is fetched
        }
      };

      fetchUserDetails();
    } else {
      setLoading(false); // If no email or role in cookies, stop loading
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-red-50 to-orange-50">
      <Navbar
        isLoggedIn={isLoggedIn}
        userName={user}
        avatar={avatar}
        role={role}
      />

      {loading ? (
        <div className="w-full">
          <div className="h-1.5 w-full bg-error-100 overflow-hidden">
            <div className="animate-progress w-full h-full bg-gradient-to-r from-error-500 to-warning-500 origin-left-right"></div>
          </div>
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
              <div className="loading-dots mb-4">
                <div></div>
                <div></div>
                <div></div>
              </div>
              <p className="text-neutral-600 font-medium">Loading emergency support...</p>
            </div>
          </div>
        </div>
      ) : (
        <>
          <SOSButton />
          <EMSupport />
          <Footer />
        </>
      )}
    </div>
  );
};

export default SOS;
