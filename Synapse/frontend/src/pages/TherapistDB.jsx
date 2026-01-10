import React, { useState, useEffect } from "react";
import API from "../api/api";
import Cookies from "js-cookie";
import Navbar from "../components/layout/NavBar";
import Footer from "../components/layout/Footer";
import { useNavigate } from "react-router-dom";

import TherapistProfile from "../components/therapist/TherapistProfile";
import FeedbackAnalysis from "../components/feedback/FeedbackAnalysis";
const TherapistDB = () => {
  const [user, setUser] = useState(""); // User name
  const [avatar, setAvatar] = useState(""); // Avatar URL
  const [role, setRole] = useState(""); // User role
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Login state
  const [loading, setLoading] = useState(true);
  const [therapistData, setTherapistData] = useState({});
  const userEmail = Cookies.get("email");
  const userRole = Cookies.get("role");
  const navigate = useNavigate();

  useEffect(() => {
    if (!userEmail || userRole == "USER") {
      navigate("/403");
    }
  }, [userEmail, navigate]);
  useEffect(() => {
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
            setAvatar(response.data.profilePicture || "");
            setTherapistData(response.data);
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
  }, []);
  return (
    <>
      <Navbar
        isLoggedIn={isLoggedIn}
        userName={user}
        avatar={avatar}
        role={role}
      />
      {loading ? (
        <div className="w-full">
          <div className="h-1.5 w-full bg-pink-100 overflow-hidden">
            <div className="animate-progress w-full h-full bg-pink-500 origin-left-right"></div>
          </div>
        </div>
      ) : (
        <>
          {therapistData && <TherapistProfile userData={therapistData} />}
          <FeedbackAnalysis />

          <Footer />
        </>
      )}
    </>
  );
};

export default TherapistDB;
