import React, { useContext, useState } from "react";
import Button from "../../Atom/Button";
import LableAndInput from "../../Molecules/LableAndInput";
import {
  checkedMultipleSampleCpi,
  toggleMultipleSampleCpi,
} from "../../../utils/slices/AddMutipleSampleCpiSlice";
import { useDispatch } from "react-redux";
import { FormDataContext } from "../../ContextApi/FormDataContext";
import { addMultipleSample } from "../../../utils/slices/MultipleSampleCpiRecordsSlice";
import { useSelector } from "react-redux";
import SweetAlert from "../SweetAlert";

const AddMultipleSample = () => {
  const dispatchIsMultipleSample = useDispatch();

  const dispatchIsMultipleSampleCheckbox = useDispatch();
  const dispatchIsMultipleSampleCheckboxRecord = useDispatch();

  const { formData, setFormData } = useContext(FormDataContext);
  const dispatchRecord = useDispatch();

  const MultiSampleCpiRecord = useSelector(
    (store) => store.MultiSampleCpiRecord.sampleCpiRecord
  );

  const isMultipleSelected = useSelector(
    (store) => store.addMultipleSampleCpi.isMultipleSampleCheckbox
  );

  const handleCross = () => {
    dispatchIsMultipleSampleCheckbox(toggleMultipleSampleCpi(false));
    MultiSampleCpiRecord.length > 1
      ? dispatchIsMultipleSampleCheckboxRecord(checkedMultipleSampleCpi(true))
      : dispatchIsMultipleSampleCheckboxRecord(checkedMultipleSampleCpi(false));
  };

  const initialInputData =
    MultiSampleCpiRecord.length > 0
      ? MultiSampleCpiRecord.map((record) => [
          { field: "TG", type: "text", value: record.target_group },
          { field: "Sample", type: "number", value: record.sample },
          { field: "CPI", type: "number", value: record.cpi },
        ]).flat()
      : [
          { field: "TG", type: "text", value: "" },
          { field: "Sample", type: "number", value: "" },
          { field: "CPI", type: "number", value: "" },
        ];

  const [inputData, setInputData] = useState(initialInputData);

  const HandleAddMore = (e) => {
    e.preventDefault();
    setInputData((prevData) => [
      ...prevData,
      { field: "TG", type: "text", value: "" },
      { field: "Sample", type: "number", value: "" },
      { field: "CPI", type: "number", value: "" },
    ]);
  };

  const HandleRemoveRow = (e, rowIndex) => {
    e.preventDefault();
    const newData = inputData.filter(
      (_, index) => Math.floor(index / 3) !== rowIndex
    );
    setInputData(newData);
  };

  const handleInputChange = (e, index) => {
    const newInputData = [...inputData];
    newInputData[index].value = e.target.value;
    setInputData(newInputData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const rowData = [];
    for (let i = 0; i < inputData.length; i += 3) {
      const row = {
        target_group: inputData[i].value || null,
        sample: inputData[i + 1].value,
        cpi: inputData[i + 2].value,
      };
      if (row.sample && row.cpi) {
        rowData.push(row);
      }
    }
    if (rowData.length < 2) {
      SweetAlert({
        title: "Warning",
        text: "Please fill at least two valid records.",
        icon: "warning",
      });
      return;
    }
    dispatchRecord(addMultipleSample(rowData));
    setFormData({
      ...formData,
      project_samples: rowData,
      is_multiple_sample_cpi:
        isMultipleSelected.toString().charAt(0).toUpperCase() +
        isMultipleSelected.toString().slice(1),
    });
    dispatchIsMultipleSample(toggleMultipleSampleCpi(false));
  };

  return (
    <div className="p-4">
      <h2 className="p-2 pl-0 mb-2 underline text-xl text-left">
        Add Multiple Sample and Cpi
      </h2>
      {Array.from(
        { length: Math.ceil(inputData.length / 3) },
        (_, rowIndex) => (
          <div key={rowIndex} className="flex items-center mb-2">
            <div className="flex w-9/12">
              {inputData
                .slice(rowIndex * 3, rowIndex * 3 + 3)
                .map((item, index) => (
                  <div key={index} className="w-1/3 pr-2">
                    <LableAndInput
                      labelName={item.field}
                      InputName={item.field}
                      InputType={item.type}
                      inputClassName={"p-1 px-4 border bg-[#f3eded] w-full rounded-md"}
                      labelClassName={"pb-2 text-left"}
                      inputChange={(e) =>
                        handleInputChange(e, rowIndex * 3 + index)
                      }
                      Inputvalue={item.value}
                    />
                  </div>
                ))}
            </div>
            {Math.ceil(inputData.length / 3) > 1 && (
              <Button
                name={"Remove"}
                onClick={(e) => HandleRemoveRow(e, rowIndex)}
                className={
                  "bg-red-400 text-white p-2 border text-xs mt-[30px] w-auto rounded-md mr-2 hover:bg-red-500"
                }
              />
            )}
            {rowIndex === Math.ceil(inputData.length / 3) - 1 && (
              <div className="w-auto">
                <Button
                  name={"Add More"}
                  onClick={HandleAddMore}
                  className={
                    "bg-green-400 text-white p-2 border w-auto text-xs mt-[30px] rounded-md hover:bg-green-500"
                  }
                />
              </div>
            )}
          </div>
        )
      )}
      <Button
        name={"Submit"}
        onClick={handleSubmit}
        className={"bg-green-400 p-2 text-white mt-4 cursor-pointer rounded-md hover:bg-green-500"}
      />
      <button
        onClick={handleCross}
        className="absolute top-2 right-2 p-2 bg-red-400 hover:bg-red-500 text-white text-md rounded-md cursor-pointer"
      >
        X
      </button>
    </div>
  );
};

export default AddMultipleSample;
