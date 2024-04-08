import { RAISECBR } from "../../../../utils/urls";

export const RaiseCBRPostApi = async (data) => {
  console.log("data from postFormData components", JSON.stringify(data));
  let token = localStorage.getItem("token");
  try {
    const response = await fetch(RAISECBR, {
      method: "POST",
      headers: {
        "Content-Type": "Application/Json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      alert("CBR hasbeen Raised !!!");
      console.log("data push successfully!");
      return response.json();
    }
  } catch (error) {
    // Display an alert for login error
    alert("An error occurred. Please try again.");
  }
};
