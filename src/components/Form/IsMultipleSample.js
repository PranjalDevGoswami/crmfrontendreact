import React from "react";
import Label from "../Label";
import { useDispatch } from "react-redux";
import {
  checkedMultipleSampleCpi,
  toggleMultipleSampleCpi,
} from "../../../utils/slices/AddMutipleSampleCpiSlice";
import { useSelector } from "react-redux";
import { addMultipleSample } from "../../../utils/slices/MultipleSampleCpiSlice";

const IsMultipleSample = () => {
  const dispatchMultipleSample = useDispatch();
  const dispatchIsMultipleSampleSelected = useDispatch();

  const isMultipleSampleSelected = useSelector(
    (store) => store.addMultipleSampleCpi.isMultipleSample
  );
  const isMultipleRecord = useSelector(
    (store) => store.MultiSampleCpiRecord.sampleCpiRecord
  );
  const isMultipleSelected = useSelector(
    (store) => store.addMultipleSampleCpi.isMultipleSampleCheckbox
  );

  const handleCheckBox = () => {
    dispatchIsMultipleSampleSelected(
      checkedMultipleSampleCpi(!isMultipleSelected)
    );
    dispatchMultipleSample(toggleMultipleSampleCpi(true));
    if (isMultipleRecord.length > 1) {
      dispatchMultipleSample(addMultipleSample([]));
      dispatchMultipleSample(toggleMultipleSampleCpi(false));
    }
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
