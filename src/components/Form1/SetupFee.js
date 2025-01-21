import React, { useContext } from "react";
import Label from "../../Atom/Label";
import Input from "../../Atom/InputField";
import { TiPlus } from "react-icons/ti";
import { FormDataContext } from "../../ContextApi/FormDataContext";
import SweetAlert from "../SweetAlert";

const SetupFee = () => {
  const {
    formData,
    setFormData,
    isOtherFee,
    setIsOtherFee,
  } = useContext(FormDataContext);

  const OpenOtherFee = (e) => {
    e.preventDefault();
    setIsOtherFee(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    e.preventDefault();
    if (/^\d*$/.test(value)) {
      setFormData({ ...formData, [name]: Number(value) });
    } else {
      SweetAlert({
        title: "Error",
        text: "'Setup fee can't be in decimal'",
        icon: "error",
      });
    }
  };

  return (
    <div className="">
      <Label labelName={"Setup Fee"} className={"pt-4 pb-2"} />
      <div className="flex w-full items-center">
        <div className="w-full inline-block">
          <Input
            name={"set_up_fee"}
            type={"number"}
            onchange={handleInputChange}
            className={"p-2 border bg-white w-full rounded-l-none rounded-r-none mt-2"}
            min={0}
            value={formData?.set_up_fee || ""}
          />
        </div>
        <div>
          <button
            onClick={OpenOtherFee}
            className="bg-green-300 rounded-md rounded-l-none p-1 mt-2 w-[30px] h-[44px] flex items-center justify-center"
          >
            <TiPlus />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SetupFee;
