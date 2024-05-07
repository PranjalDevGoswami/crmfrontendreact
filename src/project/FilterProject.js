import React, { useEffect, useState } from "react";
import Dropdown from "../components/DropDown";
import { ClientList } from "../fetchApis/clientList/ClientList.js";
import Input from "../components/InputField.js";

const FilterProject = ({
  selectedStatus,
  setSelectedStatus,
  selectedClient,
  setSelectedClient,
  setSearchTerm,
  searchTerm,
}) => {
  const [clientsListArray, setClientsListArray] = useState([
    "Demo Client1",
    "Demo Client2",
  ]);
  const [status, setStatus] = useState([
    "Inprogress",
    "Hold",
    "Completed",
    "New",
    "To be Started",
  ]);
  // const [selectedClient, setSelectedClient] = useState("");

  useEffect(() => {
    const fetchClientList = async () => {
      try {
        const response = await ClientList();
        const responseArray = response?.data?.map((val) => {
          return val.name;
        });
        setClientsListArray(responseArray);
      } catch (error) {
        console.log("error is", error);
      }
    };
    fetchClientList();
  }, []);

  const handleFilterOption = (name, value) => {
    if (name === "Status") {
      if (value === "To be Started") {
        setSelectedStatus("to_be_started");
      } else if (value === "Completed") {
        setSelectedStatus("completed");
      } else if (value === "New") {
        setSelectedStatus("new");
      } else if (value === "CBR Raised") {
        setSelectedStatus("cbr_raised");
      } else if (value === "Hold") {
        setSelectedStatus("hold");
      } else if (value === "Inprogress") {
        setSelectedStatus("inprogress");
      } else if (value === "--Select Status--") {
        setSelectedStatus("--Select Status--");
      }
    }
    if (name === "Client") {
      setSelectedClient(value);
    }
  };

  return (
    <div className="flex items-center w-full">
      <Dropdown
        Option_Name={["--Select Client--", ...clientsListArray]}
        onChange={handleFilterOption}
        name={"Client"}
        className={"p-4 m-1 border border-black rounded lg:w-full w-11/12"}
      />
      <Dropdown
        Option_Name={["--Select Status--", ...status]}
        onChange={handleFilterOption}
        name={"Status"}
        className={"p-4 m-1 border border-black rounded lg:w-full w-11/12"}
      />
      <div className="w-full">
        <Input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onchange={(e) => setSearchTerm(e.target.value)}
          className={
            "p-4 m-1 border border-black rounded lg:w-full w-11/12 focus:outline-none"
          }
        />
      </div>
    </div>
  );
};

export default FilterProject;
