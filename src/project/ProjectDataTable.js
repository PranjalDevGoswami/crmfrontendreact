import React, { useEffect, useState, useRef } from "react";
import DataTable from "react-data-table-component";
import { GetProjectData } from "../fetchApis/projects/getProjectData/GetProjectData.js";
import Button from "../components/Button";
import Input from "../components/InputField.js";
import Dropdown from "../components/DropDown.js";
import {
  DummyData,
  Dummycolumns,
  conditionalRowStyles,
  customStyles,
} from "../../utils/DataTablesData";
import { ClientList } from "../fetchApis/clientList/ClientList";
import { AddManDays } from "../project/projectCRUDOperations/addManDays.js";
import View from "./projectCRUDOperations/View.js";
import Edit from "./projectCRUDOperations/Edit.js";
import Status from "./projectCRUDOperations/Status.js";
import { TableColumn } from "../../utils/dataTableColumns.js";
import AssignedProject from "./AssignedProject.js";

const ProjectDataTable = ({ PersonDepartment }) => {
  const [isOperationPerson, setisOperationPerson] = useState(PersonDepartment);
  const [updatedValue, setUpdatedValue] = useState({
    project_code: "",
    date: "",
    man_days: "",
    total_achievement: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [clientsListArray, setClientsListArray] = useState([
    "Demo Client1",
    "Demo Client2",
  ]);
  const [isMultiEdit, setIsMultiEdit] = useState(false);
  const [multiEditFieldOpen, setMultiEditFieldOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isViewOptionOpen, setIsViewOptionOpen] = useState(false);
  const [isViewOptionIndex, setIsViewOptionIndex] = useState();
  const [openDropdownIndex, setOpenDropdownIndex] = useState(-1);
  const [isView, setisView] = useState(false);
  const [isEdit, setisEdit] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState();
  const [selectedIndex, setSelectedIndex] = useState();
  const [closeView, setCloseView] = useState(false);
  const [isStatus, setIsStatus] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedClient, setSelectedClient] = useState("");
  const [filteredProjectData, setFilteredProjectData] = useState([]);
  const [teamLeadAssiged, setTeamLeadAssiged] = useState();

  const dropdownRef = useRef(null);

  let token = localStorage.getItem("token");
  let role = localStorage.getItem("role");
  let user = localStorage.getItem("user");
  let username = localStorage.getItem("username");
  let department = localStorage.getItem("department");

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

        if (selectedClient && selectedClient !== "--Select Client--") {
          filteredData = filteredData.filter(
            (item) => item.clients.name === selectedClient
          );
        }

        const allProjectListWithTL = filteredData?.filter((item) => {
          return item?.project_teamlead !== null;
        });
        setTeamLeadAssiged(allProjectListWithTL);
        setFilteredProjectData(filteredData);
      } catch (error) {
        console.error("Error fetching project data:", error);
      }
    };
    fetchProjectData();
  }, [token, isDrawerOpen, selectedStatus, selectedClient]);

  useEffect(() => {
    const fetchClientList = async () => {
      try {
        const response = await ClientList();
        const responseArray = response?.data?.map((val) => {
          return val.name;
        });
        setClientsListArray(responseArray);
      } catch (error) {
        console.log("error is", error);
      }
    };
    fetchClientList();
  }, []);

  const handleFilterOption = (name, value) => {
    if (name === "Status") {
      if (value === "To be Started") {
        setSelectedStatus("to_be_started");
      } else if (value === "Completed") {
        setSelectedStatus("completed");
      } else if (value === "New") {
        setSelectedStatus("new");
      } else if (value === "CBR Raised") {
        setSelectedStatus("cbr_raised");
      } else if (value === "Hold") {
        setSelectedStatus("hold");
      } else if (value === "--Select Status--") {
        setSelectedStatus("--Select Status--");
      }
    }
    if (name === "Client") {
      setSelectedClient(value);
    }
  };

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
  const handleMutiEdit = () => {
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
          propVal.toString().toLowerCase().includes(searchTerm.toLowerCase())
        );
      } else if (val) {
        return val.toString().toLowerCase().includes(searchTerm.toLowerCase());
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

  const desabledRowData = data?.map((item) => {
    let desabled = false;
    if (item.status === "completed" || item.status === "cbr_raised") {
      desabled = true;
    }
    return { ...item, desabled };
  });
  return (
    <>
      <div
        className={`${
          isDrawerOpen ? "opacity-30 relative overflow-hidden" : "opacity-100"
        }"`}
      >
        <div className="flex items-center h-40 w-full overflow-visible">
          <h2 className="p-2 text-3xl underline w-3/12 text-[#bd1d1d]">
            All Project Details
          </h2>
          <div className="flex justify-end mb-4 w-9/12">
            <div className="flex items-center">
              <Dropdown
                Option_Name={["--Select Client--", ...clientsListArray]}
                onChange={handleFilterOption}
                name={"Client"}
                className={"p-4 m-1 border border-black rounded"}
              />
              <Dropdown
                Option_Name={[
                  "--Select Status--",
                  "Inprogress",
                  "Hold",
                  "Completed",
                  // "New",
                  "To be Started",
                  "CBR Raised",
                ]}
                onChange={handleFilterOption}
                name={"Status"}
                className={"p-4 m-1 border border-black rounded"}
              />
            </div>
            <Input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onchange={(e) => setSearchTerm(e.target.value)}
              className={
                "p-2 m-1 border border-black rounded focus:outline-none"
              }
            />
          </div>
        </div>
        {data.length > 0 ? (
          <div className="relative table">
            {isMultiEdit && (
              <div
                className={`${
                  isMultiEdit
                    ? "AddManDaysAnimation opacity-100 flex items-center justify-left bg-[#bd1d1d] border absolute right-0 top-[-3.7rem] w-full p-2"
                    : " opacity-0"
                }`}
              >
                <span className="text-white text-xl">
                  row selected ({selectedRow.length}){" "}
                </span>
                {role.includes("Team Lead") ? (
                  <Button
                    name={"Add Man Days"}
                    className={
                      "p-2 bg-yellow-200 border rounded-md border-black ml-4"
                    }
                    onClick={handleMutiEdit}
                  />
                ) : (
                  <Button
                    name={"Assign Project"}
                    className={
                      "p-2 bg-yellow-200 border rounded-md border-black ml-4"
                    }
                    onClick={handleMutiEdit}
                  />
                )}
              </div>
            )}
            {department == 2 &&
            (role.includes("Team Lead") || role.includes("AM/Manager")) ? (
              <DataTable
                columns={TableColumn({
                  setIsStatus,
                  setisEdit,
                  setisView,
                  isView,
                  setSelectedRecord,
                  selectedRecord,
                  openDropdownIndex,
                  setOpenDropdownIndex,
                  setIsViewOptionIndex,
                  setIsViewOptionOpen,
                  isViewOptionOpen,
                  setIsMultiEdit,
                  setSelectedIndex,
                })}
                data={desabledRowData}
                pagination
                customStyles={customStyles}
                selectableRows
                onSelectedRowsChange={handleSelectedRowsChange}
                enableMultiRowSelection
                selectableRowDisabled={(row) => row.desabled}
                conditionalRowStyles={conditionalRowStyles}
              />
            ) : (
              <DataTable
                columns={TableColumn({
                  setIsStatus,
                  setisEdit,
                  setisView,
                  isView,
                  setSelectedRecord,
                  selectedRecord,
                  openDropdownIndex,
                  setOpenDropdownIndex,
                  setIsViewOptionIndex,
                  setIsViewOptionOpen,
                  isViewOptionOpen,
                  setIsMultiEdit,
                  setSelectedIndex,
                })}
                data={desabledRowData}
                pagination
                customStyles={customStyles}
                onSelectedRowsChange={handleSelectedRowsChange}
                enableMultiRowSelection
                selectableRowDisabled={(row) => row.desabled}
                conditionalRowStyles={conditionalRowStyles}
              />
            )}

            {isOperationPerson && (
              <>
                {isEdit ? (
                  <Edit viewRecord={selectedRecord} setisEdit={setisEdit} />
                ) : (
                  ""
                )}
              </>
            )}
            {isView ? (
              <div className="z-50">
                {" "}
                <View
                  viewRecord={selectedRecord}
                  closeView={closeView}
                  setisView={setisView}
                />{" "}
              </div>
            ) : (
              ""
            )}
            {isStatus ? (
              <div className="z-50">
                {" "}
                <Status
                  viewRecord={selectedRecord}
                  closeView={closeView}
                  setIsStatus={setIsStatus}
                />{" "}
              </div>
            ) : (
              ""
            )}
          </div>
        ) : (
          <DataTable
            columns={Dummycolumns}
            data={DummyData}
            customStyles={customStyles}
          />
        )}
      </div>
      <div className="">
        {multiEditFieldOpen && role.includes("Team Lead") ? (
          <AddManDays
            selectedRow={selectedRow}
            setIsDrawerOpen={setIsDrawerOpen}
            setMultiEditFieldOpen={setMultiEditFieldOpen}
          />
        ) : multiEditFieldOpen && role.includes("AM/Manager") ? (
          <AssignedProject
            selectedRow={selectedRow}
            setIsDrawerOpen={setIsDrawerOpen}
            setMultiEditFieldOpen={setMultiEditFieldOpen}
            teamLeadAssiged={teamLeadAssiged}
          />
        ) : (
          ""
        )}
      </div>
    </>
  );
};
export default ProjectDataTable;
