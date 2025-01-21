import React, {useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addMultipleSample } from "../../../utils/slices/MultipleSampleCpiRecordsSlice";
import Tooltip from "../Tooltip";
import { toggleMultipleSampleCpi } from "../../../utils/slices/AddMutipleSampleCpiSlice";

const MultipleSampleCpiRecord = () => {
  const dispatch = useDispatch();
  const dispatchCheckbox = useDispatch();
  const MultipleSampleRecord = useSelector(
    (store) => store.MultiSampleCpiRecord.sampleCpiRecord
  );

  const [editableIndex, setEditableIndex] = useState(null);
  const [tempData, setTempData] = useState({});

  const handleEditClick = (e, index) => {
    e.preventDefault();
    setEditableIndex(index);
    setTempData(MultipleSampleRecord[index]);
  };

  const handleSaveClick = (e, index) => {
    e.preventDefault();
    const updatedSamples = [...MultipleSampleRecord];
    updatedSamples[index] = { ...updatedSamples[index], ...tempData };
    dispatch(addMultipleSample(updatedSamples));
    setEditableIndex(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTempData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddRow = (e) => {
    e.preventDefault();
    dispatchCheckbox(toggleMultipleSampleCpi(true));
  };

  return (
    <div className="overflow-x-auto p-4">
      {MultipleSampleRecord.length > 0 && (
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 border border-gray-200 text-left">
                S.N
              </th>
              <th className="py-3 px-6 border border-gray-200 text-left">
                Target Group
              </th>
              <th className="py-3 px-6 border border-gray-200 text-left">
                Sample
              </th>
              <th className="py-3 px-6 border border-gray-200 text-left">
                CPI
              </th>
              <th className="py-3 px-6 border border-gray-200 text-left">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light relative">
            {MultipleSampleRecord.map((item, index) => (
              <tr
                key={index}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6 border border-gray-200">
                  {index + 1}
                </td>
                <td className="py-3 px-6 border border-gray-200">
                  {editableIndex === index ? (
                    <input
                      type="text"
                      name="target_group"
                      value={tempData.target_group || ""}
                      onChange={handleInputChange}
                      className="border p-1"
                    />
                  ) : (
                    item.target_group
                  )}
                </td>
                <td className="py-3 px-6 border border-gray-200">
                  {editableIndex === index ? (
                    <input
                      type="number"
                      name="sample"
                      value={tempData.sample || ""}
                      onChange={handleInputChange}
                      className="border p-1"
                    />
                  ) : (
                    item.sample
                  )}
                </td>
                <td className="py-3 px-6 border border-gray-200">
                  {editableIndex === index ? (
                    <input
                      type="number"
                      name="cpi"
                      value={tempData.cpi || ""}
                      onChange={handleInputChange}
                      className="border p-1"
                    />
                  ) : (
                    item.cpi
                  )}
                </td>
                <td className="py-3 px-6 border border-gray-200">
                  {editableIndex === index ? (
                    <button
                      onClick={(e) => handleSaveClick(e, index)}
                      className="bg-blue-500 text-white px-2 py-1 rounded"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={(e) => handleEditClick(e, index)}
                      className="bg-yellow-500 text-white px-2 py-1 rounded"
                    >
                      Edit
                    </button>
                  )}
                </td>
              </tr>
            ))}
            <tr className="border-none">
              <td colSpan={5} className="relative border-none">
                <div className="relative flex justify-end text-right cursor-pointer">
                  <Tooltip text={"Add More Sample/CPI"} position="left">
                    <button
                      onClick={handleAddRow}
                      className="bg-green-500 text-white rounded-sm p-3 flex justify-center items-center h-3"
                    >
                      +
                    </button>
                  </Tooltip>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MultipleSampleCpiRecord;
