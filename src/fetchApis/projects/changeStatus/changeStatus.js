import { POSTMANDAYSDATA } from "../../../../utils/urls.js";
import { postWithAuth } from "../../../provider/helper/axios.js";

export const ManWorkPerDays = async (data) => {
  try {
    const response = await postWithAuth(POSTMANDAYSDATA, data, {
      method: "POST",
      body: JSON.stringify(data),
    });
    if (response.status == true) {
      return response.data;
    }
  } catch (error) {
    // Display an alert for login error
    alert("An error occurred. Please try again.");
  }
};