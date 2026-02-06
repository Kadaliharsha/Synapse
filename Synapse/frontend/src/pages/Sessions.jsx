import React, { useState, useEffect } from "react";
import API from "../api/api";
import Cookies from "js-cookie";
import Navbar from "../components/layout/NavBar";
import Footer from "../components/layout/Footer";
import { useNavigate } from "react-router-dom";
import SessionAppointments from "../components/therapist/SessionAppointments";

const Sessions = () => {
  const [user, setUser] = useState(""); // User name
  const [avatar, setAvatar] = useState(""); // Avatar URL
  const [role, setRole] = useState(""); // User role
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Login state
  const [loading, setLoading] = useState(true);
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

    if (storedEmail && storedRole) {
      setRole(storedRole);
      setIsLoggedIn(true);

      const fetchUserDetails = async () => {
        try {
          const response =
            storedRole === "USER"
              ? await API.get(`/user/${storedEmail}`)
              : await API.get(`/therapist/${storedEmail}`);

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
          <SessionAppointments />
          <Footer /> {/* Footer for all */}
        </>
      )}
    </>
  );
};

export default Sessions;
