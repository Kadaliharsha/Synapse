import React, { useState, useEffect } from "react";
import Input from "../common/Input";
import API from "../../api/api";
import image from "../../assets/download.png";

const TherapistCard = ({ therapistData }) => {
  const [name, setName] = useState(therapistData.name);
  const [email] = useState(therapistData.email);
  const [specialization, setSpecialization] = useState(
    therapistData.specialization
  );
  const [licenceNo, setLicenceNo] = useState(therapistData.licenceNo);
  const [isPicture, setIsPicture] = useState(
    Boolean(therapistData.profilePicture)
  );
  const [uploadedImage, setUploadedImage] = useState(
    therapistData.profilePicture
  );
  const [isEditPicture, setIsEditPicture] = useState(false);

  useEffect(() => {
    if (therapistData.profilePicture) {
      setUploadedImage(therapistData.profilePicture);
      setIsPicture(true);
    }
  }, [therapistData]);

  const handleSave = async (field, value) => {
    try {
      const updatedData = {
        ...therapistData,
        [field]: value,
      };

      const response = await API.put(`/therapist/${email}`, updatedData);

      if (response.status === 200) {
        if (field === "name") setName(value);
        if (field === "specialization") setSpecialization(value);
        if (field === "licenceNo") setLicenceNo(value);
      } else {
        throw new Error("Unexpected response status");
      }
    } catch (error) {
      console.error(`Failed to update ${field}:`, error);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "photos");

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dwcqn9ilb/image/upload",
        {
          method: "POST",
          body: data,
        }
      );

      if (response.ok) {
        const result = await response.json();
        console.log(result);
        setUploadedImage(result.url);

        const response2 = await API.put(`/therapist/${email}`, {
          profilePicture: result.url,
        });

        if (response2.status === 200) {
          setIsPicture(true);
        }
      } else {
        throw new Error("Image upload failed");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div className="ml-[60px] w-[80%] h-[100%] bg-white drop-shadow-md rounded-md pt-10">
      <div
        className="bg-fuchsia-900 w-[200px] h-[200px] rounded-full flex items-center justify-center overflow-hidden m-auto mt-4 cursor-pointer mb-5"
        onClick={() => setIsEditPicture(true)}
      >
        <img
          src={uploadedImage ? `${uploadedImage}?t=${Date.now()}` : image}
          alt="Profile"
          className="object-cover w-full h-full"
        />
      </div>

      {isEditPicture && (
        <div className="mt-2 flex justify-center mb-2">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="bg-white p-2 rounded cursor-pointer"
          />
          <button
            onClick={() => setIsEditPicture(false)}
            className="ml-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-800"
          >
            Done
          </button>
          <button
            onClick={() => {
              setIsEditPicture(false);
              setUploadedImage(therapistData.profilePicture);
            }}
            className="ml-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-800"
          >
            Cancel
          </button>
        </div>
      )}

      <Input
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        onSave={() => handleSave("name", name)}
      />
      <Input
        label="Specialization"
        value={specialization}
        onChange={(e) => setSpecialization(e.target.value)}
        onSave={() => handleSave("specialization", specialization)}
      />
      <Input
        label="Licence No"
        value={licenceNo}
        onChange={(e) => setLicenceNo(e.target.value)}
        onSave={() => handleSave("licenceNo", licenceNo)}
      />
      <Input
        label="Email"
        value={email}
        onChange={() => { }}
        onSave={() => { }}
      />
    </div>
  );
};

export default TherapistCard;
