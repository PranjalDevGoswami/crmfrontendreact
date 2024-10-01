import { PROJECT_MANAGER } from "../../../utils/constants/urls.js";
import { getWithAuth } from "../../provider/helper/axios.js";

export const GetProjectManager = async () => {
  return getWithAuth(PROJECT_MANAGER);
};
