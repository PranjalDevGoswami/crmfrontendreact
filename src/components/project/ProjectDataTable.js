import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { GetProjectData } from "../fetchApis/projects/getProjectData/GetProjectData.js";
import { useDispatch, useSelector } from "react-redux";
import { addFormData } from "../features/projectData/projectDataSlice";
import { MdEdit } from "react-icons/md";
import LableAndInput from "../LableAndInput.js";
import Button from "../Button";
import { PostMandaysData } from "../fetchApis/projects/mandays/PostMandaysData.js";
import Input from "../InputField.js";
import { MdOutlineMoreVert } from "react-icons/md";
import Dropdown from "../DropDown.js";
import {
  Data,
  DummyData,
  Dummycolumns,
  customStyles,
  editedColumns,
} from "../../../utils/DataTablesData";
import { ClientList } from "../fetchApis/clientList/ClientList";
import MultipleValueDropDown from "../MultipleValueDropDown";
import { AddManDays } from "./addManDays";

const ProjectDataTable = ({ PersonDepartment }) => {
  const [viewEdit, setViewEdit] = useState(false);
  const [isView, setisView] = useState(false);
  const [viewRecord, setViewRecord] = useState();
  const [viewEditRecord, setEditRecord] = useState();
  const [isOperationPerson, setisOperationPerson] = useState(PersonDepartment);
  const [showDate, setShowDate] = useState();
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

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const fetchDataFromApi2 = await GetProjectData();
        const projectDataObject = fetchDataFromApi2?.map((val) => {
          return val;
        });
        setGetFormDataApi(projectDataObject);
        dispatch(addFormData(projectDataObject));
      } catch (error) {
        console.error("Error fetching project data:", error);
      }
    };
    fetchProjectData();
  }, [dispatch]);

  const Formdata1 = useSelector((store) => store?.FormData?.items);

  useEffect(() => {
    dispatch(addFormData(getFormDataApi));
  }, [getFormDataApi, dispatch]);

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

  const handleCancelUpdate = () => {
    setViewEdit(false);
    setIsMultiEdit(false);
    setMultiEditFieldOpen(false);
  };

  const HandleOnEdit = (record) => {
    setViewEdit(true);
    setEditRecord(record);
    setUpdatedValue({
      ...updatedValue,
      project_code: record?.project_code,
    });
  };

  const handleFilterOption = (name, value) => {
    console.log("e", name, value);
  };

  const HandleCloseProjectDetails = () => {
    setisView(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setUpdatedValue({
      ...updatedValue,
      [name]: value,
    });
    if (name === "date") {
      setShowDate(value);
      const DateVAlue = new Date(value);
      const formattedDate = DateVAlue.toISOString();
      setUpdatedValue({
        ...updatedValue,
        date: formattedDate,
      });
    }
  };
  const PostUpdateEditData = async (data) => {
    await PostMandaysData(data);
    setViewEdit(false);
    setUpdatedValue({
      project_code: "",
      date: "",
      man_days: "",
      total_achievement: "",
    });
  };

  const handleEditUpdate = () => {
    PostUpdateEditData(updatedValue);
  };

  const handleSelectedRowsChange = (row) => {
    const inCompletedTask = row.selectedRows.filter((item) => {
      return item.status === null || item.status === "";
    });
    console.log("row.status", row.selectedRows);
    if (row.selectedCount > 0) {
      setIsMultiEdit(true);
      setSelectedRow(inCompletedTask);
    } else {
      setIsMultiEdit(false);
    }
  };
  const handleMutiEdit = () => {
    console.log("this is select", selectedRow);
    console.log("multiedit");
    setMultiEditFieldOpen(!multiEditFieldOpen);
  };

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
      cell: (record) => {
        return (
          <div className="relative w-full">
            <div className="flex items-center">
              <button
                onClick={() => handleViewField(record)}
                className="border p-2 rounded-md mr-2 cursor-pointer"
              >
                <MdOutlineMoreVert />
              </button>
              {isOperationPerson ? (
                <button
                  className="relative"
                  onClick={() => {
                    HandleOnEdit(record);
                  }}
                >
                  <MdEdit className="font-bold text-xl" />
                </button>
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

  return (
    <div className="w-full overflow-hidden">
      <h2 className="p-2 text-4xl underline">All Project Details</h2>
      <div className="flex justify-end mb-4 w-full">
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
          className={"p-2 m-1 border border-black rounded focus:outline-none"}
        />
      </div>

      {data.length > 0 ? (
        <div className="relative">
          <DataTable
            columns={columns}
            data={data}
            pagination
            customStyles={customStyles}
            selectableRows
            onSelectedRowsChange={handleSelectedRowsChange}
            // subHeader
          />
          {isOperationPerson && (
            <>
              {viewEdit ? (
                <div className="absolute top-1/2 left-1/2 bg-white p-8 border border-black drop-shadow-lg shadow-2xl shadow-slate-400 translate-x-[-50%] translate-y-[-50%]">
                  <h3 className="text-xl underline pb-4">
                    Fill Man Days and Achieve Target
                  </h3>
                  <div className="flex items-center flex-col justify-between">
                    <div className="">
                      <LableAndInput
                        labelName={"Project Code"}
                        Inputvalue={viewEditRecord.project_code}
                        desabled={true}
                        inputClassName={
                          "cursor-not-allowed p-2 border bg-[#f3eded]"
                        }
                        labelClassName={"pt-4 pb-2"}
                        inputChange={handleInputChange}
                      />
                    </div>
                    <div className="w-full p-2 ml-4 mr-4">
                      <LableAndInput
                        labelName={"Date"}
                        InputName={"date"}
                        InputType={"date"}
                        inputClassName={"p-2 border w-full"}
                        labelClassName={"pt-4 pb-2"}
                        Inputvalue={showDate}
                        inputChange={handleInputChange}
                      />
                    </div>
                    <div className="">
                      <LableAndInput
                        labelName={"Man Days"}
                        InputName={"man_days"}
                        InputType={"number"}
                        inputClassName={"p-2 border"}
                        labelClassName={"pt-4 pb-2"}
                        Inputvalue={updatedValue.man_days}
                        inputChange={handleInputChange}
                        InputMax_lenght={2}
                      />
                    </div>
                    <div className="">
                      <LableAndInput
                        labelName={"Achieve Target"}
                        InputType={"number"}
                        InputName={"total_achievement"}
                        inputClassName={"p-2 border"}
                        labelClassName={"pt-4 pb-2"}
                        Inputvalue={updatedValue.total_achievement}
                        inputChange={handleInputChange}
                        InputMax_lenght={3}
                      />
                    </div>
                    <div className="flex pt-10">
                      <button
                        onClick={handleEditUpdate}
                        className={
                          "bg-green-300 p-4 m-2 flex items-center w-full rounded text-white hover:bg-green-500"
                        }
                      >
                        Update
                      </button>
                      <button
                        onClick={handleCancelUpdate}
                        className={
                          "bg-red-300 p-4 m-2 flex items-center w-full rounded text-white hover:bg-red-500"
                        }
                      >
                        {" "}
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}
            </>
          )}
          {isView ? (
            <div className="absolute top-32 left-1/2 bg-white w-6/12 h-6/12 p-16 border border-black drop-shadow-lg shadow-2xl shadow-slate-400 translate-x-[-50%] ">
              {/* <ViewProjectDetails viewRecordData={viewRecord} /> */}
              <ul className="flex flex-col text-left border">
                <li className="border p-1 flex items-center text-xl bg-white justify-between odd:bg-gray-100">
                  <span className="text-xl mr-8 w-5/12">Project Code</span>{" "}
                  <span className="w-2/12">:</span>
                  <span className="w-5/12">{viewRecord?.project_code}</span>
                </li>
                <li className="border p-1 flex items-center text-xl bg-white justify-between ">
                  <span className="text-xl mr-8 w-5/12">Project name</span>{" "}
                  <span className="w-2/12">:</span>
                  <span className="w-5/12">{viewRecord?.name}</span>
                </li>
                <li className="border p-1 flex items-center text-xl bg-white justify-between odd:bg-gray-100">
                  <span className="text-xl mr-8 w-5/12">
                    Cost Per Interview{" "}
                  </span>
                  <span className="w-2/12">:</span>
                  <span className="w-5/12">{viewRecord?.cpi}</span>
                </li>
                <li className="border p-1 flex items-center text-xl bg-white justify-between">
                  <span className="text-xl mr-8 w-5/12">Clients </span>
                  <span className="w-2/12">:</span>
                  <span className="w-5/12">{viewRecord?.clients}</span>
                </li>
                <li className="border p-1 flex items-center text-xl bg-white justify-between odd:bg-gray-100">
                  <span className="text-xl mr-8 w-5/12">Project type </span>
                  <span className="w-2/12">:</span>
                  <span className="w-5/12">{viewRecord?.project_type}</span>
                </li>
                <li className="border p-1 flex items-center text-xl bg-white justify-between">
                  <span className="text-xl mr-8 w-5/12">Other Cost </span>
                  <span className="w-2/12">:</span>
                  <span className="w-5/12">{viewRecord?.other_cost}</span>
                </li>
                <li className="border p-1 flex items-center text-xl bg-white justify-between odd:bg-gray-100">
                  <span className="text-xl mr-8 w-5/12">Set Up Fee </span>
                  <span className="w-2/12">:</span>
                  <span className="w-5/12">{viewRecord?.set_up_fee}</span>
                </li>
                <li className="border p-1 flex items-center text-xl bg-white justify-between">
                  <span className="text-xl mr-8 w-5/12">
                    Tentative Start Date
                  </span>
                  <span className="w-2/12">:</span>{" "}
                  <span className="w-5/12">
                    {viewRecord?.tentative_start_date?.split("T")[0]}
                  </span>
                </li>
                <li className="border p-1 flex items-center text-xl bg-white justify-between odd:bg-gray-100">
                  <span className="text-xl mr-8 w-5/12">
                    Tentative End Date{" "}
                  </span>
                  <span className="w-2/12">:</span>
                  <span className="w-5/12">
                    {viewRecord?.tentative_end_date.split("T")[0]}
                  </span>
                </li>
                <li className="border p-1 flex items-center text-xl bg-white justify-between">
                  <span className="text-xl mr-8 w-5/12">Project Manager </span>
                  <span className="w-2/12">:</span>
                  <span className="w-5/12">{viewRecord?.project_manager}</span>
                </li>
                <li className="border p-1 flex items-center text-xl bg-white justify-between odd:bg-gray-100">
                  <span className="text-xl mr-8 w-5/12">Sample </span>
                  <span className="w-2/12">:</span>
                  <span className="w-5/12">{viewRecord?.sample}</span>
                </li>
                <li className="border p-1 flex items-center text-xl bg-white justify-between">
                  <span className="text-xl mr-8 w-5/12">Other Cost </span>
                  <span className="w-2/12">:</span>
                  <span className="w-5/12">{viewRecord?.other_cost}</span>
                </li>
                <li className="border p-1 flex items-center text-xl bg-white justify-between odd:bg-gray-100">
                  <span className="text-xl mr-8 w-5/12">Operation Team</span>
                  <span className="w-2/12">:</span>
                  <span className="w-5/12">{viewRecord?.operation_team}</span>
                </li>
                <li className="border p-1 flex items-center text-xl bg-white justify-between">
                  <span className="text-xl mr-8 w-5/12">Finance Team </span>
                  <span className="w-2/12">:</span>
                  <span className="w-5/12">{viewRecord?.finance_team}</span>
                </li>
                <li className="border p-1 flex items-center text-xl bg-white justify-between odd:bg-gray-100">
                  <span className="text-xl mr-8 w-5/12">Total Man Days</span>
                  <span className="w-2/12">:</span>
                  <span className="w-5/12">{viewRecord?.man_days}</span>
                </li>
                <li className="border p-1 flex items-center text-xl bg-white justify-between">
                  <span className="text-xl mr-8 w-5/12">Achiev Target </span>
                  <span className="w-2/12">:</span>
                  <span className="w-5/12">
                    {viewRecord?.total_achievement}
                  </span>
                </li>
                <li className="border p-1 flex items-center text-xl bg-white justify-between odd:bg-gray-100">
                  <span className="text-xl mr-8 w-5/12">Status</span>
                  <span className="w-2/12">:</span>
                  <span className="w-5/12">{viewRecord?.status}</span>
                </li>
              </ul>
              <Button
                onClick={HandleCloseProjectDetails}
                className={"p-2 bg-red-300 rounded absolute top-4 right-4"}
                name={"X"}
              />
            </div>
          ) : (
            ""
          )}
        </div>
      ) : (
        <DataTable
          columns={Dummycolumns}
          data={DummyData}
          // pagination
          customStyles={customStyles}
          // selectableRows
        />
      )}
      {isMultiEdit ? (
        <Button
          name={"Add Man Days"}
          className={
            "p-2 bg-yellow-200 border rounded-full rounded-tr-none rounded-br-none border-black absolute right-0 top-1/2"
          }
          onClick={handleMutiEdit}
        />
      ) : (
        ""
      )}
      <div className="overflow-hidden">
      {multiEditFieldOpen ? <AddManDays selectedRow={selectedRow}/> : ""}
      </div>
    </div>
  );
};

export default ProjectDataTable;
