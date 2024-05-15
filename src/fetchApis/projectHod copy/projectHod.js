import { getWithAuth } from "../../provider/helper/axios.js";
import { PROJECT_HOD } from "../../../utils/urls.js";

export const GetProjectHod = async () => {
  return getWithAuth(PROJECT_HOD);
};
