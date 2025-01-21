import React from "react";
import SweetAlert from "../../src/components/SweetAlert";
import { PostLoginData } from "../../src/fetchApis/login/PostLoginData";

export const useHandleLogin = async (loginData, setToken) => {
  try {
    const response = await PostLoginData(loginData);
    if (response && response.success) {
      setToken(response.access);
      localStorage.setItem("refreshToken", response.refresh);
      localStorage.setItem("user", loginData.email);
    }
    const showAlert = (title, text) => {
      SweetAlert({
        title: title,
        text: text,
        icon: "error",
      });
    };

    if (!response.ok) {
      if (loginData.password.length < 8) {
        showAlert(
          "Error",
          "Password must be greater than or equal to 8 characters"
        );
      } else if (!loginData.email) {
        showAlert("Error", "UserId/email cannot be blank!!");
      } else if (!loginData.password) {
        showAlert("Error", "Password cannot be blank!!");
      } else if (response.non_field_errors) {
        showAlert("Error", response.non_field_errors);
      } else if (response.status === 400) {
        showAlert("Error", response.message);
      }
    }
  } catch (error) {
    SweetAlert({
      title: "Error",
      text: "Error logging in:",
      error,
      icon: "error",
    });
  }
};
