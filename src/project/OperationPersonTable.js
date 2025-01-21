import React, { useContext, useEffect, useRef, useState } from "react";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import {
  customStyles,
  customStylesDarkMode,
  Dummycolumns,
  DummyData,
} from "../../utils/tableData/DataTablesData";
import Button from "../Atom/Button";
import AddManDaysInduvisual from "./projectCRUDOperations/AddManDaysInduvisual";
import UpdateStatus from "./projectCRUDOperations/UpdateStatus";
import View from "./projectCRUDOperations/View";
import Edit from "./projectCRUDOperations/ProjectEditRequest";
import { MdAddTask } from "react-icons/md";
import { useHandleOutsideClick } from "../../utils/hooks/useHandleOutSideClick";
import { TableColumn } from "../../utils/tableData/dataTableColumns";
import { useSelector } from "react-redux";
import FilterProject from "./FilterProject";
import Tooltip from "../components/Tooltip";
import Popup from "../Atom/Popup";
import { DataTableContext } from "../ContextApi/DataTableContext";
import UploadSow from "./projectCRUDOperations/UpdateSow";
import { toggleViewMultipleCpiSample } from "../../utils/slices/MultipleSampleCpiRecordsSlice";
import { useDispatch } from "react-redux";
import ViewMultipleSampleCpi from "./projectCRUDOperations/ViewMultipleSampleCpi";
import ViewSowUploadList from "./projectCRUDOperations/ViewSowUploadList";

const OperationPersonTable = ({
  data,
  handleSelectedRowsChange,
  isOperationPerson,
  desabledRowData,
}) => {
  const {
    isEdit,
    isView,
    selectedRecord,
    setOpenDropdownIndex,
    setIsViewOptionOpen,
    changeProjectStatus,
    isAddManDays,
    closeView,
    isUploadSow,
    showSowList,
    setShowSowList,
    sowList,
    setSowList,
    toggledClearRows, setToggleClearRows,
    isMultiEdit,isDrawerOpen
  } = useContext(DataTableContext);
  const [multipleCpiSample, setMultipleCpiSample] = useState([]);

  const role = localStorage.getItem("role");
  const isViewerUserRole = role !== "viewer";
  const isSuperUserRole = role === "superUser";
  const isDirectorRole = role === "Director";
  const isHodRole = role === "HOD";
  const isTeamLeadRole = role === "Team Lead";
  const allManagerRolesRole = ["Sr.Manager", "Ass.Manager", "Manager"].includes(
    role
  );
  const department = localStorage.getItem("department");
  const isSuperUserDepartment = [1, 2, 3, 4];
  const isSalesDept = "1";
  const isOperationDept = "2";
  const isFinanceDept = "3";
  const isPreSalesDept = "4";

  const dispatch = useDispatch();

  const darkMode = useSelector((store) => store.darkMode.isDarkMode);
  const ProjectData = useSelector((store) => store.projectData.projects);
  const buttonRef = useRef(null);

  const handleClose = () => {
    setIsViewOptionOpen(false);
    setOpenDropdownIndex(-1);
  };
  useHandleOutsideClick(buttonRef, handleClose);

  const handleViewCpi = (row) => {
    const viewSampleCpi = ProjectData.filter((item) => item?.id === row?.id);
    setMultipleCpiSample(viewSampleCpi);
    dispatch(toggleViewMultipleCpiSample(true));
  };
  const isMultipleCpiSample = useSelector(
    (store) => store.MultiSampleCpiRecord.isViewMultipleSampleCpiRecords
  );
// Toggle the state so React Data Table changes to clearSelectedRows are triggered
const handleClearRows = () => {
  setToggleClearRows(!toggledClearRows);
}
useEffect(() => {
  if(isDrawerOpen == false){
    handleClearRows(); // Call clear rows when new data is loaded
  }
}, [isDrawerOpen]);

  return (
    <>
      {(department == isOperationDept && isTeamLeadRole) ||
      (department == isOperationDept && allManagerRolesRole) ||
      ( department == isOperationDept && isHodRole) ? (
        <DataTable
          columns={
            data?.length > 0
              ? TableColumn({
                  buttonRef,
                  handleViewCpi,
                  setShowSowList,
                  setSowList,
                })
              : Dummycolumns
          }
          data={data?.length > 0 ? desabledRowData : DummyData}
          pagination
          customStyles={darkMode ? customStylesDarkMode : customStyles}
          selectableRows
          onSelectedRowsChange={handleSelectedRowsChange}
          enableMultiRowSelection
          selectableRowDisabled={(row) => row.desabled}
          actions={<FilterProject />}
          clearSelectedRows={toggledClearRows} // Pass the toggle state here
          />
      ) : (isSuperUserDepartment.includes(department) && isSuperUserRole) ||
        isDirectorRole ? (
        <div className="">
          <Link to={"/entry-page"}>
            <Button
              name={
                <Tooltip text="Add New Project" position="top">
                  <MdAddTask />
                </Tooltip>
              }
              className={`${
                darkMode ? "bg-black text-white border-white" : "border-black"
              } p-2 border border-gray-200 bg-gray-100 rounded-sm text-sm flex items-center justify-around text-blue-400 absolute right-11 -top-8 z-10`}
            />
          </Link>
          <DataTable
            columns={
              data?.length > 0
                ? TableColumn({
                    buttonRef,
                    handleViewCpi,
                    setShowSowList,
                    setSowList,
                  })
                : Dummycolumns
            }
            data={data?.length > 0 ? desabledRowData : DummyData}
            pagination
            selectableRows
            customStyles={darkMode ? customStylesDarkMode : customStyles}
            onSelectedRowsChange={handleSelectedRowsChange}
            enableMultiRowSelection
            selectableRowDisabled={(row) => row.desabled}
            actions={<FilterProject />}
            clearSelectedRows={toggledClearRows} // Pass the toggle state here
          />
        </div>
      ) : (
        <div className="w-full no-scrollbar">
          {isDirectorRole ? (
            <DataTable
              columns={
                data?.length > 0
                  ? TableColumn({
                      buttonRef,
                      handleViewCpi,
                      setShowSowList,
                      setSowList,
                    })
                  : Dummycolumns
              }
              data={data?.length > 0 ? desabledRowData : DummyData}
              pagination
              customStyles={darkMode ? customStylesDarkMode : customStyles}
              onSelectedRowsChange={handleSelectedRowsChange}
              enableMultiRowSelection
              selectableRowDisabled={(row) => row.desabled}
              actions={<FilterProject />}
              clearSelectedRows={toggledClearRows} // Pass the toggle state here
            />
          ) : (
            <div>
              {isViewerUserRole &&
              <Link to={"/entry-page"}>
                <Button
                  name={
                    <Tooltip text="Add New Project" position="top">
                      <MdAddTask className="text-white text-xl" />
                    </Tooltip>
                  }
                  className={`${
                    darkMode
                      ? "bg-black text-white border-white"
                      : " border-black"
                  } p-1.5 border border-gray-200 bg-green-600 rounded-sm text-sm flex items-center justify-around text-blue-400 absolute right-11 -top-8 z-20 hover:scale-110`}
                />
              </Link>
}
              <DataTable
                columns={
                  data?.length > 0
                    ? TableColumn({
                        buttonRef,
                        handleViewCpi,
                        setShowSowList,
                        setSowList,
                      })
                    : Dummycolumns
                }
                data={data?.length > 0 ? desabledRowData : DummyData}
                pagination
                customStyles={darkMode ? customStylesDarkMode : customStyles}
                onSelectedRowsChange={handleSelectedRowsChange}
                enableMultiRowSelection
                selectableRowDisabled={(row) => row.desabled}
                actions={<FilterProject />}
                clearSelectedRows={toggledClearRows} // Pass the toggle state here
              />
            </div>
          )}
        </div>
      )}

      {isOperationPerson && isEdit && (
        <Popup>
          <Edit viewRecord={selectedRecord} />
        </Popup>
      )}
      {isSalesDept && isUploadSow && (
        <Popup>
          <UploadSow viewRecord={selectedRecord} />
        </Popup>
      )}
      {isOperationPerson && isAddManDays && (
        <Popup>
          <AddManDaysInduvisual viewRecord={selectedRecord} />
        </Popup>
      )}
      {isView && (
        <div className="z-50">
          <View />
        </div>
      )}
      {changeProjectStatus && (
        <Popup>
          <UpdateStatus viewRecord={selectedRecord} closeView={closeView} />
        </Popup>
      )}
      {isMultipleCpiSample && (
        <Popup>
          <ViewMultipleSampleCpi viewRecord={multipleCpiSample} />
        </Popup>
      )}
      {showSowList && (
        <Popup>
          <h1>This is Sow List</h1>
          <ViewSowUploadList viewRecord={sowList} />
        </Popup>
      )}
    </>
  );
};

export default OperationPersonTable;
