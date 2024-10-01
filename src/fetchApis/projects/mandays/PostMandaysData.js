import { POSTMANDAYSDATA } from "../../../../utils/constants/urls.js";
import { postWithAuth } from "../../../provider/helper/axios";

export const PostMandaysData = async (data) => {
  try {
    const response = await postWithAuth(POSTMANDAYSDATA, data, {
      method: "POST",
      body: JSON.stringify(data),
    });
    return response;
  } catch (error) {
    console.log(error, "An error occurred. Please try again.");
  }
};
