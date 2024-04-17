import axios from "axios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [refreshToken, setRefreshToken] = useState(
    localStorage.getItem("refreshToken")
  );

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      localStorage.setItem("token", token);
    } else {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem("token");
    }
  }, [token]);

  const refreshAccessToken = async () => {
    try {
      const response = await axios.post(
        "http://13.200.128.137/:8000/token/refresh/",
        { refreshToken }
      );
      const { accessToken } = response.data;
      setToken(accessToken);
      return accessToken; // Return the new access token
    } catch (error) {
      console.error("Error refreshing access token:", error);
      // Show an alert when token refresh fails due to expiration
      alert("Token has expired. Please log in again.");
      throw error; // Propagate the error
    }
  };

  const api = axios.create({
    baseURL: "http://13.200.128.137/:8000/",
  });

  api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const newAccessToken = await refreshAccessToken();
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return api(originalRequest); // Retry the original request with the new access token
        } catch (error) {
          // Handle refresh token error or redirect to login
          console.error("Error refreshing access token:", error);
          // For example, redirect to login page
          window.location.href = "/login";
        }
      }

      return Promise.reject(error);
    }
  );

  const contextValue = useMemo(() => ({ token, setToken }), [token]);

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
