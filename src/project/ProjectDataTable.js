import React, { useEffect, useState, useRef, useContext } from "react";
import DataTable from "react-data-table-component";
import { GetProjectData } from "../fetchApis/projects/getProjectData/GetProjectData.js";
import Button from "../components/Button";
import {
  DummyData,
  Dummycolumns,
  customStyles,
  customStylesDarkMode,
} from "../../utils/DataTablesData";
import { AddManDays } from "../project/projectCRUDOperations/addManDays.js";
import View from "./projectCRUDOperations/View.js";
import Edit from "./projectCRUDOperations/ProjectEditRequest.js";
import { TableColumn } from "../../utils/dataTableColumns.js";
import AssignedProject from "./AssignedProject.js";
import FilterProject from "./FilterProject";
import ExportCSV from "./ExportExcel.js";
import { ThemeContext } from "../ContextApi/ThemeContext";
import { FilterContext } from "../ContextApi/FilterContext.js";
import { DataTableContext } from "../ContextApi/DataTableContext.js";
import ProjectStatusTabs from "./projectCRUDOperations/ProjectStatusTabs.js";
import { Link } from "react-router-dom";
import OpenNotification from "../notification/OpenNotificationDetails.js";
import { NotifiactionContext } from "../ContextApi/NotificationContext.js";
import Shimmer from "../components/Shimmer.js";
import AddManDaysInduvisual from "./projectCRUDOperations/AddManDaysInduvisual.js";
import ChangeStatus from "./projectCRUDOperations/ChangeStatus.js";

const ProjectDataTable = ({ PersonDepartment }) => {
  const [isOperationPerson, setisOperationPerson] = useState(PersonDepartment);
  const [multiEditFieldOpen, setMultiEditFieldOpen] = useState(false);
  const [drawerContent, setDrawerContent] = useState(null);

  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  const {
    isEdit,
    setisEdit,
    isView,
    selectedRecord,
    setOpenDropdownIndex,
    setIsViewOptionOpen,
    changeStatus,
    closeView,
    isAddManDays,
    isDrawerOpen,
    setIsDrawerOpen,
    isMultiEdit,
    setIsMultiEdit,
    selectedRow,
    setSelectedRow,
  } = useContext(DataTableContext);

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

  let token = localStorage.getItem("token");
  let role = localStorage.getItem("role");
  let department = localStorage.getItem("department");
  let user_id = localStorage.getItem("user_id");

  const handleClickOutside = (event) => {
    if (buttonRef.current && !buttonRef.current.contains(event.target)) {
      setIsViewOptionOpen(false);
      setOpenDropdownIndex(-1);
    }
  };

  useEffect(() => {
    if (!isDrawerOpen && !isAddManDays && !changeStatus) {
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
    token,
    isAddManDays,
    changeStatus,
    notificationProjectList,
    isDrawerOpen,
    setIsViewNotification,
    isViewNotification,
  ]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdownIndex(-1);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
  const data = filteredData?.map((item, index) => ({
    id: item?.id,
    project_code: item?.project_code,
    name: item?.name,
    cpi: item?.cpi,
    clients: item?.clients?.name,
    operation_select: item?.operation_select,
    project_type: item?.project_type?.name,
    other_cost: item?.other_cost,
    project_code: item?.project_code,
    set_up_fee: item?.set_up_fee,
    tentative_end_date: item?.tentative_end_date,
    tentative_start_date: item?.tentative_start_date?.split("T")[0],
    tentative_end_date: item?.tentative_end_date?.split("T")[0],
    sample: item?.sample,
    total_achievement: item?.total_achievement,
    remaining_interview: item.remaining_interview,
    man_days: item.man_days,
    status: item.status,
  }));
  const currentDate = new Date().toISOString().split("T")[0];

  const desabledRowData = data?.map((item) => {
    let desabled = false;
    if (
      item.status === "completed" ||
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
            <div className="sm:flex items-center justify-between w-full min-[320px]:block">
              <div className="sm:w-6/12 min-[320px]:w-full">
                <h2 className="text-2xl">
                  {data?.length > 0
                    ? "All Project Details"
                    : "No Project Found"}
                </h2>
              </div>
              <div className="flex items-center justify-end sm:w-6/12 min-[320px]:w-full">
                <FilterProject />
              </div>
            </div>
            <div className="">
              <div className="relative">
                <div className="relative w-full">
                  <ProjectStatusTabs
                    className={
                      "absolute top-[15px] overflow-x-auto w-3/5 left-0 z-10 no-scrollbar"
                    }
                  />
                </div>
                {isMultiEdit && (
                  <div
                    className={`${
                      isMultiEdit
                        ? "AddManDaysAnimation  opacity-100 flex items-center justify-left bg-[#bd1d1d] border absolute right-0 top-[-0.3rem] w-full p-2"
                        : " opacity-0"
                    } z-auto`}
                  >
                    <span className="text-white text-xl">
                      row selected ({selectedRow.length})
                    </span>
                    {role?.includes("Team Lead") ? (
                      <Button
                        name={"Add Man Days"}
                        className={
                          "p-2 bg-yellow-200 border rounded-lg border-black ml-4"
                        }
                        onClick={handleAddManDays}
                      />
                    ) : role?.includes("AM/Manager") ||
                      role?.includes("Manager") ? (
                      <Button
                        name={"Assign Project"}
                        className={
                          "p-2 bg-yellow-200 border rounded-lg border-black ml-4"
                        }
                        onClick={handleAssignProject}
                      />
                    ) : role?.includes("superuser") ? (
                      <div>
                        <Button
                          name={"Add Man Days"}
                          className={
                            "p-2 bg-yellow-200 border rounded-lg border-black ml-4"
                          }
                          onClick={handleAddManDays}
                        />
                        <Button
                          name={"Assign Project"}
                          className={
                            "p-2 bg-yellow-200 border rounded-lg border-black ml-4"
                          }
                          onClick={handleAssignProject}
                        />
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                )}
                <div className="w-full tableClass" id="tableClass">
                  {department == 2 &&
                  (role?.includes("Team Lead") ||
                    role?.includes("AM/Manager") ||
                    role?.includes("Manager")) ? (
                    <DataTable
                      columns={
                        data?.length > 0
                          ? TableColumn({ buttonRef })
                          : Dummycolumns
                      }
                      data={data?.length > 0 ? desabledRowData : DummyData}
                      pagination
                      customStyles={
                        darkMode ? customStylesDarkMode : customStyles
                      }
                      selectableRows
                      onSelectedRowsChange={handleSelectedRowsChange}
                      enableMultiRowSelection
                      selectableRowDisabled={(row) => row.desabled}
                      actions={<ExportCSV data={data} />}
                    />
                  ) : (department == 1 ||
                      department == 2 ||
                      department == 3 ||
                      department == 4) &&
                    role?.includes("superuser") ? (
                    <div className="">
                      <Link to={"/entry-page"}>
                        <Button
                          name={"Add Project"}
                          className={`${
                            darkMode
                              ? "bg-black text-white border-white"
                              : "bg-yellow-200 border-black"
                          } border rounded-lg p-2 absolute right-28 top-2 z-10`}
                        />
                      </Link>
                      <DataTable
                        columns={
                          data?.length > 0
                            ? TableColumn({ buttonRef })
                            : Dummycolumns
                        }
                        data={data?.length > 0 ? desabledRowData : DummyData}
                        pagination
                        selectableRows
                        customStyles={
                          darkMode ? customStylesDarkMode : customStyles
                        }
                        onSelectedRowsChange={handleSelectedRowsChange}
                        enableMultiRowSelection
                        selectableRowDisabled={(row) => row.desabled}
                        actions={<ExportCSV data={data} />}
                      />
                    </div>
                  ) : (
                    <div className="w-full no-scrollbar">
                      {role?.includes("Director") ? (
                        <DataTable
                          columns={
                            data?.length > 0
                              ? TableColumn({ buttonRef })
                              : Dummycolumns
                          }
                          data={data?.length > 0 ? desabledRowData : DummyData}
                          pagination
                          customStyles={
                            darkMode ? customStylesDarkMode : customStyles
                          }
                          onSelectedRowsChange={handleSelectedRowsChange}
                          enableMultiRowSelection
                          selectableRowDisabled={(row) => row.desabled}
                          actions={<ExportCSV data={data} />}
                        />
                      ) : (
                        <div>
                          <Link to={"/entry-page"}>
                            <Button
                              name={"Add Project"}
                              className={`${
                                darkMode
                                  ? "bg-black text-white border-white"
                                  : "bg-yellow-200 border-black"
                              } border rounded-lg p-2 absolute right-0 top-2 z-20`}
                            />
                          </Link>
                          <DataTable
                            columns={
                              data?.length > 0
                                ? TableColumn({ buttonRef })
                                : Dummycolumns
                            }
                            data={
                              data?.length > 0 ? desabledRowData : DummyData
                            }
                            pagination
                            customStyles={
                              darkMode ? customStylesDarkMode : customStyles
                            }
                            onSelectedRowsChange={handleSelectedRowsChange}
                            enableMultiRowSelection
                            selectableRowDisabled={(row) => row.desabled}
                            actions={<div />}
                          />
                        </div>
                      )}
                    </div>
                  )}

                  {isOperationPerson && isEdit && (
                    <div className="absolute  w-1/2 h-auto top-1/2 left-1/2 bg-white p-4 border rounded-md  border-black drop-shadow-lg shadow-2xl shadow-slate-400 -translate-x-1/2 -translate-y-1/2 z-30">
                      <Edit viewRecord={selectedRecord} />
                    </div>
                  )}
                  {isOperationPerson && isAddManDays && (
                    <div className="absolute  w-1/2 h-auto top-1/2 left-1/2 bg-white p-4 border  rounded-md border-black drop-shadow-lg shadow-2xl shadow-slate-400 -translate-x-1/2 -translate-y-1/2 z-30">
                      <AddManDaysInduvisual viewRecord={selectedRecord} />
                    </div>
                  )}
                  {isView && (
                    <div className="z-50">
                      <View />
                    </div>
                  )}
                  {changeStatus && (
                    <div className="absolute  w-1/3 h-auto top-1/2 left-1/2 bg-white p-8 border border-black drop-shadow-lg shadow-2xl shadow-slate-400 translate-x-[-50%] translate-y-[-30%] z-30">
                      <ChangeStatus
                        viewRecord={selectedRecord}
                        closeView={closeView}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="">
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
