import React, { useContext, useState } from "react";
import LableAndInput from "../../components/LableAndInput";
import Dropdown from "../../components/DropDown";
import Label from "../../components/Label";
// import { PostMandaysData } from "../../fetchApis/projects/mandays/PostMandaysData";
import { PostMandaysData } from "../../fetchApis/projects/mandays/PostMandaysData";
import { postWithAuth } from "../../provider/helper/axios";
import { EDITPROJECTREQUEST } from "../../../utils/urls";
import { NotifiactionContext } from "../../ContextApi/NotificationContext";
import Loader from "../../components/Loader";
import SweetAlert from "../../components/SweetAlert";
import { DataTableContext } from "../../ContextApi/DataTableContext";

const SampleEdit = ({ viewRecord }) => {
  const [showDate, setShowDate] = useState();
  const [updatedValue, setUpdatedValue] = useState({
    name: viewRecord.name,
    project_code: viewRecord.project_code,
    tentative_end_date: "",
    sample: "",
    reason_for_adjustment: "",
  });
  const { setisEdit } = useContext(DataTableContext);

  const { notificationList, setNotificationList } =
    useContext(NotifiactionContext);
  const [loader, setLoader] = useState(false);

  const handleFilterOption = (name, value) => {
    setUpdatedValue({
      ...updatedValue,
      [name]: value,
    });
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

  const handleDateFocus = (e) => {};

  const getMinDate = () => {
    let currentDate = new Date();
    let daysBack = 0;

    while (daysBack < 2) {
      if (currentDate.getDay() === 1) {
        currentDate.setDate(currentDate.getDate() - 3);
      } else if (currentDate.getDay() === 0) {
        currentDate.setDate(currentDate.getDate() - 2);
      } else {
        currentDate.setDate(currentDate.getDate() - 1);
      }
      daysBack++;
    }

    return currentDate.toISOString().split("T")[0];
  };

  const handleCancelUpdate = () => {
    setisEdit(false);
    // setViewEdit(false);
    // setIsMultiEdit(false);
    // setMultiEditFieldOpen(false);
    document.body.classList.remove("DrawerBody");
  };

  const PostUpdateEditData = async (data) => {
    setLoader(true);
    const response = await postWithAuth(EDITPROJECTREQUEST, data);
    if (response.status == true) {
      setLoader(false);
      SweetAlert({
        title: "Edit Request Sent Successfully",
        text: "",
        icon: "success",
      });
      setisEdit(false);
    }
    setNotificationList([...notificationList, response?.data]);
  };

  const handleEditUpdate = () => {
    const selectedDate = new Date(updatedValue.tentative_end_date);
    if (selectedDate.getDay() === 6 || selectedDate.getDay() === 0) {
      updatedValue.tentative_end_date = "";
      SweetAlert({
        title: "weekend is not selectable",
        text: "",
        icon: "info",
      });
    } else {
      PostUpdateEditData(updatedValue);
    }
  };
  return (
    <div>
      <h3 className="text-xl underline pb-4">Project Edit Request</h3>
      <div className="flex items-center flex-wrap justify-center w-full rounded-sm">
        <div className="ProjectOperationEdit hidden">
          <LableAndInput
            labelName={"Project Code"}
            Inputvalue={viewRecord.project_code.toUpperCase()}
            desabled={true}
            inputClassName={"cursor-not-allowed p-2 border bg-[#f3eded]"}
            labelClassName={"pt-4 pb-2"}
            inputChange={handleInputChange}
          />
        </div>
        <div className="ProjectOperationEdit">
          <LableAndInput
            labelName={"Project Name"}
            Inputvalue={viewRecord.name}
            desabled={true}
            inputClassName={"cursor-not-allowed p-2 border bg-[#f3eded]"}
            labelClassName={"pt-4 pb-2"}
            inputChange={handleInputChange}
          />
        </div>
        <div className="ProjectOperationEdit">
          <LableAndInput
            labelName={"Date Required(Tentative)"}
            InputName={"tentative_end_date"}
            InputType={"date"}
            inputClassName={"p-2 border w-full"}
            labelClassName={"pt-4 pb-2"}
            Inputvalue={showDate}
            inputChange={handleInputChange}
            min={getMinDate()}
          />
        </div>
        <div className="ProjectOperationEdit">
          <LableAndInput
            labelName={"Revised Target Required (Sample)"}
            InputType={"number"}
            InputName={"sample"}
            inputClassName={"p-2 border"}
            labelClassName={"pt-4 pb-2"}
            Inputvalue={updatedValue.sample}
            inputChange={handleInputChange}
            InputMax_lenght={3}
            min={1}
          />
        </div>
        <div className="ProjectOperationEdit">
          <LableAndInput
            labelName={"Reason"}
            InputType={"text"}
            InputName={"reason_for_adjustment"}
            inputClassName={"p-2 border"}
            labelClassName={"pt-4 pb-2"}
            Inputvalue={updatedValue.reason_for_adjustment}
            inputChange={handleInputChange}
          />
          {/* <Label labelName={"Reason"} className={"pt-4 pb-2"} />
          <textarea
            className="w-full p-1 border rounded-full"
            name="reason_for_adjustment"
            onChange={handleInputChange}
          /> */}
        </div>
        <div className="flex pt-10">
          <button
            onClick={handleEditUpdate}
            className={
              "bg-green-300 p-4 m-2 flex items-center w-full rounded text-white hover:bg-green-500"
            }
          >
            Update
            {/* {loader ? <Loader /> : "Update"} */}
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
