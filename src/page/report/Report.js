import React, { useContext, useEffect, useRef, useState } from "react";
import DataTable from "react-data-table-component";
import {
    customStyles,
  Dummycolumns,
  DummyData,
} from "../../../utils/tableData/DataTablesData";
import FilterProject from "../../project/FilterProject";
import Shimmer from "../../Atom/Shimmer";
import ProjectNameAndFilter from "../../project/ProjectNameAndFilter";
import ProjectStatusTabs from "../../project/projectCRUDOperations/ProjectStatusTabs";
import { FilterContext } from "../../ContextApi/FilterContext";
import { DataTableContext } from "../../ContextApi/DataTableContext";
import { useSelector } from "react-redux";
import { Data } from "../../../utils/tableData/data";
import { useNavigate } from "react-router-dom";
import { TableColumnReport } from "../../../utils/tableData/dataTableColumnsReport";
import { ReportData } from "../../../utils/tableData/reportData";

const Report = () => {
  const darkMode = useSelector((store) => store.darkMode.isDarkMode);
const buttonRef = useRef()
const navigate = useNavigate()
  const {
    searchTerm,
    filteredProjectData,
    isLoading,
    setIsLoading,
    projectData,
    teamLeadAssiged,
  } = useContext(FilterContext);
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
  const projects = useSelector((store) => store.projectData.projects);
  const [multipleCpiSample, setMultipleCpiSample] = useState([]);

  useEffect(() => {
    setIsLoading(false);
  }, [projectData]);

  const handleViewCpi = (row) => {
    const viewSampleCpi = projectData.filter((item) => item?.id === row?.id);
    setMultipleCpiSample(viewSampleCpi);
    dispatch(toggleViewMultipleCpiSample(true));
  };
  const handlePerRowsChange = (e) => {
    dispatch(addPageSize(e));
  };
  const handlePageChange = (e) => {
    dispatch(addPageNumber(e));
  };

 const data = ReportData();

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



  return (
    <div
      className={`${
        darkMode ? "bg-black border-white border" : "bg-white"
      } p-4 rounded-md mt-8 shadow-lg w-full`}
    >
      {isLoading ? (
        <Shimmer />
      ) : (
        <div className="w-full">
          <div
            className={`${
              isDrawerOpen
                ? "opacity-30 relative overflow-hidden"
                : "opacity-100"
            }`}
          >
            <ProjectNameAndFilter
              data={data}
              ProjectHeading={"All Project Details"}
              NoProjectHeading={"No Project Found"}
            />
            <div className="">
              <div className="relative">
                <div className="relative w-full">
                  <ProjectStatusTabs
                    className={
                      "absolute top-[10px] overflow-x-auto left-0 z-10 no-scrollbar w-full"
                    }
                  />
                </div>{" "}
                <DataTable
                  columns={
                    data?.length > 0
                      ? TableColumnReport({
                          buttonRef,
                          handleViewCpi,
                          setShowSowList,
                          setSowList,
                          navigate,
                          desabledRowData,
                        })
                      : Dummycolumns
                  }
                  data={data?.length > 0 ? desabledRowData : DummyData}
                  pagination
                  paginationServer
                  onChangeRowsPerPage={handlePerRowsChange}
                  onChangePage={handlePageChange}
                  customStyles={customStyles}
                //   onSelectedRowsChange={handleSelectedRowsChange}
                //   enableMultiRowSelection
                  selectableRowDisabled={(row) => row.desabled}
                  actions={<FilterProject />}
                  clearSelectedRows={toggledClearRows} // Pass the toggle state here
                  striped={true}
                  paginationTotalRows={totalRows}
                  highlightOnHover={true}
                  paginationRowsPerPageOptions={[10, 15, 20, 25, 30, 50, 100]}
                  theme={darkMode ? "dark" : "default"}
                  subHeader={true}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Report;
