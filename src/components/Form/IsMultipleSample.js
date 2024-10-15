import React from "react";
import Label from "../Label";
import { useDispatch } from "react-redux";
import {
  checkedMultipleSampleCpi,
  toggleMultipleSampleCpi,
} from "../../../utils/slices/AddMutipleSampleCpiSlice";
import { useSelector } from "react-redux";

const IsMultipleSample = () => {
  const dispatchMultipleSample = useDispatch();
  const dispatchIsMultipleSampleSelected = useDispatch();

  const isMultiple = useSelector(
    (store) => store.addMultipleSampleCpi.isMultipleSample
  );
  const isMultipleSelected = useSelector(
    (store) => store.addMultipleSampleCpi.isMultipleSampleSelected
  );

  const handleCheckBox = () => {
    dispatchMultipleSample(toggleMultipleSampleCpi(true));
    dispatchIsMultipleSampleSelected(checkedMultipleSampleCpi(true));
  };
  return (
    <div className="flex items-center pt-2">
      <input
        type={"checkbox"}
        onChange={handleCheckBox}
        className={"text-sm"}
        checked={isMultipleSelected}
      />
      <Label labelName={"Add Multiple Sample"} className={"text-xs ml-2"} />
    </div>
  );
};

export default IsMultipleSample;
