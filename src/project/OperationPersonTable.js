import React, { useContext, useEffect, useRef, useState } from "react";
import DataTable from "react-data-table-component";
import { Link, useNavigate } from "react-router-dom";
import { customStyles } from "../../utils/tableData/DataTablesData";
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
import RaisedCbr from "./projectCRUDOperations/RaisedCbr";

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
    showRaiseCbr,
  } = useContext(DataTableContext);
  const totalRows = useSelector((store) => store.projectData.totalRows);
  const [multipleCpiSample, setMultipleCpiSample] = useState([]);
  const { page_size, projects } = useSelector((store) => store.projectData);

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
  const navigate = useNavigate();

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
  console.log("oprn");
  

  // useEffect(() => {
  //   const element = document.getElementById("dataTable");

  //   if (!element) return;

  //   const handleScrollEvent = () => {
  //     console.log("Scroll Height:", element.scrollHeight);
  //     console.log("Scroll Top:", element.scrollTop);
  //     console.log("Offset Height:", element.offsetHeight);

  //     // Detect when user scrolls to the bottom
  //     if (element.scrollTop + element.offsetHeight >= element.scrollHeight) {
  //       let pageSize  = page_size+1;
  //       console.log("🚀 ~ handleScrollEvent ~ pageSize:", pageSize)

  //     dispatch(addPageSize(pageSize))
  //      }
  //   };

  //   // Attach event listener
  //   element.addEventListener("scroll", handleScrollEvent);

  //   // Cleanup function
  //   return () => {
  //     element.removeEventListener("scroll", handleScrollEvent);
  //   };
  // }, []);
  // useEffect(() => {
  //   const element = document.getElementById("dataTable");

  //   if (!element) return;

  //   const handleScrollEvent = () => {
  //     console.log("Scroll Height:", element.scrollHeight);
  //     console.log("Scroll Top:", element.scrollTop);
  //     console.log("Offset Height:", element.offsetHeight);

  //     // Detect when user scrolls to the bottom
  //     if (element.scrollTop + element.offsetHeight >= element.scrollHeight - 20) {
  //       if (projects.length < totalRows) {  // Ensure we load only when more data exists
  //         dispatch(addPageSize(page_size + 10));  // Increment page_size dynamically
  //       }
  //     }
  //   };

  //   element.addEventListener("scroll", handleScrollEvent);

  //   return () => {
  //     element.removeEventListener("scroll", handleScrollEvent);
  //   };
  // }, [page_size, projects.length]);  // Re-run when page_size or projects change

  return (
    // <div id="dataTable" ref={tableRef} className="overflow-auto no-scrollbar" style={{ height: `${desabledRowData.length * 50}px` ,maxHeight : "600px" }} >
    <div>
      {(department == isOperationDept && isTeamLeadRole) ||
      (department == isOperationDept && allManagerRolesRole) ||
      (department == isOperationDept && isHodRole) ? (
        <div>
          <DataTable
            columns={
              TableColumn({
                buttonRef,
                handleViewCpi,
                setShowSowList,
                setSowList,
                navigate,
                desabledRowData,
              })
            }
            data={desabledRowData}
            pagination
            paginationServer
            onChangeRowsPerPage={handlePerRowsChange}
            onChangePage={handlePageChange}
            paginationTotalRows={totalRows}
            customStyles={customStyles}
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
            paginationPerPage={page_size}
            persistTableHead={true}
            loading={"Loading...."}
          />
        </div>
      ) : (isSuperUserDepartment.includes(department) && isSuperUserRole) ||
        isDirectorRole ? (
        <div>
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
              TableColumn({
                buttonRef,
                handleViewCpi,
                setShowSowList,
                setSowList,
                navigate,
                desabledRowData,
              })
            }
            data={desabledRowData}
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
            paginationPerPage={page_size}
            persistTableHead={true}
            loading={"Loading...."}
          />
        </div>
      ) : (
        <div>
          {isDirectorRole || department == isFinanceDept ? (
            <DataTable
              columns={
                TableColumn({
                  buttonRef,
                  handleViewCpi,
                  setShowSowList,
                  setSowList,
                  navigate,
                  desabledRowData,
                })
              }
              data={desabledRowData}
              pagination
              paginationServer
              onChangeRowsPerPage={handlePerRowsChange}
              onChangePage={handlePageChange}
              customStyles={customStyles}
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
              paginationPerPage={page_size}
              persistTableHead={true}
              loading={"Loading...."}
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
                  TableColumn({
                    buttonRef,
                    handleViewCpi,
                    setShowSowList,
                    setSowList,
                    navigate,
                    desabledRowData,
                  })
                }
                data={desabledRowData}
                pagination
                paginationServer
                onChangeRowsPerPage={handlePerRowsChange}
                onChangePage={handlePageChange}
                customStyles={customStyles}
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
                paginationPerPage={page_size}
                persistTableHead={true}
                loading={"Loading...."}
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
      {showRaiseCbr && (
        <Popup>
          <div className="flex">
            <RaisedCbr viewRecord={selectedRecord} />
          </div>
        </Popup>
      )}
    </div>
  );
};

export default OperationPersonTable;
