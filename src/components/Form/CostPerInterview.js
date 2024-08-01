import React, { useContext } from "react";
import Label from "../Label";
import Input from "../InputField";
import { FormDataContext } from "../../ContextApi/FormDataContext";
import SweetAlert from "../SweetAlert";

const CostPerInterview = () => {
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
    <div className="">
      <Label labelName={"Cost Per Interview"} className={"pt-4 pb-2"} />
      <div className="flex w-full">
        <div className="w-full inline-block">
          <Input
            name={"cpi"}
            type={"number"}
            onchange={handleInputChange}
            className={"p-2 border bg-[#f3eded] w-full mt-2"}
            min={0}
          />
        </div>
      </div>
    </div>
  );
};

export default CostPerInterview;
