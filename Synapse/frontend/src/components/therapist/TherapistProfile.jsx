import React from "react";
import TherapistCard from "./TherapistCard";
import PersonalAppointments from "./PersonalAppointments";

const TherapistProfile = ({ userData }) => {
  return (
    <div className="flex gap-0 h-[700px]">
      <div className="mt-10 w-1/2 h-[600px] ml-[30px]">
        <TherapistCard therapistData={userData} />
      </div>
      <div className="mt-10 w-1/2 h-[600px] mr-[100px]">
        <PersonalAppointments therapistEmail={userData.email} />
      </div>
    </div>
  );
};

export default TherapistProfile;
