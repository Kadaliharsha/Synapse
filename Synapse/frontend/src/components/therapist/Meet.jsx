import React, { useState, useEffect } from "react";
import TherapistDisplayCard from "./TherapistDisplayCard";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import API from "../../api/api";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Meet = () => {
  const [therapists, setTherapists] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
  const itemsPerPage = 4;

  useEffect(() => {
    const fetchTherapists = async () => {
      try {
        const response = await API.get("/therapist/all");
        if (response.status === 200) {
          setTherapists(response.data);
        }
      } catch (err) {
        setError("Error fetching therapists.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTherapists();
  }, []);

  const totalPages = Math.ceil(therapists.length / itemsPerPage);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 1 < totalPages ? prevIndex + 1 : prevIndex
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - 1 >= 0 ? prevIndex - 1 : prevIndex
    );
  };

  const handleBookNow = ({ email }) => {
    let userEmail;
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      userEmail = JSON.parse(storedUser).email;
    } else {
      userEmail = Cookies.get("email");
    }

    if (!userEmail) {
      navigate("/403");
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
    console.log("Form submitted!");

    try {
      const response = await API.post("/appointments", formData);
      if (response.status === 200) {
        console.log(response);
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
      console.error("Error during form submission:", err);
      alert("Failed to book appointment.");
    }
  };

  const displayedTherapists = therapists.slice(
    currentIndex * itemsPerPage,
    (currentIndex + 1) * itemsPerPage
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-neutral-50 via-blue-50 to-purple-50">
        <div className="text-center">
          <div className="loading-dots mb-4">
            <div></div>
            <div></div>
            <div></div>
          </div>
          <p className="text-neutral-600 font-medium">Finding your perfect therapist...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 bg-gradient-to-br from-neutral-50 via-blue-50 to-purple-50">
        <div className="text-error-600 text-lg font-medium">{error}</div>
      </div>
    );
  }

  return (
    <div className="py-20 bg-gradient-to-br from-neutral-50 via-blue-50 to-purple-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 gradient-text">
            Meet Our Mental Health Professionals
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
            Connect with experienced therapists who are dedicated to supporting your mental wellness journey.
            Each professional brings unique expertise and a compassionate approach to help you thrive.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {displayedTherapists.map((therapist, index) => (
            <div key={therapist.id} className="animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <TherapistDisplayCard
                {...therapist}
                onBookNow={handleBookNow}
              />
            </div>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4">
            <button
              className="p-4 bg-primary-600 text-white rounded-full hover:bg-primary-700 transition-all duration-300 shadow-soft hover:shadow-medium transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handlePrev}
              disabled={currentIndex === 0}
            >
              <FaArrowLeft className="text-lg" />
            </button>
            <div className="flex space-x-2">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${i === currentIndex ? 'bg-primary-600' : 'bg-neutral-300'
                    }`}
                  onClick={() => setCurrentIndex(i)}
                />
              ))}
            </div>
            <button
              className="p-4 bg-primary-600 text-white rounded-full hover:bg-primary-700 transition-all duration-300 shadow-soft hover:shadow-medium transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleNext}
              disabled={currentIndex + 1 >= totalPages}
            >
              <FaArrowRight className="text-lg" />
            </button>
          </div>
        )}

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
    </div>
  );
};

export default Meet;
