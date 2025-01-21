import React, { useContext, useState } from "react";
import LableAndInput from "../../Molecules/LableAndInput";
import { FormDataContext } from "../../ContextApi/FormDataContext";

const EndDate = () => {
  const { formData, setFormData } = useContext(FormDataContext);
  const [error, setError] = useState("");

  const today = new Date();
  const minDate = new Date(today);
  minDate.setDate(minDate.getDate() - 6);

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
        inputClassName={"p-2 border bg-white w-full mt-2 rounded-md"}
        labelClassName={"pt-4 pb-2"}
      />
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default EndDate;
