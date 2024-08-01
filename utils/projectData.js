// import { GetProjectData } from "../src/fetchApis/projects/getProjectData/GetProjectData";

// export const ProjectData = async ({ setFilteredProjectData }) => {
//   const role = localStorage.getItem("role");
//   const user = localStorage.getItem("user");
//   try {
//     const fetchDataFromApi2 = await GetProjectData();
//     const projectDataObject = fetchDataFromApi2?.data?.map((val) => {
//       return val;
//     });
//     if (role.includes("TeamLead")) {
//       const DataShownByCurrentUser = projectDataObject.filter((item) => {
//         return item.user_email === user;
//       });
//       setFilteredProjectData(DataShownByCurrentUser);
//     } else if (role.includes("manager")) {
//       setFilteredProjectData(projectDataObject);
//     }
//   } catch (error) {
//     console.error("Error fetching project data:", error);
//   }
//   return ProjectData;
// };
