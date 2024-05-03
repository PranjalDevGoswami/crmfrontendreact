import { RAISECBR } from "../../../../utils/urls";
import { postWithAuth } from "../../../provider/helper/axios";

export const RaiseCBRPostApi = async (data) => {
  try {
    const response = await postWithAuth(RAISECBR, data, {
      method: "POST",
      body: JSON.stringify(data),
    });
    if (response.ok) {
      alert("CBR hasbeen Raised !!!");
      return response.json();
    }
  } catch (error) {
    alert("An error occurred. Please try again.");
  }
};
