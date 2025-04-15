import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LableAndInput from "../../Molecules/LableAndInput";
import SweetAlert from "../../components/SweetAlert";
import { PROJECT_SOW_UPDATE } from "../../../utils/constants/urls";
import { ProjectData } from "../../../utils/apis/projectData";
import { setProjects } from "../../../utils/slices/projectSlice";
import {
  patchWithAuthFiles,
  postWithAuthFiles,
} from "../../provider/helper/axios";
import { getMinDate } from "../../../utils/helperFunction/dateLimit";
import { toggleIsUploadSow } from "../../../utils/slices/dataTableSlice";
import Popup from "../../Atom/Popup";

const UpdateSow = () => {
  const { page_number, page_size, activeTab, projects } = useSelector(
    (store) => store.projectData
  );
  const { selectedRecord } = useSelector((store) => store.dataTable);

  const dispatch = useDispatch();
  const userRole = localStorage.getItem("userrole");

  const [projectList, setProjectList] = useState();
  const [updatedValue, setUpdatedValue] = useState({
    project_id: selectedRecord.id,
    name: selectedRecord.name,
    updated_at: "",
    upload_document: [],
    created_by: userRole,
  });
  const [errorMessage, setErrorMessage] = useState({});

  useEffect(() => {
    const newList = projects.filter((item) => item.id == selectedRecord.id);
    setProjectList(newList);
  }, [selectedRecord]);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "updated_at") {
      const isoDate = new Date(value).toISOString();
      setUpdatedValue((prevValues) => ({
        ...prevValues,
        [name]: isoDate,
      }));
    }
    if (name === "upload_document") {
      setUpdatedValue((prevValues) => ({
        ...prevValues,
        [name]: files[0],
      }));
    }
  };

  const handleCancelUpdate = () => {
    dispatch(toggleIsUploadSow());
  };

  const PostUpdateEditData = async () => {
    const formData = new FormData();
    formData.append("project_id", updatedValue.project_id);
    formData.append("name", updatedValue.name);
    formData.append("updated_at", updatedValue.updated_at);
    formData.append("created_by", updatedValue.created_by);
    if (updatedValue.upload_document) {
      formData.append("upload_document", updatedValue.upload_document);
    }

    try {
      const methodRequired =
        projectList.map((item) => item.documents.length) > 0
          ? patchWithAuthFiles
          : postWithAuthFiles;
      const response = await methodRequired(
        PROJECT_SOW_UPDATE(selectedRecord?.id),
        formData
      );
      if (response.status == true) {
        SweetAlert({
          title: "Success",
          text: "File upload successfully",
          icon: "success",
        });
        dispatch(toggleIsUploadSow());
        const projectData = await ProjectData(
          page_number,
          page_size
        );
      dispatch(setProjects({ data: projectData?.results, reset: true }));
      }
    } catch (error) {
      SweetAlert({
        title: "Error",
        text: "File upload failed. Please try again.",
        icon: "error",
      });
    }
  };

  const validateFields = () => {
    const errorMsg = {};
    if (!updatedValue.updated_at) {
      errorMsg.updated_at = "Update Date is required.";
    }
    if (updatedValue.updated_at) {
      const selectedDate = new Date(updatedValue.updated_at);
      if (selectedDate.getDay() === 6 || selectedDate.getDay() === 0) {
        errorMsg.updated_at = "Weekend cannot be selected";
      }
    }
    if (!updatedValue.upload_document) {
      errorMsg.upload_document = "File is required.";
    }
    return errorMsg;
  };

  const handleEditUpdate = () => {
    const err = validateFields();
    setErrorMessage(err);
    if (Object.keys(err).length === 0) {
      PostUpdateEditData(updatedValue);
    }
  };

  const uploadSowField = [
    {
      name: "Project Code",
      value: selectedRecord.project_code.toUpperCase(),
      type: "text",
      disabled: true,
    },
    {
      name: "Project Name",
      value: selectedRecord.name,
      type: "text",
      disabled: true,
    },
    {
      name: "Date",
      value: updatedValue.updated_at
        ? new Date(updatedValue.updated_at).toISOString().split("T")[0]
        : "",
      type: "date",
      disabled: false,
      id: "updated_at",
      errorMessage: errorMessage.updated_at,
    },

    {
      name: "Upload Sow File",
      // value: updatedValue.upload_document,
      type: "file",
      disabled: false,
      id: "upload_document",
      errorMessage: errorMessage.upload_document,
    },
  ];

  return (
    <Popup>
      <div className="">
        <h3 className="text-xl underline pb-4">Upload SOW </h3>
        <div className="grid grid-cols-2 gap-4 w-full rounded-md">
          {uploadSowField.map((field, index) => {
            return (
              <div key={index}>
                <LableAndInput
                  labelName={field.name}
                  InputType={field.type}
                  InputName={field.id}
                  inputValue={field.value}
                  disabled={field.disabled}
                  inputClassName={`${
                    field.disabled == true
                      ? "cursor-not-allowed bg-[#f3eded]"
                      : "bg-white"
                  } p-2 border  rounded-md`}
                  labelClassName={"pt-4 pb-2 text-left"}
                  inputChange={handleInputChange}
                  min={getMinDate()}
                />
                {field.errorMessage && (
                  <p className="text-red-500 text-xs text-left">
                    {field.errorMessage}
                  </p>
                )}
              </div>
            );
          })}
        </div>
        <div className="flex justify-center pt-4">
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
    </Popup>
  );
};

export default UpdateSow;
