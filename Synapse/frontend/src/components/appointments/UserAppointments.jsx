import React, { useState, useEffect } from "react";
import API from "../../api/api";
import Cookies from "js-cookie";
import GlassCard from "../common/GlassCard";
import { FaCalendarAlt, FaClock, FaUserMd } from "react-icons/fa";

const UserAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getUserEmail = () => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) return JSON.parse(storedUser).email;
    return null;
  };

  const userEmail = getUserEmail();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await API.get(`/appointments/user/${userEmail}`);
        if (response.status === 200) {
          setAppointments(response.data);
        }
      } catch (err) {
        setError("Error fetching appointments.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (userEmail) {
      fetchAppointments();
    }
  }, [userEmail]);

  if (loading) return (
    <div className="flex justify-center p-8">
      <div className="w-8 h-8 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin"></div>
    </div>
  );

  if (error) return <div className="text-red-500 text-center p-4">{error}</div>;

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6 px-2">
        <h2 className="text-2xl font-bold text-gray-900">My Appointments</h2>
        <button className="text-emerald-600 font-medium hover:text-emerald-700 text-sm">View All</button>
      </div>

      {appointments.length === 0 ? (
        <GlassCard className="text-center py-12 flex flex-col items-center">
          <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-500 mb-4">
            <FaCalendarAlt size={24} />
          </div>
          <p className="text-xl text-gray-800 font-semibold">No appointments booked</p>
          <p className="text-gray-500 mt-2 max-w-sm">Ready to start your journey? Book your first session with our mental health professionals.</p>
        </GlassCard>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {appointments.map((appointment) => (
            <GlassCard
              key={appointment.id}
              className="flex flex-col h-full group hover:ring-2 hover:ring-emerald-500/20 transition-all p-0 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 group-hover:text-emerald-700 transition-colors">{appointment.name}</h3>
                    <p className="text-xs text-gray-400 mt-1">{appointment.email}</p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase ${appointment.status === "Accepted"
                      ? "bg-emerald-100 text-emerald-700"
                      : appointment.status === "Rejected"
                        ? "bg-red-100 text-red-700"
                        : "bg-amber-100 text-amber-700"
                      }`}
                  >
                    {appointment.status}
                  </span>
                </div>

                <div className="space-y-3 mt-4">
                  <div className="flex items-center text-gray-600 text-sm">
                    <FaCalendarAlt className="w-4 h-4 mr-3 text-emerald-500" />
                    <span>{appointment.date}</span>
                  </div>

                  {appointment.time && (
                    <div className="flex items-center text-gray-600 text-sm">
                      <FaClock className="w-4 h-4 mr-3 text-emerald-500" />
                      <span>{appointment.time}</span>
                    </div>
                  )}

                  {appointment.therapistEmail && (
                    <div className="flex items-center text-gray-600 text-sm">
                      <FaUserMd className="w-4 h-4 mr-3 text-emerald-500" />
                      <span className="truncate">{appointment.therapistEmail}</span>
                    </div>
                  )}
                </div>
              </div>

              {appointment.message && (
                <div className="bg-gray-50 px-6 py-4 border-t border-gray-100 mt-auto">
                  <p className="text-xs text-gray-500 italic line-clamp-2">"{appointment.message}"</p>
                </div>
              )}
            </GlassCard>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserAppointments;
