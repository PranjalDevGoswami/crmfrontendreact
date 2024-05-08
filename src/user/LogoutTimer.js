import React, { useState, useEffect } from "react";
import Login from "../user/Login.js";

const LogoutTimer = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  useEffect(() => {
    let inactivityTimeout;

    const resetTimeout = () => {
      clearTimeout(inactivityTimeout);
      inactivityTimeout = setTimeout(logoutUser, 600000); // 10 minute inactivity timeout
    };

    const logoutUser = () => {
      setIsLoggedIn(false);
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
