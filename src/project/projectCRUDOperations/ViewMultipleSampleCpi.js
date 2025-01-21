import React from "react";
import { useDispatch } from "react-redux";
import { toggleViewMultipleCpiSample } from "../../../utils/slices/MultipleSampleCpiRecordsSlice";

const ViewMultipleSampleCpi = ({ viewRecord }) => {
  const dispatch = useDispatch();

  const handleCloseCpiView = () => {
    dispatch(toggleViewMultipleCpiSample(false));
  };
  const projectSample = viewRecord?.map((item) => item?.project_samples || viewRecord?.map((item)=>item?.pending_changes));
  return (
    <div className="relative p-4">
       <h2 className="p-2 m-2 text-xl font-bold">Multiple Sample Cpi Details</h2>
      <table className="min-w-full bg-white ">
        <thead className="bg-[#bd1d1d] text-white">
          <tr>
            <th className="py-3 px-6 text-left">Target Group</th>
            <th className="py-3 px-6 text-left">Sample</th>
            <th className="py-3 px-6 text-left">CPI</th>
          </tr>
        </thead>
        <tbody>
          {projectSample[0]?.map((item, index) => (
            <tr
              key={index}
              className="border-b hover:bg-gray-100 transition duration-200 ease-in-out"
            >
              <td className="py-3 px-6 text-left">
                {item?.target_group || "N/A"}
              </td>
              <td className="py-3 px-6 text-left">{item?.sample}</td>
              <td className="py-3 px-6 text-left">{item?.cpi}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div
        className="cursor-pointer absolute -top-[15px] -right-[15px] p-1 bg-red-500 text-white rounded-md hover:bg-red-700 transition duration-150 text-sm"
        onClick={handleCloseCpiView}
      >
        X
      </div>
    </div>
  );
};

export default ViewMultipleSampleCpi;
