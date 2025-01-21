// StatusFilter.jsx
import React from "react";
import Dropdown from "../../components/DropDown";

const StatusFilter = ({ selectedStatus, setSelectedStatus }) => {
  return (
    <Dropdown
      Option_Name={["--Select Status--", "Status1", "Status2", "Status3"]} // Replace with actual status options
      onChange={(e) => setSelectedStatus(e.target.value)}
      name="Status"
      className="p-2 m-1 border border-black rounded lg:w-full w-11/12"
      id={"status List"}
    />
  );
};

export default StatusFilter;
