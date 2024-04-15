import { GetProjectData } from "../src/fetchApis/projects/getProjectData/GetProjectData";

const ProjectData = async ({ setDataForSales }) => {
  const role = localStorage.getItem("role");
  const user = localStorage.getItem("user");
  try {
    const fetchDataFromApi2 = await GetProjectData();
    const projectDataObject = fetchDataFromApi2?.data?.map((val) => {
      return val;
    });
    if (role.includes("TeamLead")) {
      const DataShownByCurrentUser = projectDataObject.filter((item) => {
        return item.user_email === user;
      });
      setDataForSales(DataShownByCurrentUser);
    } else if (role.includes("manager")) {
      setDataForSales(projectDataObject);
    }
  } catch (error) {
    console.error("Error fetching project data:", error);
  }
  return ProjectData;
};
export default ProjectData;
