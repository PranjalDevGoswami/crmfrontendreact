import { getWithAuth } from "../../provider/helper/axios.js";
import { PROJECT_TL } from "../../../utils/urls.js";

export const GetProjectTeamLead = async () => {
  return getWithAuth(PROJECT_TL);
};
