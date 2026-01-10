import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Cookies from "js-cookie";
import API from "../../api/api.js";
import { useNavigate } from "react-router-dom";

const SOSButton = () => {
  const [open, setOpen] = useState(false);
  const [isSendingSOS, setIsSendingSOS] = useState(false);
  const email = Cookies.get("email");
  const role = Cookies.get("role");
  const userName = Cookies.get("userName");
  const navigate = useNavigate();

  const handleClickOpen = () => {
    if (!email || role === "THERAPIST") {
      navigate("/403");
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const sendSOSRequest = async (latitude, longitude) => {
    setIsSendingSOS(true);

    const sosData = {
      userId: email,
      username: userName,
      latitude: latitude,
      longitude: longitude,
    };

    try {
      const response = await API.post("/user/api/send-sos", sosData);
      console.log("SOS Response:", response.data);
      alert("Emergency support has been notified. Help is on the way.");
    } catch (error) {
      console.error("Error sending SOS:", error);
      alert("Unable to send emergency alert. Please try again or contact emergency services directly.");
    } finally {
      setIsSendingSOS(false);
    }
  };

  const handleConfirm = () => {
    setOpen(false);
    setIsSendingSOS(true);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          sendSOSRequest(latitude, longitude);
        },
        (error) => {
          console.error("Geolocation error:", error);
          alert("Unable to determine your location. Please contact emergency services directly.");
          setIsSendingSOS(false);
        }
      );
    } else {
      alert("Location services are not available. Please contact emergency services directly.");
      setIsSendingSOS(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center flex-col py-20">
      <div className="text-center mb-12 animate-fade-in">
        <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 gradient-text">
          Emergency Support
        </h1>
        <p className="text-xl text-neutral-600 max-w-2xl mx-auto leading-relaxed">
          If you're experiencing a mental health crisis or need immediate support,
          we're here to help. Your safety and well-being are our top priority.
        </p>
      </div>

      <div className="relative flex items-center justify-center group mb-8">
        {/* Outer pulse ring */}
        <div className="absolute w-96 h-96 rounded-full bg-error-200 opacity-30 animate-pulse group-hover:scale-110 transition-transform duration-500"></div>

        {/* Middle pulse ring */}
        <div className="absolute w-80 h-80 rounded-full bg-error-300 opacity-50 animate-pulse group-hover:scale-125 transition-transform duration-500" style={{ animationDelay: '0.5s' }}></div>

        {/* Inner pulse ring */}
        <div className="absolute w-64 h-64 rounded-full bg-error-400 opacity-70 animate-pulse group-hover:scale-140 transition-transform duration-500" style={{ animationDelay: '1s' }}></div>

        {/* Main SOS button */}
        <button
          className="relative w-48 h-48 rounded-full bg-gradient-to-br from-error-500 to-error-600 text-white text-4xl font-display font-bold flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-large hover:shadow-glow disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleClickOpen}
          disabled={isSendingSOS}
        >
          {isSendingSOS ? (
            <div className="flex items-center space-x-2">
              <div className="loading-dots">
                <div></div>
                <div></div>
                <div></div>
              </div>
              <span className="text-sm">Sending...</span>
            </div>
          ) : (
            "SOS"
          )}
        </button>
      </div>

      {/* Emergency information */}
      <div className="text-center max-w-2xl mx-auto px-6">
        <div className="bg-error-50 border border-error-200 rounded-xl p-6 mb-6">
          <h3 className="text-lg font-semibold text-error-800 mb-3">
            Need Immediate Help?
          </h3>
          <p className="text-error-700 mb-4">
            If you're in immediate danger or experiencing thoughts of self-harm,
            please contact emergency services immediately:
          </p>
          <div className="space-y-2 text-sm">
            <p className="font-medium text-error-800">
              🚨 Emergency Services: <span className="font-mono">911</span>
            </p>
            <p className="font-medium text-error-800">
              📞 Crisis Hotline: <span className="font-mono">988</span>
            </p>
            <p className="font-medium text-error-800">
              💬 Crisis Text Line: <span className="font-mono">Text HOME to 741741</span>
            </p>
          </div>
        </div>
      </div>

      {/* Confirmation Dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          style: {
            borderRadius: '16px',
            padding: '8px'
          }
        }}
      >
        <DialogTitle id="alert-dialog-title" className="text-xl font-display font-bold text-error-800">
          Send Emergency Alert?
        </DialogTitle>
        <DialogContent>
          <DialogContentText className="text-base text-neutral-700 leading-relaxed">
            This will immediately notify our emergency response team with your location.
            Are you sure you want to send an emergency alert? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions className="p-4">
          <Button
            onClick={handleClose}
            className="px-6 py-2 border-2 border-neutral-300 text-neutral-700 hover:bg-neutral-50"
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            autoFocus
            className="px-6 py-2 bg-error-600 text-white hover:bg-error-700"
          >
            Send Alert
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default SOSButton;
