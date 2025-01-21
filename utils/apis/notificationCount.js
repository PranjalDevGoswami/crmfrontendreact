import { getWithAuth } from "../../src/provider/helper/axios";
import { NOTIFICATIONCOUNT } from "../constants/urls";

export const notificationCount = async () => {
  const data = await getWithAuth(NOTIFICATIONCOUNT);
  const response = data?.data;
  return response;
};
