import { createContext, useState } from "react";

export const DataTableContext = createContext();

export const DataTableContextProvider = ({ children }) => {
  const [isStatus, setIsStatus] = useState(false);
  const [isEdit, setisEdit] = useState(false);
  const [isView, setisView] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState();
  const [openDropdownIndex, setOpenDropdownIndex] = useState(-1);
  const [isViewOptionIndex, setIsViewOptionIndex] = useState();
  const [isViewOptionOpen, setIsViewOptionOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState();

  return (
    <DataTableContext.Provider
      value={{
        isStatus,
        setIsStatus,
        isEdit,
        setisEdit,
        isView,
        setisView,
        selectedRecord,
        setSelectedRecord,
        openDropdownIndex,
        setOpenDropdownIndex,
        isViewOptionIndex,
        setIsViewOptionIndex,
        isViewOptionOpen,
        setIsViewOptionOpen,
        selectedIndex,
        setSelectedIndex,
      }}
    >
      {children}
    </DataTableContext.Provider>
  );
};
