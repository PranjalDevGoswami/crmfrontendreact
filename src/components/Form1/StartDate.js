import React, { useContext, useState } from "react";
import LableAndInput from "../../Molecules/LableAndInput";
import { FormDataContext } from "../../ContextApi/FormDataContext";

const StartDate = () => {
  const { formData, setFormData } = useContext(FormDataContext);
  const [errorMessage, setErrorMessage] = useState("");
  const today = new Date();
  const minDate = new Date(today);
  minDate.setDate(minDate.getDate() - 6);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const date = new Date(value);
    const day = date.getDay();

    if (day === 0 || day === 6) {
      setErrorMessage("Please select a weekday.");
    } else {
      setErrorMessage("");
    }

    setFormData({ ...formData, [name]: value });
    if (name === "tentative_start_date") {
      const isoDate = date.toISOString();
      setFormData({ ...formData, [name]: isoDate });
    }
  };
  return (
    <>
      <LableAndInput
        labelName={"Start Date"}
        InputName={"tentative_start_date"}
        InputType={"date"}
        inputChange={handleInputChange}
        min={minDate.toISOString().split("T")[0]}
        inputClassName={"p-2 border bg-white border rounded-none"}
        labelClassName={"pt-4 pb-2"}
      />
      {errorMessage && <div className="text-red-500">{errorMessage}</div>}
    </>
  );
};

export default StartDate;
