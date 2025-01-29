import { createContext, useState } from "react";

export const DataTableContext = createContext();

export const DataTableContextProvider = ({ children }) => {
  const [changeProjectStatus, setChangeProjectStatus] = useState(false);
  const [isEdit, setisEdit] = useState(false);
  const [isAddManDays, setIsAddManDays] = useState(false);
  const [isView, setisView] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState();
  const [openDropdownIndex, setOpenDropdownIndex] = useState(-1);
  const [isViewOptionIndex, setIsViewOptionIndex] = useState();
  const [isViewOptionOpen, setIsViewOptionOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState();
  const [closeView, setCloseView] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isMultiEdit, setIsMultiEdit] = useState(false);
  const [isUploadSow, setIsUploadSow] = useState(false);
  const [selectedRow, setSelectedRow] = useState([]);
  const [showSowList, setShowSowList] = useState(false);
  const [showRaiseCbr, setShowRaiseCbr] = useState(false);
  const [sowList, setSowList] = useState([]);
  const [toggledClearRows, setToggleClearRows] = useState(false);

  return (
    <DataTableContext.Provider
      value={{
        changeProjectStatus,
        setChangeProjectStatus,
        isEdit,
        setisEdit,
        isAddManDays,
        setIsAddManDays,
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
        closeView,
        setCloseView,
        isDrawerOpen,
        setIsDrawerOpen,
        isMultiEdit,
        setIsMultiEdit,
        selectedRow,
        setSelectedRow,
        isUploadSow,
        setIsUploadSow,
        showSowList,
        setShowSowList,
        sowList,
        setSowList,
        toggledClearRows,
        setToggleClearRows,
        showRaiseCbr,
        setShowRaiseCbr,
      }}
    >
      {children}
    </DataTableContext.Provider>
  );
};
