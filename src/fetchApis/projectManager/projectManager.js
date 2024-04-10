import { getWithAuth } from "../../provider/helper/axios.js";
import { PROJECT_MANAGER } from "../../../utils/urls";

export const GetProjectManager = async () => {
  return getWithAuth(PROJECT_MANAGER);
};
