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
    selectedTl,
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
  // const [selectedHod,setSelectedHod] = useState([])

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
      const hodList = userRole.data.filter((item) => item.role.name === "HOD");
      setHodListArray(hodList.map((item) => item.user));
      const managerList = userRole.data.filter(
        (item) => item.role.name === "Manager"
      );
      setManagerListArray(managerList.map((item) => item.user.name));
      const tlList = userRole.data.filter(
        (item) => item.role.name === "Team Lead"
      );
      setTlListArray(tlList.map((item) => item.user.name));
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
      setSelectedHod(hodID[0].id);
      console.log("🚀 ~ handleFilterOption ~ hodID:", hodID[0].id);
    }
    if (name === "Manager") {
      console.log(value);
    }
    if (name === "Manager") {
      console.log(value);
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

    if (selectedHod && selectedHod !== "--Select HOD--") {
      filteredData = filteredData.filter((item) => {
        const hodTeams = userUnderHOD.map((user) => user.id);
        console.log(
          "🚀 ~ filteredData=filteredData.filter ~ hodTeams:",
          hodTeams
        );

        //   item.project_assigned_by_manager.includes(hodTeams);
      });
      // console.log(
      //   "🚀 ~ filteredData=filteredData.filter ~ hodTeams:",
      //   hodTeams
      // );
      console.log("hod", filteredData);
    }

    if (selectedManager && selectedManager !== "--Select Manager--") {
      filteredData = filteredData.filter(
        (item) => item?.project_manager?.name === selectedManager
      );
    }

    if (selectedTl && selectedTl !== "--Select TeamLead--") {
      filteredData = filteredData.filter(
        (item) => item?.project_teamlead?.name === selectedTl
      );
    }
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
      console.log(userUnderHOD);

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
  ]);

  return (
    <div className="flex items-center justify-between">
      {(role === "Director" || role === "superuser") && (
        <>
          <Dropdown
            Option_Name={[
              "--Select HOD--",
              ...hodListArray.map((item) => item.name),
            ]}
            onChange={handleFilterOption}
            name="HOD"
            className="p-2 m-1 border border-black rounded lg:w-full w-11/12"
          />
          {/* <Dropdown
            Option_Name={["--Select Manager--", ...managerListArray]}
            onChange={handleFilterOption}
            name="Manager"
            className="p-2 m-1 border border-black rounded lg:w-full w-11/12"
          />
          <Dropdown
            Option_Name={["--Select TeamLead--", ...tlListArray]}
            onChange={handleFilterOption}
            name="TeamLead"
            className="p-2 m-1 border border-black rounded lg:w-full w-11/12"
          /> */}
        </>
      )}
      {/* {(role === "Director" || role === "HOD" || role === "superuser") && (
        <Dropdown
          Option_Name={["--Select Manager--", ...managerListArray]}
          onChange={handleFilterOption}
          name="Manager"
          className="p-4 m-1 border border-black rounded lg:w-full w-11/12"
        />
      )}
      {(role === "Director" ||
        role === "HOD" ||
        role === "AM/Manager" ||
        role === "superuser") && (
        <Dropdown
          Option_Name={["--Select TeamLead--", ...tlListArray]}
          onChange={handleFilterOption}
          name="TeamLead"
          className="p-4 m-1 border border-black rounded lg:w-full w-11/12"
        />
      )} */}
      <Dropdown
        Option_Name={[
          "--Select Client--",
          ...clientsList?.map((item) => item.name),
        ]}
        onChange={handleFilterOption}
        name="Client"
        className="p-2 m-1 border border-black rounded w-11/12 bg-transparent"
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
        />
      </div>
    </div>
  );
};

export default FilterProject;
