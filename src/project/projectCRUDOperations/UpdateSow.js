import React, { useContext, useEffect, useState } from "react";
import { DataTableContext } from "../../ContextApi/DataTableContext";
import LableAndInput from "../../Molecules/LableAndInput";
import SweetAlert from "../../components/SweetAlert";
import {  PROJECTSOWUPDATE } from "../../../utils/constants/urls";
import { ProjectData } from "../../../utils/apis/projectData";
import { setProjects } from "../../../utils/slices/ProjectSlice";
import { useDispatch } from "react-redux";
import { patchWithAuthFiles, postWithAuthFiles } from "../../provider/helper/axios";
import { useSelector } from "react-redux";
import { getMinDate } from "../../../utils/helperFunction/dateLimit";

const UpdateSow = ({ viewRecord }) => {
  const [showDate, setShowDate] = useState("");
  const [error, setError] = useState("");
  const userRole = localStorage.getItem('userrole')
  const [projectList,setProjectList] = useState()


  const [updatedValue, setUpdatedValue] = useState({
    project_id: viewRecord.id,
    name: viewRecord.name,
    updated_at: "",
    upload_document: [],
    created_by: userRole,
  });
  const projectResponse = useSelector((store)=>store.projectData.projects)

  useEffect(()=>{
    const newList = projectResponse.filter((item)=>item.id == viewRecord.id)
  setProjectList(newList)
  },[viewRecord])
  
  const { setisEdit, setIsUploadSow } = useContext(DataTableContext);
  const dispatch = useDispatch();
  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "updated_at") {
      const selectedDate = new Date(value);
      if (selectedDate.getDay() === 6 || selectedDate.getDay() === 0) {
        setError("Weekend days cannot be selected");
        return;
      } else {
        setError("");
        setShowDate(value);
        setUpdatedValue((prevValues) => ({
          ...prevValues,
          [name]: selectedDate.toISOString(),
        }));
      }
    } else if (name === "upload_document") {
      setUpdatedValue((prevValues) => ({
        ...prevValues,
        [name]: files[0],
      }));
    } else {
      setUpdatedValue((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    }
  };


  const getMaxDate = () => {
    const currentDate = new Date();
    return currentDate.toISOString().split("T")[0];
  };

  const handleCancelUpdate = () => {
    setIsUploadSow(false);

    document.body.classList.remove("DrawerBody");
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
const methodRequired = (projectList.map((item)=>item.documents.length)>0) ? patchWithAuthFiles : postWithAuthFiles
      const response = await methodRequired(PROJECTSOWUPDATE(viewRecord?.id),
        formData
      );
      if (response.status == true) {
        SweetAlert({
          title: "Success",
          text: "File upload successfully",
          icon: "success",
        });
        setIsUploadSow(false);
        const projectData = await ProjectData();
        dispatch(setProjects(projectData));
      }
    } catch (error) {
      console.log("🚀 ~ PostUpdateEditData ~ error:", error)
      SweetAlert({
        title: "Error",
        text: "File upload failed. Please try again.",
        icon: "error",
      });
    }
  };

  const validateFields = () => {
    const { updated_at, upload_document } = updatedValue;
    if (!updated_at) {
      return "Date is required.";
    }
    if (!upload_document) {
      return "Man Days is required.";
    }
    return null;
  };

  const handleEditUpdate = () => {
    const errorMessage = validateFields();
    if (!errorMessage) {
      PostUpdateEditData(updatedValue);
    } else {
      SweetAlert({
        title: "Error",
        text: errorMessage,
        icon: "error",
      });
    }
  };
  return (
    <div className="">
      <h3 className="text-xl underline pb-4">Upload SOW </h3>
      <div className="flex items-center flex-wrap justify-center w-full rounded-sm">
        <div className="ProjectOperationEdit">
          <LableAndInput
            labelName={"Project Code"}
            Inputvalue={viewRecord.project_code.toUpperCase()}
            desabled={true}
            inputClassName={"cursor-not-allowed p-2 border bg-[#f3eded]"}
            labelClassName={"pt-4 pb-2 text-left"}
            inputChange={handleInputChange}
          />
        </div>
        <div className="ProjectOperationEdit">
          <LableAndInput
            labelName={"Project Name"}
            Inputvalue={viewRecord.name}
            desabled={true}
            inputClassName={"cursor-not-allowed p-2 border bg-[#f3eded]"}
            labelClassName={"pt-4 pb-2 text-left"}
            inputChange={handleInputChange}
          />
        </div>
        <div className="ProjectOperationEdit">
          <LableAndInput
            labelName={"Date"}
            InputName={"updated_at"}
            InputType={"date"}
            inputClassName={"p-2 border w-full"}
            labelClassName={"pt-4 pb-2 text-left"}
            Inputvalue={showDate}
            inputChange={handleInputChange}
            min={getMinDate()}
            max={getMaxDate()}
            required
          />
          {error && <p className="text-left text-red-500">{error}</p>}
        </div>
        <div className="ProjectOperationEdit">
          <LableAndInput
            labelName={"Upload Sow File"}
            InputName={"upload_document"}
            InputType={"file"}
            inputClassName={"p-2 border"}
            labelClassName={"pt-4 pb-2 text-left"}
            Inputvalue={updatedValue.man_days}
            inputChange={handleInputChange}
            InputMax_lenght={2}
            required
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
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateSow;
