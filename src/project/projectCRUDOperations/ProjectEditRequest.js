import React, { useContext, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LableAndInput from "../../Molecules/LableAndInput";
import { patchWithAuth } from "../../provider/helper/axios";
import { EDITPROJECTREQUEST } from "../../../utils/constants/urls";
import { NotifiactionContext } from "../../ContextApi/NotificationContext";
import Loader from "../../Atom/Loader";
import SweetAlert from "../../components/SweetAlert";
import { DataTableContext } from "../../ContextApi/DataTableContext";
import { ProjectData } from "../../../utils/apis/projectData";
import { setProjects } from "../../../utils/slices/ProjectSlice";
import ProjectSamplesTable from "./projectMultipleSampleTable/ProjectMultipleSampleTable";
import Popup from "../../Atom/Popup";
import { getMinDate } from "../../../utils/helperFunction/dateLimit";
import { DateValidationForWeekend } from "../../../utils/helperFunction/dateValidationForWeekend";
import useNotificationCount from "../../../utils/hooks/useNotificationCount";
import { setnotification } from "../../../utils/slices/notificationCountSlice";
import { notificationCount } from "../../../utils/apis/notificationCount";

const SampleEdit = ({ viewRecord }) => {
  const [showDate, setShowDate] = useState(viewRecord?.tentative_end_date);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [loader, setLoader] = useState(false);
  const [fieldUpdates, setFieldUpdates] = useState({});
  const [updatedSampleCpi, setUpdatedSampleCpi] = useState([]);
  const [errors, setErrors] = useState({
    sample: "" ,
    remark: "",
    tentative_end_date: "",
  });

  // const projects = useSelector((store) => store.projectData.projects);
    const {page_number,page_size,projects} = useSelector(store=>store.projectData)
  
  const { setisEdit } = useContext(DataTableContext);
  const darkMode = useSelector((store) => store.darkMode.isDarkMode);
  const dispatchReRender = useDispatch();
  const dispatch = useDispatch();
  const { setNotificationList } = useContext(NotifiactionContext);

  const currentProject = projects.filter((item) => item.id === viewRecord.id);
  const isMultipleSample = currentProject?.flatMap(
    (item) => item?.project_samples
  );

  const TotalSampleSize = updatedSampleCpi?.reduce((acc, item) => {
    return acc + Number(item.sample);
  }, 0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // if (name === "tentative_end_date") {
    //   const { errorMsg, selectedDate } = DateValidationForWeekend(
    //     value,
    //     viewRecord.tentative_start_date
    //   );
    //   setErrors((prevErrors) => ({
    //     ...prevErrors,
    //     tentative_end_date: errorMsg,
    //   }));
    //     setShowDate(value); 
    //   setFieldUpdates((prevUpdates) => ({
    //     ...prevUpdates,
    //     tentative_end_date: selectedDate?.toISOString(),
    //   }));
    // }
    if (name === "tentative_end_date") {
      if (!value) {
        // Handle case where the user deletes the date
        setShowDate("");
        setErrors((prevErrors) => ({
          ...prevErrors,
          tentative_end_date: "Date is required",
        }));
        setFieldUpdates((prevUpdates) => ({
          ...prevUpdates,
          tentative_end_date: null,
        }));
        return; // Exit early to avoid further processing
      }
  
      const { errorMsg, selectedDate } = DateValidationForWeekend(
        value,
        viewRecord.tentative_start_date
      );
  
      // Update error message
      setErrors((prevErrors) => ({
        ...prevErrors,
        tentative_end_date: errorMsg,
      }));
  
      // Update states only when the date is valid
      if (!errorMsg && selectedDate) {
        setShowDate(value);
        setFieldUpdates((prevUpdates) => ({
          ...prevUpdates,
          tentative_end_date: selectedDate.toISOString(),
        }));
      }
    }
    else if (name === "sample") {
      setFieldUpdates({
        ...fieldUpdates,
        sample: value,
      });
    }
    else if (name === "remark") {
      setFieldUpdates({
        ...fieldUpdates,
        remark: value,
      });
    }
  };
  
  const handleCancelUpdate = () => {
    setisEdit(false);
    document.body.classList.remove("DrawerBody");
  };

  const validateFields = () => {
    let isValid = true;
    let errorMessage = "";
    if (isMultipleSample.length > 1) {
      if (!updatedSampleCpi?.every((item) => item.remark)) {
        isValid = false;
        errorMessage += "Reason for adjustment is required for all samples.\n";
      }
    } else {
      if (!fieldUpdates?.remark) {
        isValid = false;
        errorMessage += "Reason for adjustment is required.\n";
      }
    }
    if (!isValid) {
      SweetAlert({
        title: "Error",
        text: errorMessage.trim(),
        icon: "error",
      });
    }
    return isValid;
  };

  const PostUpdateEditData = async (data) => {
    setLoader(true);
    let id = viewRecord?.id;
    const response = await patchWithAuth(EDITPROJECTREQUEST(id), data);
    if (response.status === true) {
      setLoader(false);
      SweetAlert({
        title: "Edit Request Sent Successfully",
        text: "",
        icon: "success",
      });
      setisEdit(false);
      const response = await notificationCount();
        dispatch(setnotification(response));
      const projectData = await ProjectData(page_number,page_size);
      dispatchReRender(setProjects(projectData?.results));
    } else {
      SweetAlert({
        title: response?.ex?.response?.data?.error,
        text: "",
        icon: "info",
      });
      setLoader(false);
      setisEdit(false);
    }
    setNotificationList([response?.data]);
  };

const handleEditUpdate = () => {
  if (!validateFields() || errors.tentative_end_date) return;

  const formattedData = isMultipleSample.length > 1
    ? (updatedSampleCpi.length>0) ? (updatedSampleCpi.map((item) => ({
        id: item.id,
        project: currentProject.id,
        sample: item.sample,
        cpi: item.cpi,
        target_group: item.target_group,
        tentative_end_date: fieldUpdates?.tentative_end_date || currentProject.flatMap((item)=>item.tentative_end_date)[0],
        remark: item.remark,
      }))) : (
        [
          {
            id: currentProject.flatMap((item)=>item.project_samples?.flatMap((item)=>item.id))[0],
            sample:  viewRecord?.sample,
            tentative_end_date: fieldUpdates?.tentative_end_date || currentProject.flatMap((item)=>item.tentative_end_date)[0],
            remark: fieldUpdates.remark,
          },
        ]
      )
    : [
        {
          id: currentProject.flatMap((item)=>item.project_samples?.flatMap((item)=>item.id))[0],
          sample: fieldUpdates.sample || viewRecord?.sample,
          cpi: isMultipleSample[0]?.cpi,
          target_group: isMultipleSample[0]?.target_group,
          tentative_end_date: fieldUpdates?.tentative_end_date || currentProject.flatMap((item)=>item.tentative_end_date)[0],
          remark: fieldUpdates.remark,
        },
      ];

  console.log(formattedData);

  PostUpdateEditData(formattedData); 
};

  const handlePopupClose = (updatedData) => {
    setIsPopupVisible(false);
    if (updatedData) {
      setUpdatedSampleCpi(updatedData);
    }
  };

  const checkIfMultipleSample = () => {
    if (isMultipleSample.length > 1) {
      setIsPopupVisible(true);
    }
  };

  const combinedRemarks = updatedSampleCpi
    ?.map((data) => data.remark)
    .join(", ");

  return (
    <div
      className={`${
        darkMode ? "bg-black text-white" : "bg-gray-50 text-black"
      }`}
    >
      <h3 className="text-xl underline pb-4">Project Edit Request</h3>
      <div className="flex items-center flex-wrap justify-center w-full rounded-sm">
        <div className="ProjectOperationEdit">
          <LableAndInput
            labelName={"Project Name"}
            Inputvalue={viewRecord.name}
            disabled={true}
            inputClassName={"cursor-not-allowed p-2 border bg-[#f3eded]"}
            labelClassName={"pt-4 pb-2 text-left"}
            inputChange={handleInputChange}
          />
        </div>
        <div className="ProjectOperationEdit">
          <LableAndInput
            labelName={"Date End Required(Tentative)"}
            InputName={"tentative_end_date"}
            InputType={"date"}
            inputClassName={"p-2 border w-full"}
            labelClassName={"pt-4 pb-2 text-left"}
            Inputvalue={showDate}
            inputChange={handleInputChange}
            min={getMinDate()}
          />
          {errors.tentative_end_date && (
            <p className="text-red-500 text-sm">{errors.tentative_end_date}</p>
          )}
        </div>
        <div className="ProjectOperationEdit">
          <LableAndInput
            labelName={"Revised Target Required (Sample)"}
            InputType={"number"}
            InputName={"sample"}
            inputClassName={"p-2 border"}
            labelClassName={"pt-4 pb-2 text-left"}
            Inputvalue={
              isMultipleSample.length > 1
                ? TotalSampleSize || viewRecord?.sample
                : fieldUpdates.sample || viewRecord?.sample
            }
            inputChange={handleInputChange}
            InputOnFocus={checkIfMultipleSample}
          />
          {errors.sample && (
            <p className="text-red-500 text-sm">{errors.sample}</p>
          )}
        </div>

        {/* Modal */}
        {isPopupVisible && (
          <Popup>
            <ProjectSamplesTable
              onClose={handlePopupClose}
              projectSamples={isMultipleSample}
            />
          </Popup>
        )}
        <div className="ProjectOperationEdit">
          <LableAndInput
            labelName={"Remark"}
            InputType={"text"}
            InputName={"remark"}
            inputClassName={"p-2 border"}
            labelClassName={"pt-4 pb-2 text-left"}
            Inputvalue={combinedRemarks || fieldUpdates?.remark || ""}
            inputChange={handleInputChange}
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
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          {loader ? <Loader /> : ""}
        </div>
      </div>
    </div>
  );
};

export default SampleEdit;