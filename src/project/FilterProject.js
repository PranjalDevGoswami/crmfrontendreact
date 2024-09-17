import React, { useContext, useEffect, useState } from "react";
import Dropdown from "../components/DropDown";
import { ClientList } from "../fetchApis/clientList/ClientList.js";
import Input from "../components/InputField.js";
import { FilterContext } from "../ContextApi/FilterContext.js";
import { ThemeContext } from "../ContextApi/ThemeContext.js";
import { CloseAddClient } from "../ContextApi/CloseAddClientContext.js";
import { UPDATETLASSIGNMENT, USERROLE } from "../../utils/urls.js";
import { getWithAuth } from "../provider/helper/axios.js";
import { GetProjectData } from "../fetchApis/projects/getProjectData/GetProjectData.js";
import DateRangeFilter from "../components/DateRangeFilter.js";

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
  const role = localStorage.getItem("role");
  let token = localStorage.getItem("token");
  let department = localStorage.getItem("department");
  let userrole = localStorage.getItem("userrole");

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
        const fetchDataFromApi2 = await GetProjectData();
        const projectDataObject = fetchDataFromApi2?.data?.map((val) => val);
        setProjectData(projectDataObject);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [role, closeAddClient, token]);

  useEffect(() => {
    const fetchUSerRole = async () => {
      const userRole = await getWithAuth(USERROLE);
      setAllUserList(userRole?.data);
      const OperationDeparmentUser = userRole?.data.filter((item) => {
        return item.department.name === "Operation";
      });

      const hodList = OperationDeparmentUser.filter(
        (item) => item.role.name === "HOD"
      );
      setHodListArray(hodList.map((item) => item.user_role));

      const managerList = OperationDeparmentUser.filter(
        (item) =>
          item.role.name === "Sr.Manager" ||
          item.role.name === "Manager" ||
          item.role.name === "Ass.Manager"
      );
      setManagerListArray(managerList.map((item) => item.user_role));

      const tlList = OperationDeparmentUser.filter(
        (item) => item.role.name === "Team Lead"
      );
      setTlListArray(tlList.map((item) => item.user_role));

      //display data when hod Login

      const userRoleFilter = userRole?.data?.filter((item) => {
        return item.reports_to?.id == userrole;
      });
      const AllUserUnderHod = userRoleFilter.map((item) => {
        return item.user_role;
      });

      setUserUnderHOD(AllUserUnderHod);
    };
    fetchUSerRole();
  }, []);

  const handleFilterOption = (name, value) => {
    if (name === "Client") {
      const clientID = clientsList.filter(
        (item) => item.name.toLowerCase() === value.toLowerCase()
      );
      setSelectedClient(clientID[0]?.id);
    }
    if (name === "HOD") {
      const hodID = hodListArray.filter((item) => item.name.includes(value));
      setSelectedHod(hodID[0]?.id);
    }
    if (name === "Manager") {
      const ManagerId = managerListArray.filter((item) =>
        item.name.includes(value)
      );
      setSelectedManager(ManagerId[0]?.id);
    }
    if (name === "TeamLead") {
      const TlId = tlListArray.filter((item) => item.name.includes(value));
      setSelectedTl(TlId[0]?.id);
    }
  };

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

    if (selectedHod && selectedHod !== "--Select HOD--") {
      const operTeam = allUserList.filter((item) => item?.department.id == 2);
      const Hods = operTeam.filter((item) => item?.role?.name === "HOD");
      const currentSelectHod = Hods.find(
        (item) => item.user_role.id === selectedHod
      );
      const AllMemberUnderCurrentHod = allUserList.filter(
        (user) => user?.reports_to?.id === currentSelectHod?.id
      );
      const ManagerUnderSelectedHod = AllMemberUnderCurrentHod.filter(
        (item) => {
          return (
            item.role.name === "Sr.Manager" ||
            item.role.name === "Manager" ||
            item.role.name === "Ass.Manager"
          );
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
          AllManagerAndTl.includes(Number(item.project_assigned_by_manager)) ||
          AllManagerAndTl.includes(Number(item.project_assigned_to_teamlead))
      );
    }
    if (selectedManager && selectedManager !== "--Select Manager--") {
      const operTeam = allUserList.filter((item) => item?.department.id == 2);
      const Managers = operTeam.filter(
        (item) => item?.role?.name === "Manager"
      );
      const currentSelectManager = Managers.find(
        (item) => item.user_role.id === selectedManager
      );

      // const TLUnderSelectedMAnager = currentSelectManager
      //   .filter((item) => {
      //     return item.role.name === "Team Lead";
      //   })
      //   .map((item) => {
      //     return item.user_role; // Accessing the user_role.name
      //   });
      // console.log(TLUnderSelectedMAnager);

      // setManagerListArray(TLUnderSelectedMAnager);
      filteredData = filteredData.filter((item) =>
        [currentSelectManager?.user_role?.id].includes(
          Number(item.project_assigned_by_manager)
        )
      );
    }

    // if (selectedTl && selectedTl !== "--Select TeamLead--") {
    //   const operTeam = allUserList.filter((item) => item?.department.id == 2);
    //   const TeamLeads = operTeam.filter(
    //     (item) => item?.role?.name === "Team Lead"
    //   );
    //   const currentSelectTl = TeamLeads.find(
    //     (item) => item.user_role.id === selectedTl
    //   );
    //   filteredData = filteredData.filter((item) =>
    //     [currentSelectTl?.user_role?.id].includes(
    //       Number(item.project_assigned_to_teamlead)
    //     )
    //   );
    // }
    if (selectedClient && selectedClient !== "--Select Client--") {
      filteredData = filteredData.filter(
        (item) => item?.clients?.id === selectedClient
      );
    }
    if (role === "Team Lead" && department == 2) {
      filteredData = filteredData.filter((item) => {
        const ProjectAssigned = projectAssignedTo.filter(
          (item) => item?.project_assigned_to
        );
        const projectAssigned = ProjectAssigned.find(
          (assigned) => assigned.project_id === item.id
        );
        const isInProjectAssignedTo = projectAssigned?.project_assigned_to.some(
          (item) => item.id == userrole
        );
        const isInProjectAssignedToTeamlead =
          item.project_assigned_to_teamlead === userrole;

        return isInProjectAssignedTo || isInProjectAssignedToTeamlead;
      });
    }
    if (
      (role === "Team Lead" || role === "Manager") &&
      (department == 1 || department == 4)
    ) {
      filteredData = filteredData.filter(
        (item) => item?.created_by == userrole
      );
    } else if (
      role === "Manager" ||
      role === "Sr.Manager" ||
      role === "Ass.Manager"
    ) {
      filteredData = filteredData.filter((item) => {
        const projectAssigned = projectAssignedTo.find(
          (assigned) => assigned.project_id === item.id
        );

        const isInProjectAssignedTo = projectAssigned?.project_assigned_to.some(
          (assigned) => assigned.id == userrole
        );

        const isInProjectAssignedToTeamlead =
          item.project_assigned_to_teamlead == userrole;

        const isInAssignedTo = item.assigned_to == userrole;

        return (
          isInProjectAssignedTo ||
          isInProjectAssignedToTeamlead ||
          isInAssignedTo
        );
      });
    } else if (role === "HOD") {
      filteredData = filteredData.filter((item) => {
        return userUnderHOD
          .map((user) => user.id)
          .includes(item?.project_assigned_by_manager);
      });
    } else if (role === "superuser" || role === "Director") {
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
      // filteredData = projectData;
    }
    setTeamLeadAssiged(filteredData);
    setFilteredProjectData(filteredData);
  }, [
    selectedStatus,
    selectedClient,
    selectedManager,
    selectedHod,
    selectedTl,
    token,
    projectData,
    dateRange.endDate,
    dateRange.startDate,
  ]);

  return (
    <div className="flex items-center justify-between">
      {(role === "Director" || role === "superuser") && (
        <>
          <DateRangeFilter dateRange={dateRange} setDateRange={setDateRange} />
          <Dropdown
            Option_Name={[
              "--Select HOD--",
              ...hodListArray.map((item) => item.name),
            ]}
            onChange={handleFilterOption}
            name="HOD"
            className="p-2 m-1 border border-black rounded lg:w-full w-11/12"
            id={"hod List"}
          />
          <Dropdown
            Option_Name={[
              "--Select Manager--",
              ...managerListArray.map((item) => item.name),
            ]}
            onChange={handleFilterOption}
            name="Manager"
            className="p-2 m-1 border border-black rounded lg:w-full w-11/12"
            id={"manager List"}
          />
          {/* <Dropdown
            Option_Name={[
              "--Select TeamLead--",
              ...tlListArray.map((item) => item.name),
            ]}
            onChange={handleFilterOption}
            name="TeamLead"
            className="p-2 m-1 border border-black rounded lg:w-full w-11/12"
          /> */}
        </>
      )}
      <Dropdown
        Option_Name={[
          "--Select Client--",
          ...clientsList?.map((item) => item.name),
        ]}
        onChange={handleFilterOption}
        name="Client"
        className="p-2 m-1 border border-black rounded w-11/12 bg-transparent"
        id={"client List"}
      />
      <div className="w-full">
        <Input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onchange={(e) => setSearchTerm(e.target.value)}
          className={`${
            darkMode && "bg-black border-white"
          } p-2 m-1 border border-black rounded w-11/12 focus:outline-none"`}
          id={"search"}
        />
      </div>
    </div>
  );
};

export default FilterProject;
