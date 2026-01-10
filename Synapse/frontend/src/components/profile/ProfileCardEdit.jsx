import React, { useState, useEffect } from "react";
import Input from "../common/Input";
import GlassCard from "../common/GlassCard";
import API from "../../api/api";
import image from "../../assets/download.png";
import { FaCamera, FaCheck, FaTimes, FaPencilAlt } from "react-icons/fa"; // Assuming you have react-icons installed or use text

const Card = ({ userData }) => {
  const [name, setName] = useState(userData.name);
  const [age, setAge] = useState(userData.age);
  const [email] = useState(userData.email);
  const [gender, setGender] = useState(userData.gender);
  const [uploadedImage, setUploadedImage] = useState(userData.profilePicture);
  const [isEditPicture, setIsEditPicture] = useState(false);

  useEffect(() => {
    if (userData.profilePicture) {
      setUploadedImage(userData.profilePicture);
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
      }
    } catch (error) {
      console.error(`Failed to update ${field}:`, error);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "photos");

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dwcqn9ilb/image/upload",
        { method: "POST", body: data }
      );

      if (response.ok) {
        const result = await response.json();
        setUploadedImage(result.url);

        await API.put(`user/${email}`, {
          profilePicture: result.url,
        });
        setIsEditPicture(false);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <GlassCard className="h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-gray-800">Personal Info</h3>
        <button className="text-emerald-600 hover:text-emerald-700 text-sm font-medium transition-colors">Edit</button>
      </div>

      <div className="flex flex-col items-center mb-8">
        <div
          className="relative group cursor-pointer"
          onClick={() => setIsEditPicture(true)}
        >
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg transition-transform transform group-hover:scale-105">
            <img
              src={uploadedImage || image}
              alt="Profile"
              className="object-cover w-full h-full"
            />
          </div>
          <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <FaCamera className="text-white text-xl" />
          </div>
        </div>
        {isEditPicture && (
          <div className="mt-4 p-4 bg-white/50 backdrop-blur-md rounded-xl border border-white/40 animate-fade-in w-full max-w-xs">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-xs file:font-semibold
                  file:bg-emerald-50 file:text-emerald-700
                  hover:file:bg-emerald-100
                  cursor-pointer"
            />
            <div className="flex justify-end gap-2 mt-3">
              <button onClick={() => setIsEditPicture(false)} className="text-xs text-gray-500 hover:text-gray-700">Cancel</button>
            </div>
          </div>
        )}
      </div>

      <div className="space-y-5 flex-grow">
        <Input
          label="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onSave={() => handleSave("name", name)}
          className="bg-white/50" // Example prop to potential Input component if it accepts className
        />
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            onSave={() => handleSave("age", age)}
          />
          <Input
            label="Gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            onSave={() => handleSave("gender", gender)}
          />
        </div>

        <Input
          label="Email Address"
          value={email}
          onChange={() => { }}
          onSave={() => { }}
          disabled={true}
        />
      </div>
    </GlassCard>
  );
};

export default Card;
