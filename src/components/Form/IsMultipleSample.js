import React, { useContext } from "react";
import Label from "../../Atom/Label";
import { useDispatch,useSelector } from "react-redux";
import {
  checkedMultipleSampleCpi,
  toggleMultipleSampleCpi,
} from "../../../utils/slices/AddMutipleSampleCpiSlice";
import {
  addMultipleSample,
  removeMultipleSample,
} from "../../../utils/slices/MultipleSampleCpiRecordsSlice";
import { FormDataContext } from "../../ContextApi/FormDataContext";

const IsMultipleSample = () => {
  const { formData, setFormData } = useContext(FormDataContext);

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
      // dispatchMultipleSample(addMultipleSample([]));
      dispatchMultipleSample(removeMultipleSample());

      dispatchMultipleSample(toggleMultipleSampleCpi(false));
      setFormData({
        ...formData,
        cpi: "",
        project_samples: [],
        is_multiple_sample_cpi: null,
      });
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
