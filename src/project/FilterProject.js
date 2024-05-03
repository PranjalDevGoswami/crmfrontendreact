import React, { useEffect, useState } from "react";
import Dropdown from "../components/DropDown";
import { ClientList } from "../fetchApis/clientList/ClientList.js";

const FilterProject = ({ selectedStatus, setSelectedStatus }) => {
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
  const [selectedClient, setSelectedClient] = useState("");

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
    if (name === "status") {
      setSelectedStatus(value);
    }
    if (name === "clients") {
      setSelectedClient(value);
    }
  };

  return (
    <div className="flex">
      <Dropdown
        Option_Name={["--Select Client--", ...clientsListArray]}
        onChange={handleFilterOption}
        name={"Client"}
        className={"p-4 m-1 border border-black rounded"}
      />
      <Dropdown
        Option_Name={["--Select Status--", ...status]}
        onChange={handleFilterOption}
        name={"Status"}
        className={"p-4 m-1 border border-black rounded"}
      />
    </div>
  );
};

export default FilterProject;
