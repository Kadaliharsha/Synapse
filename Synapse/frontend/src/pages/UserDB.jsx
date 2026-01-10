import React, { useState, useEffect } from "react";
import Navbar from "../components/layout/NavBar";
import Profile from "../components/profile/Profile";
import UserAnalysis from "../components/feedback/UserAnalysis";
import Footer from "../components/layout/Footer";
import Cookies from "js-cookie";
import API from "../api/api";
import { useNavigate } from "react-router-dom";
import UserAppointments from "../components/appointments/UserAppointments";

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

  return (
    <div>
      <Navbar
        isLoggedIn={isLoggedIn}
        userName={userData?.name || ""}
        avatar={userData?.profilePicture || ""}
      />
      {loading ? (
        <div className="w-full">
          <div className="h-1.5 w-full bg-pink-100 overflow-hidden">
            <div className="animate-progress w-full h-full bg-pink-500 origin-left-right"></div>
          </div>
        </div>
      ) : (
        <>
          {userData && <Profile userData={userData} />}
          <UserAnalysis />
          <UserAppointments />
          <Footer />
        </>
      )}
    </div>
  );
};

export default UserDB;
