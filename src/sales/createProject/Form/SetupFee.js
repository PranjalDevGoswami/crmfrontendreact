import React, { useState } from "react";
import { TiPlus } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import {
  addFormData,
  addOtherCostSelected,
} from "../../../../utils/slices/projectEntryFormSlice";
import Label from "../../../Atom/Label";
import Input from "../../../Atom/InputField";
import Button from "../../../Atom/Button";

const SetupFee = () => {
  const formData = useSelector((store) => store.projectEntryForm.form);
  const dispatch = useDispatch();
  const [errorMsg, setErrorMsg] = useState();

  const OpenOtherFee = (e) => {
    e.preventDefault();
    dispatch(addOtherCostSelected(true));
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    e.preventDefault();
    if (/^\d*$/.test(value)) {
      dispatch(addFormData({ [name]: value }));
      setErrorMsg(null);
    } else {
      setErrorMsg("setup cost can't be in decimal");
    }
  };
  return (
    <div>
      <Label labelName={"Setup Fee"} className={"pt-2 pb-2"} />
      <div className="flex w-full items-center">
        <div className="w-full inline-block">
          <Input
            name={"set_up_fee"}
            type={"number"}
            onChange={handleInputChange}
            className={
              "p-2 border bg-[#f3eded] w-full rounded-r-none mt-2 rounded-md"
            }
            value={formData.set_up_fee}
          />
        </div>
        <div className="w-[7%] bg-green-300 flex items-center justify-center rounded-md rounded-l-none mt-2">
          <Button
            onClick={OpenOtherFee}
            className="inline-block p-[13px] "
            name={<TiPlus />}
          />
        </div>
      </div>
      {errorMsg && <p className="text-red-500 text-xs p-1">{errorMsg}</p>}
    </div>
  );
};

export default SetupFee;
