import React, { useEffect, useState, useRef, useContext } from "react";
import DataTable from "react-data-table-component";
import { GetProjectData } from "../fetchApis/projects/getProjectData/GetProjectData.js";
import Button from "../components/Button";
import {
  DummyData,
  Dummycolumns,
  conditionalRowStyles,
  customStyles,
  customStylesDarkMode,
} from "../../utils/DataTablesData";
import { AddManDays } from "../project/projectCRUDOperations/addManDays.js";
import View from "./projectCRUDOperations/View.js";
import Edit from "./projectCRUDOperations/ProjectEditRequest.js";
import Status from "./projectCRUDOperations/Status.js";
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

const ProjectDataTable = ({ PersonDepartment }) => {
  const [isOperationPerson, setisOperationPerson] = useState(PersonDepartment);
  const [isMultiEdit, setIsMultiEdit] = useState(false);
  const [multiEditFieldOpen, setMultiEditFieldOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [closeView, setCloseView] = useState(false);
  const [filteredProjectData, setFilteredProjectData] = useState([]);
  const [teamLeadAssiged, setTeamLeadAssiged] = useState();
  const [drawerContent, setDrawerContent] = useState(null);
  const dropdownRef = useRef(null);

  let token = localStorage.getItem("token");
  let role = localStorage.getItem("role");
  let department = localStorage.getItem("department");
  let user_id = localStorage.getItem("user_id");

  const { darkMode } = useContext(ThemeContext);
  const {
    setIsStatus,
    isEdit,
    setisEdit,
    setisView,
    isView,
    selectedRecord,
    setOpenDropdownIndex,
    setIsViewOptionOpen,
    isStatus,
  } = useContext(DataTableContext);

  const {
    selectedStatus,
    selectedClient,
    searchTerm,
    selectedHod,
    selectedManager,
    selectedTl,
  } = useContext(FilterContext);
  const { isViewNotification, notificationProjectList, setIsViewNotification } =
    useContext(NotifiactionContext);
  const buttonRef = useRef(null);

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const fetchDataFromApi2 = await GetProjectData();
        const projectDataObject = fetchDataFromApi2?.data?.map((val) => {
          return val;
        });
        // Filter based on selected status and client
        let filteredData = projectDataObject;
        if (selectedStatus && selectedStatus !== "--Select Status--") {
          filteredData = filteredData.filter(
            (item) => item.status == selectedStatus
          );
        }
        if (selectedHod && selectedHod !== "--Select HOD--") {
          filteredData = filteredData.filter(
            (item) => item?.project_hod?.name == selectedHod
          );
        }
        if (selectedManager && selectedManager !== "--Select Manager--") {
          filteredData = filteredData.filter(
            (item) => item?.project_manager?.name == selectedManager
          );
        }
        if (selectedTl && selectedTl !== "--Select TeamLead--") {
          filteredData = filteredData.filter(
            (item) => item?.project_teamlead?.name == selectedTl
          );
        }
        if (selectedClient && selectedClient !== "--Select Client--") {
          filteredData = filteredData.filter(
            (item) => item.clients.name === selectedClient
          );
        }
        if (role === "Team Lead") {
          filteredData = filteredData?.filter((item) => {
            return item?.project_teamlead?.id == user_id;
          });
        }
        if (role === "AM/Manager") {
          filteredData = filteredData?.filter((item) => {
            return item?.project_manager?.id == user_id;
          });
        }
        if (role === "HOD") {
          filteredData = filteredData?.filter((item) => {
            return item?.project_hod?.id == user_id;
          });
        }
        if (role === "superuser") {
          filteredData = filteredData?.filter((item) => {
            return item;
          });
        }
        if (department == 1) {
          filteredData = projectDataObject?.filter((item) => {
            return item.user_id == user_id;
          });
          if (selectedStatus && selectedStatus !== "--Select Status--") {
            filteredData = filteredData.filter(
              (item) => item.status == selectedStatus
            );
          }
          if (selectedClient && selectedClient !== "--Select Client--") {
            filteredData = filteredData.filter(
              (item) => item.clients.name === selectedClient
            );
          }
        }

        setTeamLeadAssiged(filteredData);
        setFilteredProjectData(filteredData);
      } catch (error) {
        console.error("Error fetching project data:", error);
      }
    };
    fetchProjectData();
  }, [
    token,
    isDrawerOpen,
    selectedStatus,
    selectedClient,
    selectedManager,
    selectedHod,
    selectedTl,
    notificationProjectList,
    setIsViewNotification,
  ]);

  const handleClickOutside = (event) => {
    if (buttonRef.current && !buttonRef.current.contains(event.target)) {
      setIsViewOptionOpen(false);
      setOpenDropdownIndex(-1);
    }
  };

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
        item.status === "to_be_started" ||
        item.status === "inprogress"
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
    id: index + 1,
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
    <div className="p-4">
      <div
        className={`${
          isDrawerOpen ? "opacity-30 relative overflow-hidden" : "opacity-100"
        }"`}
      >
        <div className="flex lg:justify-end justify-start mb-4 lg:w-full w-full">
          <div className="flex items-center">
            <FilterProject />
          </div>
        </div>
        <div className="relative table">
          <div className="relative w-full">
            <ProjectStatusTabs className={"absolute top-1 left-60 z-10"} />
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
              {role.includes("Team Lead") ? (
                <Button
                  name={"Add Man Days"}
                  className={
                    "p-2 bg-yellow-200 border rounded-lg border-black ml-4"
                  }
                  onClick={handleAddManDays}
                />
              ) : role.includes("AM/Manager") ? (
                <Button
                  name={"Assign Project"}
                  className={
                    "p-2 bg-yellow-200 border rounded-lg border-black ml-4"
                  }
                  onClick={handleAssignProject}
                />
              ) : role.includes("superuser") ? (
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
          {department == 2 &&
          (role.includes("Team Lead") || role.includes("AM/Manager")) ? (
            <DataTable
              columns={
                data?.length > 0 ? TableColumn({ buttonRef }) : Dummycolumns
              }
              data={data?.length > 0 ? desabledRowData : DummyData}
              pagination
              customStyles={darkMode ? customStylesDarkMode : customStyles}
              selectableRows
              onSelectedRowsChange={handleSelectedRowsChange}
              enableMultiRowSelection
              selectableRowDisabled={(row) => row.desabled}
              conditionalRowStyles={conditionalRowStyles}
              title={
                data?.length > 0 ? "All Project Details" : "No Project Found"
              }
              actions={<ExportCSV data={data} />}
            />
          ) : (department == 1 ||
              department == 2 ||
              department == 3 ||
              department == 4) &&
            role.includes("superuser") ? (
            <div className="">
              <Link to={"/entry-page"}>
                <Button
                  name={"Add Project"}
                  // onClick={AddProjectHandler}
                  className={`${
                    darkMode
                      ? "bg-black text-white border-white"
                      : "bg-yellow-200 border-black"
                  } border rounded-lg p-2 absolute right-28 top-2 z-10`}
                />
              </Link>
              <DataTable
                columns={
                  data?.length > 0 ? TableColumn({ buttonRef }) : Dummycolumns
                }
                data={data?.length > 0 ? desabledRowData : DummyData}
                pagination
                selectableRows
                customStyles={darkMode ? customStylesDarkMode : customStyles}
                onSelectedRowsChange={handleSelectedRowsChange}
                enableMultiRowSelection
                selectableRowDisabled={(row) => row.desabled}
                conditionalRowStyles={conditionalRowStyles}
                title={
                  data?.length > 0 ? "All Project Details" : "No Project Found"
                }
                actions={<ExportCSV data={data} />}
              />
            </div>
          ) : (
            <div className="">
              {role.includes("Director") ? (
                <DataTable
                  columns={
                    data?.length > 0 ? TableColumn({ buttonRef }) : Dummycolumns
                  }
                  data={data?.length > 0 ? desabledRowData : DummyData}
                  pagination
                  customStyles={darkMode ? customStylesDarkMode : customStyles}
                  onSelectedRowsChange={handleSelectedRowsChange}
                  enableMultiRowSelection
                  selectableRowDisabled={(row) => row.desabled}
                  conditionalRowStyles={conditionalRowStyles}
                  title={
                    data?.length > 0
                      ? "All Project Details"
                      : "No Project Found"
                  }
                  actions={<ExportCSV data={data} />}
                />
              ) : (
                <Link to={"/entry-page"}>
                  <Button
                    name={"Add Project"}
                    // onClick={AddProjectHandler}
                    className={`${
                      darkMode
                        ? "bg-black text-white border-white"
                        : "bg-yellow-200 border-black"
                    } border rounded-lg p-2 absolute right-0 top-2 z-20`}
                  />
                </Link>
              )}
              <DataTable
                columns={
                  data?.length > 0 ? TableColumn({ buttonRef }) : Dummycolumns
                }
                data={data?.length > 0 ? desabledRowData : DummyData}
                pagination
                customStyles={darkMode ? customStylesDarkMode : customStyles}
                onSelectedRowsChange={handleSelectedRowsChange}
                enableMultiRowSelection
                selectableRowDisabled={(row) => row.desabled}
                conditionalRowStyles={conditionalRowStyles}
                title={
                  data?.length > 0 ? "All Project Details" : "No Project Found"
                }
                // actions={<ExportCSV data={data} />}
              />
            </div>
          )}

          {isOperationPerson && isEdit && (
            <Edit viewRecord={selectedRecord} setisEdit={setisEdit} />
          )}
          {isView && (
            <div className="z-50">
              <View
                viewRecord={selectedRecord}
                closeView={closeView}
                setisView={setisView}
              />
            </div>
          )}
          {isStatus && (
            <div className="z-50">
              <Status
                viewRecord={selectedRecord}
                closeView={closeView}
                setIsStatus={setIsStatus}
              />
            </div>
          )}
        </div>
      </div>
      <div className="">
        {multiEditFieldOpen && drawerContent === "AddManDays" && (
          <AddManDays
            selectedRow={selectedRow}
            setIsDrawerOpen={setIsDrawerOpen}
            setMultiEditFieldOpen={setMultiEditFieldOpen}
          />
        )}
        {multiEditFieldOpen && drawerContent === "AssignProject" && (
          <AssignedProject
            selectedRow={selectedRow}
            setIsDrawerOpen={setIsDrawerOpen}
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
  );
};

export default ProjectDataTable;
