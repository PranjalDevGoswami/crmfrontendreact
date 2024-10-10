import React from "react";
import Label from "../Label";
import { useDispatch } from "react-redux";
import { toggleMultipleSampleCpi } from "../../../utils/slices/AddMutipleSampleCpiSlice";
import { useSelector } from "react-redux";

const IsMultipleSample = () => {
  const dispatchMultipleSample = useDispatch();
  const isMultiple = useSelector(
    (store) => store.addMultipleSampleCpi.isMultipleSample
  );
  const handleCheckBox = () => {
    dispatchMultipleSample(toggleMultipleSampleCpi(true));
  };
  return (
    <div className="flex items-center pt-2">
      <input
        type={"checkbox"}
        onChange={handleCheckBox}
        className={"text-sm"}
        checked={isMultiple}
      />
      <Label labelName={"Add Multiple Sample"} className={"text-xs ml-2"} />
    </div>
  );
};

export default IsMultipleSample;
