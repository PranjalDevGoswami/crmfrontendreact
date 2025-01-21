import { PROJECTTYPES } from "../../../../utils/constants/urls.js";
import { getWithAuth } from "../../../provider/helper/axios.js";

export const ProjectTypeList = async () => {
  return await getWithAuth(PROJECTTYPES);
};

export const FetchProjectType = async () => {
  try {
    const response = await getWithAuth(PROJECTTYPES);
    const projectTypeObject = response?.data?.results?.map((val) => val);
    return projectTypeObject;
  } catch (error) {
    console.error("Error fetching project type list:", error);
    return [];
  }
};
