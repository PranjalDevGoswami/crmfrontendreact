import { PROJECTDATAAPIS } from "../../../../utils/urls.js";
import { getWithAuth } from "../../../provider/helper/axios";

export const GetProjectData = async () => {
  return getWithAuth(PROJECTDATAAPIS);
};

export const ProjectDetails = async () => {
  try {
    const fetchDataFromApi2 = await GetProjectData();
    const projectDataObject = fetchDataFromApi2?.data?.map((val) => {
      return val;
    });
    return projectDataObject;
  } catch (error) {
    console.error("Error fetching project data:", error);
  }
};
