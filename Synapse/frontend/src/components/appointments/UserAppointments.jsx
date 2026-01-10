import React, { useState, useEffect } from "react";
import API from "../../api/api";
import Cookies from "js-cookie";
import "../../main.css";

const UserAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getUserEmail = () => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) return JSON.parse(storedUser).email;
    return Cookies.get("email");
  };

  const userEmail = getUserEmail();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await API.get(`/appointments/user/${userEmail}`);
        if (response.status === 200) {
          setAppointments(response.data);
          console.log(response.data);
        }
      } catch (err) {
        setError("Error fetching appointments.");
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    if (userEmail) {
      fetchAppointments();
    }
  }, [userEmail]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <section className="mt-10 w-full flex justify-center mb-20">
      <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-display font-bold mb-10 text-center gradient-text">
          My Appointments
        </h2>

        {appointments.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl shadow-soft border border-neutral-100">
            <p className="text-xl text-neutral-500 font-medium">No appointments booked yet.</p>
            <p className="text-neutral-400 mt-2">Book your first session with our mental health professionals.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {appointments.map((appointment) => (
              <div
                key={appointment.id}
                className="appointment-card bg-white rounded-2xl shadow-soft border border-neutral-100 p-6 flex flex-col h-full relative overflow-hidden group hover:border-primary-200"
              >
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary-400 to-secondary-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-neutral-800 group-hover:text-primary-700 transition-colors">{appointment.name}</h3>
                    <p className="text-sm text-neutral-500">{appointment.email}</p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase ${appointment.status === "Accepted"
                      ? "bg-success-100 text-success-700"
                      : appointment.status === "Rejected"
                        ? "bg-error-100 text-error-700"
                        : "bg-warning-100 text-warning-700"
                      }`}
                  >
                    {appointment.status}
                  </span>
                </div>

                <div className="space-y-3 flex-grow">
                  <div className="flex items-center text-neutral-600">
                    <span className="font-medium w-20">Date:</span>
                    <span>{appointment.date}</span>
                  </div>

                  {appointment.time && (
                    <div className="flex items-center text-neutral-600">
                      <span className="font-medium w-20">Time:</span>
                      <span>{appointment.time}</span>
                    </div>
                  )}

                  {appointment.therapistEmail && (
                    <div className="flex items-center text-neutral-600">
                      <span className="font-medium w-20">Doctor:</span>
                      <span className="text-primary-600">{appointment.therapistEmail}</span>
                    </div>
                  )}

                  {appointment.message && (
                    <div className="mt-4 p-3 bg-neutral-50 rounded-lg text-sm text-neutral-600 new-line">
                      <span className="font-semibold block mb-1 text-neutral-800">Note:</span>
                      {appointment.message}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default UserAppointments;
