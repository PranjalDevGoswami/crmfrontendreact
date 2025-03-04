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
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [openFilter, setOpenFilter] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);

  const {
    activeTabValue,
    selectedStatus,
    selectedClient,
    setSearchTerm,
    searchTerm,
    selectedHod,
    selectedManager,
    selectedTl,
    setFilteredProjectData,
    setHodListArray,
    managerListArray,
    setManagerListArray,
    setTlListArray,
    dateRange,
    setDateRange,
    setFilteredProjectDataWithoutStatus,
  } = useContext(FilterContext);

  const { closeAddClient } = useContext(CloseAddClient);

  const role = localStorage.getItem("role");
  const isHod = "HOD";
  const isTeamLead = "Team Lead";
  const allManagerRoles = ["Sr.Manager", "Ass.Manager", "Manager"];

  const userRole = localStorage.getItem("userrole");
  const Token = localStorage.getItem("token");
  const isSalesDept = "1";
  const isOperationDept = "2";
  const darkMode = useSelector((store) => store.darkMode.isDarkMode);
  const department = localStorage.getItem('department');
  const isFinancialDepartment = department == 3;

  const projectResponse = useSelector(
    (store) => store.projectDataFiltered.projects
  );
  const {financeProjects} = useSelector(store=>store.projectData)
  const assignedProjectResponse = useAssignedProject();
  useClientList();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setProjectAssignedTo(assignedProjectResponse);
        // if(isFinancialDepartment){
        //   setProjectData(financeProjects)
        // }else{
        setProjectData(projectResponse);
        // }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [role, closeAddClient, Token, projectResponse, selectedItems]);

  const userData = useSelector((store) => store.userData.users);

  useEffect(() => {
    const fetchUSerRole = async () => {
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
    if (selectedClient && selectedClient !== "--Select Client--") {
      filteredData = filteredData.filter((item) => {
        return selectedClient.includes(item?.clients?.name);
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


    /**
     * Recursively fetch all users who report to the selected user (directly & indirectly).
     */
    const getAllAssociatedUsers = (userId, userData, result = new Set()) => {
      userData.forEach((user) => {
        if (
          user?.reports_to?.id === userId &&
          !result.has(user.user_role?.id)
        ) {
          result.add(user.user_role?.id);
          getAllAssociatedUsers(user.user_role?.id, userData, result); // Recursively add subordinates
        }
      });
      return result;
    };
   
    if (selectedOptions.length > 0) {

      const selectedUser = userData.find((user) =>
        selectedOptions.includes(user?.user_role?.name)
      );

      if (selectedUser) {
        // Get all direct & indirect reports of the selected user
        const associatedUserIds = getAllAssociatedUsers(
          selectedUser.user_role.id,
          userData
        );
        filteredData = filteredData.filter((project) => {
          // Extract assigned users and managers
          const assignedManagerId = project.project_assigned_by_manager?.id;
          const createdByUserId = project.created_by?.id;
          const assignedTeamLeadIds =
            project.project_assigned_to_teamlead?.map((tl) => tl.id) || [];

          // Check if any associated users match the project assignments
          return (
            associatedUserIds.has(assignedManagerId) ||
            assignedTeamLeadIds.some((id) => associatedUserIds.has(id)) ||
            associatedUserIds.has(createdByUserId)
          );
        });
      }
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
    activeTabValue,
  ]);

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
