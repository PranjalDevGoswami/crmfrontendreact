import React, { useContext, useEffect } from "react";
import Label from "../../Atom/Label";
import Input from "../../Atom/InputField";
import { FormDataContext } from "../../ContextApi/FormDataContext";
import SweetAlert from "../SweetAlert";
import { useSelector } from "react-redux";

const CostPerInterview = () => {
  const { formData, setFormData } = useContext(FormDataContext);
  const isMultipleSample = useSelector(
    (store) => store.addMultipleSampleCpi.isMultipleSampleCheckbox
  );

  // Effect hook to reset CPI to 0 if multiple sample is selected
  useEffect(() => {
    if (isMultipleSample) {
      setFormData((prevData) => ({ ...prevData, cpi: 0 }));
    }
  }, [isMultipleSample, setFormData]);

  // Input change handler with validation for decimal values
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    e.preventDefault();

    // Allow only whole numbers (no decimals)
    if (/^\d*$/.test(value)) {
      setFormData({ ...formData, [name]: value });
    } else {
      SweetAlert({
        title: "Error",
        text: "'Cost value can't be in decimal'",
        icon: "error",
      });
    }
  };

  return (
    <div className="">
      <Label labelName={"Cost Per Interview"} className={"pt-4 pb-2"} />
      <div className="flex w-full">
        <div className="w-full inline-block">
          {/* If multiple samples are not selected, allow input */}
          {!isMultipleSample ? (
            <Input
              name={"cpi"}
              type={"number"}
              onchange={handleInputChange}
              className={"p-2 border bg-white w-full mt-2 rounded-md"}
              min={0}
              value={formData?.cpi || ""}
            />
          ) : (
            // If multiple samples are selected, set CPI to 0 and disable the field
            <Input
              name={"cpi"}
              type={"number"}
              onchange={handleInputChange}
              className={"p-2 border bg-white w-full mt-2 rounded-md"}
              min={0}
              disabled
              value={0}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CostPerInterview;
