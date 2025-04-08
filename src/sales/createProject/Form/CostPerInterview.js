import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addFormData } from "../../../../utils/slices/projectEntryFormSlice";
import Label from "../../../Atom/Label";
import Input from "../../../Atom/InputField";

const CostPerInterview = () => {
  const dispatch = useDispatch();
  const formData = useSelector((store) => store.projectEntryForm.form);
  const isMultipleSample = useSelector(
    (store) => store.addMultipleSampleCpi.isMultipleSampleCheckbox
  );
  const [errorMsg, setErrorMsg] = useState();

  useEffect(() => {
    if (isMultipleSample) {
      dispatch(addFormData({ cpi: 0 }));
    }
  }, [isMultipleSample, formData.cpi]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(addFormData({ [name]: value }));
    if (value === "") {
      setErrorMsg();
      return;
    }
    if (!isMultipleSample && value === "0") {
      setErrorMsg("0 is not allowed in cpi");
      return;
    }
    if (!/^\d*$/.test(value)) {
      setErrorMsg("Sample value can't be in decimal");
      return;
    }
    setErrorMsg();
  };

  return (
    <div className="">
      <Label labelName={"Cost Per Interview"} className={"pt-4 pb-2"} />
      <div className="flex w-full">
        <div className="w-full inline-block">
          <Input
            name={"cpi"}
            type={"number"}
            onChange={handleInputChange}
            className={"p-2 border bg-[#f3eded] w-full mt-2 rounded-md"}
            min={0}
            // value={!isMultipleSample ? formData?.cpi || "" : 0}
            value={!isMultipleSample ? formData?.cpi ?? "" : 0}
          />
          {errorMsg && <p className="text-red-500 text-xs p-1">{errorMsg}</p>}
        </div>
      </div>
    </div>
  );
};

export default CostPerInterview;
