import React, { useContext, useEffect } from "react";
import useProjectData from "./useProjectData";
import {
  department,
  isHod,
  isManager,
  isTeamLead,
  role,
} from "../../src/config/Role";
import {
  isOperationDept,
  isPreSalesDept,
  isSalesDept,
} from "../../src/config/Departments";
import { FilterContext } from "../../src/ContextApi/FilterContext";

const useRoleWiseProjectData = () => {
  const {
    selectedStatus,
    selectedClient,
    setSelectedClient,
    setSearchTerm,
    searchTerm,
    selectedHod,
    setSelectedHod,
    selectedManager,
    setSelectedManager,
    selectedTl,
    setSelectedTl,
    clientsList,
    setClientsList,
    setFilteredProjectData,
    setTeamLeadAssiged,
    setClientListDataWithId,
    setClientListData,
    hodListArray,
    setHodListArray,
    managerListArray,
    setManagerListArray,
    tlListArray,
    setTlListArray,
  } = useContext(FilterContext);

  const department = localStorage.getItem("department");
  const userRole = localStorage.getItem("userrole");

  const projectData = useProjectData();

  useEffect(() => {
    let filteredData = projectData?.length > 0 ? projectData : [];
    if (
      selectedStatus &&
      selectedStatus !== "--Select Status--" &&
      selectedStatus !== "all"
    ) {
      filteredData = filteredData.filter((item) => {
        return item?.status?.toLowerCase() === selectedStatus?.toLowerCase();
      });
    }

    if (dateRange.startDate && dateRange.endDate) {
      filteredData = filteredData.filter((item) => {
        const projectStartDate = new Date(item?.tentative_start_date);
        const projectEndDate = new Date(item?.tentative_end_date);

        const startDate = new Date(dateRange.startDate);
        const endDate = new Date(dateRange.endDate);
        return projectStartDate >= startDate && projectEndDate <= endDate;
      });
    }

    if (selectedHod && selectedHod !== "--Select HOD--") {
      const operTeam = allUserList.filter(
        (item) => item?.department.id == isOperationDept
      );
      const Hods = operTeam.filter((item) => item?.role?.name === isHod);
      const currentSelectHod = Hods.find(
        (item) => item.user_role.id === selectedHod
      );
      const AllMemberUnderCurrentHod = allUserList.filter(
        (user) => user?.reports_to?.id === currentSelectHod?.id
      );
      const ManagerUnderSelectedHod = AllMemberUnderCurrentHod.filter(
        (item) => {
          return allManagerRoles.includes(item.role.name);
        }
      ).map((item) => {
        return item.user_role; // Accessing the user_role.name
      });
      setManagerListArray(ManagerUnderSelectedHod);
      const AllManagerAndTl = AllMemberUnderCurrentHod.map((item) =>
        Number(item?.id)
      );
      filteredData = filteredData.filter(
        (item) =>
          AllManagerAndTl.includes(
            Number(item.project_assigned_by_manager?.id)
          ) ||
          AllManagerAndTl.includes(
            Number(item.project_assigned_to_teamlead?.id)
          )
      );
    }
    if (selectedManager && selectedManager !== "--Select Manager--") {
      const operTeam = allUserList.filter(
        (item) => item?.department.id == isOperationDept
      );
      const Managers = operTeam.filter(
        (item) => item?.role?.name === isManager
      );
      const currentSelectManager = Managers.find(
        (item) => item.user_role.id === selectedManager
      );
      filteredData = filteredData.filter((item) =>
        [currentSelectManager?.user_role?.id].includes(
          Number(item.project_assigned_by_manager?.id)
        )
      );
    }

    if (selectedTl && selectedTl !== "--Select TeamLead--") {
      const TeamLeads = allUserList.filter(
        (item) => item?.role?.name === isTeamLead
      );
      const currentSelectTl = TeamLeads.find(
        (item) => item.user_role.id === selectedTl
      );
      filteredData = filteredData.filter((item) =>
        [currentSelectTl?.user_role?.id].includes(
          Number(item.project_assigned_to_teamlead?.id || item.created_by?.id)
        )
      );
    }
    if (selectedClient && selectedClient !== "--Select Client--") {
      filteredData = filteredData.filter(
        (item) => item?.clients?.id === selectedClient
      );
    }
    if (role === isTeamLead && department == isOperationDept) {
      filteredData = filteredData.filter((item) => {
        const ProjectAssigned = projectAssignedTo.filter(
          (item) => item?.project_assigned_to
        );
        const projectAssigned = ProjectAssigned.find(
          (assigned) => assigned.project_id === item.id
        );
        const isInProjectAssignedTo = projectAssigned?.project_assigned_to.some(
          (item) => item.id == userRole
        );
        const isInProjectAssignedToTeamlead =
          item.project_assigned_to_teamlead?.id === userRole;

        return isInProjectAssignedTo || isInProjectAssignedToTeamlead;
      });
    }
    if (
      (role === isTeamLead || role === isManager) &&
      (department == isSalesDept || department == isPreSalesDept)
    ) {
      filteredData = filteredData.filter(
        (item) => item?.created_by?.id == userRole
      );
    } else if (allManagerRoles.includes(role)) {
      filteredData = filteredData.filter((item) => {
        const projectAssigned = projectAssignedTo.find(
          (assigned) => assigned.project_id === item.id
        );
        const isInProjectAssignedTo = projectAssigned?.project_assigned_to.some(
          (assigned) => assigned.id == userRole
        );
        const isInProjectAssignedToTeamlead =
          item.project_assigned_to_teamlead?.id == userRole;
        const isInAssignedTo = item.assigned_to?.id == userRole;
        return (
          isInProjectAssignedTo ||
          isInProjectAssignedToTeamlead ||
          isInAssignedTo
        );
      });
    } else if (role === isHod) {
      filteredData = filteredData.filter((item) => {
        const assignedByManagerId = item?.project_assigned_by_manager?.id;
        const assignedToTeamLeadId = item?.project_assigned_to_teamlead?.id;
        const createdById = item?.created_by?.id;
        const assignedToId = item?.assigned_to?.id;

        return (
          userUnderHOD
            .map((user) => user.id)
            .some((userId) => {
              return (
                userId === assignedByManagerId ||
                userId === assignedToTeamLeadId ||
                userId === createdById ||
                userId === assignedToId
              );
            }) || item?.created_by?.id == userRole
        );
      });
    } else if (role === isSuperUser || role === isDirector) {
      if (
        selectedStatus &&
        selectedStatus !== "--Select Status--" &&
        selectedStatus !== "all"
      ) {
        filteredData = filteredData.filter(
          (item) =>
            item?.status?.toLowerCase() === selectedStatus?.toLowerCase()
        );
      }
    }
    setTeamLeadAssiged(filteredData);
    setFilteredProjectData(filteredData);
  }, [
    selectedStatus,
    selectedClient,
    selectedManager,
    selectedHod,
    selectedTl,
    Token,
    projectData,
    dateRange.endDate,
    dateRange.startDate,
  ]);

  return filteredData;
};

export default useRoleWiseProjectData;
