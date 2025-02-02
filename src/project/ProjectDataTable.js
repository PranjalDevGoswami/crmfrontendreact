import React, { useEffect, useState, useContext } from "react";
import { AddManDays } from "../project/projectCRUDOperations/addManDays.js";
import AssignedProject from "./AssignedProject.js";
import { FilterContext } from "../ContextApi/FilterContext.js";
import { DataTableContext } from "../ContextApi/DataTableContext.js";
import ProjectStatusTabs from "./projectCRUDOperations/ProjectStatusTabs.js";
import OpenNotification from "../notification/OpenNotificationDetails.js";
import { NotifiactionContext } from "../ContextApi/NotificationContext.js";
import Shimmer from "../Atom/Shimmer";
import ProjectNameAndFilter from "./ProjectNameAndFilter";
import IsMultipleEdit from "./IsMultipleEdit";
import OperationPersonTable from "./OperationPersonTable";
import { Data } from "../../utils/tableData/data.js";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addExportData } from "../../utils/slices/ExportDataSlice.js";
import { useExportData } from "../../utils/hooks/useExportData.js";
import Popup from "../Atom/Popup.js";

const ProjectDataTable = ({ config, PersonDepartment }) => {
  const [isOperationPerson, setisOperationPerson] = useState(PersonDepartment);
  const [multiEditFieldOpen, setMultiEditFieldOpen] = useState(false);
  const [drawerContent, setDrawerContent] = useState(null);

  const {
    isDrawerOpen,
    setIsDrawerOpen,
    isMultiEdit,
    setIsMultiEdit,
    selectedRow,
    setSelectedRow,
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

  const dataForExport = useExportData(desabledRowData); //useExportData used for filter item that need to be export
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
                      "absolute top-[10px] overflow-x-auto left-0 z-10 no-scrollbar w-8/12"
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
                    config
                    data={data}
                    handleSelectedRowsChange={handleSelectedRowsChange}
                    isOperationPerson={isOperationPerson}
                    desabledRowData={desabledRowData}
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
              <Popup>
                <OpenNotification />
              </Popup>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDataTable;
