import React, { useState } from "react";
import { Drawer, Button } from "@material-tailwind/react";
import LableAndInput from "../LableAndInput";
import DataTable from "react-data-table-component";
import {
  DummyData,
  customStyles,
  editedColumns,
} from "../../../utils/DataTablesData";
import Dropdown from "../DropDown";

export function AddManDays({ selectedRow }) {
  const [openRight, setOpenRight] = useState(true);
  const [selectedEditData, setSelectedEditData] = useState(selectedRow);
  const [mandaysData, setMandaysData] = useState([
    {
      man_days: "",
      total_achievement: "",
      status: "",
    },
  ]);
  const handleMandaysData = (e) =>{
    const {name,value} = e.target;
    console.log("handleMandaysData",name,value);
    setMandaysData({...mandaysData,[name]:value})
  }

  const handleManDayStatus = (name,value) =>{
    setMandaysData({...mandaysData,[name]:value})
    console.log("name,value",mandaysData);
  }
 const HandleOnEdit = () =>{
  setMandaysData({
    man_days: "",
    total_achievement: "",
    status: "",
  }),
  console.log("record",mandaysData);
 }
  const addField = selectedEditData.map((item,index) => {
    return {
      ...item,
      man_days: (
        <input
          className="p-2 bg-gray-300"
          type="number"
          maxLength={"2"}
          onChange={handleMandaysData}
          name="mandays"
        />
      ),
      total_achievement: (
        <input
          className="p-2 bg-gray-300"
          type="number"
          maxLength={"2"}
          onChange={handleMandaysData}
          name="target achieve"
        />
      ),
      status: (
        <Dropdown
          Option_Name={["Inprogress", "hold", "Complete"]}
          onChange={handleManDayStatus}
          className={'p-2 bg-gray-300'}
          name={'status'}
        />
      ),
    };
  });

  const updatedDataWithButton = [...addField,
    {
      name: <button
      className="bg-green-300 p-4 "
      onClick={() => {
        HandleOnEdit();
      }}
    >
      update
    </button>
    }]

    console.log("ffff",mandaysData);
  const handleEditUpdate = () => {
    console.log("mandaysData", mandaysData);
  };

  // console.log("addField", addField);

  const openDrawerRight = () => setOpenRight(true);
  const closeDrawerRight = () => setOpenRight(false);

  return (
    <React.Fragment>
      <div className="flex flex-wrap gap-4">
        <Button onClick={openDrawerRight}></Button>
      </div>
      <Drawer
        placement="right"
        open={openRight}
        onClose={closeDrawerRight}
        className="p-4 top-32"
        size="1200px"
        overlay='true'

      >
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-xl underline pb-4">
            Fill Man Days and Achieve Target
          </h3>
          <div className="flex p-2 ml-4 mr-4">
            <LableAndInput
              labelName={"Man Days Entry For"}
              InputName={"date"}
              InputType={"date"}
              inputClassName={"p-2 border w-full"}
              labelClassName={"pt-4 pb-2"}
              // Inputvalue={showDate}
              // inputChange={handleInputChange}
            />
          </div>
        </div>
        <div className="">
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
