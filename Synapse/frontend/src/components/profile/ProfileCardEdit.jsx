import React, { useState, useEffect } from "react";
import Input from "../common/Input";
import API from "../../api/api";
import image from "../../assets/download.png";

const Card = ({ userData }) => {
  const [name, setName] = useState(userData.name);
  const [age, setAge] = useState(userData.age);
  const [email] = useState(userData.email);
  const [gender, setGender] = useState(userData.gender);
  const [isPicture, setIsPicture] = useState(Boolean(userData.profilePicture));
  const [uploadedImage, setUploadedImage] = useState(userData.profilePicture);
  const [isEditPicture, setIsEditPicture] = useState(false);

  useEffect(() => {
    // If userData has a profile picture, set it
    if (userData.profilePicture) {
      setUploadedImage(userData.profilePicture);
      setIsPicture(true);
    }
  }, [userData]);

  const handleSave = async (field, value) => {
    try {
      const updatedData = {
        ...userData,
        [field]: value,
      };

      const response = await API.put(`/user/${email}`, updatedData);

      if (response.status === 200) {
        if (field === "name") setName(value);
        if (field === "age") setAge(value);
        if (field === "gender") setGender(value);
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

        // Only update the profile picture, not age or other fields
        const response2 = await API.put(`user/${email}`, {
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
    <div className="bg-white rounded-2xl shadow-soft border border-neutral-100 p-8 h-full">
      <h3 className="text-2xl font-bold text-neutral-800 mb-6 text-center">Personal Information</h3>

      <div className="flex flex-col items-center mb-8 relative group">
        <div
          className="w-32 h-32 rounded-full overflow-hidden ring-4 ring-primary-50 cursor-pointer shadow-md group-hover:ring-primary-100 transition-all duration-300 relative"
          onClick={() => setIsEditPicture(true)}
        >
          <img
            src={
              uploadedImage
                ? `${uploadedImage}?t=${Date.now()}`
                : image
            }
            alt="Profile"
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="text-white text-xs font-medium">Change Photo</span>
          </div>
        </div>
      </div>

      {isEditPicture && (
        <div className="mb-6 p-4 bg-neutral-50 rounded-xl border border-neutral-200 animate-slide-down">
          <div className="flex flex-col gap-3">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100 text-sm text-neutral-500"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setIsEditPicture(false);
                  setUploadedImage(userData.profilePicture);
                }}
                className="px-3 py-1 text-sm text-neutral-600 hover:text-neutral-800 font-medium"
              >
                Cancel
              </button>
              <button
                onClick={() => setIsEditPicture(false)}
                className="px-3 py-1 text-sm bg-primary-600 text-white rounded-lg hover:bg-primary-700 font-medium"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-4">
        <Input
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onSave={() => handleSave("name", name)}
        />
        <Input
          label="Age"
          value={age}
          onChange={(e) => {
            const newAge = e.target.value;
            setAge(newAge);
          }}
          onSave={() => handleSave("age", age)}
        />
        <Input
          label="Email"
          value={email}
          onChange={() => { }}
          onSave={() => { }}
          disabled={true}
        />
        <Input
          label="Gender"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          onSave={() => handleSave("gender", gender)}
        />
      </div>
    </div>
  );
};

export default Card;
