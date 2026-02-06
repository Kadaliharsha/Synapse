import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/api";
import Navbar from "../components/layout/NavBar";
import Footer from "../components/layout/Footer";
import Cookies from "js-cookie";

const TherapistProfile = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [therapist, setTherapist] = useState(null);
    const [slots, setSlots] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [showBookingModal, setShowBookingModal] = useState(false);
    const [selectedSlot, setSelectedSlot] = useState(null);

    // User info for booking
    const [bookingNote, setBookingNote] = useState("");

    useEffect(() => {
        fetchTherapistAndSlots();
    }, [id]);

    const fetchTherapistAndSlots = async () => {
        try {
            setLoading(true);
            // Fetch Therapist
            // Note: Backend endpoint /therapist/id/{id} created
            const tResponse = await API.get(`/therapist/id/${id}`);
            setTherapist(tResponse.data);

            // Fetch Slots
            const sResponse = await API.get(`/slots/available/${id}`);
            setSlots(sResponse.data);

        } catch (error) {
            console.error("Error fetching data", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSlotClick = (slot) => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
            return;
        }
        setSelectedSlot(slot);
        setShowBookingModal(true);
    };

    const handleConfirmBooking = async () => {
        try {
            const userStr = localStorage.getItem("user");
            const user = userStr ? JSON.parse(userStr) : {};

            if (!user.email) {
                // Try fetching again from localStorage as fallback
                const refreshedUserStr = localStorage.getItem("user");
                if (refreshedUserStr) {
                    try {
                        const refreshedUser = JSON.parse(refreshedUserStr);
                        user.email = refreshedUser.email;
                    } catch (e) {
                        console.error(e);
                    }
                }
            }

            if (!user.email) {
                alert("User email not found. Please login again.");
                navigate("/login");
                return;
            }

            const appointmentData = {
                name: user.name || "User", // Optional if backend handles it
                email: user.email,
                therapistEmail: therapist.email, // Legacy field
                date: selectedSlot.date,
                time: selectedSlot.startTime, // Keeping string format consistent
                message: bookingNote,
                slotId: selectedSlot.id
            };

            const response = await API.post("/appointments", appointmentData);
            if (response.status === 200) {
                alert("Appointment Booked Successfully!");
                setShowBookingModal(false);
                setBookingNote("");
                // Refresh slots
                fetchTherapistAndSlots();
            }
        } catch (error) {
            console.error("Booking failed", error);
            alert("Booking failed. Please try again.");
        }
    };

    if (loading) return <div>Loading...</div>;
    if (!therapist) return <div>Therapist not found.</div>;

    // Group slots by date
    const slotsByDate = slots.reduce((acc, slot) => {
        const d = slot.date; // assuming ISO string YYYY-MM-DD
        if (!acc[d]) acc[d] = [];
        acc[d].push(slot);
        return acc;
    }, {});

    // Get next 7 days for calendar strip
    const getNextDays = (n) => {
        const days = [];
        for (let i = 0; i < n; i++) {
            const d = new Date();
            d.setDate(d.getDate() + i);
            days.push(d.toISOString().split('T')[0]);
        }
        return days;
    };

    const datesToShow = getNextDays(7);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />

            <main className="flex-grow container mx-auto px-4 py-8 mt-20">
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
                    {/* Header Profile */}
                    <div className="md:flex">
                        <div className="md:w-1/3 bg-gray-50 p-8 flex flex-col items-center border-r border-gray-100">
                            <div className="w-48 h-48 rounded-full overflow-hidden shadow-md mb-6">
                                <img
                                    src={therapist.profilePicture || "https://via.placeholder.com/300"}
                                    alt={therapist.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <h1 className="text-2xl font-bold text-gray-900 text-center">{therapist.name}</h1>
                            <p className="text-primary-600 font-medium mb-4">{therapist.specialization}</p>

                            <div className="w-full space-y-3">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">License</span>
                                    <span className="font-mono">{therapist.licenceNo}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Experience</span>
                                    <span>{therapist.experience || 5} Years</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Session Price</span>
                                    <span className="font-bold text-green-600">${therapist.price || 100}</span>
                                </div>
                            </div>
                        </div>

                        <div className="md:w-2/3 p-8">
                            <h2 className="text-xl font-semibold mb-4">About</h2>
                            <p className="text-gray-600 leading-relaxed mb-8">
                                {therapist.bio || "No bio available for this therapist."}
                            </p>

                            <h2 className="text-xl font-semibold mb-4">Book a Session</h2>

                            {/* Date Strip */}
                            <div className="flex space-x-2 overflow-x-auto pb-4 mb-4">
                                {datesToShow.map(date => (
                                    <button
                                        key={date}
                                        onClick={() => setSelectedDate(date)}
                                        className={`flex-shrink-0 px-4 py-3 rounded-lg border transition-all ${selectedDate === date
                                            ? 'bg-primary-600 text-white border-primary-600 shadow-md'
                                            : 'bg-white text-gray-600 border-gray-200 hover:border-primary-300'
                                            }`}
                                    >
                                        <div className="text-xs opacity-70 uppercase">{new Date(date).toLocaleDateString('en-US', { weekday: 'short' })}</div>
                                        <div className="font-bold">{new Date(date).getDate()}</div>
                                    </button>
                                ))}
                            </div>

                            {/* Slots Grid */}
                            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                                {slotsByDate[selectedDate]?.length > 0 ? (
                                    slotsByDate[selectedDate].sort((a, b) => a.startTime.localeCompare(b.startTime)).map(slot => (
                                        <button
                                            key={slot.id}
                                            onClick={() => handleSlotClick(slot)}
                                            className="px-2 py-2 text-sm bg-white border border-primary-200 rounded hover:bg-primary-50 text-primary-700 font-medium transition-colors"
                                        >
                                            {slot.startTime}
                                        </button>
                                    ))
                                ) : (
                                    <div className="col-span-full text-center py-8 text-gray-400 border-2 border-dashed rounded-lg">
                                        No slots available for this date.
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Booking Modal */}
            {showBookingModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-large p-6 w-full max-w-md animate-scale-in">
                        <h3 className="text-xl font-bold mb-4">Confirm Booking</h3>
                        <div className="bg-gray-50 p-4 rounded-lg mb-4 text-sm">
                            <p><strong>Therapist:</strong> {therapist.name}</p>
                            <p><strong>Date:</strong> {selectedSlot.date}</p>
                            <p><strong>Time:</strong> {selectedSlot.startTime} - {selectedSlot.endTime}</p>
                            <p><strong>Price:</strong> ${therapist.price || 100}</p>
                        </div>

                        <textarea
                            className="input-field mb-4"
                            placeholder="Add a note (optional)..."
                            rows="3"
                            value={bookingNote}
                            onChange={e => setBookingNote(e.target.value)}
                        ></textarea>

                        <div className="flex gap-3">
                            <button onClick={() => setShowBookingModal(false)} className="flex-1 btn-outline py-2">Cancel</button>
                            <button onClick={handleConfirmBooking} className="flex-1 btn-primary py-2">Confirm</button>
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
};

export default TherapistProfile;
