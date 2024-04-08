import { GETPROJECTDATAAPIS } from "../../../../utils/urls";
import { getWithAuth } from "../../../provider/helper/axios";

export const GetProjectData = async () => {
  return getWithAuth(GETPROJECTDATAAPIS);
};
