import React, { useContext, useEffect } from "react";
import LableAndInput from "../../Molecules/LableAndInput";
import { FormDataContext } from "../../ContextApi/FormDataContext";
import SweetAlert from "../SweetAlert";
import { useSelector } from "react-redux";

const SampleSize = () => {
  const { formData, setFormData } = useContext(FormDataContext);

  const isMultipleSample = useSelector(
    (store) => store.addMultipleSampleCpi.isMultipleSampleCheckbox
  );
  const isMultipleSampleRecord = useSelector(
    (store) => store.MultiSampleCpiRecord.sampleCpiRecord
  );

  const totalSample = isMultipleSampleRecord.reduce((acc, item) => {
    return acc + Number(item.sample);
  }, 0);

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      sample: totalSample || 0,
    }));
  }, [totalSample]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (/^\d*$/.test(value)) {
      setFormData((prevData) => ({
        ...prevData,
        sample: value,
      }));
    } else {
      SweetAlert({
        title: "Error",
        text: `'Sample value can't be in decimal'`,
        icon: "error",
      });
    }
  };

  return (
    <div>
      {!isMultipleSample ? (
        <LableAndInput
          labelName="Sample"
          InputName="sample"
          InputType="number"
          inputChange={handleInputChange}
          inputClassName="p-2 border bg-white mt-2 rounded-md"
          labelClassName="pb-2"
          min={0}
          Inputvalue={formData?.sample || ""}
        />
      ) : (
        <LableAndInput
          labelName="Sample"
          InputName="sample"
          InputType="number"
          inputChange={handleInputChange}
          inputClassName="p-2 border bg-white mt-2 rounded-md"
          labelClassName="pb-2"
          min={0}
          disabled
          Inputvalue={formData?.sample || 0}
        />
      )}
    </div>
  );
};

export default SampleSize;
