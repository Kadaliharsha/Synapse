import React, { useState, useEffect } from "react";
import API from "../api/api";
import Cookies from "js-cookie";
import Navbar from "../components/layout/NavBar";
import Footer from "../components/layout/Footer";
import { useNavigate } from "react-router-dom";

import TherapistProfile from "../components/therapist/TherapistProfile";
import FeedbackAnalysis from "../components/feedback/FeedbackAnalysis";
import AvailabilityManager from "../components/therapist/AvailabilityManager";
const TherapistDB = () => {
  const [user, setUser] = useState(""); // User name
  const [avatar, setAvatar] = useState(""); // Avatar URL
  const [role, setRole] = useState(""); // User role
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Login state
  const [loading, setLoading] = useState(true);
  const [therapistData, setTherapistData] = useState({});
  const userStr = localStorage.getItem("user");
  const parsedUser = userStr ? JSON.parse(userStr) : {};
  const userEmail = parsedUser.email;
  const userRole = parsedUser.roles ? parsedUser.roles[0] : null;
  const navigate = useNavigate();

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    let storedEmail = null;
    let storedRole = null;

    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        storedEmail = user.email;
        storedRole = user.roles && user.roles[0];
      } catch (e) {
        console.error(e);
      }
    }

    if (!storedEmail || storedRole === "USER") {
      navigate("/403");
    }
  }, [navigate]);
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
          {therapistData.id && (
            <div className="w-[90%] mx-auto mt-10 mb-10">
              <AvailabilityManager therapistId={therapistData.id} />
            </div>
          )}
          <FeedbackAnalysis />

          <Footer />
        </>
      )}
    </>
  );
};

export default TherapistDB;
