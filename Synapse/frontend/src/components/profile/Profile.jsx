import React from "react";
import ProfileCardEdit from "./ProfileCardEdit";
import EmergencyContacts from "./EmergencyContacts";

const Profile = ({ userData }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Left Column: Editable Profile Card */}
      <div className="w-full h-full min-h-[500px]">
        <ProfileCardEdit userData={userData} />
      </div>

      {/* Right Column: Emergency Contacts */}
      <div className="w-full h-full min-h-[500px]">
        <EmergencyContacts />
      </div>
    </div>
  );
};

export default Profile;
