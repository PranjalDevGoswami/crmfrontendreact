import { LOGINPOSTAPIS } from "../../../../utils/Apis";

export const PostLoginData = async (data) => {
  try {
    const response = await fetch(LOGINPOSTAPIS, {
      method: "POST",
      headers: {
        "Content-Type": "Application/Json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      const userData = await response.json();
      // Save user data to localStorage
      localStorage.setItem('token', JSON.stringify(userData.token));
      localStorage.setItem('isLoggedIn', JSON.stringify(true));
    }
   
  } catch (error) {
    // Display an alert for login error
    alert("An error occurred. Please try again.");
  }
};
