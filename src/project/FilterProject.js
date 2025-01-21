import React, { useContext, useEffect, useState } from "react";
import Input from "../Atom/InputField";
import { FilterContext } from "../ContextApi/FilterContext.js";
import { CloseAddClient } from "../ContextApi/CloseAddClientContext.js";
import DateRangeFilter from "../components/DateRangeFilter.js";
import { CiSearch } from "react-icons/ci";
import { IoFilter } from "react-icons/io5";
import FilterDrawer from "../components/FilterDrawer.js";
import useAssignedProject from "../../utils/hooks/useAssignedProject.js";
import useClientList from "../../utils/hooks/useClientList.js";
import { useSelector } from "react-redux";

const FilterProject = () => {
  const [projectAssignedTo, setProjectAssignedTo] = useState([]);
  const [projectData, setProjectData] = useState([]);
  const [userUnderHOD, setUserUnderHOD] = useState([]);
  const [allUserList, setAllUserList] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [openFilter, setOpenFilter] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);

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
    setFilteredProjectData,
    hodListArray,
    setHodListArray,
    managerListArray,
    setManagerListArray,
    tlListArray,
    setTlListArray,
    dateRange, setDateRange,
    filteredProjectDataWithoutStatus, setFilteredProjectDataWithoutStatus
  } = useContext(FilterContext);
  
  const { closeAddClient, setCloseAddClient } = useContext(CloseAddClient);

  const role = localStorage.getItem("role");
  const isSuperUser = "superUser";
  const isDirector = "Director";
  const isHod = "HOD";
  const isSrManager = "Sr.Manager";
  const isManager = "Manager";
  const isAssManager = "Ass.Manager";
  const isTeamLead = "Team Lead";
  const allManagerRoles = ["Sr.Manager", "Ass.Manager", "Manager"];

  const department = localStorage.getItem("department");
  const isSuperUserDepartment = [1, 2, 3, 4];
  const userRole = localStorage.getItem("userrole");
  const userName = localStorage.getItem("username");
  const Token = localStorage.getItem("token");
  const isSalesDept = "1";
  const isOperationDept = "2";
  const isFinanceDept = "3";
  const isPreSalesDept = "4";
  const darkMode = useSelector((store) => store.darkMode.isDarkMode);

  const projectResponse = useSelector(
    (store) => store.projectDataFiltered.projects
  );
  const assignedProjectResponse = useAssignedProject();
  useClientList();
  useEffect(() => {
    const fetchData = async () => {
      try {
        setProjectAssignedTo(assignedProjectResponse);
        setProjectData(projectResponse);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [role, closeAddClient, Token, projectResponse, selectedItems]);
  const userData = useSelector((store) => store.userData.users);

  useEffect(() => {
    const fetchUSerRole = async () => {
      setAllUserList(userData);
      const currentUserDepartment = localStorage.getItem("department");
      const filteredUsers = userData.filter((item) => {
        if (currentUserDepartment == isSalesDept) {
          return item?.department?.id == currentUserDepartment;
        }
        if (currentUserDepartment == isOperationDept) {
          return item?.department?.id == currentUserDepartment;
        }
        return true;
      });

      const hodList = filteredUsers?.filter(
        (item) => item?.role?.name == isHod
      );
      setHodListArray(hodList?.map((item) => item?.user_role));

      const managerList = filteredUsers.filter((item) =>
        allManagerRoles?.includes(item?.role?.name)
      );
      setManagerListArray(managerList.map((item) => item?.user_role));

      const tlList = filteredUsers.filter(
        (item) => item?.role?.name == isTeamLead
      );
      setTlListArray(tlList.map((item) => item?.user_role));

      const userRoleFilter = userData?.filter((item) => {
        return item?.reports_to?.id == userRole;
      });
      const AllUserUnderHod = userRoleFilter.map((item) => {
        return item?.user_role;
      });
      setUserUnderHOD(AllUserUnderHod);
    };
    fetchUSerRole();
  }, []);

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
    let AllManagerAndTl = [];
    let allUserUnderSelectedHod = [];
    const operTeam = allUserList.filter(
      (item) => item?.department?.id == isOperationDept
    );
    const Hods = operTeam.filter((item) => item?.role?.name == isHod);
    const currentSelectHod = Hods.find((item) =>
      selectedOptions.includes(item.user_role.name)
    );
    if (currentSelectHod) {
      const AllMemberUnderCurrentHod = allUserList.filter(
        (user) => user?.reports_to?.id === currentSelectHod?.id
      );
      allUserUnderSelectedHod = AllMemberUnderCurrentHod.map((user) =>
        user?.user_role?.name?.toLowerCase()
      );
      const ManagerUnderSelectedHod = AllMemberUnderCurrentHod.filter((item) =>
        allManagerRoles.includes(item.role.name)
      ).map((item) => item.user_role);

      setManagerListArray(ManagerUnderSelectedHod);
      AllManagerAndTl = AllMemberUnderCurrentHod.map((item) =>
        Number(item?.id)
      );
    }
    if (selectedOptions.length > 0) {
      filteredData = filteredData.filter((item) => {
        const includesSelectedOptions = selectedOptions.some(
          (selected) =>
            item?.clients?.name
              ?.toLowerCase()
              .includes(selected.toLowerCase()) ||
            item?.project_assigned_to_teamlead?.name
              ?.toLowerCase()
              .includes(selected.toLowerCase()) ||
            item?.project_assigned_by_manager?.name
              ?.toLowerCase()
              .includes(selected.toLowerCase()) ||
            allUserUnderSelectedHod.includes(
              item.project_assigned_by_manager?.name?.toLowerCase()
            ) ||
            allUserUnderSelectedHod.includes(
              item.project_assigned_to_teamlead?.name?.toLowerCase()
            )
        );
        const hodMatches =
          AllManagerAndTl.length > 0 &&
          (AllManagerAndTl.includes(
            Number(item.project_assigned_by_manager?.id)
          ) ||
            AllManagerAndTl.includes(
              Number(item.project_assigned_to_teamlead?.id)
            ));

        return includesSelectedOptions || hodMatches;
      });
    }
    setFilteredProjectData(filteredData);
  }, [
    projectData,
    selectedStatus,
    dateRange,
    selectedHod,
    selectedManager,
    selectedTl,
    selectedClient,
    selectedOptions,
  ]);

  useEffect(() => {
    let filteredData = projectData?.length > 0 ? projectData : [];
    const currentYear = new Date().getFullYear();
const startDate = new Date(`1 Jan ${currentYear}`);
const endDate = new Date(`31 Dec ${currentYear}`);

// Step 1: Filter `filteredData` for the current year considering overlapping date ranges
if (!dateRange.startDate && !dateRange.endDate && !selectedOptions.length > 0) {
  filteredData = filteredData.filter((item) => {
    const projectStartDate = new Date(item?.tentative_start_date);
    const projectEndDate = new Date(item?.tentative_end_date);

    // Check if any part of the project lies within the date range
    return (
      (projectStartDate >= startDate && projectStartDate <= endDate) || // Start date is within the range
      (projectEndDate >= startDate && projectEndDate <= endDate) ||   // End date is within the range
      (projectStartDate <= startDate && projectEndDate >= endDate)    // Project spans the entire range
    );
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
    let AllManagerAndTl = [];
    let allUserUnderSelectedHod = [];
    const operTeam = allUserList.filter(
      (item) => item?.department?.id == isOperationDept
    );
    const Hods = operTeam.filter((item) => item?.role?.name == isHod);
    const currentSelectHod = Hods.find((item) =>
      selectedOptions.includes(item.user_role.name)
    );
    if (currentSelectHod) {
      const AllMemberUnderCurrentHod = allUserList.filter(
        (user) => user?.reports_to?.id === currentSelectHod?.id
      );
      allUserUnderSelectedHod = AllMemberUnderCurrentHod.map((user) =>
        user?.user_role?.name?.toLowerCase()
      );
      const ManagerUnderSelectedHod = AllMemberUnderCurrentHod.filter((item) =>
        allManagerRoles.includes(item.role.name)
      ).map((item) => item.user_role);

      setManagerListArray(ManagerUnderSelectedHod);
      AllManagerAndTl = AllMemberUnderCurrentHod.map((item) =>
        Number(item?.id)
      );
    }
    if (selectedOptions.length > 0) {
      filteredData = filteredData.filter((item) => {
        const includesSelectedOptions = selectedOptions.some(
          (selected) =>
            item?.clients?.name
              ?.toLowerCase()
              .includes(selected.toLowerCase()) ||
            item?.project_assigned_to_teamlead?.name
              ?.toLowerCase()
              .includes(selected.toLowerCase()) ||
            item?.project_assigned_by_manager?.name
              ?.toLowerCase()
              .includes(selected.toLowerCase()) ||
            allUserUnderSelectedHod.includes(
              item.project_assigned_by_manager?.name?.toLowerCase()
            ) ||
            allUserUnderSelectedHod.includes(
              item.project_assigned_to_teamlead?.name?.toLowerCase()
            )
        );
        const hodMatches =
          AllManagerAndTl.length > 0 &&
          (AllManagerAndTl.includes(
            Number(item.project_assigned_by_manager?.id)
          ) ||
            AllManagerAndTl.includes(
              Number(item.project_assigned_to_teamlead?.id)
            ));

        return includesSelectedOptions || hodMatches;
      });
    }

    setFilteredProjectDataWithoutStatus(filteredData);
  }, [
    projectData,
    selectedStatus,
    dateRange,
    selectedHod,
    selectedManager,
    selectedTl,
    selectedClient,
    selectedOptions,
  ]);

  const handleClearAllSelection = () => {
    setSelectedItems([]);
    setSelectedClient("");
  };

  return (
    <div className="flex items-center">
      <div className="flex items-center justify-center">
        {openSearch && (
          <div className="text-right">
            <Input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onchange={(e) => setSearchTerm(e.target.value)}
              className={`${
                darkMode && "bg-black border-white"
              } p-1 border-b border-blue-400 !rounded-none w-8/12 focus:outline-none text-blue-400 text-sm"`}
              id={"search"}
            />
          </div>
        )}
        <div
          className="p-2 mr-1 ml-1 cursor-pointer text-lg text-blue-400"
          onClick={() => {
            setOpenSearch(!openSearch);
          }}
        >
          <CiSearch
            onClick={() => {
              setOpenSearch(!openSearch);
            }}
          />
        </div>
      </div>
      <div className="flex items-center">
        <DateRangeFilter dateRange={dateRange} setDateRange={setDateRange} />
      </div>
      <div className="flex items-center">
        <button
          className="p-2 border border-gray-200 bg-gray-100 rounded-sm text-sm flex items-center text-blue-400"
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
          openFilter={openFilter}
          selectedOptions={selectedOptions}
          setSelectedOptions={setSelectedOptions}
        />
      )}
    </div>
  );
};

export default FilterProject;
