// ManagerDropdown.jsx
import React from "react";
import Dropdown from "../../components/DropDown";

const ManagerDropdown = ({ managerListArray, handleFilterOption }) => {
  return (
    <Dropdown
      Option_Name={[
        "--Select Manager--",
        ...managerListArray.map((item) => item.name),
      ]}
      onChange={handleFilterOption}
      name="Manager"
      className="p-2 m-1 border border-black rounded lg:w-full w-11/12"
      id={"manager List"}
    />
  );
};

export default ManagerDropdown;
