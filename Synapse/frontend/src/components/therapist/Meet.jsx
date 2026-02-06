import React, { useState, useEffect } from "react";
import TherapistDisplayCard from "./TherapistDisplayCard";
import API from "../../api/api";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

// ----------------------------------------------------------------------
// 1. DUMMY DATA FOR CAROUSEL (The "Train" Passengers)
// ----------------------------------------------------------------------
const DUMMY_THERAPISTS = [
  {
    id: "dummy-1",
    name: "Dr. Seraphina Vance",
    specialization: "Anxiety & Trauma Specialist",
    bio: "Helping you find calm in the chaos with verifiable CBT techniques.",
    profilePicture: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300&h=300",
    experience: 12,
    rating: 4.9,
  },
  {
    id: "dummy-2",
    name: "Dr. Aris Thorne",
    specialization: "Clinical Psychologist",
    bio: "Focusing on men's mental health and career burnout recovery.",
    profilePicture: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=300&h=300",
    experience: 8,
    rating: 4.8,
  },
  {
    id: "dummy-3",
    name: "Dr. Elara Mints",
    specialization: "Child & Family Therapist",
    bio: "Building stronger bonds and healthier family dynamics.",
    profilePicture: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=300&h=300",
    experience: 15,
    rating: 5.0,
  },
  {
    id: "dummy-4",
    name: "Dr. Julian Chase",
    specialization: "Addiction Recovery",
    bio: "Compassionate support for navigating the path to sobriety.",
    profilePicture: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=300&h=300",
    experience: 20,
    rating: 4.9,
  },
  {
    id: "dummy-5",
    name: "Dr. Maya Lin",
    specialization: "Mindfulness Coach",
    bio: "Integrating Eastern mindfulness with Western psychology.",
    profilePicture: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=300&h=300",
    experience: 6,
    rating: 4.7,
  },
];

const Meet = () => {
  const [therapists, setTherapists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    time: "",
    message: "",
    therapistEmail: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTherapists = async () => {
      try {
        const response = await API.get("/therapist/all");
        let realTherapists = [];
        if (response.status === 200) {
          realTherapists = response.data;
        }
        // ----------------------------------------------------------------------
        // 2. THE MERGE LOGIC
        // We put Real therapists FIRST, then append Dummy ones to make the train long.
        // We duplicate the list to ensure the marquee has enough items to scroll smoothly.
        // ----------------------------------------------------------------------
        const mixedList = [...realTherapists, ...DUMMY_THERAPISTS];

        // Triple the list to ensure infinite smooth scrolling without gaps
        setTherapists([...mixedList, ...mixedList, ...mixedList]);

      } catch (err) {
        console.error("Error fetching therapists, falling back to dummy data", err);
        // Even if API fails, show dummy data so the site looks good
        const mixedList = [...DUMMY_THERAPISTS];
        setTherapists([...mixedList, ...mixedList, ...mixedList]);
      } finally {
        setLoading(false);
      }
    };

    fetchTherapists();
  }, []);

  const handleBookNow = ({ email }) => {
    // If it's a dummy therapist (no email), redirect or show generic
    if (!email) {
      alert("This is a demo profile. Please select a registered therapist.");
      return;
    }

    let userEmail;
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      userEmail = JSON.parse(storedUser).email;
    } else {
      // Fallback or explicit null
      userEmail = null;
    }

    if (!userEmail) {
      alert("Please login to book a session.");
      navigate("/login");
      return;
    }
    setFormData((prev) => ({
      ...prev,
      therapistEmail: email,
    }));
    setShowForm(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post("/appointments", formData);
      if (response.status === 200) {
        alert("Appointment booked successfully!");
        setShowForm(false);
        setFormData({
          name: "",
          email: "",
          date: "",
          time: "",
          message: "",
          therapistEmail: "",
        });
      }
    } catch (err) {
      alert("Failed to book appointment.");
    }
  };

  if (loading) return null; // Or simple loader

  return (
    <div className="py-20 bg-transparent overflow-hidden">
      <div className="container mx-auto px-6 mb-12 text-center">
        <h2 className="text-2xl md:text-3xl font-display font-bold mb-6 gradient-text">
          Meet Our Mental Health Professionals
        </h2>
        <p className="text-lg text-neutral-600 max-w-2xl mx-auto leading-relaxed pt-2">
          Connect with experienced therapists. Real profiles are prioritized first!
        </p>
      </div>

      {/* 
        3. THE CAROUSEL CONTAINER 
        - Flex container that overflows
        - .animate-scroll maps to the keyframes in main.css
      */}
      <div className="relative w-full overflow-hidden">
        {/* Gradients to fade edges */}
        <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none"></div>

        <div className="flex w-max animate-scroll gap-8 hover:pause">
          {therapists.map((therapist, index) => (
            <div key={`${therapist.id}-${index}`} className="w-[350px] flex-shrink-0 transition-transform hover:scale-105 duration-300">
              <TherapistDisplayCard
                {...therapist}
                onBookNow={handleBookNow}
              // Pass a flag to hide "Book Now" for dummies if needed, 
              // or just handle it in the function like specificed above.
              />
            </div>
          ))}
        </div>
      </div>

      {/* Form Modal (Unchanged) */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-large p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-scale-in">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-display font-bold gradient-text mb-2">
                Schedule Your Session
              </h2>
              <p className="text-neutral-600">
                Take the first step towards better mental wellness
              </p>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-6">
              <div>
                <label className="block text-neutral-700 text-sm font-medium mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="input-field"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-neutral-700 text-sm font-medium mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="input-field"
                  placeholder="Enter your email address"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-neutral-700 text-sm font-medium mb-2">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-neutral-700 text-sm font-medium mb-2">
                    Preferred Time
                  </label>
                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    required
                    className="input-field"
                  />
                </div>
              </div>

              <div>
                <label className="block text-neutral-700 text-sm font-medium mb-2">
                  Additional Notes (Optional)
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows="4"
                  className="input-field resize-none"
                  placeholder="Share any specific concerns or preferences..."
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 px-6 py-3 border-2 border-neutral-300 text-neutral-700 rounded-lg hover:bg-neutral-50 transition-all duration-300 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 btn-primary"
                >
                  Book Appointment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Meet;
