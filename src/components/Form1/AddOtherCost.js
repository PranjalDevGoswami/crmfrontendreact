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
    <div className="bg-white w-full h-full flex items-center justify-center relative">
      <div className="flex flex-col w-2/3 relative">
        <Label labelName={"Other Cost"} className={"pt-4 pb-2"} />
        <MultipleValueDropDown
          options={[
            { value: "other_cost", label: "Other Cost" },
            { value: "transaction_fee", label: "Translation Cost" },
          ]}
          onChange={MultipleValueSection}
          className={"w-full bg-white border "}
        />
      </div>
      <Button
        name={"X"}
        className={
          "bg-red-400 p-2 w-8 h-8 rounded-full absolute top-4 right-8 flex items-center justify-center text-white"
        }
        onClick={CloseOtherFeehandler}
      />
    </div>
  );
};

export default AddOtherCost;
