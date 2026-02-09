import React from "react";
import Navbar from "../components/layout/NavBar"; // Adjust
import PatientList from "../components/therapist/patients/PatientList";
import { useAuth } from "../context/AuthContext";

const MyPatients = () => {
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
                avatar="" // TODO: Fetch full profile if avatar needed
            />

            <main className="flex-grow container mx-auto px-4 py-8 mt-20 max-w-[1400px]">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Patient Management</h1>
                    <p className="text-gray-500">View and manage your patient records.</p>
                </div>

                {user?.email && (
                    <PatientList therapistEmail={user.email} />
                )}
            </main>
        </div>
    );
};

export default MyPatients;
