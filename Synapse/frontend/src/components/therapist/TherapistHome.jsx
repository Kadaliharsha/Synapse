import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import API from "../../api/api.js";
import { useNavigate } from "react-router-dom";
import image1 from "../../assets/THome1.jpg";
import image2 from "../../assets/THome2.jpeg";

const TherpistHome = () => {
  const [userName, setUserName] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const email = Cookies.get("email");
    if (email) {
      setIsLoggedIn(true);
      const handleUserName = async () => {
        try {
          const response = await API.get(`/therapist/${email}/name`);
          if (response.status === 200) {
            console.log(response);
            setUserName(response.data);
          } else {
            console.log("error");
          }
        } catch (err) {
          console.log(err);
        }
      };
      handleUserName();
    }
  });
  const navigate = useNavigate(); // Initializing useNavigate

  // Handle the button click to navigate to the feedback page
  const handleButtonClick = () => {
    navigate("/appointments"); // Redirects to the feedback page
  };
  const handleFindSupportClick = () => {
    navigate("/sessions");
  };

  return (
    <div className="w-[95%] mt-[20px] h-[1200px] bg-white text-left m-auto">
      <h1 className="pt-[30px] ml-[150px] text-6xl text-[#109948] font-medium">
        {" "}
        Welcome Dr.{isLoggedIn ? ` ${userName}` : ""}
      </h1>
      <div className="m-auto flex w-[80%] h-[550px] mt-10 drop-shadow-md">
        <div className="w-full md:w-1/2 h-1/2 md:h-full b">
          <img src={image1} alt="" className="w-[100%] h-[100%] object-cover" />
        </div>
        <div className="w-full md:w-1/2 h-1/2 md:h-full bg-gradient-to-r from-emerald-400 to-teal-300 text-center text-5xl relative">
          <h2 className="mt-[180px] text-[#f6f6f6] text-left ml-[65px]">
            Pending Appointments
          </h2>
          <p className="mt-[40px] text-[#f6f6f6] text-3xl text-left ml-[65px]">
            Check your pending appointments and take the necessary action.
          </p>
          <div className="ml-[68px] mt-[40px] w-[240px] h-[50px] text-white bg-[#109948] hover:bg-[#008055]">
            <button
              type="button"
              className="w-[100%] h-[50px] bg-[#1F1F1F] hover:bg-black text-white text-[18px] font-semibold"
              onClick={handleButtonClick} // Set the onClick handler
            >
              Check Appointments
            </button>
          </div>
        </div>
      </div>
      <div className="m-auto flex w-[80%] h-[500px] mt-10 drop-shadow-md bg-white">
        <div className="w-full md:w-1/2 h-1/2 md:h-full bg-white text-center">
          <h2 className="text-6xl mt-[160px] m-auto ml-[45px] text-left ">
            Your Accepted Sessions
          </h2>
          <p className=" text-3xl ml-[33px] text-rigth m-auto mt-[30px] text-[#d3d3d3]">
            Manage your upcoming sessions and provide support.
          </p>
          <div className="  ml-[47px] mt-[40px] w-[200px] h-[50px]  text-white bg-[#109948] hover:bg-[#008055]">
            <button
              type="submit"
              className="w-[100%] h-[50px]  hover:bg-[#109948] bg-[#008055] rounded-[8px] text-white text-[18px] font-semibold"
              onClick={handleFindSupportClick}
            >
              Accepted Sessions
            </button>
          </div>
        </div>
        <div className="w-full md:w-1/2 h-1/2 md:h-full ">
          <img src={image2} alt="" className="w-[100%] h-[100%] object-cover" />
        </div>
      </div>
    </div>
  );
};

export default TherpistHome;
