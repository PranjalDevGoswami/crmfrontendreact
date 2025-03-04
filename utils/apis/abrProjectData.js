import { getWithAuth } from "../../src/provider/helper/axios";
import { ABRPROJECT } from "../constants/urls";

export const abrProjectData = async () => {
  const data = await getWithAuth(ABRPROJECT);
  const response = data?.data;
  return response;
};
