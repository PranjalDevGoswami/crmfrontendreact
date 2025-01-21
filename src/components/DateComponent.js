import React from "react";
import Input from "../Atom/InputField";

const DateComponent = ({ handleDateChange, dateError }) => {
  const today = new Date();
  const minDate = new Date(today);
  if (today.getDay() == 0) {
    minDate.setDate(minDate.getDate() - 4);
  } else {
    minDate.setDate(minDate.getDate() - 2);
  }

  return (
    <div className="p-2 mr-4">
      <Input
        name={"update_date"}
        type={"date"}
        className={"p-2 mr-4 border w-full max-w-56"}
        onchange={handleDateChange}
        min={minDate.toISOString().split("T")[0]}
        max={today.toISOString().split("T")[0]}
      />
      {dateError && <p className="text-red-500 w-56">{dateError}</p>}
    </div>
  );
};

export default DateComponent;
