import React, { useState } from "react";
import { useLocation } from "react-router-dom";
// import Button from "../../Button.js";
import { ManWorkPerDays } from "../../fetchApis/projects/perDayManWork/GetDaysManWork";
import ManDaysDetails from "./ManDaysDetails";

const View = ({ viewRecord, closeView, setisView }) => {
  const [isManDaysDetails, SetIsManDaysDetails] = useState(false);
  const [perDayDetailsData, setPerDayDetailsData] = useState([]);
  const location = useLocation();
  const data = location.state;

  const handleViewDetails = async (data) => {
    const project_details = {
      project_code: data,
    };
    const perDayDetails = await ManWorkPerDays(project_details);
    console.log("perDayDetails", perDayDetails);
    SetIsManDaysDetails(true);
    setPerDayDetailsData(perDayDetails);
  };
  const HandleCloseManDaysDetails = (e) => {
    e.preventDefault();
    SetIsManDaysDetails(false);
  };
  return (
    <div className="w-full bg-white p-8  mt-16">
      <h3 className="text-3xl p-4 underline pl-0 mb-4">Project View</h3>
      <ul className="flex flex-wrap text-left border w-full justify-between rounded-sm ">
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
          <span className="absolute top-0 right-0 bg-green-200 p-1 border border-black rounded-sm">
            <button onClick={() => handleViewDetails(data?.project_code)}>
              Show More
            </button>
          </span>
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
      {isManDaysDetails ? (
        <div className="absolute top-1/2 left-1/2 bg-white border pt-16 pl-2 pr-2 w-4/12 h-auto translate-x-[-50%] translate-y-[-50%]">
          <ManDaysDetails perDayDetailsData={perDayDetailsData} />
          <div className="absolute top-0 right-0 p-2 m-2 rounded bg-red-300 w-8 h-8 flex items-center justify-center text-xl">
            <button onClick={HandleCloseManDaysDetails}>X</button>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default View;
