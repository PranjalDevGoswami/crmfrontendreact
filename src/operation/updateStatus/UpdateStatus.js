import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LableAndInput from "../../Molecules/LableAndInput";
import Dropdown from "../../components/DropDown";
import Label from "../../Atom/Label";
import SweetAlert from "../../components/SweetAlert";
import { toggleChangeProjectStatus } from "../../../utils/slices/dataTableSlice";
import { ProjectData } from "../../../utils/apis/projectData";
import {
  addProjectWithoutAnyFilter,
  setProjects,
} from "../../../utils/slices/projectSlice";
import { ChangeStatus } from "../../fetchApis/projects/changeStatus/changeStatus";
import { toggleChangeProjectStatus } from "../../../utils/slices/dataTableSlice";
import { getDashboardProject } from "../../fetchApis/dashboard";

const UpdateStatus = () => {
  const { page_number, page_size, activeTab } = useSelector(
    (store) => store.projectData
  );
  const { selectedRecord } = useSelector((store) => store.dataTable);
  const dispatch = useDispatch();

  const [updatedStatus, setUpdatedStatus] = useState({
    project_id: selectedRecord.id,
    status: "",
  });
  const [errorMessage, setErrorMessage] = useState({});

  const handleStatusChange = (name, value) => {
    setUpdatedStatus({
      ...updatedStatus,
      [name]: value,
    });
  };

  const handleCancelUpdate = () => {
    dispatch(toggleChangeProjectStatus());
  };

  const PostUpdateEditData = async (data) => {
    const response = await ChangeStatus(data);
    if (response?.status == true) {
      dispatch(toggleChangeProjectStatus());
      SweetAlert({
        title: "Success",
        text: "Status Change Sucessfully!!",
        icon: "success",
      });
      const projectData = await ProjectData(page_number, page_size);
      dispatch(setProjects({ data: projectData?.results, reset: true }));
      const response = await getDashboardProject();
      if (response.length > 0) {
        dispatch(addProjectWithoutAnyFilter(response));
      }
    }
  };

  const validateFields = () => {
    const errorMsg = {};
    if (!updatedStatus.status) {
      errorMsg.status = "Status is required.";
    }
    if (updatedStatus.status == "--Select Status--") {
      errorMsg.status = "Please select a valid Status";
    }
    return errorMsg;
  };

  const handleEditUpdate = () => {
    const errors = validateFields();
    setErrorMessage(errors);
    if (Object.keys(errors).length === 0) {
      PostUpdateEditData(updatedStatus);
    }
  };

  const statusChangeOption =
    selectedRecord.status === "Project Initiated" ||
    selectedRecord.status === "To Be Started"
      ? [
          "--Select Status--",
          // "In Progress",
          // "Completed",
          // "On Hold",
          "Cancelled",
        ]
      : ["--Select Status--", "In Progress", "Completed", "On Hold"];

  const statusItems = [
    {
      labelName: "Project Code",
      inputValue: selectedRecord?.project_code?.toUpperCase(),
      disabled: true,
      type: "text",
    },
    {
      labelName: "Project Name",
      inputValue: selectedRecord?.name,
      disabled: true,
      type: "text",
    },
    {
      labelName: "Current Status",
      inputValue: selectedRecord.status,
      disabled: true,
      type: "text",
    },
    {
      labelName: "Status",
      isDropdown: true,
      options: statusChangeOption,
      onChange: handleStatusChange,
      name: "status",
      id: "status update",
      errorMessage: errorMessage.status,
    },
  ];
  return (
    <div className="">
      <h3 className="text-xl underline pb-4">Change Project Status</h3>
      <div className="grid grid-cols-2 gap-4 w-full rounded-md">
        {statusItems.map((field, index) =>
          field.isDropdown ? (
            <div className="mt-4 text-left" key={index}>
              <Label labelName={field.labelName} className="pb-2 mt-4" />
              <Dropdown
                Option_Name={field.options}
                onChange={(name, value) => field.onChange(name, value)}
                className={"p-2 mt-2 border w-full rounded-md bg-white"}
                name={field.name}
                id={field.id}
              />
              {field.errorMessage && (
                <p className="text-red-500 text-xs text-left">
                  {field.errorMessage}
                </p>
              )}
            </div>
          ) : (
            <div key={index}>
              <LableAndInput
                labelName={field.labelName}
                InputName={field.inputName}
                InputType={field.inputType}
                inputClassName={`${
                  field.disabled
                    ? "cursor-not-allowed bg-[#f3eded]"
                    : "bg-white"
                } p-2 border rounded-md `}
                labelClassName={"pt-4 pb-2 text-left"}
                inputValue={field.inputValue}
                inputChange={field.inputChange}
                min={field.min}
                max={field.max}
                inputOnFocus={field.inputOnFocus}
                disabled={field.disabled}
                maxLength={field.maxLength}
                required={field.required}
              />
              {field.errorMessage && (
                <p className="text-red-500 text-xs text-left">
                  {field.errorMessage}
                </p>
              )}
            </div>
          )
        )}
      </div>
      <div className="flex  justify-center pt-10">
        <button
          onClick={handleEditUpdate}
          className={
            "bg-green-400 p-4 m-2 w-1/4 rounded text-white text-center hover:bg-green-500"
          }
        >
          Update
        </button>
        <button
          onClick={handleCancelUpdate}
          className={
            "bg-red-400 p-4 m-2 w-1/4 rounded text-white text-center hover:bg-red-500"
          }
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default UpdateStatus;
