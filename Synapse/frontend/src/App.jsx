import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/common/ProtectedRoute";

// Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserDB from "./pages/UserDB";
import Home from "./pages/Home";
import SOS from "./pages/SOS";
import FeedBack from "./pages/FeedBack";
import Blog from "./pages/Blog";
import Forbidden from "./pages/Frobidden";
import TherapistDB from "./pages/TherapistDB";
import Appoinment from "./pages/Appoinment";
import Sessions from "./pages/Sessions";
import About from "./pages/About";
import TherapistDirectory from "./pages/TherapistDirectory";
import TherapistProfile from "./pages/TherapistProfile";
import MyPatients from "./pages/MyPatients";
import PatientProfile from "./pages/PatientProfile";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/signup/therapist" element={<Register />} />
          <Route path="/about" element={<About />} />
          <Route path="/sos" element={<SOS />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/therapists" element={<TherapistDirectory />} />
          <Route path="/therapist/:id" element={<TherapistProfile />} />
          <Route path="/403" element={<Forbidden />} />

          {/* User Protected Routes */}
          <Route path="/userDb" element={
            <ProtectedRoute allowedRoles={["USER"]}>
              <UserDB />
            </ProtectedRoute>
          } />
          <Route path="/appointments" element={
            <ProtectedRoute allowedRoles={["USER"]}>
              <Appoinment />
            </ProtectedRoute>
          } />
          <Route path="/feedBack" element={
            <ProtectedRoute allowedRoles={["USER"]}>
              <FeedBack />
            </ProtectedRoute>
          } />

          {/* Therapist Protected Routes */}
          <Route path="/therapistDb" element={
            <ProtectedRoute allowedRoles={["THERAPIST"]}>
              <TherapistDB />
            </ProtectedRoute>
          } />
          <Route path="/sessions" element={
            <ProtectedRoute allowedRoles={["THERAPIST"]}>
              <Sessions />
            </ProtectedRoute>
          } />
          <Route path="/patients" element={
            <ProtectedRoute allowedRoles={["THERAPIST"]}>
              <MyPatients />
            </ProtectedRoute>
          } />
          <Route path="/patients/:email" element={
            <ProtectedRoute allowedRoles={["THERAPIST"]}>
              <PatientProfile />
            </ProtectedRoute>
          } />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;