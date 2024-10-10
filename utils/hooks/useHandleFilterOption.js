import React, { useContext } from "react";
import { FilterContext } from "../../src/ContextApi/FilterContext";

export const useHandleFilterOption = ({ setSelectedItems }) => {
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
  const handleFilterOption = (name, valueObj) => {
    const values = valueObj?.value?.map((v) => v.toLowerCase()) || [];
    if (name === "Client") {
      const selectedClients = clientsList.filter((item) =>
        values.includes(item?.name?.toLowerCase())
      );
      setSelectedItems(selectedClients.map((item) => item?.name));
      const clientIDs = selectedClients.map((client) => client.id);
      setSelectedClient(clientIDs);
    }

    if (name === isHod) {
      const selectedHods = hodListArray.filter((item) =>
        values.some((val) => item?.name?.toLowerCase().includes(val))
      );
      const hodIDs = selectedHods.map((hod) => hod.id);
      setSelectedHod(hodIDs);
    }

    if (name === isManager) {
      console.log(managerListArray);

      const selectedManagers = managerListArray.filter((item) =>
        values.some((val) => item?.name?.toLowerCase().includes(val))
      );
      const managerIDs = selectedManagers.map((manager) => manager.id);
      setSelectedManager(managerIDs);
    }

    if (name === isTeamLead) {
      const selectedTls = tlListArray.filter((item) =>
        values.some((val) => item?.name?.toLowerCase().includes(val))
      );
      const tlIDs = selectedTls.map((tl) => tl.id);
      setSelectedTl(tlIDs);
    }
  };
  return handleFilterOption;
};
