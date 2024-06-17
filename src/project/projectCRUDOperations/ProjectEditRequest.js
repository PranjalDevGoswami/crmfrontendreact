import React, { useContext, useState } from "react";
import LableAndInput from "../../components/LableAndInput";
import Dropdown from "../../components/DropDown";
import Label from "../../components/Label";
// import { PostMandaysData } from "../../fetchApis/projects/mandays/PostMandaysData";
import { PostMandaysData } from "../../fetchApis/projects/mandays/PostMandaysData";
import { postWithAuth } from "../../provider/helper/axios";
import { EDITPROJECTREQUEST } from "../../../utils/urls";
import { NotifiactionContext } from "../../ContextApi/NotificationContext";

const SampleEdit = ({ viewRecord, setisEdit }) => {
  const [showDate, setShowDate] = useState();
  const [updatedValue, setUpdatedValue] = useState({
    name: viewRecord.name,
    project_code: viewRecord.project_code,
    tentative_end_date: "",
    sample: "",
    reason_for_adjustment: "",
  });
  const { notificationList, setNotificationList } =
    useContext(NotifiactionContext);

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
    const response = await postWithAuth(EDITPROJECTREQUEST, data);
    if (response.status == true) {
      alert("Edit Request Sent Successfully");
      setisEdit(false);
    }
    setNotificationList([...notificationList, response?.data]);
  };

  const handleEditUpdate = () => {
    console.log(updatedValue.tentative_end_date);
    const selectedDate = new Date(updatedValue.tentative_end_date);
    console.log("🚀 ~ handleEditUpdate ~ selectedDate:", selectedDate);
    if (selectedDate.getDay() === 6 || selectedDate.getDay() === 0) {
      updatedValue.tentative_end_date = "";
      alert("weekend is not selectable");
    } else {
      PostUpdateEditData(updatedValue);
    }
  };

  return (
    <div className="absolute h-auto w-1/2 top-2/3 left-1/2 -translate-x-1/2 bg-white p-8 border border-black drop-shadow-lg shadow-2xl shadow-slate-400 -translate-y-1/2 z-50">
      <h3 className="text-xl underline pb-4">Project Edit Request</h3>
      <div className="flex items-center flex-col justify-between">
        <div className="w-11/12">
          <LableAndInput
            labelName={"Project Code"}
            Inputvalue={viewRecord.project_code}
            desabled={true}
            inputClassName={"cursor-not-allowed p-2 border bg-[#f3eded]"}
            labelClassName={"pt-4 pb-2"}
            inputChange={handleInputChange}
          />
        </div>
        <div className="w-11/12">
          <LableAndInput
            labelName={"Project Name"}
            Inputvalue={viewRecord.name}
            desabled={true}
            inputClassName={"cursor-not-allowed p-2 border bg-[#f3eded]"}
            labelClassName={"pt-4 pb-2"}
            inputChange={handleInputChange}
          />
        </div>
        <div className="w-11/12">
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
        <div className="w-11/12">
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
        <div className="w-11/12">
          <Label labelName={"Reason"} className={"pt-4 pb-2 mt-4 mb-2"} />
          <textarea
            className="w-full border mt-4 mb-2 p-2"
            name="reason_for_adjustment"
            onChange={handleInputChange}
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

export default SampleEdit;
