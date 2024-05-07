import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LogoutTimer = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    let inactivityTimeout;

    const resetTimeout = () => {
      clearTimeout(inactivityTimeout);
      inactivityTimeout = setTimeout(logoutUser, 60000); // 1 minute inactivity timeout
    };

    const logoutUser = () => {
      setIsLoggedIn(false);
      navigate("/login");
      // Clear local storage
      localStorage.clear();
    };

    const handleUserActivity = () => {
      resetTimeout();
    };

    // Initial setup
    resetTimeout();

    // Event listeners for user activity
    window.addEventListener("mousemove", handleUserActivity);
    window.addEventListener("keydown", handleUserActivity);

    // Cleanup
    return () => {
      clearTimeout(inactivityTimeout);
      window.removeEventListener("mousemove", handleUserActivity);
      window.removeEventListener("keydown", handleUserActivity);
    };
  }, [isLoggedIn]);
};

export default LogoutTimer;
