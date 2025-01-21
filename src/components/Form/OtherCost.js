import React, { useContext } from "react";
import Label from "../../Atom/Label";
import Input from "../../Atom/InputField";
import { FormDataContext } from "../../ContextApi/FormDataContext";
import SweetAlert from "../SweetAlert";

const OtherCost = () => {
  const { formData, setFormData } = useContext(FormDataContext);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === "other_cost") {
      e.preventDefault();
      if (/^\d*$/.test(value)) {
        setFormData({ ...formData, [name]: Number(value) });
      } else {
        SweetAlert({
          title: "Error",
          text: `'Other fee value can't be in decimal'`,
          icon: "error",
        });
      }
    }
  };
  return (
    <div className="lg:w-[32%] w-full flex flex-col">
      <Label labelName={"Other Cost"} className={"pt-4 pb-2"} />
      <div className="flex w-full">
        <div className="w-full inline-block">
          <Input
            name={"other_cost"}
            type={"number"}
            onchange={handleInputChange}
            className={"p-2 border bg-[#f3eded] w-full rounded-md"}
            // min={0}
            // value=Label{"12"}
          />
        </div>
      </div>
    </div>
  );
};

export default OtherCost;
