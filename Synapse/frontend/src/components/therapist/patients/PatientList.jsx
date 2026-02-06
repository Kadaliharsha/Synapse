import React, { useState, useEffect } from "react";
import { Search, User, Calendar, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import API from "../../../api/api"; // Adjust import based on location

const PatientList = ({ therapistEmail }) => {
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        if (therapistEmail) {
            fetchPatients();
        }
    }, [therapistEmail]);

    // Mock Data for fallback/demo
    const mockPatients = [
        { name: "Alex Doe", email: "alex.doe@example.com", status: "Active", totalSessions: 12, lastSessionDate: "2024-10-01" },
        { name: "Sarah Smith", email: "sarah.s@example.com", status: "Inactive", totalSessions: 4, lastSessionDate: "2024-08-15" },
        { name: "John Weaver", email: "john.w@example.com", status: "Active", totalSessions: 8, lastSessionDate: "2024-09-22" },
    ];

    const fetchPatients = async () => {
        try {
            setLoading(true);
            const response = await API.get(`/therapist/${therapistEmail}/patients`);
            if (response.status === 200 && response.data.length > 0) {
                setPatients(response.data);
            } else {
                // Return mock data if API returns empty list (for demo)
                console.log("No patients found from API, using mock data.");
                setPatients(mockPatients);
            }
        } catch (error) {
            console.error("Error fetching patients:", error);
            // Fallback to mock data on error
            setPatients(mockPatients);
        } finally {
            setLoading(false);
        }
    };

    const filteredPatients = patients.filter(
        (p) =>
            p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return (
            <div className="p-8 text-center text-gray-500">
                <div className="animate-pulse">Loading patients...</div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Header & Search */}
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                <div>
                    <h3 className="text-xl font-bold text-gray-800">My Patients</h3>
                    <p className="text-sm text-gray-500">Manage your patient records and history.</p>
                </div>
                <div className="relative w-64">
                    <Search className="absolute left-3 top-3 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search patients..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                    />
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 text-gray-500 text-sm uppercase tracking-wide font-medium">
                        <tr>
                            <th className="px-6 py-4">Patient Name</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4 text-center">Total Sessions</th>
                            <th className="px-6 py-4">Last Visit</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {filteredPatients.length > 0 ? (
                            filteredPatients.map((patient, index) => (
                                <tr
                                    key={index}
                                    className="hover:bg-gray-50/80 transition-colors group"
                                >
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center font-bold">
                                                {patient.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-bold text-gray-800">{patient.name}</p>
                                                <p className="text-xs text-gray-500">{patient.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-medium border ${patient.status === "Active"
                                                ? "bg-green-50 text-green-700 border-green-200"
                                                : "bg-gray-50 text-gray-600 border-gray-200"
                                                }`}
                                        >
                                            {patient.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-center font-mono text-gray-600">
                                        {patient.totalSessions}
                                    </td>
                                    <td className="px-6 py-4 text-gray-600 flex items-center gap-2">
                                        <Calendar size={14} className="text-gray-400" /> {patient.lastSessionDate}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <Link to={`/patients/${patient.email}`} className="text-emerald-600 hover:text-emerald-800 font-medium text-sm flex items-center gap-1 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                                            View Details <ExternalLink size={14} />
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="px-6 py-12 text-center text-gray-400">
                                    <User size={48} className="mx-auto mb-3 opacity-20" />
                                    <p>No patients found matching your search.</p>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PatientList;
