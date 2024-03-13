import React, { useEffect, useState } from "react";
import { Drawer, Button } from "@material-tailwind/react";
import LableAndInput from "../LableAndInput";
import DataTable from "react-data-table-component";
import { customStyles, editedColumns } from "../../../utils/DataTablesData";

import Dropdown from "../DropDown";
import { BulkUpdateManDaysData } from "../fetchApis/projects/mandays/bulkUpdateManDays";

export function AddManDays({ selectedRow }) {
  const [openRight, setOpenRight] = useState(true);
  const [selectedEditData, setSelectedEditData] = useState(selectedRow);
  const [mandaysData, setMandaysData] = useState(
    selectedRow.map(() => ({
      man_days: "",
      total_achievement: "",
      status: "",
      date: "",
    }))
  );
  const [editIndex, setEditIndex] = useState(null);

  const handleMandaysData = (index, e) => {
    const { name, value } = e.target;
    const updatedMandaysData = [...mandaysData];
    updatedMandaysData[index] = { ...updatedMandaysData[index], [name]: value };
    setMandaysData(updatedMandaysData);
    
  };

  const handleManDayStatus = (index, name, value) => {
    const updatedMandaysData = [...mandaysData];
    updatedMandaysData[index] = { ...updatedMandaysData[index], status: value };
    setMandaysData(updatedMandaysData);
  };

  const handleDate = (e) => {
    const { value } = e.target;
    const tst = value;
      const parts = tst.split("/");
      const isoDate = new Date(
        `${parts[2]}-${parts[1]}-${parts[0]}`
      ).toISOString();
    const updatedMandaysData = mandaysData.map((item) => ({
      ...item,
      date: isoDate,
    }));
    setMandaysData(updatedMandaysData);
  };

  const resetRowData = (index) => {
    const updatedMandaysData = [...mandaysData];
    updatedMandaysData[index] = {
      man_days: "",
      total_achievement: "",
      status: "",
      date: "",
    };
    setMandaysData(updatedMandaysData);
  };

  const addField = selectedEditData.map((item, index) => ({
    ...item,
    man_days: (
      <input
        key={`man_days_${item.id}`}
        className="p-2 bg-gray-300"
        type="number"
        maxLength={"2"}
        onChange={(e) => handleMandaysData(index, e)}
        name="man_days"
        value={mandaysData[index]?.man_days}
      />
    ),
    total_achievement: (
      <input
        key={`total_achievement_${item.id}`}
        className="p-2 bg-gray-300"
        type="number"
        maxLength={"2"}
        onChange={(e) => handleMandaysData(index, e)}
        name="total_achievement"
        value={mandaysData[index]?.total_achievement}
      />
    ),
    status: (
      <Dropdown
        key={`status_${item.id}`}
        Option_Name={["inprogress", "hold", "complete"]}
        onChange={(name, value) => handleManDayStatus(index, name, value)}
        className={"p-2 bg-gray-300"}
        name={"status"}
        value={mandaysData[index]?.status}
      />
    ),
  }));

  const updatedDataWithButton = [
    ...addField,
    {
      name: (
        <button
          className="bg-green-300 p-4 "
          onClick={() => {
            HandleAddManDays();
          }}
        >
          update
        </button>
      ),
    },
  ];

  const openDrawerRight = () => setOpenRight(true);
  const closeDrawerRight = () => setOpenRight(false);

  const finalData = mandaysData.map((item, index) => ({
    ...selectedEditData[index],
    man_days: parseInt(item.man_days),
    total_achievement: item.total_achievement,
    status: item.status,
    is_active: true,
    date: item.date,
  }));
  const DataToSend = finalData.map((item, index) => {
    if(item.project_code !== null){
        return {
        project_code: item.project_code,
        name: item.name,
        man_days: parseInt(item.man_days),
        total_achievement: item.total_achievement,
        status: item.status,
        date: item.date,
      }
    };
  });
  const HandleAddManDays = () => {
    const updatedMandaysData = [...mandaysData];
    updatedMandaysData[editIndex] = {
      man_days: "",
      total_achievement: "",
      status: "",
      date: "",
    };
    setMandaysData(updatedMandaysData);
    setEditIndex(null);
    console.log("DataToSend", DataToSend);
    BulkUpdateManDays(DataToSend);
  };
  const BulkUpdateManDays = async (data) => {
    try {
      await BulkUpdateManDaysData(data);
    } catch (error) {
      console.error("Error fetching project data:", error);
    }
  };
  return (
    <React.Fragment>
      <Drawer
        placement="right"
        open={openRight}
        onClose={closeDrawerRight}
        className="p-4 top-32"
        size="1200px"
      >
        <div className="mb-6 w-1/3">
          <h3 className="text-xl underline pb-4">
            Fill Man Days and Achieve Target
          </h3>
          <div className="flex flex-row p-2 ml-4 mr-4">
            <LableAndInput
              labelName={"Man Days Entry For"}
              InputName={"date"}
              InputType={"date"}
              inputClassName={"p-2 border w-full bg-gray-300"}
              labelClassName={"pt-4 pb-2"}
              inputChange={handleDate}
            />
          </div>
        </div>
        <div className="overflow-scroll">
          <DataTable
            columns={editedColumns}
            data={updatedDataWithButton}
            customStyles={customStyles}
          />
        </div>
      </Drawer>
    </React.Fragment>
  );
}

