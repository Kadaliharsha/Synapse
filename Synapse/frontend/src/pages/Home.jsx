import React, { useState, useEffect } from "react";
import Navbar from "../components/layout/NavBar";
import Carousel from "../components/common/Carousel";
import Meet from "../components/therapist/Meet";
import Footer from "../components/layout/Footer";
import API from "../api/api";
import Cookies from "js-cookie";
import image1 from "../assets/Img1.jpg";
import image2 from "../assets/Img2.jpg";
import image3 from "../assets/Img3.jpg";
import ImgCarousel from "../components/layout/ImageCarousel";
import TherapistHome from "../components/therapist/TherapistHome";

const Home = () => {
  const [user, setUser] = useState("");
  const [avatar, setAvatar] = useState("");
  const [role, setRole] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const images = [image1, image2, image3];

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    // Also check token to be sure? Login sets 'token'.
    const token = localStorage.getItem("token");

    if (storedUser && token) {
      try {
        const parsedUser = JSON.parse(storedUser);
        const userEmail = parsedUser.email;
        // roles could be array (Login.json) or string (if legacy). Login.jsx sets it as array `roles`.
        // Safety check:
        const userRole = Array.isArray(parsedUser.roles) ? parsedUser.roles[0] : parsedUser.role;

        if (userEmail && userRole) {
          setRole(userRole);
          setIsLoggedIn(true);

          const fetchUserDetails = async () => {
            // ... logic same as before ... 
            // reusing existing fetch logic structure
            try {
              const response =
                userRole === "USER"
                  ? await API.get(`/user/${userEmail}`)
                  : await API.get(`/therapist/${userEmail}`);

              if (response.status === 200) {
                setUser(response.data.name);
                setAvatar(response.data.profilePicture || "");
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
      } catch (e) {
        console.error("Error parsing user data", e);
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, []);

  let content;
  if (role === "USER") {
    content = (
      <>
        <Carousel />
        <Meet />
      </>
    );
  } else if (role === "THERAPIST") {
    content = (
      <>
        <ImgCarousel images={images} />
        <TherapistHome />
      </>
    );
  } else {
    content = (
      <>
        <Carousel />
        <Meet />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-blue-50 to-purple-50">
      <Navbar
        isLoggedIn={isLoggedIn}
        userName={user}
        avatar={avatar}
        role={role}
      />

      {loading ? (
        <div className="w-full">
          <div className="h-1.5 w-full bg-primary-100 overflow-hidden">
            <div className="animate-progress w-full h-full bg-gradient-to-r from-primary-500 to-secondary-500 origin-left-right"></div>
          </div>
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
              <div className="loading-dots mb-4">
                <div></div>
                <div></div>
                <div></div>
              </div>
              <p className="text-neutral-600 font-medium">Loading your wellness journey...</p>
            </div>
          </div>
        </div>
      ) : (
        <>
          {content}
          <Footer />
        </>
      )}
    </div>
  );
};

export default Home;
