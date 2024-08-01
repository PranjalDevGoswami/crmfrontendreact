import { createContext, useContext, useState } from "react";

export const FilterContext = createContext();

export const SearchFilterContext = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedHod, setSelectedHod] = useState("");
  const [selectedManager, setSelectedManager] = useState("");
  const [selectedTl, setSelectedTl] = useState("");
  const [selectedClient, setSelectedClient] = useState("");
  const [tlAssociates, setTlAssociates] = useState([]);
  const [activeTabValue, setActiveTabValue] = useState("In Progress");
  const [status, setStatus] = useState([
    activeTabValue,
    "All",
    "To be Started",
    "Completed",
    "CBR Raised",
    "On Hold",
  ]);
  const [selectedStatus, setSelectedStatus] = useState(activeTabValue);
  const [clientsList, setClientsList] = useState([]);
  const [managerListArray, setManagerListArray] = useState([]);
  //  const [hodListArray, setHodListArray] = useState([]);
  //  const [tlListArray, setTlListArray] = useState([]);
  //  const [managerAssociates, setManagerAssociates] = useState([]);
  const [projectData, setProjectData] = useState([]);
  const [filteredProjectData, setFilteredProjectData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [teamLeadAssiged, setTeamLeadAssiged] = useState();

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
        selectedManager,
        setSelectedManager,
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
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};
