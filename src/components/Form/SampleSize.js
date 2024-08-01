import React, { useContext } from "react";
import LableAndInput from "../LableAndInput";
import { FormDataContext } from "../../ContextApi/FormDataContext";
import SweetAlert from "../SweetAlert";

const SampleSize = () => {
  const { formData, setFormData } = useContext(FormDataContext);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    e.preventDefault();
    if (/^\d*$/.test(value)) {
      setFormData({ ...formData, [name]: value });
    } else {
      SweetAlert({
        title: "Error",
        text: `'Sample value can't be in decimal'`,
        icon: "error",
      });
    }
  };
  return (
    <div>
      <LableAndInput
        labelName={"Sample"}
        InputName={"sample"}
        InputType={"number"}
        inputChange={handleInputChange}
        inputClassName={"p-2 border bg-[#f3eded]"}
        labelClassName={"pb-2"}
        min={0}
      />
    </div>
  );
};

export default SampleSize;
