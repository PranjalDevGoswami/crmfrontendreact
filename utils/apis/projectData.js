import { getWithAuth } from "../../src/provider/helper/axios";
import { PROJECTDATAAPIS } from "../constants/urls";

export const ProjectData = async () => {
  const data = await getWithAuth(PROJECTDATAAPIS);
  const response = data?.data;
  return response;
};
