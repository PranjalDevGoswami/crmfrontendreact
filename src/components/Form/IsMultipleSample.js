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

  const isMultipleSampleSelected = useSelector(
    (store) => store.addMultipleSampleCpi.isMultipleSample
  );
  const isMultipleRecord = useSelector(
    (store) => store.MultiSampleCpiRecord.sampleCpiRecord
  );
  const isMultipleSelected = useSelector(
    (store) => store.addMultipleSampleCpi.isMultipleSampleCheckbox
  );

  // const handleCheckBox = () => {

  //   isMultipleRecord.length > 1
  //     ? dispatchIsMultipleSampleSelected(checkedMultipleSampleCpi(true))
  //     : dispatchIsMultipleSampleSelected(
  //         checkedMultipleSampleCpi(!isMultipleSample)
  //       );
  //   dispatchMultipleSample(toggleMultipleSampleCpi(!isMultipleSample));
  // };

  const handleCheckBox = () => {
    dispatchMultipleSample(toggleMultipleSampleCpi(!isMultipleSampleSelected));
    dispatchIsMultipleSampleSelected(
      checkedMultipleSampleCpi(!isMultipleSelected)
    );
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
