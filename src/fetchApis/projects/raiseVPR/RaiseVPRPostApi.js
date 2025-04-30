import { RAISE_VPR } from "../../../../utils/constants/urls";
import { postWithAuth, postWithAuthFiles } from "../../../provider/helper/axios";

export const RaiseVPRPostApi = async (data) => {
  const response = await postWithAuthFiles(RAISE_VPR, data);
  return response;
};
