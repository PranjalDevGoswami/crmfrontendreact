import React, { useState } from "react";
import LableAndInput from "../../../Molecules/LableAndInput";

const ProjectSamplesTable = ({ projectSamples, onClose }) => {
  const [updatedSamples, setUpdatedSamples] = useState(projectSamples);

  const handleInputChange = (e, id) => {    
    const { name, value } = e.target;
    setUpdatedSamples((prevSamples) =>
      prevSamples.map((sample) =>
        sample.id === id ? { ...sample, [name]: value } : sample
      )
    );
  };

  const handleSubmit = () => {
    onClose(updatedSamples);
  };

  // Handle Cancel
  const handleCancel = () => {
    onClose(null);
  };

  return (
    <div className="p-0 w-full">
  <h3 className="text-xl font-bold pb-4">Multiple Sample CPI Details</h3>
  <div className="w-full border border-gray-200 mb-4">
    {/* Header */}
    <div className="flex bg-gray-100 border-b border-gray-300">
      <div className="w-1/12 p-2 text-center font-semibold">S.No</div>
      <div className="w-3/12 p-2 text-center font-semibold">Revised Target (Sample)</div>
      <div className="w-2/12 p-2 text-center font-semibold">CPI</div>
      <div className="w-3/12 p-2 text-center font-semibold">Target Group</div>
      <div className="w-3/12 p-2 text-center font-semibold">Remark</div>
    </div>
    {/* Body */}
    {updatedSamples.map((item, index) => (
      <div key={item.id} className="flex border-b border-gray-300 hover:bg-gray-50">
        <div className="w-1/12 p-2 text-center">{index + 1}</div>
        <div className="w-3/12 p-2">
          <LableAndInput
            labelName="Revised Target Required (Sample)"
            InputType="number"
            InputName="sample"
            inputClassName="p-2 border w-full rounded-md"
            labelClassName="hidden"
            Inputvalue={item.sample}
            inputChange={(e) => handleInputChange(e, item.id)}
          />
        </div>
        <div className="w-2/12 p-2">
          <LableAndInput
            labelName="CPI"
            InputType="number"
            InputName="cpi"
            inputClassName="p-2 border w-full rounded-md"
            labelClassName="hidden"
            Inputvalue={item.cpi}
            inputChange={(e) => handleInputChange(e, item.id)}
          />
        </div>
        <div className="w-3/12 p-2">
          <LableAndInput
            labelName="Target Group"
            InputType="text"
            InputName="target_group"
            inputClassName="p-2 border w-full rounded-md"
            labelClassName="hidden"
            Inputvalue={item.target_group}
            inputChange={(e) => handleInputChange(e, item.id)}
          />
        </div>
        <div className="w-3/12 p-2">
          <LableAndInput
            labelName="Remark"
            InputType="text"
            InputName="remark"
            inputClassName="p-2 border w-full rounded-md"
            labelClassName="hidden"
            Inputvalue={item.remark}
            inputChange={(e) => handleInputChange(e, item.id)}
          />
        </div>
      </div>
    ))}
  </div>
  <div className="flex justify-end space-x-4">
    <button
      className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
      onClick={handleCancel}
    >
      Cancel
    </button>
    <button
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      onClick={handleSubmit}
    >
      Submit
    </button>
  </div>
</div>

  );
};

export default ProjectSamplesTable;
