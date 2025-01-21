import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addFilterProjectData } from "../slices/FilterProjectDataSlice";

const useProjectDataWIthRoleWiseFilter = () => {
  const [filterProjectData, setFilterProjectData] = useState([]);
  const userRole = localStorage.getItem("userrole");

  const projectDataResponse = useSelector(
    (store) => store.projectData.projects
  );  
  
  const role = localStorage.getItem("role");
  const userDataResponse = useSelector((store) => store.userData.users);
  const dispatchFilterProjectData = useDispatch();

  const fetchProjectData = async () => {
    if (role === "viewer" || role === "Director") {
      setFilterProjectData(projectDataResponse);
      dispatchFilterProjectData(addFilterProjectData(projectDataResponse));
      return;
    } else if (role === "HOD" && userDataResponse.length > 0) {
      const HodUsers = userDataResponse.filter(
        (user) => user?.reports_to?.id == userRole
      );
      const ProjectUnderHod = projectDataResponse?.filter(
        (project) =>
          HodUsers.some(
            (user) =>
              project.project_assigned_by_manager?.id == user.user_role.id ||
              project.assigned_to?.id == user.user_role.id ||
              project.created_by?.id == user.user_role.id
          ) ||
          project.assigned_to?.id == userRole ||
          project.created_by?.id == userRole ||
          project.project_assigned_by_manager?.id == userRole ||
          project.project_assigned_to_teamlead.some(
            (teamLead) => teamLead.id == userRole
          )
      );
      setFilterProjectData(ProjectUnderHod);
      dispatchFilterProjectData(addFilterProjectData(ProjectUnderHod));
    } else if (role === "Sr.Manager" && userDataResponse.length > 0) {
      const SrManagerUsers = userDataResponse.filter(
        (user) => user?.reports_to?.id == userRole
      );
      const ProjectUnderSrManager = projectDataResponse?.filter(
        (project) =>
          SrManagerUsers.some(
            (user) =>
              project.project_assigned_by_manager?.id == user.user_role.id ||
              project.assigned_to?.id == user.user_role.id ||
              project.created_by?.id == user.user_role.id ||
              project.project_assigned_to_teamlead.some(
                (teamLead) => teamLead.id == userRole
              ) ||
              project.project_assigned_to_teamlead?.id == user.user_role.id
          ) ||
          project.assigned_to?.id == userRole ||
          project.created_by?.id == userRole ||
          project.project_assigned_by_manager?.id == userRole ||
          project.project_assigned_to_teamlead.some(
            (teamLead) => teamLead.id == userRole
          )
      );
      setFilterProjectData(ProjectUnderSrManager);
      dispatchFilterProjectData(addFilterProjectData(ProjectUnderSrManager));
    } else if (role === "Manager" && userDataResponse.length > 0) {
      const ManagerUsers = userDataResponse.filter(
        (user) => user?.reports_to?.id == userRole
      );
      const ProjectUnderManager = projectDataResponse?.filter(
        (project) =>
          ManagerUsers.some(
            (user) =>
              project.project_assigned_by_manager?.id == user.user_role.id ||
              project.assigned_to?.id == user.user_role.id ||
              project.created_by?.id == user.user_role.id ||
              project.project_assigned_to_teamlead.some(
                (teamLead) => teamLead.id == userRole
              ) ||
              project.project_assigned_to_teamlead?.id == user.user_role.id
          ) ||
          project.assigned_to?.id == userRole ||
          project.created_by?.id == userRole ||
          project.project_assigned_by_manager?.id == userRole ||
          project.project_assigned_to_teamlead.some(
            (teamLead) => teamLead.id == userRole
          )      );
      setFilterProjectData(ProjectUnderManager);
      dispatchFilterProjectData(addFilterProjectData(ProjectUnderManager));
    } else if (role === "Ass.Manager") {
      const ProjectUnderManager = projectDataResponse?.filter((project) => {
        const assignedToTeamLead = Array.isArray(
          project.project_assigned_to_teamlead
        )
          ? project.project_assigned_to_teamlead.some(
              (item) => item?.id == userRole
            )
          : project.project_assigned_to_teamlead?.id == userRole;

        return (
          assignedToTeamLead ||
          project.assigned_to?.id == userRole ||
          project.project_assigned_by_manager?.id == userRole ||
          project.project_assigned_to?.id == userRole ||
          project.created_by?.id == userRole ||
          project.project_assigned_to_teamlead.some(
            (teamLead) => teamLead.id == userRole
          )
        );
      });

      dispatchFilterProjectData(addFilterProjectData(ProjectUnderManager));
      setFilterProjectData(ProjectUnderManager);
    } else if (role === "Team Lead") {
      const ProjectUnderTeamLead = projectDataResponse?.filter(
        (project) =>
          project?.project_assigned_to_teamlead?.some((item) => {
            return item.id == userRole;
          }) || project.created_by?.id == userRole
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
