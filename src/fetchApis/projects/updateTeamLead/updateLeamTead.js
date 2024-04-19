import { UPDATEPROJECTDATAAPIS } from "../../../../utils/urls.js";
import { putWithAuth } from "../../../provider/helper/axios.js";

export const UpdateTeamLead = async (data) => {
  try {
    const response = await putWithAuth(UPDATEPROJECTDATAAPIS, data, {
      method: "PUT",
      body: JSON.stringify(data),
    });
    return response;
  } catch (error) {
    // Display an alert for login error
    alert("An error occurred. Please try again.");
  }
};
