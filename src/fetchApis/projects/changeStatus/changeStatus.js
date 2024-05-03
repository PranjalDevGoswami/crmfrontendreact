import { CHANGE_STATUS } from "../../../../utils/urls.js";
import { postWithAuth } from "../../../provider/helper/axios.js";

export const ChangeStatus = async (data) => {
  try {
    const response = await postWithAuth(CHANGE_STATUS, data, {
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
