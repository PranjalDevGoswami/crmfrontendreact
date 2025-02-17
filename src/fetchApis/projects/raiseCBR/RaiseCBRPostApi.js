import { RAISECBR } from "../../../../utils/constants/urls";
import SweetAlert from "../../../components/SweetAlert";
import { postWithAuth } from "../../../provider/helper/axios";

export const RaiseCBRPostApi = async (data) => {
  try {
    const response = await postWithAuth(RAISECBR, data);
    return response;
  } catch (error) {
    SweetAlert({
      title: "Error",
      text: "An error occurred. Please try again.",
      icon: "error",
    });
  }
};
