import { PROJECTDATAAPIS } from "../../../../utils/urls.js";
import { getWithAuth } from "../../../provider/helper/axios";

export const GetProjectData = async () => {
  return getWithAuth(PROJECTDATAAPIS);
};
