import { POSTPROJECTDATAAPIS } from "../../../../../utils/Apis";

export const PostFormData = async (data) => {
  console.log("data from postFormData components",JSON.stringify(data));
  try {
    const response = await fetch(POSTPROJECTDATAAPIS, {
      method: "POST",
      headers: {
        "Content-Type": "Application/Json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      console.log("data push successfully!");
        return response.json();
    }
   
  } catch (error) {
    // Display an alert for login error
    alert("An error occurred. Please try again.");
  }
}


