import React from "react";
import { useLocation } from "react-router-dom";
// import Button from "../../Button.js";

const View = ({ viewRecord, closeView, setisView }) => {
  const location = useLocation();
  const data = location.state

  const handleViewDetails = () =>{
    
  }
  return (
    <div className="w-full bg-white  p-4 pl-8 pr-8 rounded-sm border border-black drop-shadow-lg shadow-2xl shadow-slate-400">
     <h3 className="text-3xl p-4 underline pl-0">Project View</h3>
      <ul className="flex flex-wrap text-left border w-full justify-between">
        <li className="border p-1 flex items-center text-xl bg-white justify-between w-1/2 odd:bg-gray-100">
          <span className="text-xl mr-8 w-5/12">Project Code</span>
          <span className="w-2/12">:</span>
          <span className="w-5/12">{data?.project_code}</span>
        </li>
        <li className="border p-1 flex items-center text-xl bg-white justify-between w-1/2 ">
          <span className="text-xl mr-8 w-5/12">Project name</span>
          <span className="w-2/12">:</span>
          <span className="w-5/12">{data?.name}</span>
        </li>
        <li className="border p-1 flex items-center text-xl bg-white justify-between w-1/2">
          <span className="text-xl mr-8 w-5/12">Cost Per Interview </span>
          <span className="w-2/12">:</span>
          <span className="w-5/12">{data?.cpi}</span>
        </li>
        <li className="border p-1 flex items-center text-xl justify-between w-1/2 bg-gray-100">
          <span className="text-xl mr-8 w-5/12">Clients </span>
          <span className="w-2/12">:</span>
          <span className="w-5/12">{data?.clients}</span>
        </li>
        <li className="border p-1 flex items-center text-xl  justify-between w-1/2 bg-gray-100">
          <span className="text-xl mr-8 w-5/12">Project type </span>
          <span className="w-2/12">:</span>
          <span className="w-5/12">{data?.project_type}</span>
        </li>
        <li className="border p-1 flex items-center text-xl bg-white justify-between w-1/2">
          <span className="text-xl mr-8 w-5/12">Other Cost </span>
          <span className="w-2/12">:</span>
          <span className="w-5/12">{data?.other_cost}</span>
        </li>
        <li className="border p-1 flex items-center text-xl justify-between w-1/2 bg-white">
          <span className="text-xl mr-8 w-5/12">Set Up Fee </span>
          <span className="w-2/12">:</span>
          <span className="w-5/12">{data?.set_up_fee}</span>
        </li>
        <li className="border p-1 flex items-center text-xl bg-gray-100 justify-between w-1/2">
          <span className="text-xl mr-8 w-5/12">Tentative Start Date</span>
          <span className="w-2/12">:</span>
          <span className="w-5/12">
            {data?.tentative_start_date?.split("T")[0]}
          </span>
        </li>
        <li className="border p-1 flex items-center text-xl bg-gray-100 justify-between w-1/2">
          <span className="text-xl mr-8 w-5/12">Tentative End Date </span>
          <span className="w-2/12">:</span>
          <span className="w-5/12">
            {data?.tentative_end_date?.split("T")[0]}
          </span>
        </li>
        <li className="border p-1 flex items-center text-xl bg-white justify-between w-1/2">
          <span className="text-xl mr-8 w-5/12">Project Manager </span>
          <span className="w-2/12">:</span>
          <span className="w-5/12">{data?.project_manager}</span>
        </li>
        <li className="border p-1 flex items-center text-xl bg-white justify-between w-1/2">
          <span className="text-xl mr-8 w-5/12">Sample </span>
          <span className="w-2/12">:</span>
          <span className="w-5/12">{data?.sample}</span>
        </li>
        <li className="border p-1 flex items-center text-xl bg-gray-100 justify-between w-1/2">
          <span className="text-xl mr-8 w-5/12">Other Cost </span>
          <span className="w-2/12">:</span>
          <span className="w-5/12">{data?.other_cost}</span>
        </li>
        <li className="border p-1 flex items-center text-xl bg-gray-100 justify-between w-1/2">
          <span className="text-xl mr-8 w-5/12">Operation Team</span>
          <span className="w-2/12">:</span>
          <span className="w-5/12">{data?.operation_team}</span>
        </li>
        <li className="border p-1 flex items-center text-xl bg-white justify-between w-1/2">
          <span className="text-xl mr-8 w-5/12">Finance Team </span>
          <span className="w-2/12">:</span>
          <span className="w-5/12">{data?.finance_team}</span>
        </li>
        <li className="border p-1 flex items-center text-xl bg-white justify-between w-1/2 relative">
          <span className="text-xl mr-8 w-5/12">Total Man Days</span>
          <span className="w-2/12">:</span>
          <span className="w-5/12">{data?.man_days}</span>
          <span className="absolute top-0 right-0 bg-green-200 p-1 border border-black rounded-sm"><button onClick={handleViewDetails}>Show Details</button></span>
        </li>
        <li className="border p-1 flex items-center text-xl bg-gray-100 justify-between w-1/2">
          <span className="text-xl mr-8 w-5/12">Achiev Target </span>
          <span className="w-2/12">:</span>
          <span className="w-5/12">{data?.total_achievement}</span>
        </li>
        <li className="border p-1 flex items-center text-xl bg-gray-100 justify-between w-1/2">
          <span className="text-xl mr-8 w-5/12">Status</span>
          <span className="w-2/12">:</span>
          <span className="w-5/12">{data?.status}</span>
        </li>
      </ul>
      {/* <Button
        onClick={HandleCloseProjectDetails}
        className={"p-2 bg-red-300 rounded absolute top-4 right-4"}
        name={"X"}
      /> */}
    </div>
  );
};

export default View;
