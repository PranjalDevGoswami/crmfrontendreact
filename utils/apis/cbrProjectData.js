import { getWithAuth } from "../../src/provider/helper/axios";
import { FINANCEPROJECT } from "../constants/urls";

export const cbrProjectData = async () => {
  const data = await getWithAuth(FINANCEPROJECT);
  const response = data?.data;
  return response;
};
