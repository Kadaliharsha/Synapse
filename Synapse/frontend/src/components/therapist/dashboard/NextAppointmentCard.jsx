import React from "react";
import { Video, Calendar, Clock, MapPin, User } from "lucide-react";

const NextAppointmentCard = ({ appointment }) => {
    if (!appointment) {
        return (
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center h-[300px]">
                <div className="bg-gray-50 p-4 rounded-full mb-4">
                    <Calendar size={32} className="text-gray-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-700">No Upcoming Sessions</h3>
                <p className="text-gray-500 mt-2">You don't have any appointments scheduled for today.</p>
            </div>
        );
    }

    // Format date/time
    const dateObj = new Date(appointment.date);
    const dateStr = dateObj.toLocaleDateString("en-US", { weekday: 'long', month: 'long', day: 'numeric' });

    return (
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-2 h-full bg-emerald-500"></div>

            <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <p className="text-emerald-600 font-bold tracking-wide uppercase text-sm mb-1">Up Next</p>
                        <h2 className="text-3xl font-bold text-gray-800">{appointment.time}</h2>
                        <p className="text-gray-500 text-lg">{dateStr}</p>
                    </div>
                    <div className="bg-emerald-50 px-4 py-2 rounded-lg text-emerald-700 font-medium text-sm flex items-center gap-2">
                        <Video size={16} /> Video Call
                    </div>
                </div>

                <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
                        <User size={24} />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-gray-800">{appointment.name || "Patient Name"}</h3>
                        <p className="text-gray-500">General Consultation</p>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl font-bold text-lg shadow-lg shadow-emerald-200 transition-all flex items-center justify-center gap-2">
                        <Video size={20} /> Join Session
                    </button>
                    <button className="w-full bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 py-3 rounded-xl font-semibold transition-all">
                        View Patient Notes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NextAppointmentCard;
