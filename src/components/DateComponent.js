import React from "react";
import Input from "./InputField";

const DateComponent = ({ handleDateChange }) => {
  const today = new Date();
  const minDate = new Date(today);
  if (today.getDay() === 0) {
    minDate.setDate(minDate.getDate() - 4);
  } else {
    minDate.setDate(minDate.getDate() - 2);
  }

  return (
    <div className="p-2 mr-4 w-2/12">
      <Input
        name={"update_date"}
        type={"date"}
        className={"p-2 mr-4 border w-full"}
        onchange={handleDateChange}
        min={minDate.toISOString().split("T")[0]}
        max={today.toISOString().split("T")[0]}
      />
    </div>
  );
};

export default DateComponent;
