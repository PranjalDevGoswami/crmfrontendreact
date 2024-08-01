import React, { useContext, useEffect, useState } from "react";
import Dropdown from "../components/DropDown";
import { ClientList } from "../fetchApis/clientList/ClientList.js";
import Input from "../components/InputField.js";
import { GetProjectManager } from "../fetchApis/projectManager/projectManager.js";
// import { GetProjectHod } from "../fetchApis/projectHod/projectHod.js";
// import { GetProjectTeamLead } from "../fetchApis/projectTeamLead/projectTl.js";
import { FilterContext } from "../ContextApi/FilterContext.js";
import { ThemeContext } from "../ContextApi/ThemeContext.js";
import { DataTableContext } from "../ContextApi/DataTableContext.js";
import { UPDATETLASSIGNMENT } from "../../utils/urls.js";
import { getWithAuth } from "../provider/helper/axios.js";
// import { GetProjectData } from "../fetchApis/projects/getProjectData/GetProjectData.js";

const FilterProject = () => {
  const {
    selectedStatus,
    selectedClient,
    setSelectedClient,
    setSearchTerm,
    searchTerm,
    selectedHod,
    selectedManager,
    selectedTl,
    clientsList,
    setClientsList,
    projectData,
    setFilteredProjectData,
    teamLeadAssiged,
    setTeamLeadAssiged,
  } = useContext(FilterContext);

  const { darkMode } = useContext(ThemeContext);

  // const [tlAssigned, setTlAssigned] = useState([]);

  const role = localStorage.getItem("role");
  let token = localStorage.getItem("token");
  let department = localStorage.getItem("department");
  let userrole = localStorage.getItem("userrole");
  const username = localStorage.getItem("username");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [clientResponse] = await Promise.all([
          ClientList(),
          GetProjectManager(),
        ]);
        setClientsList(clientResponse?.data?.map((val) => val));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [role, username]);

  const handleFilterOption = (name, value) => {
    if (name === "Client") {
      const clientID = clientsList.filter(
        (item) => item.name.toLowerCase() === value.toLowerCase()
      );
      setSelectedClient(clientID[0]?.id);
    }
  };
  // useEffect(() => {
  //   const CheckTLAssigned = async () => {
  //     try {
  //       const response = await getWithAuth(UPDATETLASSIGNMENT);
  //       const data = response?.data;
  //       console.log("🚀 ~ CheckTLAssigned ~ data:", data);
  //       setTlAssigned(data);
  //     } catch (error) {
  //       console.error("Error checking TL assignment:", error);
  //     }
  //   };
  //   CheckTLAssigned();
  // }, []);

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
      filteredData = filteredData.filter(
        (item) => item?.project_hod?.name === selectedHod
      );
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
    // Additional checks based on the role
    if (role === "Team Lead" && department == 2) {
      console.log(filteredData);
      filteredData = filteredData.filter(
        (item) => item?.project_assigned_to_teamlead == userrole
      );
    }
    if (role === "Team Lead" && department == 1) {
      filteredData = filteredData.filter(
        (item) => item?.created_by == userrole
      );
      console.log(filteredData);
    } else if (role === "Manager") {
      filteredData = filteredData.filter(
        (item) => item?.assigned_to == userrole
      );
    } else if (role === "HOD") {
      filteredData = filteredData.filter(
        (item) => item?.project_hod?.id == userrole
      );
    } else if (role === "superuser") {
      filteredData = projectData;
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
      {/* {(role === "Director" || role === "superuser") && (
        <Dropdown
          Option_Name={["--Select HOD--", ...hodListArray]}
          onChange={handleFilterOption}
          name="HOD"
          className="p-4 m-1 border border-black rounded lg:w-full w-11/12"
        />
      )}
      {(role === "Director" || role === "HOD" || role === "superuser") && (
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
          ...clientsList.map((item) => item.name),
        ]}
        onChange={handleFilterOption}
        name="Client"
        className="p-4 m-1 border border-black rounded w-11/12"
      />
      <div className="w-full">
        <Input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onchange={(e) => setSearchTerm(e.target.value)}
          className={`${
            darkMode && "bg-black border-white"
          } p-4 m-1 border border-black rounded w-11/12 focus:outline-none"`}
        />
      </div>
    </div>
  );
};

export default FilterProject;
