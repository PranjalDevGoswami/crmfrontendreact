import { createContext, useContext, useState } from "react";

export const FilterContext = createContext();

export const SearchFilterContext = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedHod, setSelectedHod] = useState("");
  const [selectedManager, setSelectedManager] = useState("");
  const [selectedTl, setSelectedTl] = useState("");
  const [selectedClient, setSelectedClient] = useState("");
  const [tlAssociates, setTlAssociates] = useState([]);
  const [activeTabValue, setActiveTabValue] = useState("inprogress");
  const [status, setStatus] = useState([
    activeTabValue,
    "To be Started",
    "Completed",
    "CBR Raised",
    "Hold",
  ]);
  const [selectedStatus, setSelectedStatus] = useState(activeTabValue);
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
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};
