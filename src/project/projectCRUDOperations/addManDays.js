import React, { useContext, useEffect, useState } from "react";
import Drawer from "@mui/material/Drawer";
import DataTable from "react-data-table-component";
import { customStyles, editedColumns } from "../../../utils/DataTablesData";
import Dropdown from "../../components/DropDown";
import { PostMandaysData } from "../../fetchApis/projects/mandays/PostMandaysData";
import Label from "../../components/Label.js";
import DateComponent from "../../components/DateComponent.js";
import SweetAlert from "../../components/SweetAlert.js";
import { DataTableContext } from "../../ContextApi/DataTableContext.js";

export function AddManDays({ setMultiEditFieldOpen }) {
  const { setIsDrawerOpen, selectedRow, setSelectedRow, setIsMultiEdit } =
    useContext(DataTableContext);

  const [openRight, setOpenRight] = useState(true);
  const [selectedEditData, setSelectedEditData] = useState(selectedRow);
  const [mandaysData, setMandaysData] = useState(
    selectedRow.map(() => [
      // {
      //   man_days: "",
      //   total_achievement: "",
      //   status: "",
      //   date: "",
      // },
      {
        // name: viewRecord.name,
        // project_id: viewRecord.id,
        update_date: "",
        total_man_days: "",
        total_achievement: "",
      },
    ])
  );
  const [editIndex, setEditIndex] = useState(null);

  const handleMandaysData = (index, e) => {
    const { name, value } = e.target;
    const projectId = selectedEditData[index].id;
    const projectIndex = selectedEditData.findIndex(
      (project) => project.id === projectId
    );
    const RemainingSize = selectedEditData[projectIndex].remaining_interview;
    const updatedMandaysData = [...mandaysData];
    updatedMandaysData[index] = { ...updatedMandaysData[index], [name]: value };
    setMandaysData(updatedMandaysData);
  };

  const handleManDayStatus = (index, name, value) => {
    console.log();
    const updatedMandaysData = [...mandaysData];
    updatedMandaysData[index] = { ...updatedMandaysData[index], status: value };

    setMandaysData(updatedMandaysData);
  };

  const handleDate = (e) => {
    const tst = e.target.value;
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
        value={mandaysData[index]?.total_man_days}
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
        Option_Name={["--Select Status--", "inprogress", "hold", "completed"]}
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

  // const openDrawerRight = () => setOpenRight(true);
  const closeDrawerRight = () => {
    document.body.classList.remove("DrawerBody");
    setIsDrawerOpen(false);
    setSelectedRow([]);
    setIsMultiEdit(false);
    setMultiEditFieldOpen(false);
    setOpenRight(false);
  };

  const finalData = mandaysData.map((item, index) => ({
    ...selectedEditData[index],
    total_man_days: parseInt(item.total_man_days),
    total_achievement: item.total_achievement,
    status: item.status,
    is_active: true,
    date: item.date,
  }));

  const DataToSend = finalData
    .map((item, index) => {
      if (
        item.project_code !== null &&
        item.total_man_days !== "" &&
        item.total_achievement !== "" &&
        item.status !== ""
      ) {
        return {
          project_code: item.project_code,
          name: item.name,
          total_man_days: parseInt(item.total_man_days),
          total_achievement: item.total_achievement,
          status: item.status,
          date: item.date,
        };
      }
    })
    .filter((item) => item !== undefined);

  const HandleAddManDays = () => {
    if (DataToSend?.length === 0) {
      SweetAlert({
        title: "Error",
        text: "Please fill in data for at least one project before updating.",
        icon: "error",
      });
      return;
    }
    const updatedMandaysData = [...mandaysData];
    updatedMandaysData[editIndex] = {
      total_man_days: "",
      total_achievement: "",
      status: "",
      update_date: "",
    };
    setMandaysData(updatedMandaysData);
    setEditIndex(null);
    BulkUpdateManDays(DataToSend);
  };

  const BulkUpdateManDays = async (data) => {
    try {
      const response = await PostMandaysData(data);
      if (response?.status == true) {
        SweetAlert({
          title: "Operation Perform Sucessfully",
          text: "",
          icon: "success",
        });
        closeDrawerRight();
      } else if (response?.status == false) {
        if (response?.ex?.response?.data[0]) {
          SweetAlert({
            title: "Error",
            text: "please select date from calender",
            icon: "error",
          });
        } else {
          SweetAlert({
            title: "Error",
            text: response?.ex?.response?.data?.error,
            icon: "error",
          });
        }
      }
    } catch (error) {
      console.log("Error fetching project data:", error);
    }
  };
  return (
    <React.Fragment className="z-40">
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
        <div className="mb-6 z-30">
          <h3 className="text-xl underline pb-4">
            Fill Man Days and Achieve Target
          </h3>
          <div className="flex justify-end w-full p-2 ml-4 mr-4">
            <Label
              labelName={"Man Days Entry For"}
              className={"pt-4 pb-2 w-2/12"}
            />
            <DateComponent handleDateChange={handleDate} />
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
