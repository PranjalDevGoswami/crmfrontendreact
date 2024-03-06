import { GETPROJECTDATAAPIS } from "../../../../../utils/Apis";

export const GetProjectData = async () =>{
  const ProjectData = await fetch(GETPROJECTDATAAPIS);
  const ProjectDataJson = await ProjectData?.json();
  return ProjectDataJson;
}
