// import React, { useEffect, useState } from "react";
// import Dropdown from "../components/DropDown";
// import { ClientList } from "../fetchApis/clientList/ClientList.js";
// import Input from "../components/InputField.js";
// import { GetProjectManager } from "../fetchApis/projectManager/projectManager.js";
// import { GetProjectHod } from "../fetchApis/projectHod/projectHod.js";
// import { GetProjectTeamLead } from "../fetchApis/projectTeamLead/projectTl.js";
// import { FaFilter } from "react-icons/fa";

// const FilterProject = ({
//   selectedStatus,
//   setSelectedStatus,
//   selectedClient,
//   setSelectedClient,
//   setSearchTerm,
//   searchTerm,
//   setSelectedHod,
//   setSelectedManager,
//   setSelectedTl,
// }) => {
//   const [clientsListArray, setClientsListArray] = useState([]);
//   const [managerListArray, setManagerListArray] = useState([]);
//   const [hodListArray, setHodListArray] = useState([]);
//   const [tlListArray, setTlListArray] = useState([]);
//   const [managerAssociates, setManagerAssociates] = useState([]);
//   const [tlAssociates, setTlAssociates] = useState([]);
//   const [status, setStatus] = useState([
//     "To be Started",
//     "Inprogress",
//     "Completed",
//     "CBR Raised",
//     "Hold",
//   ]);
//   const [filterOpen, SetFilterOpen] = useState(false);

//   const role = localStorage.getItem("role");
//   const user_id = localStorage.getItem("user_id");
//   const username = localStorage.getItem("username");

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [clientResponse, managerResponse, hodResponse, tlResponse] =
//           await Promise.all([
//             ClientList(),
//             GetProjectManager(),
//             GetProjectHod(),
//             GetProjectTeamLead(),
//           ]);

//         setClientsListArray(clientResponse?.data?.map((val) => val.name));
//         setTlListArray(tlResponse?.data?.map((val) => val.name));
//         const tlUnderManager = managerResponse?.data;
//         const hodUnderManager = hodResponse?.data;

//         if (role === "AM/Manager") {
//           const teamLeads = tlUnderManager.filter(
//             (item) => item.name === username
//           );
//           const teamLeadNames = teamLeads.flatMap((item) =>
//             item.manager_teamlead.map((tl) => tl.name)
//           );
//           setTlListArray(teamLeadNames);
//         }

//         if (role !== "HOD") {
//           setManagerListArray(managerResponse?.data?.map((val) => val.name));
//         } else {
//           const managers = hodUnderManager.filter(
//             (item) => item.name === username
//           );
//           const managerNames = managers.flatMap((item) =>
//             item.hod_manager.map((mgr) => mgr.name)
//           );
//           setManagerListArray(managerNames);
//         }

//         setManagerAssociates(hodUnderManager);
//         setTlAssociates(tlUnderManager);
//         setHodListArray(hodResponse?.data?.map((val) => val.name));
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, [role, username]);

//   const handleFilterOption = (name, value) => {
//     if (name === "Status") {
//       const statusMap = {
//         "To be Started": "to_be_started",
//         Inprogress: "inprogress",
//         Completed: "completed",
//         "CBR Raised": "cbr_raised",
//         Hold: "hold",
//         New: "new",
//       };
//       setSelectedStatus(statusMap[value] || "--Select Status--");
//     } else if (name === "Client") {
//       setSelectedClient(value);
//     } else if (name === "HOD") {
//       const hod = managerAssociates.find((item) => item.name === value);
//       if (hod) {
//         const managerNames = hod.hod_manager.map((item) => item.name);
//         setManagerListArray(managerNames);
//       }
//       setSelectedHod(value);
//     } else if (name === "Manager") {
//       const manager = tlAssociates.find((item) => item.name === value);
//       if (manager) {
//         const teamLeadNames = manager.manager_teamlead.map((item) => item.name);
//         setTlListArray(teamLeadNames);
//       }
//       setSelectedManager(value);
//     } else if (name === "TeamLead") {
//       const manager = tlAssociates.find((item) => item.name === value);
//       if (manager) {
//         const teamLeadNames = manager.manager_teamlead.map((item) => item.name);
//         setTlListArray(teamLeadNames);
//       }
//       setSelectedTl(value);
//     }
//   };

//   return (
//     <div className="w-full">
//       <div className="flex justify-evenly w-full">
//         <div className="w-full">
//           <Input
//             type="text"
//             placeholder="Search..."
//             value={searchTerm}
//             onchange={(e) => setSearchTerm(e.target.value)}
//             className="p-4 m-1 border border-black rounded lg:w-full w-11/12 focus:outline-none"
//           />
//         </div>
//         <div
//           className="flex items-center border rounded-md w-full p-2 cursor-pointer"
//           onClick={() => SetFilterOpen(!filterOpen)}
//         >
//           <FaFilter className="ml-2 text-blue-400" />
//           <span className="ml-2 text-blue-400">Filter</span>
//         </div>
//       </div>
//       {filterOpen && (
//         <div className="flex items-center flex-col absolute right-0 top-28 w-64 border h-screen -translate-x-50 z-20 bg-white p-4">
//           {role === "Director" && (
//             <Dropdown
//               Option_Name={["--Select HOD--", ...hodListArray]}
//               onChange={handleFilterOption}
//               name="HOD"
//               className="p-4 m-1 border border-black rounded lg:w-full w-11/12"
//             />
//           )}
//           {(role === "Director" || role === "HOD") && (
//             <Dropdown
//               Option_Name={["--Select Manager--", ...managerListArray]}
//               onChange={handleFilterOption}
//               name="Manager"
//               className="p-4 m-1 border border-black rounded lg:w-full w-11/12"
//             />
//           )}
//           {(role === "Director" || role === "HOD" || role === "AM/Manager") && (
//             <Dropdown
//               Option_Name={["--Select TeamLead--", ...tlListArray]}
//               onChange={handleFilterOption}
//               name="TeamLead"
//               className="p-4 m-1 border border-black rounded lg:w-full w-11/12"
//             />
//           )}
//           <Dropdown
//             Option_Name={["--Select Client--", ...clientsListArray]}
//             onChange={handleFilterOption}
//             name="Client"
//             className="p-4 m-1 border border-black rounded lg:w-full w-11/12"
//           />
//           <Dropdown
//             Option_Name={["--Select Status--", ...status]}
//             onChange={handleFilterOption}
//             name="Status"
//             className="p-4 m-1 border border-black rounded lg:w-full w-11/12"
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// export default FilterProject;
// work on filter stylling in above code

import React, { useContext, useEffect, useState } from "react";
import Dropdown from "../components/DropDown";
import { ClientList } from "../fetchApis/clientList/ClientList.js";
import Input from "../components/InputField.js";
import { GetProjectManager } from "../fetchApis/projectManager/projectManager.js";
import { GetProjectHod } from "../fetchApis/projectHod/projectHod.js";
import { GetProjectTeamLead } from "../fetchApis/projectTeamLead/projectTl.js";
import { FilterContext } from "../ContextApi/FilterContext.js";
import { ThemeContext } from "../ContextApi/ThemeContext.js";

const FilterProject = () => {
  const [clientsListArray, setClientsListArray] = useState([]);
  const [managerListArray, setManagerListArray] = useState([]);
  const [hodListArray, setHodListArray] = useState([]);
  const [tlListArray, setTlListArray] = useState([]);
  const [managerAssociates, setManagerAssociates] = useState([]);

  const {
    setSelectedStatus,
    selectedStatus,
    setSelectedClient,
    setSearchTerm,
    searchTerm,
    setSelectedHod,
    setSelectedManager,
    setSelectedTl,
    tlAssociates,
    setTlAssociates,
    setStatus,
    status,
    setActiveTabValue,
    activeTabValue,
  } = useContext(FilterContext);

  const { darkMode } = useContext(ThemeContext);

  const role = localStorage.getItem("role");
  const username = localStorage.getItem("username");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [clientResponse, managerResponse, hodResponse, tlResponse] =
          await Promise.all([
            ClientList(),
            GetProjectManager(),
            GetProjectHod(),
            GetProjectTeamLead(),
          ]);

        setClientsListArray(clientResponse?.data?.map((val) => val.name));
        setTlListArray(tlResponse?.data?.map((val) => val.name));
        const tlUnderManager = managerResponse?.data;
        const hodUnderManager = hodResponse?.data;

        if (role === "AM/Manager" || role === "superuser") {
          const teamLeads = tlUnderManager.filter(
            (item) => item.name === username
          );
          const teamLeadNames = teamLeads.flatMap((item) =>
            item.manager_teamlead.map((tl) => tl.name)
          );
          setTlListArray(teamLeadNames);
        }

        if (role !== "HOD" || role === "superuser") {
          setManagerListArray(managerResponse?.data?.map((val) => val.name));
        } else {
          const managers = hodUnderManager.filter(
            (item) => item.name === username
          );
          const managerNames = managers.flatMap((item) =>
            item.hod_manager.map((mgr) => mgr.name)
          );
          setManagerListArray(managerNames);
        }

        setManagerAssociates(hodUnderManager);
        setTlAssociates(tlUnderManager);
        setHodListArray(hodResponse?.data?.map((val) => val.name));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [role, username]);

  const handleFilterOption = (name, value) => {
    if (name === "Status") {
      const statusMap = {
        "To be Started": "to_be_started",
        Inprogress: "inprogress",
        Completed: "completed",
        "CBR Raised": "cbr_raised",
        Hold: "hold",
      };
      setSelectedStatus(statusMap[value] || "inprogress");
      setActiveTabValue(statusMap[value] || "inprogress");
    } else if (name === "Client") {
      setSelectedClient(value);
    } else if (name === "HOD") {
      const hod = managerAssociates.find((item) => item.name === value);
      if (hod) {
        const managerNames = hod.hod_manager.map((item) => item.name);
        setManagerListArray(managerNames);
      }
      setSelectedHod(value);
    } else if (name === "Manager") {
      const manager = tlAssociates.find((item) => item.name === value);
      if (manager) {
        const teamLeadNames = manager.manager_teamlead.map((item) => item.name);
        setTlListArray(teamLeadNames);
      }
      setSelectedManager(value);
    } else if (name === "TeamLead") {
      const manager = tlAssociates.find((item) => item.name === value);
      if (manager) {
        const teamLeadNames = manager.manager_teamlead.map((item) => item.name);
        setTlListArray(teamLeadNames);
      }
      setSelectedTl(value);
    }
  };

  useEffect(() => {
    const statusOptions = [
      "To be Started",
      "Inprogress",
      "Completed",
      "CBR Raised",
      "Hold",
    ].filter(
      (status) => status.toLowerCase().replace(/\s+/g, "_") !== activeTabValue
    );
    setStatus(statusOptions);
  }, [activeTabValue]);

  return (
    <div className="flex items-center w-11/12 container mx-auto">
      {(role === "Director" || role === "superuser") && (
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
      )}
      <Dropdown
        Option_Name={["--Select Client--", ...clientsListArray]}
        onChange={handleFilterOption}
        name="Client"
        className="p-4 m-1 border border-black rounded lg:w-full w-11/12"
      />
      <Dropdown
        Option_Name={[selectedStatus, ...status]}
        onChange={handleFilterOption}
        name="Status"
        className="p-4 m-1 border border-black rounded lg:w-full w-11/12"
      />
      <div className="w-full">
        <Input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onchange={(e) => setSearchTerm(e.target.value)}
          className={`${
            darkMode && "bg-black border-white"
          } p-4 m-1 border border-black rounded lg:w-full w-11/12 focus:outline-none"`}
        />
      </div>
    </div>
  );
};

export default FilterProject;
