import React, { useContext } from "react";
import Label from "../Label";
import Input from "../InputField";
import { TiPlus } from "react-icons/ti";
import { FormDataContext } from "../../ContextApi/FormDataContext";
import SweetAlert from "../SweetAlert";

const SetupFee = () => {
  const {
    formData,
    setFormData,
    isOtherFee,
    setIsOtherFee,
    otherCost,
    translationCost,
  } = useContext(FormDataContext);

  const OpenOtherFee = (e) => {
    e.preventDefault();
    setIsOtherFee(true);
  };
  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({ ...formData, [name]: value });
    e.preventDefault();
    if (/^\d*$/.test(value)) {
      setFormData({ ...formData, [name]: Number(value) });
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
      <Label labelName={"Setup Fee"} className={"pt-4 pb-2"} />
      <div className="flex w-full items-center">
        <div className="w-full inline-block">
          <Input
            name={"set_up_fee"}
            type={"number"}
            onchange={handleInputChange}
            className={"p-2 border bg-[#f3eded] w-full rounded-r-none mt-2"}
            // min={0}
          />
        </div>
        <div className="w-[7%] bg-yellow-200 flex items-center justify-center rounded-r-full mt-2">
          <button onClick={OpenOtherFee} className="inline-block p-[13px] ">
            <TiPlus />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SetupFee;
