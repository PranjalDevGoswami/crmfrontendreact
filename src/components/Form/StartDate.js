import React, { useContext } from "react";
import LableAndInput from "../LableAndInput";
import { FormDataContext } from "../../ContextApi/FormDataContext";

const StartDate = () => {
  const { formData, setFormData } = useContext(FormDataContext);
  const today = new Date();
  const minDate = new Date(today);
  minDate.setDate(minDate.getDate() - 6);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === "tentative_start_date") {
      const tst = value;
      const parts = tst.split("/");
      const isoDate = new Date(
        `${parts[2]}-${parts[1]}-${parts[0]}`
      ).toISOString();
      setFormData({ ...formData, [name]: isoDate });
    }
  };
  return (
    <LableAndInput
      labelName={"Start Date"}
      InputName={"tentative_start_date"}
      InputType={"date"}
      placeholder={"dd/mm/yyyy"}
      inputChange={handleInputChange}
      min={minDate.toISOString().split("T")[0]}
      inputClassName={"p-2 border bg-[#f3eded]"}
      labelClassName={"pt-4 pb-2"}
    />
  );
};

export default StartDate;
