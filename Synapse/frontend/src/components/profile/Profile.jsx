import React from "react";
import ProfileCardEdit from "./ProfileCardEdit";
import EmergencyContacts from "./EmergencyContacts";

const Profile = ({ userData }) => {
  return (
    <div className="flex gap-0">
      <div className="mt-10 w-1/2 h-[600px] ml-[30px]">
        <ProfileCardEdit userData={userData} />
      </div>
      <div className="mt-10 w-1/2 h-[600px] mr-[100px]">
        <EmergencyContacts />
      </div>
    </div>
  );
};

export default Profile;
