import React, { useContext, useState } from "react";
import LableAndInput from "../../Molecules/LableAndInput";
import { FormDataContext } from "../../ContextApi/FormDataContext";

const EndDate = () => {
  const { formData, setFormData } = useContext(FormDataContext);
  const [error, setError] = useState("");

const startDate = new Date(formData.tentative_start_date || new Date());
  // const today = new Date();
  // const minDate = new Date(today);
  // minDate.setDate(minDate.getDate() - 6);

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
      setError("Please select a weekday.");
    } else if (endDate <= startDate) {
      setError("End date must be greater than start date.");
    } else {
      setError("");
      setFormData({ ...formData, [name]: value });
      if (name === "tentative_end_date") {
        const isoDate = new Date(value).toISOString();
        setFormData({ ...formData, [name]: isoDate });
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
      />
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default EndDate;
