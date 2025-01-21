import React, { useContext, useState } from "react";
import Label from "../../Atom/Label";
import MultipleValueDropDown from "../MultipleValueDropDown";
import Button from "../../Atom/Button";
import { FormDataContext } from "../../ContextApi/FormDataContext";

const AddOtherCost = () => {
  const [otherFeeValue, setOtherFeeValue] = useState([]);

  const { setIsOtherFee, setOtherCost, setTranslationCost } =
    useContext(FormDataContext);

  const MultipleValueSection = (selectedOptions) => {
    const selectedValues = selectedOptions.map((option) => option.value);
    const updatedValues = [...otherFeeValue, ...selectedValues];
    setOtherFeeValue(updatedValues);
    setOtherCost(updatedValues.includes("other_cost"));
    setTranslationCost(updatedValues.includes("transaction_fee"));
  };

  const CloseOtherFeehandler = () => {
    setIsOtherFee(false);
  };
  return (
    <div className="bg-white flex justify-center text-center h-52 relative">
      <div className="relative w-1/2">
        <Label labelName={"Add Other Cost"} className={"pt-4 pb-2"} />
        <MultipleValueDropDown
          options={[
            { value: "other_cost", label: "Other Cost" },
            { value: "transaction_fee", label: "Translation Cost" },
          ]}
          onChange={MultipleValueSection}
          className={"w-full bg-[#f3eded] rounded-md mt-2"}
        />
      </div>
      <Button
        name={"X"}
        className={
          "bg-red-400 p-2 w-8 h-8 rounded-md absolute top-0 right-0 flex items-center justify-center text-white"
        }
        onClick={CloseOtherFeehandler}
      />
    </div>
  );
};

export default AddOtherCost;
