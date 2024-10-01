import React, { useContext, useEffect, useState } from "react";
import Dropdown from "../components/DropDown";
import { ClientList } from "../fetchApis/clientList/ClientList.js";
import Input from "../components/InputField.js";
import { FilterContext } from "../ContextApi/FilterContext.js";
import { ThemeContext } from "../ContextApi/ThemeContext.js";
import { CloseAddClient } from "../ContextApi/CloseAddClientContext.js";
import { getWithAuth } from "../provider/helper/axios.js";
import { GetProjectData } from "../fetchApis/projects/getProjectData/GetProjectData.js";
import DateRangeFilter from "../components/DateRangeFilter.js";
import {
  isOperationDept,
  isPreSalesDept,
  isSalesDept,
} from "../config/Departments.js";
import {
  allManagerRoles,
  isDirector,
  isHod,
  isManager,
  isSuperUser,
  isTeamLead,
  Token,
} from "../config/Role.js";
import { UPDATETLASSIGNMENT, USERROLE } from "../../utils/constants/urls.js";
import useProjectData from "../../utils/hooks/useProjectData.js";
import { CiSearch } from "react-icons/ci";
import { IoFilter } from "react-icons/io5";
import FilterDrawer from "../components/FilterDrawer.js";

const FilterProject = () => {
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
  const role = localStorage.getItem("role");

  const { closeAddClient, setCloseAddClient } = useContext(CloseAddClient);
  const [projectAssignedTo, setProjectAssignedTo] = useState([]);
  const [projectData, setProjectData] = useState([]);
  const [userUnderHOD, setUserUnderHOD] = useState([]);
  const [allUserList, setAllUserList] = useState([]);
  const [dateRange, setDateRange] = useState({
    startDate: "",
    endDate: "",
  });
  const { darkMode } = useContext(ThemeContext);
  const [openFilter, setOpenFilter] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const department = localStorage.getItem("department");
  const userRole = localStorage.getItem("userrole");

  const projectResponse = useProjectData();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [clientResponse] = await Promise.all([ClientList()]);
        setClientsList(clientResponse?.data?.map((val) => val));
        setClientListDataWithId(clientResponse?.data);
        const clientDataItems = clientResponse?.data?.map((val) => val.name);
        setClientListData(clientDataItems);
        const response = await getWithAuth(UPDATETLASSIGNMENT);
        const data = response?.data;
        setProjectAssignedTo(data);
        setProjectData(projectResponse);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [role, closeAddClient, Token, projectResponse]);

  useEffect(() => {
    const fetchUSerRole = async () => {
      const userRoleData = await getWithAuth(USERROLE);
      setAllUserList(userRoleData?.data);
      const currentUserDepartment = localStorage.getItem("department");
      const filteredUsers = userRoleData?.data.filter((item) => {
        if (currentUserDepartment == isSalesDept) {
          return item?.department?.id == currentUserDepartment;
        }
        if (currentUserDepartment == isOperationDept) {
          return item?.department?.id == currentUserDepartment;
        }
        return true;
      });

      const hodList = filteredUsers?.filter(
        (item) => item?.role?.name === isHod
      );
      setHodListArray(hodList?.map((item) => item?.user_role));

      const managerList = filteredUsers.filter((item) =>
        allManagerRoles?.includes(item?.role?.name)
      );
      setManagerListArray(managerList.map((item) => item?.user_role));

      const tlList = filteredUsers.filter(
        (item) => item?.role?.name === isTeamLead
      );
      setTlListArray(tlList.map((item) => item?.user_role));

      const userRoleFilter = userRoleData?.data?.filter((item) => {
        return item?.reports_to?.id == userRole;
      });
      const AllUserUnderHod = userRoleFilter.map((item) => {
        return item?.user_role;
      });
      setUserUnderHOD(AllUserUnderHod);
    };
    fetchUSerRole();
  }, []);

  // const handleFilterOption = (name, value) => {
  //   console.log(name, value);

  //   if (name === "Client") {
  //     const clientID = clientsList.filter(
  //       (item) =>
  //         item?.name?.toLowerCase() === value?.map((val) => val.toLowerCase())
  //     );
  //     setSelectedClient(clientID[0]?.id);
  //   }
  //   if (name === isHod) {
  //     const hodID = hodListArray.filter((item) => item?.name?.includes(value));
  //     setSelectedHod(hodID[0]?.id);
  //   }
  //   if (name === isManager) {
  //     const ManagerId = managerListArray?.filter((item) =>
  //       item?.name?.includes(value)
  //     );
  //     setSelectedManager(ManagerId[0]?.id);
  //   }
  //   if (name === isTeamLead) {
  //     const TlId = tlListArray?.filter((item) => item?.name?.includes(value));
  //     setSelectedTl(TlId[0]?.id);
  //   }
  // };

  const handleFilterOption = (name, valueObj) => {
    // Extract the array of selected values
    const values = valueObj?.value?.map((v) => v.toLowerCase()) || [];
    if (name === "Client") {
      // Find all clients that match any of the selected values
      const selectedClients = clientsList.filter((item) =>
        values.includes(item?.name?.toLowerCase())
      );
      const clientIDs = selectedClients.map((client) => client.id);
      setSelectedClient(clientIDs); // Update this to set an array of selected client IDs
    }

    if (name === isHod) {
      const selectedHods = hodListArray.filter((item) =>
        values.some((val) => item?.name?.toLowerCase().includes(val))
      );
      const hodIDs = selectedHods.map((hod) => hod.id);
      setSelectedHod(hodIDs); // Update this to set an array of selected HOD IDs
    }

    if (name === isManager) {
      console.log(managerListArray);

      const selectedManagers = managerListArray.filter((item) =>
        values.some((val) => item?.name?.toLowerCase().includes(val))
      );
      const managerIDs = selectedManagers.map((manager) => manager.id);
      setSelectedManager(managerIDs); // Update this to set an array of selected Manager IDs
    }

    if (name === isTeamLead) {
      const selectedTls = tlListArray.filter((item) =>
        values.some((val) => item?.name?.toLowerCase().includes(val))
      );
      const tlIDs = selectedTls.map((tl) => tl.id);
      setSelectedTl(tlIDs); // Update this to set an array of selected Team Lead IDs
    }
  };

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
      const currentSelectHod = Hods.find((item) =>
        selectedHod.includes(item.user_role.id)
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
      const currentSelectManager = Managers.find((item) =>
        selectedManager.includes(item.user_role.id)
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
      filteredData = filteredData.filter((item) =>
        selectedClient?.includes(item?.clients?.id)
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

  return (
    <div className="flex items-center justify-between">
      <DateRangeFilter dateRange={dateRange} setDateRange={setDateRange} />
      {openSearch && (
        <div className="w-full">
          <Input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onchange={(e) => setSearchTerm(e.target.value)}
            className={`${
              darkMode && "bg-black border-white"
            } p-2 border border-black rounded w-10/12 focus:outline-none"`}
            id={"search"}
          />
        </div>
      )}
      <div className="flex items-center justify-end w-1/2">
        <div
          className="w-1/12 mr-4 cursor-pointer text-xl"
          onClick={() => {
            setOpenSearch(!openSearch);
          }}
        >
          <CiSearch />
        </div>
        <button
          className="p-2 border border-gray-200 bg-gray-100 rounded-sm text-sm flex items-center justify-around text-blue-400"
          onClick={() => {
            setOpenFilter(!openFilter);
          }}
        >
          <IoFilter className="mr-2" />
          Filter
        </button>
      </div>
      {openFilter && (
        <FilterDrawer
          setOpenFilter={setOpenFilter}
          handleFilterOption={handleFilterOption}
          role={role}
          clientsList={clientsList}
          dateRange={dateRange}
          setDateRange={setDateRange}
          tlListArray={tlListArray}
          hodListArray={tlListArray}
          managerListArray={managerListArray}
        />
      )}
    </div>
  );
};

export default FilterProject;
