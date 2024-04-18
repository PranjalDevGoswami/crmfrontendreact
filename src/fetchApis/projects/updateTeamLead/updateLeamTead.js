import { UPDATEPROJECTDATAAPIS } from "../../../../utils/urls.js";
import { putWithAuth } from "../../../provider/helper/axios.js";

export const UpdateTeamLead = async (projectId, data) => {
  try {
    const response = await putWithAuth(
      `${UPDATEPROJECTDATAAPIS}/${projectId}/`,
      data,
      {
        method: "PUT",
        body: JSON.stringify(data),
      }
    );
    if (response.ok) {
      // alert("Project Assign Successfully !!");
      // console.log("data push successfully!");
      return response.json();
    }
  } catch (error) {
    // Display an alert for login error
    alert("An error occurred. Please try again.");
  }
};
