import React, { useContext, useEffect, useState } from "react";
import Drawer from "@mui/material/Drawer";
import DataTable from "react-data-table-component";
import {
  customStyles,
  editedColumns,
} from "../../../utils/tableData/DataTablesData.js";
import Dropdown from "../../components/DropDown";
import Label from "../../Atom/Label";
import DateComponent from "../../components/DateComponent.js";
import { DataTableContext } from "../../ContextApi/DataTableContext.js";
import { addManDaysValidation } from "../../../utils/validation/addManDaysValidation.js";
import { useDispatch } from "react-redux";
import { handlePostMandaysData } from "../../../utils/helperFunction/postAddMandaysData/index.js";

export function AddManDays({ setMultiEditFieldOpen }) {
  const {
    setIsDrawerOpen,
    selectedRow,
    setSelectedRow,
    setIsMultiEdit,
    setIsAddManDays,
    setisEdit,
  } = useContext(DataTableContext);

  const [openRight, setOpenRight] = useState(true);
  const [selectedEditData, setSelectedEditData] = useState(selectedRow);
  const [mandaysData, setMandaysData] = useState(
    selectedRow.map((item) => ({
      project_id: item?.id,
      update_date: "",
      total_man_days: "",
      total_achievement: "",
      status: "",
    }))
  );
  const dispatch = useDispatch();

  const handleMandaysData = (index, e) => {
    const { name, value } = e.target;
    const updatedMandaysData = [...mandaysData];
    updatedMandaysData[index] = { ...updatedMandaysData[index], [name]: value };
    setMandaysData(updatedMandaysData);
  };

  const handleManDayStatus = (index, name, value) => {
    const updatedMandaysData = [...mandaysData];
    updatedMandaysData[index] = {
      ...updatedMandaysData[index],
      [name]: value,
    };
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
      update_date: isoDate,
    }));
    setMandaysData(updatedMandaysData);
  };

  const validateFields = addManDaysValidation(mandaysData);
  const preventMinus = (e) => {
    if (e.code === "Minus") {
      e.preventDefault();
    }
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
        name="total_man_days"
        value={mandaysData[index]?.total_man_days}
        onKeyDown={preventMinus}
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
        onKeyDown={preventMinus}
      />
    ),
    status: (
      <Dropdown
        key={`status_${item.id}`}
        Option_Name={[
          "--Select Status--",
          "In Progress",
          "On Hold",
          "Completed",
        ]}
        onChange={(name, value) => handleManDayStatus(index, name, value)}
        className={"p-2 border bg-white w-full"}
        name={"status"}
        value={mandaysData[index]?.status}
        id={"status"}
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
          Update
        </button>
      ),
    },
  ];

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
    project_id: item.project_id,
    total_man_days: parseInt(item.total_man_days),
    total_achievement: item.total_achievement,
    status: item.status,
    is_active: true,
    update_date: item.update_date,
  }));

  const DataToSend = finalData
    .map((item) => ({
      project_id: item.project_id,
      total_man_days: item.total_man_days,
      total_achievement: item.total_achievement,
      status: item.status,
      update_date: item.update_date,
    }))
    .filter((item) => item !== undefined);

  const HandleAddManDays = () => {
    if (validateFields()) {
      handlePostMandaysData(
        DataToSend,
        dispatch,
        setIsAddManDays,
        setisEdit,
        closeDrawerRight
      );
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
