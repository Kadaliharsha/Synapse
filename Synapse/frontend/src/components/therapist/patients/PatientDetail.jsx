import React, { useState, useEffect } from "react";
import { User, Calendar, Clock, FileText, ChevronLeft, Flag } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../../api/api"; // Adjust import based on location
import SOAPNoteEditor from "./SOAPNoteEditor";

const PatientDetail = ({ therapistEmail, patientEmail: propPatientEmail }) => {
    const { email: paramPatientEmail } = useParams();
    const patientEmail = propPatientEmail || paramPatientEmail;
    const navigate = useNavigate();

    const [patient, setPatient] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (therapistEmail && patientEmail) {
            fetchPatientDetails();
        } else {
            // Fallback for demo if no props/params
            setLoading(false);
        }
    }, [therapistEmail, patientEmail]);

    const fetchPatientDetails = async () => {
        try {
            setLoading(true);
            const response = await API.get(
                `/therapist/${therapistEmail}/patient/${patientEmail}`
            );
            if (response.status === 200) {
                setPatient(response.data);
            }
        } catch (err) {
            console.error("Error fetching patient details:", err);
            // Determine if we should show mock data?
            // User requested fallback.
            setError("Failed to fetch data. Showing offline/mock view.");
        } finally {
            setLoading(false);
        }
    };

    // Mock Data
    const mockPatient = {
        name: "Alex Doe (Mock)",
        email: patientEmail || "alex.doe@example.com",
        status: "Active",
        totalSessions: 12,
        nextSession: "2024-10-15",
        appointmentHistory: [
            {
                id: "m1",
                date: "2024-10-01",
                time: "10:00 AM",
                status: "Accepted",
                message: "Feeling anxious about work.",
            },
            {
                id: "m2",
                date: "2024-09-15",
                time: "10:00 AM",
                status: "Completed",
                message: "Follow up on sleep patterns.",
            },
            {
                id: "m3",
                date: "2024-09-01",
                time: "02:00 PM",
                status: "Completed",
                message: "Initial consultation.",
            },
        ],
    };

    const data = patient || mockPatient; // Use real data if available, else mock

    const [expandedNoteId, setExpandedNoteId] = useState(null);

    const toggleNote = (id) => {
        if (expandedNoteId === id) {
            setExpandedNoteId(null);
        } else {
            setExpandedNoteId(id);
        }
    };

    if (loading) {
        return (
            <div className="p-12 text-center text-gray-500 animate-pulse">
                Loading patient profile...
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden max-w-5xl mx-auto">
            {/* Header */}
            <div className="bg-emerald-50/50 p-8 border-b border-emerald-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex items-center gap-6">
                    <button
                        onClick={() => navigate(-1)}
                        className="p-2 -ml-2 rounded-full hover:bg-white text-gray-400 hover:text-gray-700 transition"
                        title="Go Back"
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-emerald-600 shadow-sm border border-emerald-100">
                        <User size={40} />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">{data.name}</h1>
                        <p className="text-gray-500 flex items-center gap-2">
                            {data.email}
                            <span className={`px-2 py-0.5 rounded-full text-xs font-bold border ${data.status === 'Active' ? 'bg-green-100 text-green-700 border-green-200' : 'bg-gray-100 text-gray-600 border-gray-200'}`}>
                                {data.status}
                            </span>
                        </p>
                    </div>
                </div>
                <div className="flex gap-3">
                    {/* Buttons removed as per user feedback: Therapist doesn't need to book sessions here, and 'Add Note' is redundant with per-session actions. */}
                </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 border-b border-gray-100">
                <div className="p-6 border-r border-gray-100 last:border-0">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Total Sessions</p>
                    <p className="text-2xl font-bold text-gray-800 mt-1">{data.totalSessions}</p>
                </div>
                <div className="p-6 border-r border-gray-100 last:border-0">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Next Session</p>
                    <p className="text-xl font-bold text-emerald-600 mt-1 flex items-center gap-2">
                        {data.nextSession ? (
                            <><Calendar size={18} /> {data.nextSession}</>
                        ) : (
                            <span className="text-gray-400 text-lg">Not Scheduled</span>
                        )}
                    </p>
                </div>
                <div className="p-6 border-r border-gray-100 last:border-0">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Last Mood</p>
                    <p className="text-lg font-bold text-gray-600 mt-1">Neutral</p>
                </div>
                <div className="p-6">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Payment Status</p>
                    <p className="text-lg font-bold text-gray-600 mt-1">Up to date</p>
                </div>
            </div>

            {/* Main Content Areas */}
            <div className="p-8">
                <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                    <FileText className="text-emerald-600" /> Appointment History
                </h3>

                {error && (
                    <div className="mb-6 p-4 bg-orange-50 text-orange-700 rounded-xl border border-orange-100 flex items-center gap-3">
                        <Flag size={20} />
                        <p className="text-sm font-medium">{error}</p>
                    </div>
                )}

                <div className="space-y-4">
                    {data.appointmentHistory && data.appointmentHistory.length > 0 ? (
                        data.appointmentHistory.map((appt, i) => (
                            <div key={i} className="flex flex-col gap-4 p-5 rounded-xl border border-gray-100 hover:border-emerald-200 hover:shadow-md transition bg-gray-50/30">
                                <div className="flex flex-col md:flex-row gap-4">
                                    <div className="flex-shrink-0 flex md:flex-col items-center gap-2 md:w-32 text-gray-500">
                                        <div className="font-bold text-lg text-gray-800">{appt.date}</div>
                                        <div className="text-xs uppercase tracking-wide font-medium flex items-center gap-1">
                                            <Clock size={12} /> {appt.time}
                                        </div>
                                    </div>
                                    <div className="flex-grow border-l-0 md:border-l-2 border-emerald-100 md:pl-6">
                                        <div className="flex justify-between items-start">
                                            <h4 className="font-bold text-gray-800 text-lg mb-1">Session Summary</h4>
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs font-bold px-2 py-1 bg-white border border-gray-200 rounded text-gray-500 uppercase">
                                                    {appt.status}
                                                </span>
                                                <button
                                                    onClick={() => toggleNote(appt.id)}
                                                    className="text-emerald-600 hover:text-emerald-800 text-sm font-medium underline"
                                                >
                                                    {expandedNoteId === appt.id ? "Close Note" : "View/Edit Note"}
                                                </button>
                                            </div>
                                        </div>
                                        <p className="text-gray-600 italic mb-2">"{appt.message || "No notes for this session."}"</p>
                                    </div>
                                </div>

                                {/* SOAP Note Editor (Conditionally Rendered) */}
                                {expandedNoteId === appt.id && (
                                    <SOAPNoteEditor
                                        appointmentId={appt.id}
                                        patientEmail={data.email}
                                        therapistEmail={therapistEmail}
                                    // We would pass existingNote prop here if we fetched it.
                                    // For now, the editor will handle fetching or just creating new.
                                    />
                                )}
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-12 text-gray-400 bg-gray-50 rounded-xl border-dashed border-2 border-gray-200">
                            <p>No appointment history found.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PatientDetail;
