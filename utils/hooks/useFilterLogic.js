// useFilterLogic.js
import { useContext, useEffect, useState } from "react";
import {
  isHod,
  isManager,
  isTeamLead,
  allManagerRoles,
  Token,
} from "../../src/config/Role.js";
import { isOperationDept, isSalesDept } from "../../src/config/Departments.js";
import { CloseAddClient } from "../../src/ContextApi/CloseAddClientContext.js";
import { ClientList } from "../../src/fetchApis/clientList/ClientList.js";
import { UPDATETLASSIGNMENT, USERROLE } from "../constants/urls.js";
import { GetProjectData } from "../../src/fetchApis/projects/getProjectData/GetProjectData.js";
import { FilterContext } from "../../src/ContextApi/FilterContext.js";
import { getWithAuth } from "../../src/provider/helper/axios.js";

export const useFilterLogic = () => {
  const {
    selectedStatus,
    selectedClient,
    setSelectedClient,
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

  const { closeAddClient } = useContext(CloseAddClient);
  const [projectAssignedTo, setProjectAssignedTo] = useState([]);
  const [projectData, setProjectData] = useState([]);
  const [userUnderHOD, setUserUnderHOD] = useState([]);
  const [allUserList, setAllUserList] = useState([]);
  const [dateRange, setDateRange] = useState({
    startDate: "",
    endDate: "",
  });

  const role = localStorage.getItem("role");
  const userRole = localStorage.getItem("userrole");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [clientResponse] = await Promise.all([ClientList()]);
        setClientsList(clientResponse?.data);
        setClientListDataWithId(clientResponse?.data);
        setClientListData(clientResponse?.data?.map((val) => val.name));
        const response = await getWithAuth(UPDATETLASSIGNMENT);
        setProjectAssignedTo(response?.data);

        const fetchDataFromApi2 = await GetProjectData();
        setProjectData(fetchDataFromApi2?.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [role, closeAddClient]);

  useEffect(() => {
    const fetchUserRole = async () => {
      const userRoleData = await getWithAuth(USERROLE);
      setAllUserList(userRoleData?.data);
      const currentUserDepartment = localStorage.getItem("department");
      const filteredUsers = userRoleData?.data.filter(
        (item) => item?.department?.id == currentUserDepartment
      );

      setHodListArray(
        filteredUsers
          ?.filter((item) => item?.role?.name === isHod)
          .map((item) => item?.user_role)
      );

      setManagerListArray(
        filteredUsers
          .filter((item) => allManagerRoles?.includes(item?.role?.name))
          .map((item) => item?.user_role)
      );

      setTlListArray(
        filteredUsers
          ?.filter((item) => item?.role?.name === isTeamLead)
          .map((item) => item?.user_role)
      );

      const AllUserUnderHod = userRoleData?.data
        ?.filter((item) => {
          return item?.reports_to?.id == userRole;
        })
        .map((item) => item?.user_role);

      setUserUnderHOD(AllUserUnderHod);
    };

    fetchUserRole();
  }, []);

  useEffect(() => {
    let filteredData = projectData?.length > 0 ? projectData : [];
    if (
      selectedStatus &&
      selectedStatus !== "--Select Status--" &&
      selectedStatus !== "all"
    ) {
      filteredData = filteredData.filter(
        (item) => item?.status?.toLowerCase() === selectedStatus?.toLowerCase()
      );
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

    if (selectedClient && selectedClient !== "--Select Client--") {
      filteredData = filteredData.filter(
        (item) => item?.clients?.id === selectedClient
      );
    }

    // Add other filtering logic based on selectedHod, selectedManager, selectedTl

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

  return {
    clientsList,
    hodListArray,
    managerListArray,
    tlListArray,
    dateRange,
    setDateRange,
  };
};
