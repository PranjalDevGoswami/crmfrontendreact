// HodDropdown.jsx
import React from "react";
import Dropdown from "../../components/DropDown";

const HodDropdown = ({ hodListArray, handleFilterOption }) => {
  return (
    <Dropdown
      Option_Name={["--Select HOD--", ...hodListArray.map((item) => item.name)]}
      onChange={handleFilterOption}
      name="HOD"
      className="p-2 m-1 border border-black rounded lg:w-full w-11/12"
      id={"hod List"}
    />
  );
};

export default HodDropdown;
