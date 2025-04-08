import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LableAndInput from "../../../Molecules/LableAndInput";
import { addFormData } from "../../../../utils/slices/projectEntryFormSlice";

const EndDate = () => {
  const formData = useSelector((store) => store.projectEntryForm.form);
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState();

  const startDate = new Date(formData.tentative_start_date || new Date());

  const isWeekend = (date) => {
    const day = date.getDay();
    return day === 0 || day === 6;
  };
  const getNextValidDate = (date) => {
    let nextDate = new Date(date);
    while (isWeekend(nextDate)) {
      nextDate.setDate(nextDate.getDate() + 1);
    }
    return nextDate;
  };
  const minDate = getNextValidDate(startDate);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const startDate = new Date(formData.tentative_start_date);
    const endDate = new Date(value);

    const day = endDate.getDay();
    if (day === 0 || day === 6) {
      setErrorMessage("Please select a weekday.");
    } else if (endDate <= startDate) {
      setErrorMessage("End date must be greater than start date.");
    } else {
      setErrorMessage("");
      dispatch(addFormData({ [name]: value }));
      if (name === "tentative_end_date") {
        const isoDate = new Date(value).toISOString();
        dispatch(addFormData({ [name]: isoDate }));
      }
    }
  };

  return (
    <div>
      <LableAndInput
        labelName={"End Date"}
        InputName={"tentative_end_date"}
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
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
    </div>
  );
};

export default EndDate;
