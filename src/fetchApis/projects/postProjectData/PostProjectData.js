import { PROJECTDATAAPIS } from "../../../../utils/urls.js";
import { postWithAuthForUpload } from "../../../provider/helper/axios.js";

export const PostFormData = async (data) => {
  try {
    return await postWithAuthForUpload(PROJECTDATAAPIS, data, {
      method: "POST",
      body: JSON.stringify(data),
    });
  } catch (error) {
    alert("An error occurred. Please try again.");
  }
};
