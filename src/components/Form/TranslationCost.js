import React, { useContext } from "react";
import Label from "../Label";
import Input from "../InputField";
import { FormDataContext } from "../../ContextApi/FormDataContext";
import SweetAlert from "../SweetAlert";

const TranslationCost = () => {
  const { formData, setFormData } = useContext(FormDataContext);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === "transaction_fee") {
      e.preventDefault();
      if (/^\d*$/.test(value)) {
        setFormData({ ...formData, [name]: Number(value) });
      } else {
        SweetAlert({
          title: "Error",
          text: `'Transaction fee value can't be in decimal'`,
          icon: "error",
        });
      }
    }
  };
  return (
    <div className="flex flex-col lg:w-[32%] w-full">
      <Label labelName={"Translator Cost"} className={"pt-4 pb-2"} />
      <div className="flex w-full">
        <div className="w-full inline-block">
          <Input
            name={"transaction_fee"}
            type={"number"}
            onchange={handleInputChange}
            className={"p-2 border bg-[#f3eded] w-full"}
            // min={0}
          />
        </div>
      </div>
    </div>
  );
};

export default TranslationCost;
