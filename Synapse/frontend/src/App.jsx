import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import Meet from "./components/therapist/Meet";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/signup/therapist" element={<Register />} />
        <Route path="/userDb" element={<UserDB />} />
        <Route path="/about" element={<About />} />
        <Route path="/therapistDb" element={<TherapistDB />} />
        <Route path="/therapist" element={<Meet />} />
        <Route path="/sos" element={<SOS />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/feedBack" element={<FeedBack />} />
        <Route path="/403" element={<Forbidden />} />
        <Route path="/appointments" element={<Appoinment />} />
        <Route path="/sessions" element={<Sessions />} />
      </Routes>
    </Router>
  );
}

export default App;
