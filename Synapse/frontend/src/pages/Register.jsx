import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import API from "../api/api";
import Image from "../assets/login_hero.png";
import Logo from "../assets/logo.png";

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isTherapist, setIsTherapist] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [message, setMessage] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Separate state for user and therapist credentials
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
    name: "",
    age: "",
    gender: "",
  });

  const [therapistCredentials, setTherapistCredentials] = useState({
    email: "",
    password: "",
    name: "",
    licenceNo: "",
    specialization: "",
  });

  useEffect(() => {
    setIsTherapist(location.pathname === "/signup/therapist");
  }, [location.pathname]);

  const handleInput = (event) => {
    const { name, value } = event.target;

    if (isTherapist) {
      setTherapistCredentials((prev) => ({ ...prev, [name]: value }));
    } else {
      setUserCredentials((prev) => ({
        ...prev,
        [name]: name === "age" ? parseInt(value) || "" : value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const credentials = isTherapist ? therapistCredentials : userCredentials;

    if (credentials.password !== confirmPassword) {
      setMessage("Passwords do not match!");
      setLoading(false);
      return;
    }

    try {
      const endpoint = isTherapist
        ? "/auth/signUp/therapist"
        : "/auth/signUp/user";

      const response = await API.post(endpoint, credentials);
      console.log(response.data.message || "Signup successful!");

      // Reset form
      setUserCredentials({
        email: "",
        password: "",
        name: "",
        age: "",
        gender: "",
      });
      setTherapistCredentials({
        email: "",
        password: "",
        name: "",
        licenceNo: "",
        specialization: "",
      });
      setConfirmPassword("");

      setConfirmPassword("");

      // Redirect to login, but tell Login page to send them to Home (Lobby) after
      navigate("/login?redirect=/");
    } catch (error) {
      console.error(error);
      const errorMsg = error.response ? error.response.data : "Signup failed. Please try again.";
      setMessage(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative py-12">
      {/* Background Image & Overlay */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat fixed"
        style={{ backgroundImage: `url(${Image})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/40 via-black/20 to-emerald-900/40 backdrop-blur-sm"></div>
      </div>

      {/* Centered Register Card */}
      <div className="relative z-10 w-full max-w-3xl mx-4">
        <div className="bg-white/95 backdrop-blur-xl p-8 sm:p-10 rounded-3xl shadow-2xl border border-white/20 animate-fade-in">
          {/* Header */}
          <div className="flex flex-col items-center justify-center mb-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-2 rounded-full bg-emerald-50 shadow-sm">
                <img
                  src={Logo}
                  alt="Synapse Logo"
                  className="w-10 h-10 hover:scale-105 transition-transform"
                />
              </div>
              <h1 className="text-3xl font-display font-bold text-gray-900">
                Create Account
              </h1>
            </div>

            {/* Role Switcher */}
            <div className="flex items-center space-x-2 bg-gray-100 p-1.5 rounded-xl">
              <Link
                to="/signup"
                className={`px-6 py-2 rounded-lg text-sm font-bold transition-all duration-200 ${!isTherapist ? 'bg-white text-emerald-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Member
              </Link>
              <Link
                to="/signup/therapist"
                className={`px-6 py-2 rounded-lg text-sm font-bold transition-all duration-200 ${isTherapist ? 'bg-white text-emerald-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Therapist
              </Link>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Left Column: Email & Name */}
              <div className="space-y-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide ml-1">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="John Doe"
                    value={isTherapist ? therapistCredentials.name : userCredentials.name}
                    onChange={handleInput}
                    className="w-full px-5 py-3 rounded-2xl border border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none bg-gray-50/50 focus:bg-white transition-all"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide ml-1">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="name@example.com"
                    value={isTherapist ? therapistCredentials.email : userCredentials.email}
                    onChange={handleInput}
                    className="w-full px-5 py-3 rounded-2xl border border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none bg-gray-50/50 focus:bg-white transition-all"
                    required
                  />
                </div>
              </div>

              {/* Right Column: Age/Gender/Licence */}
              <div className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide ml-1">
                      {isTherapist ? "Specialization" : "Age"}
                    </label>
                    <input
                      type={isTherapist ? "text" : "number"}
                      name={isTherapist ? "specialization" : "age"}
                      placeholder={isTherapist ? "Psychologist" : "25"}
                      value={isTherapist ? therapistCredentials.specialization : userCredentials.age}
                      onChange={handleInput}
                      className="w-full px-5 py-3 rounded-2xl border border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none bg-gray-50/50 focus:bg-white transition-all"
                      required
                    />
                  </div>

                  {!isTherapist ? (
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide ml-1">Gender</label>
                      <div className="flex items-center justify-around h-[50px] px-1 bg-gray-50/50 rounded-2xl border border-gray-200">
                        <label className="flex items-center space-x-1.5 cursor-pointer">
                          <input
                            type="radio"
                            name="gender"
                            value="Male"
                            checked={userCredentials.gender === "Male"}
                            onChange={handleInput}
                            className="text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                          />
                          <span className="text-sm text-gray-600 font-medium">Male</span>
                        </label>
                        <label className="flex items-center space-x-1.5 cursor-pointer">
                          <input
                            type="radio"
                            name="gender"
                            value="Female"
                            checked={userCredentials.gender === "Female"}
                            onChange={handleInput}
                            className="text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                          />
                          <span className="text-sm text-gray-600 font-medium">Fem</span>
                        </label>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide ml-1">License No.</label>
                      <input
                        type="text"
                        name="licenceNo"
                        placeholder="LIC-000"
                        value={therapistCredentials.licenceNo}
                        onChange={handleInput}
                        className="w-full px-5 py-3 rounded-2xl border border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none bg-gray-50/50 focus:bg-white transition-all"
                        required
                      />
                    </div>
                  )}
                </div>

                {/* Move Password fields to right column or separate row? Let's put passfields below in full row if layout needs it, or split them here. 
                      Actually, let's keep it clean. 
                      Row 1 Left: Name
                      Row 1 Right: Email 
                      Row 2 Left: Age/Spec
                      Row 2 Right: Gender/Licence
                      Row 3 Left: Password
                      Row 3 Right: Confirm Password
                  */}
              </div>
            </div>

            {/* Password Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide ml-1">Password</label>
                <div className="relative">
                  <input
                    type={showPassword1 ? "text" : "password"}
                    name="password"
                    placeholder="••••••••"
                    value={isTherapist ? therapistCredentials.password : userCredentials.password}
                    onChange={handleInput}
                    className="w-full px-5 py-3 rounded-2xl border border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none bg-gray-50/50 focus:bg-white pr-12 transition-all"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword1(!showPassword1)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-emerald-600 p-1"
                  >
                    {showPassword1 ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                  </button>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide ml-1">Confirm Password</label>
                <div className="relative">
                  <input
                    type={showPassword2 ? "text" : "password"}
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-5 py-3 rounded-2xl border border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none bg-gray-50/50 focus:bg-white pr-12 transition-all"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword2(!showPassword2)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-emerald-600 p-1"
                  >
                    {showPassword2 ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                  </button>
                </div>
              </div>
            </div>

            {message && (
              <div className="p-4 bg-red-50 text-red-600 text-sm rounded-2xl border border-red-100 flex items-center gap-2">
                <span className="text-lg font-bold">!</span> {message}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-2xl transition-all duration-200 shadow-lg shadow-emerald-600/20 hover:shadow-emerald-600/30 mt-2 disabled:opacity-70 disabled:cursor-not-allowed transform active:scale-[0.98] text-base"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <div className="mt-8 text-center border-t border-gray-100 pt-6">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-emerald-600 font-bold hover:text-emerald-700 transition-colors">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
