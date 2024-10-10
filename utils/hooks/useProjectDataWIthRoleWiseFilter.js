import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  allManagerRoles,
  isDirector,
  isHod,
  isTeamLead,
} from "../../src/config/Role";
import { useDispatch } from "react-redux";
import { addFilterProjectData } from "../slices/FilterProjectDataSlice";

const useProjectDataWIthRoleWiseFilter = () => {
  const [filterProjectData, setFilterProjectData] = useState([]);
  const role = localStorage.getItem("role");
  const userRole = localStorage.getItem("userrole");

  const projectDataResponse = useSelector(
    (store) => store.projectData.projects
  );

  const userDataResponse = useSelector((store) => store.userData.users);
  const dispatchFilterProjectData = useDispatch();

  const fetchProjectData = async () => {
    if (role === isDirector) {
      setFilterProjectData(projectDataResponse);
      dispatchFilterProjectData(addFilterProjectData(projectDataResponse));

      return;
    } else if (role === isHod && userDataResponse.length > 0) {
      const HodUsers = userDataResponse.filter(
        (user) => user?.reports_to?.id == userRole
      );
      const ProjectUnderHod = projectDataResponse.filter((project) =>
        HodUsers.some(
          (user) =>
            project.project_assigned_by_manager?.id == user.user_role.id ||
            project.assigned_to?.id == user.user_role.id ||
            project.created_by?.id == user.user_role.id
        )
      );
      setFilterProjectData(ProjectUnderHod);
      dispatchFilterProjectData(addFilterProjectData(ProjectUnderHod));
    } else if (allManagerRoles.includes(role)) {
      const ManagerUsers = userDataResponse.filter(
        (user) => user?.reports_to?.id == userRole
      );
      const ProjectUnderManager = projectDataResponse.filter(
        (project) =>
          project.project_assigned_to_teamlead?.id == userRole ||
          project?.assigned_to?.id == userRole ||
          project.project_assigned_by_manager?.id == userRole
      );
      dispatchFilterProjectData(addFilterProjectData(ProjectUnderManager));
      setFilterProjectData(ProjectUnderManager);
    } else if (role == isTeamLead) {
      const ProjectUnderTeamLead = projectDataResponse.filter(
        (project) =>
          project.project_assigned_to_teamlead?.id == userRole ||
          project.created_by?.id == userRole
      );
      dispatchFilterProjectData(addFilterProjectData(ProjectUnderTeamLead));
      setFilterProjectData(ProjectUnderTeamLead);
    }
  };

  useEffect(() => {
    fetchProjectData();
  }, [projectDataResponse]);

  return filterProjectData;
};

export default useProjectDataWIthRoleWiseFilter;
