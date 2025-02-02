import React, { useContext, useEffect, useRef } from "react";
import DataTable from "react-data-table-component";
import { TableColumn } from "../../utils/tableData/dataTableColumns";
import { useSelector, useDispatch } from "react-redux";
import { DataTableContext } from "../ContextApi/DataTableContext";
import { Data } from "../../utils/tableData/data";
import {
  customStyles,
} from "../../utils/tableData/DataTablesData";
import FilterProject from "../project/FilterProject";
import ProjectNameAndFilter from "../project/ProjectNameAndFilter";
import ProjectStatusTabs from "../project/projectCRUDOperations/ProjectStatusTabs";
import { useNavigate } from "react-router-dom";
import ABRStatusTabs from "../project/projectCRUDOperations/ABRStatusTabs";
import { FilterContext } from "../ContextApi/FilterContext";
import { addPageNumber, addPageSize } from "../../utils/slices/ProjectSlice";

const AbrDashboard = () => {
  const dispatch = useDispatch();
  const { setActiveTabValue } = useContext(FilterContext);
  useEffect(() => {
    setActiveTabValue("Advanced Billing Raised");
  }, []);

  const {
    setShowSowList,
    setSowList,
    toggledClearRows,
    setToggleClearRows,
    isDrawerOpen,
  } = useContext(DataTableContext);
  const totalRows = useSelector((store) => store.projectData.totalRows);
  const navigate = useNavigate();
  const darkMode = useSelector((store) => store.darkMode.isDarkMode);
  const buttonRef = useRef(null);

  const data = Data();
  const currentDate = new Date().toISOString().split("T")[0];

  const desabledRowData = data?.map((item) => {
    let desabled = false;
    if (
      item.status === "Completed" ||
      item.status === "cbr_raised" ||
      new Date(item.tentative_end_date) < new Date(currentDate)
    ) {
      desabled = true;
    }
    return { ...item, desabled };
  });

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
  return (
    <div
      className={`${
        darkMode ? "bg-black border-white border" : "bg-white"
      } p-4 rounded-md mt-8 shadow-lg`}
    >
      <div className="w-full">
        <div
          className={`${
            isDrawerOpen ? "opacity-30 relative overflow-hidden" : "opacity-100"
          }`}
        >
          <ProjectNameAndFilter
            data={data}
            ProjectHeading={"Advanced Billing Requisition	"}
            NoProjectHeading={"No Project Found"}
          />
          <div className="relative w-full">
            <ABRStatusTabs
              className={
                "absolute top-[10px] overflow-x-auto left-0 z-10 no-scrollbar w-8/12"
              }
            />
          </div>

          <DataTable
            columns={TableColumn({
                    buttonRef,
                    //   handleViewCpi,
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
            selectableRowDisabled={(row) => row.desabled}
            actions={<FilterProject />}
            clearSelectedRows={toggledClearRows} // Pass the toggle state here
            striped={true}
            paginationTotalRows={totalRows}
            highlightOnHover={true}
            paginationRowsPerPageOptions={[10, 15, 20, 25, 30, 50, 100]}
            theme={darkMode ? "dark" : "default"}
            persistTableHead={true}
                  loading={"Loading...."}
          />
        </div>
      </div>
    </div>
  );
};

export default AbrDashboard;
