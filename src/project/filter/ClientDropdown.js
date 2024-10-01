// ClientDropdown.jsx
import React from "react";
import Dropdown from "../../components/DropDown";

const ClientDropdown = ({ clientsList, handleFilterOption }) => {
  return (
    <Dropdown
      Option_Name={[
        "--Select Client--",
        ...clientsList.map((item) => item.name),
      ]}
      onChange={handleFilterOption}
      name="Client"
      className="p-2 m-1 border border-black rounded lg:w-full w-11/12"
      id={"client List"}
    />
  );
};

export default ClientDropdown;
