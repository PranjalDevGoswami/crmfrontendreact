import React, { useState, useEffect } from "react";
import Login from "../user/Login.js";

const LogoutTimer = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    let inactivityTimeout;

    const resetTimeout = () => {
      clearTimeout(inactivityTimeout);
      inactivityTimeout = setTimeout(logoutUser, 600000); // 10 minute inactivity timeout
    };

    const logoutUser = () => {
      setIsLoggedIn(false);
      localStorage.clear();
    };

    const handleUserActivity = () => {
      resetTimeout();
    };

    resetTimeout();

    const handleOnline = () => {
      setIsOnline(true);
    };

    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    window.addEventListener("mousemove", handleUserActivity);
    window.addEventListener("keydown", handleUserActivity);
    return () => {
      clearTimeout(inactivityTimeout);
      window.removeEventListener("mousemove", handleUserActivity);
      window.removeEventListener("keydown", handleUserActivity);
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [isLoggedIn]);
};

export default LogoutTimer;
