import { createContext, useContext, useState, useEffect } from "react";
import { isSalesDept,isFinanceDept } from "../config/Departments";

export const FilterContext = createContext();

export const SearchFilterContext = ({ children }) => {
  const [department, setDepartment] = useState(
    localStorage.getItem("department")
  );

  useEffect(() => {
    const handleStorageChange = () => {
      const newDepartment = localStorage.getItem("department");
      setDepartment(newDepartment);
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedHod, setSelectedHod] = useState("");
  const [selectedManager, setSelectedManager] = useState("");
  const [selectedTl, setSelectedTl] = useState("");
  const [selectedClient, setSelectedClient] = useState("");
  const [tlAssociates, setTlAssociates] = useState([]);
  // const [activeTabValue, setActiveTabValue] = useState(
  //   department == isSalesDept ? "all" : "In Progress"
  // );

  const [activeTabValue, setActiveTabValue] = useState(
    (department == isFinanceDept) ? "CBR Raised" : (department == isSalesDept) ? "all" : "In Progress"
  );  
  const [status, setStatus] = useState([
    activeTabValue,
    "All",
    "To Be Started",
    "Completed",
    "Invoice to be Raised",
    "On Hold",
    "Invoice Generated",
    "Payment Received",
  "Advanced Billing Raised",
  "Advanced Invoice Generated",
  "Advance Payment Received"
  ]);
  const [selectedStatus, setSelectedStatus] = useState(activeTabValue);
  const [clientsList, setClientsList] = useState([]);
  const [hodListArray, setHodListArray] = useState([]);
  const [srManagerListArray, setSrManagerListArray] = useState([]);
  const [managerListArray, setManagerListArray] = useState([]);
  const [assManagerListArray, setAssManagerListArray] = useState([]);
  const [tlListArray, setTlListArray] = useState([]);
  const [projectData, setProjectData] = useState([]);
  const [filteredProjectData, setFilteredProjectData] = useState([]);
  const [filteredProjectDataWithoutStatus, setFilteredProjectDataWithoutStatus] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [teamLeadAssiged, setTeamLeadAssiged] = useState();
  const [clientListDataWithId, setClientListDataWithId] = useState([]);
  const [clientListData, setClientListData] = useState([
    "demo Client1",
    "demo Cliet2",
  ]);
  const [dateRange, setDateRange] = useState({
      startDate: "",
      endDate: "",
    });


  return (
    <FilterContext.Provider
      value={{
        selectedStatus,
        setSelectedStatus,
        selectedClient,
        setSelectedClient,
        setSearchTerm,
        searchTerm,
        setSelectedHod,
        selectedHod,
        srManagerListArray, setSrManagerListArray,
        selectedManager,
        setSelectedManager,
        assManagerListArray, setAssManagerListArray,
        setSelectedTl,
        selectedTl,
        tlAssociates,
        setTlAssociates,
        status,
        setStatus,
        activeTabValue,
        setActiveTabValue,
        clientsList,
        setClientsList,
        projectData,
        setProjectData,
        filteredProjectData,
        setFilteredProjectData,
        isLoading,
        setIsLoading,
        teamLeadAssiged,
        setTeamLeadAssiged,
        clientListDataWithId,
        setClientListDataWithId,
        clientListData,
        setClientListData,
        hodListArray,
        setHodListArray,
        managerListArray,
        setManagerListArray,
        tlListArray,
        setTlListArray,
        dateRange, setDateRange,
        filteredProjectDataWithoutStatus, setFilteredProjectDataWithoutStatus
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};
