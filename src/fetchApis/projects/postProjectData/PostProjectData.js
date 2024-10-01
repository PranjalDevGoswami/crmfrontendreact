import { PROJECTDATAAPIS } from "../../../../utils/constants/urls.js";
import SweetAlert from "../../../components/SweetAlert.js";
import { postWithAuthForUpload } from "../../../provider/helper/axios.js";

export const PostFormData = async (data) => {
  try {
    return await postWithAuthForUpload(PROJECTDATAAPIS, data, {
      method: "POST",
      body: JSON.stringify(data),
    });
  } catch (error) {
    SweetAlert({
      title: "Error",
      text: "An error occurred. Please try again.",
      icon: "error",
    });
  }
};
