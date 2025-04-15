import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Label from "../../../Atom/Label";
import MultipleValueDropDown from "../../../components/MultipleValueDropDown";
import Button from "../../../Atom/Button";
import {
  addIsOtherCostSelectedOptions,
  addOtherCost,
  addOtherCostSelected,
  addTranslationCost,
} from "../../../../utils/slices/projectEntryFormSlice";

const AddOtherCost = () => {
  const { isOtherCostSelectedOptions } = useSelector(
    (store) => store.projectEntryForm
  );

  const dispatch = useDispatch();

  const handleFeeSelection = (updatedSelectedValues) => {
    dispatch(addIsOtherCostSelectedOptions(updatedSelectedValues));

    dispatch(addOtherCost(updatedSelectedValues.includes("other_cost")));
    dispatch(
      addTranslationCost(updatedSelectedValues.includes("transaction_fee"))
    );
  };

  const handleClose = () => {
    dispatch(addOtherCostSelected(false));
  };

  const options = [
    { value: "other_cost", label: "Other Cost" },
    { value: "transaction_fee", label: "Translation Cost" },
  ];

  return (
    <div className="bg-white flex justify-center text-center h-52 relative">
      <div className="relative w-1/2">
        <Label labelName={"Add Other Cost"} className={"pt-4 pb-2"} />
        <MultipleValueDropDown
          options={options}
          value={isOtherCostSelectedOptions}
          onChange={handleFeeSelection}
          className={"w-full bg-[#f3eded] rounded-md mt-2"}
        />
      </div>
      <Button
        name={"X"}
        className={
          "bg-red-400 p-2 w-8 h-8 rounded-md absolute top-0 right-0 flex items-center justify-center text-white"
        }
        onClick={handleClose}
      />
    </div>
  );
};

export default AddOtherCost;
