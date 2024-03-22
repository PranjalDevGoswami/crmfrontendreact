import React, { useEffect, useState,useRef } from "react";
import DataTable from "react-data-table-component";
import { GetProjectData } from "../fetchApis/projects/getProjectData/GetProjectData.js";
import { useDispatch, useSelector } from "react-redux";
import { addFormData } from "../features/projectData/projectDataSlice";
import Button from "../Button";
import Input from "../InputField.js";
import { MdOutlineMoreVert } from "react-icons/md";
import Dropdown from "../DropDown.js";

import {
  Data,
  DummyData,
  Dummycolumns,
  conditionalRowStyles,
  customStyles,
} from "../../../utils/DataTablesData";
import { ClientList } from "../fetchApis/clientList/ClientList";
import { AddManDays } from "../project/projectCRUDOperations/addManDays.js";
import View from "./projectCRUDOperations/View.js";
import Edit from "./projectCRUDOperations/Edit.js";
import OpereationButton from "./projectCRUDOperations/OpereationButton.js";
import Status from "./projectCRUDOperations/Status.js";

const ProjectDataTable = ({ PersonDepartment }) => {
  const [isOperationPerson, setisOperationPerson] = useState(PersonDepartment);
  const [updatedValue, setUpdatedValue] = useState({
    project_code: "",
    date: "",
    man_days: "",
    total_achievement: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [getFormDataApi, setGetFormDataApi] = useState([]);
  const [clientsListArray, setClientsListArray] = useState([]);
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

  // const dispatch = useDispatch();
  const dropdownRef = useRef(null);
  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const fetchDataFromApi2 = await GetProjectData();
        const projectDataObject = fetchDataFromApi2?.map((val) => {
          return val;
        });
        setGetFormDataApi(projectDataObject);
        // dispatch(addFormData(projectDataObject));
      } catch (error) {
        console.error("Error fetching project data:", error);
      }
    };
    fetchProjectData();
  }, []);

  // const Formdata1 = useSelector((store) => store?.FormData?.items);

  useEffect(() => {
    // dispatch(addFormData(getFormDataApi));
  }, [getFormDataApi]);

  useEffect(() => {
    const fetchClientList = async () => {
      try {
        const response = await ClientList();
        const responseArray = response.map((val) => {
          return val.name;
        });
        setClientsListArray(responseArray);
      } catch (error) {
        console.log("error is", error);
      }
    };
    fetchClientList();
  }, []);

  const ClientOptions = clientsListArray.map((val) => {
    return {
      value: val,
      label: val,
    };
  });

  const handleFilterOption = (name, value) => {
    console.log("e", name, value);
    if (name === "status")
      setUpdatedValue({
        ...updatedValue,
        status: value,
      });
  };

  const handleSelectedRowsChange = (row) => {
    const inCompletedTask = row.selectedRows.filter((item) => {
      return item.status === null || item.status === "";
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
  const handleAddEditOperation = (record, index) => {
    // if (record.status !== "completed") {
      setOpenDropdownIndex(openDropdownIndex === index ? -1 : index);
      setIsViewOptionIndex(index);
      setIsViewOptionOpen(!isViewOptionOpen);
      setSelectedRecord(record);
      setSelectedIndex(index);
    // }
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
  const columns = [
    {
      name: "Sr.No.",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Project Code",
      selector: (row) => row.project_code,
      sortable: true,
    },
    {
      name: "Client Name",
      selector: (row) => row.clients,
      sortable: true,
    },
    {
      name: "Project Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Type",
      selector: (row) => row.project_type,
      sortable: true,
    },
    {
      name: "Start Date",
      selector: (row) => row.tentative_start_date,
      sortable: true,
    },
    {
      name: "End Date",
      selector: (row) => row.tentative_end_date,
      sortable: true,
    },
    {
      name: "CPI",
      selector: (row) => row.cpi,
      sortable: true,
    },
    {
      name: "Project Target",
      selector: (row) => row.sample,
      sortable: true,
    },
    {
      name: "Achieved Target",
      selector: (row) => row.total_achievement,
      sortable: true,
    },
    {
      name: "Remaining Target",
      selector: (row) => row.remaining_interview,
      sortable: true,
    },
    {
      name: "T. Man Days",
      selector: (row) => row.man_days,
      sortable: true,
    },
    {
      name: "status",
      selector: (row) => row.status,
      sortable: true,
    },
    {
      name: "Actions",
      key: "action",
      text: "Action",
      className: "action",
      width: 100,
      align: "left",
      sortable: false,
      cell: (record, index) => {
        return (
          <div className="relative w-full">
            <div className="flex items-center">
              <button
                onClick={() => handleAddEditOperation(record, index)}
                className="border p-2 rounded-md mr-2 cursor-pointer"
              >
                <MdOutlineMoreVert />
              </button>
              {isOperationPerson && openDropdownIndex === index ? (
                <div
                  className={`${
                    index <= 5
                      ? "absolute right-[57px] top-0"
                      : "absolute right-[57px] bottom-0"
                  }`}
                >
                  <OpereationButton
                    record={selectedRecord}
                    isView={isView}
                    setisView={setisView}
                    setisEdit={setisEdit}
                    setIsStatus={setIsStatus}
                  />
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        );
      },
    },
  ];

  const filteredData = getFormDataApi.filter((item) =>
    Object.values(item).some((val) => {
      if (typeof val === "object" && val !== null) {
        // If the value is an object, check its properties
        return Object.values(val).some((propVal) =>
          propVal.toString().toLowerCase().includes(searchTerm.toLowerCase())
        );
      } else if (val) {
        // For other types of values (non-object), perform the search
        return val.toString().toLowerCase().includes(searchTerm.toLowerCase());
      }
      return false; // Exclude null or undefined values from the search
    })
  );
  const data = filteredData.map((item, index) => ({
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

  const desabledRowData = data.map((item) => {
    let desabled = false;
    if (item.status === "completed") {
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
          <h2 className="p-2 text-4xl underline w-3/12">All Project Details</h2>
          <div className="flex justify-end mb-4 w-9/12">
            <div className="flex items-center">
              <Dropdown
                Option_Name={["--Select Clients--", "am", "am2"]}
                onChange={handleFilterOption}
                name={"Client"}
                className={"p-4 m-1 border border-black rounded"}
              />
              {/* {clientsListArray.length > 0 ? (
            <MultipleValueDropDown
              options={ClientOptions}
              onChange={handleFilterOption}
              name={"Client"}
              className={"p-4 m-1 border border-black rounded w-fit"}
            />
          ) : (
            <MultipleValueDropDown
              options={[
                { value: "--Select Clients--", label: "--Select Clients--" },
                { value: "Client1", label: "Client1" },
                { value: "Client2", label: "Client2" },
              ]}
              onChange={handleFilterOption}
              name={"Client"}
              className={"w-full p-2 bg-white border border-black rounded"}
            />
          )} */}
              <Dropdown
                Option_Name={["Inprogress", "Hold", "Completed"]}
                onChange={handleFilterOption}
                name={"Client"}
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
          <div className="relative">
            {isMultiEdit && (
              <div
                className={`${
                  isMultiEdit
                    ? "AddManDaysAnimation opacity-100 flex items-center justify-left bg-[#bd1d1d] border absolute right-0 top-[-3.7rem] w-full z-50 p-2"
                    : " opacity-0"
                }`}
              >
                <span className="text-white text-xl">
                  row selected ({selectedRow.length}){" "}
                </span>
                <Button
                  name={"Add Man Days"}
                  className={
                    "p-2 bg-yellow-200 border rounded-md border-black ml-4"
                  }
                  onClick={handleMutiEdit}
                />
              </div>
            )}
            <DataTable
              columns={columns}
              data={desabledRowData}
              pagination
              customStyles={customStyles}
              selectableRows
              onSelectedRowsChange={handleSelectedRowsChange}
              enableMultiRowSelection
              selectableRowDisabled={(row) => row.desabled}
              conditionalRowStyles={conditionalRowStyles}
            />

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
        {multiEditFieldOpen ? (
          <AddManDays
            selectedRow={selectedRow}
            setIsDrawerOpen={setIsDrawerOpen}
            setMultiEditFieldOpen={setMultiEditFieldOpen}
          />
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default ProjectDataTable;
