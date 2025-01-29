import { RAISECBR } from "../../../../utils/constants/urls";
import SweetAlert from "../../../components/SweetAlert";
import { patchWithAuth } from "../../../provider/helper/axios";

export const RaiseCBRPostApi = async (id,data) => {
  try {
    const response = await patchWithAuth(RAISECBR(id), data, {
      method: "POST",
      body: JSON.stringify(data),
    });
    return response;
  } catch (error) {
    SweetAlert({
      title: "Error",
      text: "An error occurred. Please try again.",
      icon: "error",
    });
  }
};
