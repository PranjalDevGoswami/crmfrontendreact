import { LOGINPOSTAPIS } from "../../../utils/urls";

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
    // if (!response.ok) {
    //   // If response is not successful, throw an error
    //   throw new Error("Network response was not ok");
    // }

    // Assuming you want to return the JSON response
    return await response.json();
  } catch (error) {
    // Display an alert for login error
    alert("An error occurred. Please try again.", error);
  }
};
