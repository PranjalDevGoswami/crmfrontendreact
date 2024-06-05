// import React, { useEffect, useState } from "react";
// import Dropdown from "../components/DropDown";
// import { ClientList } from "../fetchApis/clientList/ClientList.js";
// import Input from "../components/InputField.js";
// import { GetProjectManager } from "../fetchApis/projectManager/projectManager.js";
// import { GetProjectHod } from "../fetchApis/projectHod/projectHod.js";
// import { GetProjectTeamLead } from "../fetchApis/projectTeamLead/projectTl.js";

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
//   const [clientsListArray, setClientsListArray] = useState([
//     "Demo Client1",
//     "Demo Client2",
//   ]);
//   const [managerListArray, setManagerListArray] = useState([
//     "Demo Manager1",
//     "Demo Manager2",
//   ]);
//   const [hodListArray, setHodListArray] = useState(["Demo Hod1", "Demo Hod2"]);
//   const [tlListArray, setTlListArray] = useState(["Demo TL1", "Demo TL2"]);
//   const [managerAssociates, setManagerAssociates] = useState([
//     "Demo TL1",
//     "Demo TL2",
//   ]);
//   const [tlAssociates, setTlAssociates] = useState();
//   const [status, setStatus] = useState([
//     "To be Started",
//     "Inprogress",
//     "Completed",
//     "CBR Raised",
//     "Hold",
//   ]);
//   // const [selectedClient, setSelectedClient] = useState("");
//   const role = localStorage.getItem("role");
//   const user_id = localStorage.getItem("user_id");
//   const username = localStorage.getItem("username");

//   useEffect(() => {
//     const fetchClientList = async () => {
//       try {
//         const response = await ClientList();
//         const responseArray = response?.data?.map((val) => {
//           return val.name;
//         });
//         setClientsListArray(responseArray);
//       } catch (error) {
//         console.log("error is", error);
//       }
//     };
//     fetchClientList();
//   }, []);

//   useEffect(() => {
//     const fetchManagerList = async () => {
//       try {
//         const response = await GetProjectManager();
//         let TlUnderThisManager = response.data;

//         if (role == "AM/Manager") {
//           TeamLeadIs = TlUnderThisManager.filter(
//             (item) => item.name == username
//           );
//           let TeamLeadIsArray = TeamLeadIs.map((item) =>
//             item.manager_teamlead.map((item) => item.name)
//           );
//           setTlListArray(TeamLeadIsArray[0]);
//         }
//         setTlAssociates(TlUnderThisManager);
//         let responseArray = response?.data?.map((val) => {
//           return val.name;
//         });
//         if (role !== "HOD") {
//           setManagerListArray(responseArray);
//         }
//       } catch (error) {
//         console.log("error is", error);
//       }
//     };
//     fetchManagerList();
//   }, []);

//   useEffect(() => {
//     const fetchHodList = async () => {
//       try {
//         const response = await GetProjectHod();
//         let ManagerUnderThisHod = response.data;
//         if (role == "HOD") {
//           managerIs = ManagerUnderThisHod.filter(
//             (item) => item.name == username
//           );
//           let managerIsArray = managerIs.map((item) =>
//             item.hod_manager.map((item) => item.name)
//           );
//           setManagerListArray(managerIsArray[0]);
//         }
//         ManagerUnderThisHod = ManagerUnderThisHod.filter((item) => item.name);
//         setManagerAssociates(ManagerUnderThisHod);
//         const responseArray = response?.data?.map((val) => {
//           return val.name;
//         });
//         setHodListArray(responseArray);
//       } catch (error) {
//         console.log("error is", error);
//       }
//     };
//     fetchHodList();
//   }, []);

//   useEffect(() => {
//     const fetchTlList = async () => {
//       try {
//         const response = await GetProjectTeamLead();
//         const responseArray = response?.data?.map((val) => {
//           return val.name;
//         });
//         setTlListArray(responseArray);
//       } catch (error) {
//         console.log("error is", error);
//       }
//     };
//     fetchTlList();
//   }, []);

//   const handleFilterOption = (name, value) => {
//     if (name === "Status") {
//       if (value === "To be Started") {
//         setSelectedStatus("to_be_started");
//       } else if (value === "Completed") {
//         setSelectedStatus("completed");
//       } else if (value === "New") {
//         setSelectedStatus("new");
//       } else if (value === "CBR Raised") {
//         setSelectedStatus("cbr_raised");
//       } else if (value === "Hold") {
//         setSelectedStatus("hold");
//       } else if (value === "Inprogress") {
//         setSelectedStatus("inprogress");
//       } else if (value === "--Select Status--") {
//         setSelectedStatus("--Select Status--");
//       }
//     }
//     if (name === "Client") {
//       setSelectedClient(value);
//     }
//     if (name === "HOD") {
//       const Hod = managerAssociates.filter((item) => item.name === value);
//       if (Hod.length > 0) {
//         const managerName = Hod.map((item) =>
//           item?.hod_manager?.filter((item) => item?.id == user_id)
//         );
//         if (managerName[0] == "undefined" || managerName[0] == null) {
//           setTlListArray(["Demo Manager1", "Demo Manager2"]);
//         } else {
//           setManagerListArray(managerName[0]);
//         }
//         setSelectedHod(value);
//       }
//     }

//     if (name === "Manager") {
//       let manager = tlAssociates.filter((item) => item.name === value);
//       if (manager.length > 0) {
//         const TlName = manager.map((item) =>
//           item.manager_teamlead?.map((item) => item.name)
//         );
//         if (TlName[0] == "undefined" || TlName[0] == null) {
//           setTlListArray(["Demo TL1", "Demo TL2"]);
//         } else {
//           setTlListArray(TlName[0]);
//         }
//       }
//       setSelectedManager(value);
//     }
//     if (name === "TeamLead") {
//       let manager = tlAssociates.filter((item) => item.name === value);
//       if (manager.length > 0) {
//         const TlName = manager.map((item) =>
//           item.manager_teamlead?.map((item) => item.name)
//         );
//         if (TlName[0] == "undefined" || TlName[0] == null) {
//           setTlListArray(["Demo TL1", "Demo TL2"]);
//         } else {
//           setTlListArray(TlName[0]);
//         }
//       }
//       setSelectedTl(value);
//     }
//   };

//   return (
//     <div className="flex items-center w-11/12 container mx-auto">
//       {role === "Director" ? (
//         <Dropdown
//           Option_Name={["--Select HOD--", ...hodListArray]}
//           onChange={handleFilterOption}
//           name={"HOD"}
//           className={"p-4 m-1 border border-black rounded lg:w-full w-11/12"}
//         />
//       ) : (
//         ""
//       )}
//       {role === "Director" || role === "HOD" ? (
//         <Dropdown
//           Option_Name={["--Select Manager--", ...managerListArray]}
//           onChange={handleFilterOption}
//           name={"Manager"}
//           className={"p-4 m-1 border border-black rounded lg:w-full w-11/12"}
//         />
//       ) : (
//         ""
//       )}
//       {role === "Director" || role === "HOD" || role === "AM/Manager" ? (
//         <Dropdown
//           Option_Name={["--Select TeamLead--", ...tlListArray]}
//           onChange={handleFilterOption}
//           name={"TeamLead"}
//           className={"p-4 m-1 border border-black rounded lg:w-full w-11/12"}
//         />
//       ) : (
//         ""
//       )}
//       <Dropdown
//         Option_Name={["--Select Client--", ...clientsListArray]}
//         onChange={handleFilterOption}
//         name={"Client"}
//         className={"p-4 m-1 border border-black rounded lg:w-full w-11/12"}
//       />
//       <Dropdown
//         Option_Name={["--Select Status--", ...status]}
//         onChange={handleFilterOption}
//         name={"Status"}
//         className={"p-4 m-1 border border-black rounded lg:w-full w-11/12"}
//       />
//       <div className="w-full">
//         <Input
//           type="text"
//           placeholder="Search..."
//           value={searchTerm}
//           onchange={(e) => setSearchTerm(e.target.value)}
//           className={
//             "p-4 m-1 border border-black rounded lg:w-full w-11/12 focus:outline-none"
//           }
//         />
//       </div>
//     </div>
//   );
// };

// export default FilterProject;

import React, { useEffect, useState } from "react";
import Dropdown from "../components/DropDown";
import { ClientList } from "../fetchApis/clientList/ClientList.js";
import Input from "../components/InputField.js";
import { GetProjectManager } from "../fetchApis/projectManager/projectManager.js";
import { GetProjectHod } from "../fetchApis/projectHod/projectHod.js";
import { GetProjectTeamLead } from "../fetchApis/projectTeamLead/projectTl.js";

const FilterProject = ({
  selectedStatus,
  setSelectedStatus,
  selectedClient,
  setSelectedClient,
  setSearchTerm,
  searchTerm,
  setSelectedHod,
  setSelectedManager,
  setSelectedTl,
}) => {
  const [clientsListArray, setClientsListArray] = useState([]);
  const [managerListArray, setManagerListArray] = useState([]);
  const [hodListArray, setHodListArray] = useState([]);
  const [tlListArray, setTlListArray] = useState([]);
  const [managerAssociates, setManagerAssociates] = useState([]);
  const [tlAssociates, setTlAssociates] = useState([]);
  const [status, setStatus] = useState([
    "To be Started",
    "Inprogress",
    "Completed",
    "CBR Raised",
    "Hold",
  ]);

  const role = localStorage.getItem("role");
  const user_id = localStorage.getItem("user_id");
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

        if (role === "AM/Manager") {
          const teamLeads = tlUnderManager.filter(
            (item) => item.name === username
          );
          const teamLeadNames = teamLeads.flatMap((item) =>
            item.manager_teamlead.map((tl) => tl.name)
          );
          setTlListArray(teamLeadNames);
        }

        if (role !== "HOD") {
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
        New: "new",
      };
      setSelectedStatus(statusMap[value] || "--Select Status--");
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

  return (
    <div className="flex items-center w-11/12 container mx-auto">
      {role === "Director" && (
        <Dropdown
          Option_Name={["--Select HOD--", ...hodListArray]}
          onChange={handleFilterOption}
          name="HOD"
          className="p-4 m-1 border border-black rounded lg:w-full w-11/12"
        />
      )}
      {(role === "Director" || role === "HOD") && (
        <Dropdown
          Option_Name={["--Select Manager--", ...managerListArray]}
          onChange={handleFilterOption}
          name="Manager"
          className="p-4 m-1 border border-black rounded lg:w-full w-11/12"
        />
      )}
      {(role === "Director" || role === "HOD" || role === "AM/Manager") && (
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
        Option_Name={["--Select Status--", ...status]}
        onChange={handleFilterOption}
        name="Status"
        className="p-4 m-1 border border-black rounded lg:w-full w-11/12"
      />
      <div className="w-full">
        <Input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-4 m-1 border border-black rounded lg:w-full w-11/12 focus:outline-none"
        />
      </div>
    </div>
  );
};

export default FilterProject;
