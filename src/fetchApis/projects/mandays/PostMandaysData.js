import { POSTMANDAYSDATA } from "../../../../utils/urls.js";
import { postWithAuth } from "../../../provider/helper/axios";

export const PostMandaysData = async (data) => {
  try {
    return await postWithAuth(POSTMANDAYSDATA, data, {
      method: "POST",
      body: JSON.stringify(data),
    });
    // if (response.ok) {
    //   console.log("data push successfully!");
    //   // return response.json();
    // }
  } catch (error) {
    alert(error, "An error occurred. Please try again.");
  }
};
