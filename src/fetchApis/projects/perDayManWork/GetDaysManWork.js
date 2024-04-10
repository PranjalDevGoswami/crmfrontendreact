import { MANDAYSPERDAY } from "../../../../utils/urls.js";
import { postWithAuth } from "../../../provider/helper/axios.js";

export const ManWorkPerDays = async (data) => {
  console.log("🚀 ~ PostFormData ~ data:", data);
  try {
    const response = await postWithAuth(MANDAYSPERDAY, data, {
      method: "POST",
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
};