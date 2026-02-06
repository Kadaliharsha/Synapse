import React from "react";
import { Check, X, Clock, CalendarDays } from "lucide-react";
import API from "../../../api/api";

const AppointmentInbox = ({ appointments, onAction }) => {
    const handleAccept = async (id) => {
        try {
            await API.put(`/appointments/${id}/status`, { status: "ACCEPTED" });
            onAction(); // Refresh data
        } catch (error) {
            console.error("Error accepting appointment", error);
        }
    };

    const handleDecline = async (id) => {
        try {
            await API.put(`/appointments/${id}/status`, { status: "REJECTED" });
            onAction();
        } catch (error) {
            console.error("Error rejecting appointment", error);
        }
    };

    if (!appointments || appointments.length === 0) {
        return (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 h-full">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                    Inbox <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs">0</span>
                </h3>
                <div className="text-center py-10 text-gray-400">
                    <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Check size={24} />
                    </div>
                    <p>All caught up!</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 h-full flex flex-col">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                Inbox <span className="bg-red-100 text-red-600 px-2 py-0.5 rounded-full text-xs">{appointments.length}</span>
            </h3>

            <div className="space-y-4 overflow-y-auto flex-1 pr-2 custom-scrollbar">
                {appointments.map((apt) => (
                    <div key={apt.id} className="p-4 rounded-xl border border-gray-100 hover:border-emerald-100 hover:shadow-sm transition-all bg-gray-50/50">
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <h4 className="font-bold text-gray-800">{apt.name || "Unknown Patient"}</h4>
                                <p className="text-xs text-gray-500">{apt.email}</p>
                            </div>
                            <span className="text-xs font-mono bg-white px-2 py-1 rounded border text-gray-500">
                                PENDING
                            </span>
                        </div>

                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                            <span className="flex items-center gap-1"><CalendarDays size={14} /> {apt.date}</span>
                            <span className="flex items-center gap-1"><Clock size={14} /> {apt.time}</span>
                        </div>

                        <div className="flex gap-2">
                            <button
                                onClick={() => handleAccept(apt.id)}
                                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-1"
                            >
                                <Check size={16} /> Accept
                            </button>
                            <button
                                onClick={() => handleDecline(apt.id)}
                                className="flex-1 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-1"
                            >
                                <X size={16} /> Key
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AppointmentInbox;
