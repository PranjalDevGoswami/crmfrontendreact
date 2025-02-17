import { RAISEVPR } from "../../../../utils/constants/urls";
import SweetAlert from "../../../components/SweetAlert";
import { postWithAuth } from "../../../provider/helper/axios";

export const RaiseVPRPostApi = async (data) => {
  try {
    const response = await postWithAuth(RAISEVPR, data);
    return response;
  } catch (error) {
    SweetAlert({
      title: "Error",
      text: "An error occurred. Please try again.",
      icon: "error",
    });
  }
};
