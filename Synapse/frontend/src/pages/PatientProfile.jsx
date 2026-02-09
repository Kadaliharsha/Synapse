import React from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/layout/NavBar";
import PatientDetail from "../components/therapist/patients/PatientDetail";
import { useAuth } from "../context/AuthContext";

const PatientProfile = () => {
    const { email: patientEmail } = useParams();
    const { user, isAuthenticated, loading } = useAuth();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
            </div>
        );
    }

    if (!isAuthenticated) return null;

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar
                isLoggedIn={isAuthenticated}
                userName={user?.name}
                role={user?.roles?.[0]}
                avatar="" // TODO: Fetch full profile
            />

            <main className="flex-grow container mx-auto px-4 py-8 mt-20">
                {user?.email ? (
                    <PatientDetail therapistEmail={user.email} patientEmail={patientEmail} />
                ) : (
                    <div className="text-center py-20 text-gray-500">Loading user context...</div>
                )}
            </main>
        </div>
    );
};

export default PatientProfile;
