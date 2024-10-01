import React, { useEffect, useState, useContext } from "react";
import { GetProjectData } from "../fetchApis/projects/getProjectData/GetProjectData.js";
import { AddManDays } from "../project/projectCRUDOperations/addManDays.js";
import AssignedProject from "./AssignedProject.js";
import { ThemeContext } from "../ContextApi/ThemeContext";
import { FilterContext } from "../ContextApi/FilterContext.js";
import { DataTableContext } from "../ContextApi/DataTableContext.js";
import ProjectStatusTabs from "./projectCRUDOperations/ProjectStatusTabs.js";
import OpenNotification from "../notification/OpenNotificationDetails.js";
import { NotifiactionContext } from "../ContextApi/NotificationContext.js";
import Shimmer from "../components/Shimmer.js";
import { FormDataContext } from "../ContextApi/FormDataContext.js";
import ProjectNameAndFilter from "./ProjectNameAndFilter";
import IsMultipleEdit from "./IsMultipleEdit";
import OperationPersonTable from "./OperationPersonTable";
import { isDirector, Token } from "../config/Role.js";
import useProjectData from "../../utils/hooks/useProjectData.js";

const ProjectDataTable = ({ PersonDepartment }) => {
  const [isOperationPerson, setisOperationPerson] = useState(PersonDepartment);
  const [multiEditFieldOpen, setMultiEditFieldOpen] = useState(false);
  const [drawerContent, setDrawerContent] = useState(null);
  const role = localStorage.getItem("role");

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

  const { projectAdded } = useContext(FormDataContext);

  const { darkMode } = useContext(ThemeContext);
  const {
    searchTerm,
    filteredProjectData,
    isLoading,
    setIsLoading,
    setProjectData,
    teamLeadAssiged,
  } = useContext(FilterContext);

  const { isViewNotification, notificationProjectList, setIsViewNotification } =
    useContext(NotifiactionContext);

  const department = localStorage.getItem("department");

  useEffect(() => {
    if (!isDrawerOpen && !isAddManDays && !changeProjectStatus) {
      const fetchProjectData = async () => {
        setIsLoading(true);
        try {
          const fetchDataFromApi2 = await GetProjectData();
          const projectDataObject = fetchDataFromApi2?.data?.map((val) => val);
          setProjectData(projectDataObject);
          setIsLoading(false);
        } catch (error) {
          console.error("Error fetching project data:", error);
          setIsLoading(false);
        }
      };
      fetchProjectData();
    }
  }, [
    Token,
    isAddManDays,
    changeProjectStatus,
    notificationProjectList,
    isDrawerOpen,
    setIsViewNotification,
    isViewNotification,
    projectAdded,
    department,
    role,
  ]);

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

  // const TLName =
  const data = filteredData?.map((item, index) => ({
    id: item?.id,
    project_code: item?.project_code,
    name: item?.name,
    cpi: item?.cpi ? Number(item?.cpi).toFixed(2) : "0.00",
    clients: item?.clients?.name,
    operation_select: item?.operation_select,
    project_type: item?.project_type?.name,
    other_cost: item?.other_cost,
    project_code: item?.project_code,
    set_up_fee: item?.set_up_fee,
    tentative_end_date: item?.tentative_end_date,
    tentative_start_date:
      role !== isDirector && item?.tentative_start_date?.split("T")[0],
    tentative_end_date:
      role !== isDirector && item?.tentative_end_date?.split("T")[0],
    project_assigned_to_teamlead: item?.project_assigned_to_teamlead,
    assigned_to: item?.assigned_to,
    sample: item?.sample,
    total_achievement: item?.total_achievement,
    remaining_interview: item?.remaining_interview,
    man_days: item.man_days,
    status: item?.status,
    project_client_pm: item?.project_client_pm,
  }));

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
            <ProjectNameAndFilter data={data} />
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
