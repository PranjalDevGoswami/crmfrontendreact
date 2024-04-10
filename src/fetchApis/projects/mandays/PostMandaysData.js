import { POSTMANDAYSDATA } from "../../../../utils/urls";
import { postWithAuth } from "../../../provider/helper/axios";

export const PostMandaysData = async (mandaysData) => {
  console.log("mandaysData from mandays components", mandaysData);
  try {
    const response = await postWithAuth(POSTMANDAYSDATA, mandaysData, {
      body: JSON.stringify(mandaysData),
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
