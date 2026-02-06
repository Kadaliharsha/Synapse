import React, { useEffect, useState } from "react";
import Navbar from "../components/layout/NavBar"; // Adjust
import PatientList from "../components/therapist/patients/PatientList";
import API from "../api/api";

const MyPatients = () => {
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [avatar, setAvatar] = useState("");
    const [therapistEmail, setTherapistEmail] = useState(null);

    useEffect(() => {
        const userStr = localStorage.getItem("user");
        if (userStr) {
            try {
                const parsedUser = JSON.parse(userStr);
                setTherapistEmail(parsedUser.email);
                setUser(parsedUser.name);
                setRole(parsedUser.roles ? parsedUser.roles[0] : "THERAPIST");
                setAvatar(parsedUser.profilePicture || ""); // Fallback if not in local storage, might need fetch
                setIsLoggedIn(true);
            } catch (e) {
                console.error("Error parsing user", e);
            }
        }
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar isLoggedIn={isLoggedIn} userName={user} role={role} avatar={avatar} />

            <main className="flex-grow container mx-auto px-4 py-8 mt-20 max-w-[1400px]">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Patient Management</h1>
                    <p className="text-gray-500">View and manage your patient records.</p>
                </div>

                {therapistEmail ? (
                    <PatientList therapistEmail={therapistEmail} />
                ) : (
                    <div className="text-center py-20 text-gray-500">
                        Please log in as a therapist to view this page.
                    </div>
                )}
            </main>
        </div>
    );
};

export default MyPatients;
