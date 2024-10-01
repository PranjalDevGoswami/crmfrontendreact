// TeamLeadDropdown.jsx
import React from "react";
import Dropdown from "../../components/DropDown";

const TeamLeadDropdown = ({ tlListArray, handleFilterOption }) => {
  return (
    <Dropdown
      Option_Name={[
        "--Select TeamLead--",
        ...tlListArray.map((item) => item.name),
      ]}
      onChange={handleFilterOption}
      name="TeamLead"
      className="p-2 m-1 border border-black rounded lg:w-full w-11/12"
      id={"teamlead List"}
    />
  );
};

export default TeamLeadDropdown;
