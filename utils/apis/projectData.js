import { getWithAuth } from "../../src/provider/helper/axios";
import { PROJECTDATAAPIS } from "../constants/urls";

export const ProjectData = async (page_number,page_size,activeTabValue) => {
  const data = await getWithAuth(PROJECTDATAAPIS(page_number,page_size,activeTabValue));
  const response = data?.data;
  return response;
};
