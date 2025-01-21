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
  useEffect(() => {
    if (isMultipleSample) {
      setFormData((prevData) => ({ ...prevData, cpi: 0 }));
    }
  }, [isMultipleSample, setFormData]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    e.preventDefault();
    if (/^\d*$/.test(value)) {
      setFormData({ ...formData, [name]: value });
    } else {
      SweetAlert({
        title: "Error",
        text: `'Sample value can't be in decimal'`,
        icon: "error",
      });
    }
  };

  return (
    <div className="">
      <Label labelName={"Cost Per Interview"} className={"pt-4 pb-2"} />
      <div className="flex w-full">
        <div className="w-full inline-block">
          {!isMultipleSample ? (
            <Input
              name={"cpi"}
              type={"number"}
              onchange={handleInputChange}
              className={"p-2 border bg-[#f3eded] w-full mt-2 rounded-md"}
              min={0}
              value={formData?.cpi || ""}
            />
          ) : (
            <Input
              name={"cpi"}
              type={"number"}
              onchange={handleInputChange}
              className={"p-2 border bg-[#f3eded] w-full mt-2 rounded-md"}
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
