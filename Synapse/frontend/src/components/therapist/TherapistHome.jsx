import React, { useEffect, useState } from "react";
import API from "../../api/api";
import { useNavigate } from "react-router-dom";
import AvailabilityManager from "./AvailabilityManager";
import StatsWidgets from "./dashboard/StatsWidgets";
import NextAppointmentCard from "./dashboard/NextAppointmentCard";
import AppointmentInbox from "./dashboard/AppointmentInbox";

const TherapistHome = () => {
  const [userName, setUserName] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [therapistId, setTherapistId] = useState(null);
  const [therapistEmail, setTherapistEmail] = useState(null);

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const fetchDashboardData = async (email) => {
    try {
      const response = await API.get(`/appointments?therapistEmail=${email}`);
      if (response.status === 200) {
        setAppointments(response.data);
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    let email = null;
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        email = user.email;
        setTherapistEmail(email);
      } catch (e) {
        console.error("Failed to parse user from localStorage", e);
      }
    }

    if (email) {
      setIsLoggedIn(true);
      const fetchDetails = async () => {
        try {
          const response = await API.get(`/therapist/${email}`);
          if (response.status === 200) {
            setUserName(response.data.name);
            setTherapistId(response.data.id);
            // Fetch appointments after getting profile confirming validity
            fetchDashboardData(email);
          }
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
      fetchDetails();
    } else {
      setLoading(false);
    }
  }, []);

  // metrics
  const pendingAppointments = appointments.filter(a => a.status === 'PENDING');

  // Find next appointment
  const nextAppointment = appointments
    .filter(a => a.status === 'ACCEPTED')
    .filter(a => new Date(`${a.date}T${a.time}`) > new Date())
    .sort((a, b) => new Date(`${a.date}T${a.time}`) - new Date(`${b.date}T${b.time}`))
  [0];

  return (
    <div className="w-full max-w-[1600px] mx-auto p-6">
      {/* Header */}
      <div className="mb-8 flex justify-between items-end animate-fade-in-up">
        <div>
          <h1 className="text-4xl font-bold text-gray-800">
            Welcome back, <span className="text-emerald-600">Dr. {userName.split(' ')[0]}</span>
          </h1>
          <p className="text-gray-500 mt-2">Here's what's happening in your practice today.</p>
        </div>
        <div className="text-right">
          <p className="font-medium text-gray-800">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
        </div>
      </div>

      {/* Stats Row */}
      <div className="animate-slide-up">
        <StatsWidgets />
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Left Column (2/3) */}
        <div className="lg:col-span-2 space-y-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          {/* Hero Card */}
          <NextAppointmentCard appointment={nextAppointment} />

          {/* Availability Manager */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            {therapistId && <AvailabilityManager therapistId={therapistId} />}
          </div>
        </div>

        {/* Right Column (1/3) */}
        <div className="space-y-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          {/* Inbox */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 h-[500px] overflow-hidden">
            <AppointmentInbox
              appointments={pendingAppointments}
              onAction={() => fetchDashboardData(therapistEmail)}
            />
          </div>
        </div>

      </div>
    </div>
  );
};

export default TherapistHome;
