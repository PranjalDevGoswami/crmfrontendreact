import React from "react";
import LableAndInput from "../../Molecules/LableAndInput";

const RaiseCbrMultipleSampleCpi = ({
  sampleData,
  handlePopupCancel,
  handlePopupSubmit,
  handleSampleChange,
}) => {
  return (
    <div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full bg-gray-900 bg-opacity-50">
        <div className="bg-white p-6 rounded-md  border shadow-md w-full">
          <h3 className="text-lg font-bold mb-4">Add Sample Details</h3>
          {sampleData?.samples.map((sample, index) => (
            <div key={sample.id} className="mb-3 flex items-start space-x-4">
              <LableAndInput
                labelClassName={"text-left"}
                labelName={"Final Sample"}
                inputValue={sample.sample}
                inputChange={(e) =>
                  handleSampleChange(index, "sample", e.target.value)
                }
                inputClassName={"p-2 border w-full rounded-md"}
              />
              <LableAndInput
                labelClassName={"text-left"}
                labelName={"CPI"}
                inputValue={sample.cpi}
                inputChange={(e) =>
                  handleSampleChange(index, "cpi", e.target.value)
                }
                disabled
                inputClassName={
                  "p-2 border w-full rounded-md cursor-not-allowed"
                }
              />
              <LableAndInput
                labelClassName={"text-left"}
                labelName={"Target Group"}
                inputValue={sample.target_group}
                inputChange={(e) =>
                  handleSampleChange(index, "target_group", e.target.value)
                }
                inputClassName={"p-2 border w-full rounded-md"}
              />
            </div>
          ))}

          <button
            onClick={handlePopupSubmit}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Submit
          </button>
          <button
            onClick={handlePopupCancel}
            className="px-4 py-2 ml-4 bg-red-500 text-white rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default RaiseCbrMultipleSampleCpi;
