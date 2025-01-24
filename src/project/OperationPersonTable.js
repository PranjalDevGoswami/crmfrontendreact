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
import { addPageNumber, addPageSize } from "../../utils/slices/ProjectSlice";

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
    toggledClearRows,
    setToggleClearRows,
    isMultiEdit,
    isDrawerOpen,
  } = useContext(DataTableContext);
  const totalRows = useSelector((store) => store.projectData.totalRows);
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
  };
  useEffect(() => {
    if (isDrawerOpen == false) {
      handleClearRows(); // Call clear rows when new data is loaded
    }
  }, [isDrawerOpen]);

  const handlePerRowsChange = (e) => {
    dispatch(addPageSize(e));
  };
  const handlePageChange = (e) => {
    dispatch(addPageNumber(e));
  };

  // useEffect(() => {
  //   const element = document.getElementById("dataTable");
  //   function handleScrollEvent() {
  //     console.log(
  //       "You're at the bottom of the table",
  //       element.scrollTop , element.clientHeight,
  //       element.scrollHeight
  //     );
  //     if (element) {
  //       // Check if user has scrolled to the bottom
  //       if (element.scrollTop + element.clientHeight >= element.scrollHeight) {
  //         console.log(
  //           "You're at the bottom of the table",
  //           element.scrollTop + element.clientHeight,
  //           element.scrollHeight
  //         );
  //         // Add more items to the 'filteredData' state from 'allData'
  //       }
  //     }
  //   }
  
  //   // if (element) {
  //     // Attach event listener to the specific element
  //     window.addEventListener("scroll", handleScrollEvent);
  //   // }
  
  //   return () => {
  //     // Cleanup: Remove the event listener when component unmounts
  //     if (element) {
  //       element.removeEventListener("scroll", handleScrollEvent);
  //     }
  //   };
  // }, []);
  

  return (
    <div id="dataTable">
      {(department == isOperationDept && isTeamLeadRole) ||
      (department == isOperationDept && allManagerRolesRole) ||
      (department == isOperationDept && isHodRole) ? (
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
          paginationServer
          onChangeRowsPerPage={handlePerRowsChange}
          onChangePage={handlePageChange}
          paginationTotalRows={totalRows}
          customStyles={darkMode ? customStylesDarkMode : customStyles}
          selectableRows
          onSelectedRowsChange={handleSelectedRowsChange}
          enableMultiRowSelection
          selectableRowDisabled={(row) => row.desabled}
          actions={<FilterProject />}
          clearSelectedRows={toggledClearRows} // Pass the toggle state here
          striped={true}
          highlightOnHover={true}
          paginationRowsPerPageOptions={[10, 15, 20, 25, 30, 50, 100]}
          theme={darkMode ? "dark" : "default"}
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
            paginationServer
            onChangeRowsPerPage={handlePerRowsChange}
            onChangePage={handlePageChange}
            selectableRows
            customStyles={customStyles}
            onSelectedRowsChange={handleSelectedRowsChange}
            enableMultiRowSelection
            selectableRowDisabled={(row) => row.desabled}
            actions={<FilterProject />}
            clearSelectedRows={toggledClearRows} // Pass the toggle state here
            paginationTotalRows={totalRows}
            striped={true}
            highlightOnHover={true}
            paginationRowsPerPageOptions={[10, 15, 20, 25, 30, 50, 100]}
            fixedHeader={true}
            theme={darkMode ? "dark" : "default"}
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
              paginationServer
              onChangeRowsPerPage={handlePerRowsChange}
              onChangePage={handlePageChange}
              customStyles={darkMode ? customStylesDarkMode : customStyles}
              onSelectedRowsChange={handleSelectedRowsChange}
              enableMultiRowSelection
              selectableRowDisabled={(row) => row.desabled}
              actions={<FilterProject />}
              clearSelectedRows={toggledClearRows} // Pass the toggle state here
              striped={true}
              paginationTotalRows={totalRows}
              highlightOnHover={true}
              paginationRowsPerPageOptions={[10, 15, 20, 25, 30, 50, 100]}
              theme={darkMode ? "dark" : "default"}
            />
          ) : (
            <div>
              {isViewerUserRole && (
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
              )}
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
                paginationServer
                onChangeRowsPerPage={handlePerRowsChange}
                onChangePage={handlePageChange}
                customStyles={darkMode ? customStylesDarkMode : customStyles}
                onSelectedRowsChange={handleSelectedRowsChange}
                enableMultiRowSelection
                selectableRowDisabled={(row) => row.desabled}
                actions={<FilterProject />}
                clearSelectedRows={toggledClearRows} // Pass the toggle state here
                striped={true}
                theme={darkMode ? "dark" : "default"}
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
    </div>
  );
};

export default OperationPersonTable;
