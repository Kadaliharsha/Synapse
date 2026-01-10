import React, { useState } from "react";
import API from "../../api/api";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Support = () => {
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  const handleFindSupportClick = () => {
    const email = Cookies.get("email");
    if (!email) {
      navigate("/403");
    }
    setShowForm(true);
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    time: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post("/appointments", formData);
      if (response.status === 200) {
        alert("Appointment booked successfully! We'll contact you soon.");
        setShowForm(false);
        setFormData({ name: "", email: "", date: "", time: "", message: "" });
      }
    } catch (error) {
      console.error("Error booking appointment:", error);
      alert("Unable to book appointment. Please try again.");
    }
  };

  return (
    <div className="card card-hover overflow-hidden group">
      <div className="flex flex-col lg:flex-row h-full">
        {/* Content Section */}
        <div className="lg:w-1/2 p-8 bg-gradient-to-br from-secondary-600 to-secondary-800 text-white flex flex-col justify-center">
          <div className="text-center lg:text-left">
            <h1 className="text-3xl lg:text-4xl font-display font-bold mb-6 leading-tight">
              Connect with a Mental Health Professional
            </h1>

            <p className="text-lg lg:text-xl mb-8 leading-relaxed opacity-90">
              Healing takes time, but asking for help is the first step toward wellness.
              You deserve to feel better, and our therapists are here to support you.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                type="button"
                className="btn-primary group-hover:shadow-glow transition-all duration-300"
                onClick={handleFindSupportClick}
              >
                <span className="flex items-center space-x-2">
                  <span>🤝</span>
                  <span>Find Support</span>
                </span>
              </button>

              <div className="flex items-center justify-center space-x-4 text-sm opacity-80">
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  <span>Licensed Therapists</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  <span>Safe & Confidential</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Visual Section */}
        <div className="lg:w-1/2 p-8 bg-gradient-to-br from-neutral-50 to-neutral-100 flex flex-col justify-center">
          <div className="text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-secondary-400 to-secondary-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce-gentle">
              <span className="text-4xl">🧠</span>
            </div>

            <h2 className="text-2xl lg:text-3xl font-display font-bold text-neutral-800 mb-4">
              Professional Therapy Sessions
            </h2>

            <div className="space-y-3 text-neutral-600">
              <div className="flex items-center justify-center space-x-2">
                <span className="w-2 h-2 bg-success-500 rounded-full"></span>
                <span>Individual & Group Sessions</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <span className="w-2 h-2 bg-primary-500 rounded-full"></span>
                <span>Online & In-Person Options</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <span className="w-2 h-2 bg-accent-500 rounded-full"></span>
                <span>Flexible Scheduling</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Appointment Booking Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-large p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-scale-in">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-display font-bold gradient-text mb-2">
                Schedule Your Therapy Session
              </h2>
              <p className="text-neutral-600">
                Take the first step towards better mental wellness
              </p>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
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
                  Book Session
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Support;
