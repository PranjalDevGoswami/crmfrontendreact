import React, { useEffect, useState, useContext } from "react";
import { AddManDays } from "../project/projectCRUDOperations/addManDays.js";
import AssignedProject from "./AssignedProject.js";
import { FilterContext } from "../ContextApi/FilterContext.js";
import { DataTableContext } from "../ContextApi/DataTableContext.js";
import ProjectStatusTabs from "./projectCRUDOperations/ProjectStatusTabs.js";
import OpenNotification from "../notification/OpenNotificationDetails.js";
import { NotifiactionContext } from "../ContextApi/NotificationContext.js";
import Shimmer from "../components/Shimmer.js";
import ProjectNameAndFilter from "./ProjectNameAndFilter";
import IsMultipleEdit from "./IsMultipleEdit";
import OperationPersonTable from "./OperationPersonTable";
import { Data } from "../../utils/tableData/data.js";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addExportData } from "../../utils/slices/ExportDataSlice.js";
import { useExportData } from "../../utils/hooks/useExportData.js";

const ProjectDataTable = ({ PersonDepartment }) => {
  const [isOperationPerson, setisOperationPerson] = useState(PersonDepartment);
  const [multiEditFieldOpen, setMultiEditFieldOpen] = useState(false);
  const [drawerContent, setDrawerContent] = useState(null);

  const {
    isEdit,
    isView,
    selectedRecord,
    setOpenDropdownIndex,
    setIsViewOptionOpen,
    changeProjectStatus,
    isAddManDays,
    isDrawerOpen,
    setIsDrawerOpen,
    isMultiEdit,
    setIsMultiEdit,
    selectedRow,
    setSelectedRow,
    closeView,
  } = useContext(DataTableContext);

  const darkMode = useSelector((store) => store.darkMode.isDarkMode);
  const dispatchExportData = useDispatch();
  const {
    searchTerm,
    filteredProjectData,
    isLoading,
    setIsLoading,
    projectData,
    teamLeadAssiged,
  } = useContext(FilterContext);

  const { isViewNotification } = useContext(NotifiactionContext);

  useEffect(() => {
    setIsLoading(false);
  }, [projectData]);

  const handleSelectedRowsChange = (row) => {
    const inCompletedTask = row.selectedRows.filter((item) => {
      return (
        item.status === null ||
        item.status === "" ||
        item.status === "To Be Started" ||
        item.status === "In Progress" ||
        item.status === "Project Initiated"
      );
    });
    if (row.selectedCount > 0) {
      setIsMultiEdit(true);
      setSelectedRow(inCompletedTask);
    } else {
      setIsMultiEdit(false);
    }
  };

  const handleAddManDays = () => {
    setDrawerContent("AddManDays");
    setMultiEditFieldOpen(true);
    setIsDrawerOpen(true);
    document.body.classList.toggle("DrawerBody");
  };

  const handleAssignProject = () => {
    setDrawerContent("AssignProject");
    setMultiEditFieldOpen(true);
    setIsDrawerOpen(true);
    document.body.classList.toggle("DrawerBody");
  };

  const filteredData = filteredProjectData?.filter((item) =>
    Object.values(item).some((val) => {
      if (typeof val === "object" && val !== null) {
        return Object.values(val).some((propVal) =>
          propVal
            ?.toString()
            ?.toLowerCase()
            ?.includes(searchTerm?.toLowerCase())
        );
      } else if (val) {
        return val
          ?.toString()
          ?.toLowerCase()
          ?.includes(searchTerm?.toLowerCase());
      }
      return false;
    })
  );

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

  const dataForExport = useExportData(desabledRowData);
  useEffect(() => {
    dispatchExportData(addExportData(dataForExport));
  }, [dataForExport]);

  return (
    <div
      className={`${
        darkMode ? "bg-black border-white border" : "bg-white"
      } p-4 rounded-md mt-8 shadow-lg`}
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
                      "absolute top-[10px] overflow-x-auto w-3/5 left-0 z-10 no-scrollbar"
                    }
                  />
                </div>
                <IsMultipleEdit
                  isMultiEdit={isMultiEdit}
                  handleAddManDays={handleAddManDays}
                  handleAssignProject={handleAssignProject}
                  selectedRow={selectedRow}
                />
                <div className="w-full tableClass" id="tableClass">
                  <OperationPersonTable
                    data={data}
                    handleSelectedRowsChange={handleSelectedRowsChange}
                    isOperationPerson={isOperationPerson}
                    isEdit={isEdit}
                    isAddManDays={isAddManDays}
                    isView={isView}
                    changeProjectStatus={changeProjectStatus}
                    desabledRowData={desabledRowData}
                    setOpenDropdownIndex={setOpenDropdownIndex}
                    setIsViewOptionOpen={setIsViewOptionOpen}
                    selectedRecord={selectedRecord}
                    closeView={closeView}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="w-[66%]">
            {multiEditFieldOpen && drawerContent === "AddManDays" && (
              <AddManDays setMultiEditFieldOpen={setMultiEditFieldOpen} />
            )}
            {multiEditFieldOpen && drawerContent === "AssignProject" && (
              <AssignedProject
                setMultiEditFieldOpen={setMultiEditFieldOpen}
                teamLeadAssiged={teamLeadAssiged}
              />
            )}
            {isViewNotification && (
              <div className="absolute top-1/2 left-1/2 w-1/2 -translate-x-1/2 p-2 h-auto">
                <OpenNotification />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDataTable;
