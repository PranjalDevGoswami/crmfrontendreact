import React from "react";
// import Button from "../../Button.js";

const View = ({ viewRecord, closeView, setisView }) => {
  console.log("viewwwwww",viewRecord);
  // const HandleCloseProjectDetails = () => {
  //   setisView(false);
  // };
  return (
    <div className="w-full bg-white  p-4 pl-8 pr-8 rounded-sm border border-black drop-shadow-lg shadow-2xl shadow-slate-400">
     <h3 className="text-3xl p-4 underline pl-0">Project View</h3>
      <ul className="flex flex-col text-left border">
        <li className="border p-1 flex items-center text-xl bg-white justify-between odd:bg-gray-100">
          <span className="text-xl mr-8 w-5/12">Project Code</span>
          <span className="w-2/12">:</span>
          <span className="w-5/12">{viewRecord?.project_code}</span>
        </li>
        <li className="border p-1 flex items-center text-xl bg-white justify-between ">
          <span className="text-xl mr-8 w-5/12">Project name</span>
          <span className="w-2/12">:</span>
          <span className="w-5/12">{viewRecord?.name}</span>
        </li>
        <li className="border p-1 flex items-center text-xl bg-white justify-between odd:bg-gray-100">
          <span className="text-xl mr-8 w-5/12">Cost Per Interview </span>
          <span className="w-2/12">:</span>
          <span className="w-5/12">{viewRecord?.cpi}</span>
        </li>
        <li className="border p-1 flex items-center text-xl bg-white justify-between">
          <span className="text-xl mr-8 w-5/12">Clients </span>
          <span className="w-2/12">:</span>
          <span className="w-5/12">{viewRecord?.clients}</span>
        </li>
        <li className="border p-1 flex items-center text-xl bg-white justify-between odd:bg-gray-100">
          <span className="text-xl mr-8 w-5/12">Project type </span>
          <span className="w-2/12">:</span>
          <span className="w-5/12">{viewRecord?.project_type}</span>
        </li>
        <li className="border p-1 flex items-center text-xl bg-white justify-between">
          <span className="text-xl mr-8 w-5/12">Other Cost </span>
          <span className="w-2/12">:</span>
          <span className="w-5/12">{viewRecord?.other_cost}</span>
        </li>
        <li className="border p-1 flex items-center text-xl bg-white justify-between odd:bg-gray-100">
          <span className="text-xl mr-8 w-5/12">Set Up Fee </span>
          <span className="w-2/12">:</span>
          <span className="w-5/12">{viewRecord?.set_up_fee}</span>
        </li>
        <li className="border p-1 flex items-center text-xl bg-white justify-between">
          <span className="text-xl mr-8 w-5/12">Tentative Start Date</span>
          <span className="w-2/12">:</span>
          <span className="w-5/12">
            {viewRecord?.tentative_start_date?.split("T")[0]}
          </span>
        </li>
        <li className="border p-1 flex items-center text-xl bg-white justify-between odd:bg-gray-100">
          <span className="text-xl mr-8 w-5/12">Tentative End Date </span>
          <span className="w-2/12">:</span>
          <span className="w-5/12">
            {viewRecord?.tentative_end_date?.split("T")[0]}
          </span>
        </li>
        <li className="border p-1 flex items-center text-xl bg-white justify-between">
          <span className="text-xl mr-8 w-5/12">Project Manager </span>
          <span className="w-2/12">:</span>
          <span className="w-5/12">{viewRecord?.project_manager}</span>
        </li>
        <li className="border p-1 flex items-center text-xl bg-white justify-between odd:bg-gray-100">
          <span className="text-xl mr-8 w-5/12">Sample </span>
          <span className="w-2/12">:</span>
          <span className="w-5/12">{viewRecord?.sample}</span>
        </li>
        <li className="border p-1 flex items-center text-xl bg-white justify-between">
          <span className="text-xl mr-8 w-5/12">Other Cost </span>
          <span className="w-2/12">:</span>
          <span className="w-5/12">{viewRecord?.other_cost}</span>
        </li>
        <li className="border p-1 flex items-center text-xl bg-white justify-between odd:bg-gray-100">
          <span className="text-xl mr-8 w-5/12">Operation Team</span>
          <span className="w-2/12">:</span>
          <span className="w-5/12">{viewRecord?.operation_team}</span>
        </li>
        <li className="border p-1 flex items-center text-xl bg-white justify-between">
          <span className="text-xl mr-8 w-5/12">Finance Team </span>
          <span className="w-2/12">:</span>
          <span className="w-5/12">{viewRecord?.finance_team}</span>
        </li>
        <li className="border p-1 flex items-center text-xl bg-white justify-between odd:bg-gray-100 relative">
          <span className="text-xl mr-8 w-5/12">Total Man Days</span>
          <span className="w-2/12">:</span>
          <span className="w-5/12">{viewRecord?.man_days}</span>
          {/* <span className="absolute top-0 right-0 bg-green-200 p-2"><button>Show Man Days</button></span> */}
        </li>
        <li className="border p-1 flex items-center text-xl bg-white justify-between">
          <span className="text-xl mr-8 w-5/12">Achiev Target </span>
          <span className="w-2/12">:</span>
          <span className="w-5/12">{viewRecord?.total_achievement}</span>
        </li>
        <li className="border p-1 flex items-center text-xl bg-white justify-between odd:bg-gray-100">
          <span className="text-xl mr-8 w-5/12">Status</span>
          <span className="w-2/12">:</span>
          <span className="w-5/12">{viewRecord?.status}</span>
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
