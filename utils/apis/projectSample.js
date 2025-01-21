import { getWithAuth } from "../../src/provider/helper/axios";
import { EDITPROJECTREQUEST, PROJECTDATAAPIS } from "../constants/urls";

export const ProjectSample = async (id) => {
  const data = await getWithAuth(EDITPROJECTREQUEST(id));
  const response = data?.data;
  return response;
};
