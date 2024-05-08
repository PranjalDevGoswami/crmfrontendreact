import React, { useEffect, useState } from "react";
// import { Drawer, Button } from "@material-tailwind/react";
import Drawer from "@mui/material/Drawer";
import LableAndInput from "../../components/LableAndInput";
import DataTable from "react-data-table-component";
import { customStyles, editedColumns } from "../../../utils/DataTablesData";
import Dropdown from "../../components/DropDown";
import { PostMandaysData } from "../../fetchApis/projects/mandays/PostMandaysData";
import Label from "../../components/Label.js";
import Input from "../../components/InputField";

export function AddManDays({
  selectedRow,
  setIsDrawerOpen,
  setMultiEditFieldOpen,
}) {
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

  // const handleMandaysData = (index, e) => {
  //   const sampleSize = selectedEditData.map((item) => item.sample);
  //   const { name, value } = e.target;
  //   const updatedMandaysData = [...mandaysData];
  //   updatedMandaysData[index] = { ...updatedMandaysData[index], [name]: value };
  //   setMandaysData(updatedMandaysData);
  // };

  const handleMandaysData = (index, e) => {
    const { name, value } = e.target;
    const projectId = selectedEditData[index].id;
    const projectIndex = selectedEditData.findIndex(
      (project) => project.id === projectId
    );
    // const sampleSize = selectedEditData[projectIndex].sample;
    const RemainingSize = selectedEditData[projectIndex].remaining_interview;
    if (name === "total_achievement" && parseInt(value) >= RemainingSize) {
      alert(
        "Achieved Target must be smaller than the Remaining Interview Size for project " +
          selectedEditData[projectIndex].name
      );
      return;
    }
    const updatedMandaysData = [...mandaysData];
    updatedMandaysData[index] = { ...updatedMandaysData[index], [name]: value };
    setMandaysData(updatedMandaysData);
  };

  const today = new Date();
  // Subtract one day from today's date
  const minDate = new Date(today);
  minDate.setDate(minDate.getDate() - 1);

  const handleManDayStatus = (index, name, value) => {
    console.log();
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
        className="p-2 border w-full"
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
        className="p-2 border w-full"
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
        Option_Name={["--Select Status--", "inprogress", "hold", "complete"]}
        onChange={(name, value) => handleManDayStatus(index, name, value)}
        className={"p-2 border bg-white w-full"}
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
  const closeDrawerRight = () => {
    document.body.classList.remove("DrawerBody");
    setIsDrawerOpen(false);
    setMultiEditFieldOpen(false);
    setOpenRight(false);
  };

  const finalData = mandaysData.map((item, index) => ({
    ...selectedEditData[index],
    man_days: parseInt(item.man_days),
    total_achievement: Number(item.total_achievement),
    status: item.status,
    is_active: true,
    date: item.date,
  }));

  const DataToSend = finalData
    .map((item, index) => {
      if (
        item.project_code !== null &&
        item.man_days !== "" &&
        item.total_achievement !== "" &&
        item.status !== ""
      ) {
        return {
          project_code: item.project_code,
          name: item.name,
          man_days: parseInt(item.man_days),
          total_achievement: item.total_achievement,
          status: item.status,
          date: item.date,
        };
      }
    })
    .filter((item) => item !== undefined);

  const HandleAddManDays = () => {
    if (DataToSend.length === 0) {
      alert("Please fill in data for at least one project before updating.");
      return;
    }
    const updatedMandaysData = [...mandaysData];
    updatedMandaysData[editIndex] = {
      man_days: "",
      total_achievement: "",
      status: "",
      date: "",
    };
    setMandaysData(updatedMandaysData);
    setEditIndex(null);
    BulkUpdateManDays(DataToSend);
    closeDrawerRight();
  };

  const BulkUpdateManDays = async (data) => {
    try {
      const response = await PostMandaysData(data);
      console.log("🚀 ~ BulkUpdateManDays ~ response:", response);
      if (response?.status == true) {
        alert("Operation Perform Sucessfully");
      }
    } catch (error) {
      console.log("Error fetching project data:", error);
    }
  };
  return (
    <React.Fragment>
      <Drawer
        anchor={"right"}
        PaperProps={{
          sx: {
            width: 1200,
            padding: 2,
          },
        }}
        open={openRight}
        onClose={closeDrawerRight}
      >
        <div className="mb-6">
          <h3 className="text-xl underline pb-4">
            Fill Man Days and Achieve Target
          </h3>
          <div className="flex justify-end w-full p-2 ml-4 mr-4">
            <Label
              labelName={"Man Days Entry For"}
              className={"pt-4 pb-2 w-2/12"}
            />
            <Input
              name={"date"}
              type={"date"}
              className={"p-2 mr-4 border w-2/12"}
              onchange={handleDate}
              min={minDate.toISOString().split("T")[0]}
            />
          </div>
        </div>
        <div className="overflow-scroll">
          <DataTable
            columns={editedColumns}
            data={updatedDataWithButton}
            customStyles={customStyles}
            pagination
          />
        </div>
      </Drawer>
    </React.Fragment>
  );
}
