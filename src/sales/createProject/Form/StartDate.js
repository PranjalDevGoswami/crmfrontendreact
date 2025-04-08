import React, { useState } from "react";
import { useDispatch } from "react-redux";
import LableAndInput from "../../../Molecules/LableAndInput";
import { addFormData } from "../../../../utils/slices/projectEntryFormSlice";

const StartDate = () => {
  const dispatch = useDispatch();
  const department = localStorage.getItem("department");
  const [errorMessage, setErrorMessage] = useState();

  const today = new Date();
  const minDate = new Date(today);
  if (department == 1) {
    minDate.setDate(minDate.getDate() - 30);
  } else {
    minDate.setDate(minDate.getDate() - 6);
  }
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const date = new Date(value);
    const day = date.getDay();

    if (day === 0 || day === 6) {
      setErrorMessage("Please select a weekday.");
    } else {
      setErrorMessage("");
    }
    const isoDate = date.toISOString();
    dispatch(addFormData({ [name]: isoDate }));
  };

  return (
    <div>
      <LableAndInput
        labelName={"Start Date"}
        InputName={"tentative_start_date"}
        InputType={"date"}
        inputChange={handleInputChange}
        min={minDate.toISOString().split("T")[0]}
        inputClassName={"p-2 border bg-[#f3eded] rounded-md"}
        labelClassName={"pt-2 pb-2 pl-1"}
        onKeyDown={(e) => {
          e.preventDefault();
          setErrorMessage("please select date from calender");
        }}
      />
      {errorMessage && <div className="text-red-500">{errorMessage}</div>}
    </div>
  );
};

export default StartDate;
