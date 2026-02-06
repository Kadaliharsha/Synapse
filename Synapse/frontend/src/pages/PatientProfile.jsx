import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/layout/NavBar"; // Adjust based on location
import PatientDetail from "../components/therapist/patients/PatientDetail";

const PatientProfile = () => {
    // Get URL params: either /patients/:email
    const { email } = useParams();

    // Auth context (similar to MyPatients)
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
                setAvatar(parsedUser.profilePicture || "");
                setIsLoggedIn(true);
            } catch (e) {
                console.error("Error parsing user", e);
            }
        }
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar isLoggedIn={isLoggedIn} userName={user} role={role} avatar={avatar} />

            <main className="flex-grow container mx-auto px-4 py-8 mt-20">
                {therapistEmail ? (
                    <PatientDetail therapistEmail={therapistEmail} patientEmail={email} />
                ) : (
                    <div className="text-center py-20 text-gray-500">Loading user context...</div>
                )}
            </main>
        </div>
    );
};

export default PatientProfile;
