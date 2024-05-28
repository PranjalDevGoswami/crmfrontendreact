import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
// import Button from "../../Button.js";
import { ManWorkPerDays } from "../../fetchApis/projects/perDayManWork/GetDaysManWork";
import ManDaysDetails from "./ManDaysDetails";
import { FaLongArrowAltLeft } from "react-icons/fa";

const View = ({ viewRecord, closeView, setisView }) => {
  const [isManDaysDetails, SetIsManDaysDetails] = useState(false);
  const [perDayDetailsData, setPerDayDetailsData] = useState([]);
  const location = useLocation();
  const data = location.state;
  console.log("🚀 ~ View ~ data:", data);

  const navigate = useNavigate();

  const handleViewDetails = async (data) => {
    const project_details = {
      project_code: data,
    };
    const response = await ManWorkPerDays(project_details);
    if (response?.status == true) {
      SetIsManDaysDetails(true);
      setPerDayDetailsData(response?.data);
    } else {
      alert("data not found!!");
    }
  };
  const HandleCloseManDaysDetails = (e) => {
    e.preventDefault();
    SetIsManDaysDetails(false);
  };
  return (
    <div className="w-full bg-white p-8  mt-16">
      <div className="flex items-center justify-between">
        <h3 className="text-3xl p-4 underline pl-0 mb-4">Project View</h3>
        <button
          className="bg-gray-300 p-4 pt-2 pb-2 "
          onClick={() => navigate(-1)}
        >
          <FaLongArrowAltLeft className="text-3xl" />
        </button>
      </div>
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
          <span className="text-xl mr-8 w-5/12">Project Teamlead </span>
          <span className="w-2/12">:</span>
          <span className="w-5/12">{data?.teamlead}</span>
        </li>
        <li className="border p-1 flex items-center text-xl bg-gray-100 justify-between w-1/2">
          <span className="text-xl mr-8 w-5/12">Other Cost </span>
          <span className="w-2/12">:</span>
          <span className="w-5/12">{data?.other_cost}</span>
        </li>
        <li className="border p-1 flex items-center text-xl bg-white justify-between w-1/2">
          <span className="text-xl mr-8 w-5/12">Operation Team</span>
          <span className="w-2/12">:</span>
          <span className="w-5/12">{data?.operation_team}</span>
        </li>
        <li className="border p-1 flex items-center text-xl bg-white justify-between w-1/2">
          <span className="text-xl mr-8 w-5/12">Finance Team </span>
          <span className="w-2/12">:</span>
          <span className="w-5/12">{data?.finance_team}</span>
        </li>
        <li className="border p-1 flex items-center text-xl bg-gray-100 justify-between w-1/2 relative">
          <span className="text-xl mr-8 w-5/12">Total Man Days</span>
          <span className="w-2/12">:</span>
          <span className="w-5/12">{data?.man_days}</span>
          <span className="absolute top-1 right-1 cursor-pointer underline text-blue-700">
            <span onClick={() => handleViewDetails(data?.project_code)}>
              Show Details
            </span>
          </span>
        </li>
        <li className="border p-1 flex items-center text-xl bg-gray-100 justify-between w-1/2">
          <span className="text-xl mr-8 w-5/12">Achiev Target </span>
          <span className="w-2/12">:</span>
          <span className="w-5/12">{data?.total_achievement}</span>
        </li>
        <li className="border p-1 flex items-center text-xl bg-white justify-between w-1/2">
          <span className="text-xl mr-8 w-5/12">Status</span>
          <span className="w-2/12">:</span>
          <span className="w-5/12">{data?.status}</span>
        </li>
        <li className="border p-1 flex items-center text-xl justify-between w-1/2">
          <span className="text-xl mr-8 w-5/12">Sow</span>
          <span className="w-2/12">:</span>
          <span className="w-5/12">{data?.sow}</span>
        </li>
      </ul>
      {/* <Button
        onClick={HandleCloseProjectDetails}
        className={"p-2 bg-red-300 rounded absolute top-4 right-4"}
        name={"X"}
      /> */}
      {isManDaysDetails ? (
        <div className="absolute top-1/2 left-1/2 bg-gray-300 border mt-16 pl-2 pr-2 w-6/12 h-auto min-h-48 translate-x-[-50%] translate-y-[-50%]">
          <h3 className="text-xl mt-4 pl-2">
            Day wise Detail View of achieving Target and Men-days utilization
            for Targeted Sample Size:
            <span className="font-bold">{' "' + data.sample + '" '}</span>
          </h3>
          <ManDaysDetails perDayDetailsData={perDayDetailsData} />
          <div className="absolute top-0 right-0 p-0 m-0 rounded  w-8 h-8 flex items-center justify-center text-xl">
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
