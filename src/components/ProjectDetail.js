import React, { useState } from "react";
import { getFormData } from "../store";
import { MdModeEditOutline, MdDelete } from "react-icons/md";
import { GrFormView } from "react-icons/gr";
import Button from "./Button.js";
import Label from "./Label";

const ProjectDetail = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [editedIndex, setEditedIndex] = useState();
  const [editedValue, setEditedValue] = useState({});

  const formData = getFormData();

  const { Project_Name, Client, Start_Date, End_Date, AM } = formData;
  const Project_id = Math.floor(Math.random() * 90000) + 10000;
  const [newFormData, SetNewFormData] = useState([
    {
      Project_id: Project_id,
      Project_Name: "test",
      Client: "client4",
      Start_Date: "2024-02-15",
      End_Date: "2024-04-23",
      AM: "AM4",
    },
    {
      Project_id: Project_id,
      Project_Name: "test2",
      Client: "client5",
      Start_Date: "2024-02-25",
      End_Date: "2024-07-08",
      AM: "AM6",
    },
    { Project_Name, Client, Start_Date, End_Date, AM },
  ]);

  const handleEditField = (index) => {
    setIsEdit(true);
    setEditedIndex(index);
    newFormData.forEach((value, existingIndex) => {
      if (index == existingIndex) {
        setEditedValue(value);
      }
    });
  };
//   const handleDeleteField = () => {
//     const FilteredFormData = newFormData.filter((val, ind) => {
//       if (editedIndex !== ind) {
//         return val;
//       }
//     });
//     SetNewFormData(FilteredFormData);
//   };
const handleViewField = () =>{

}
  const handleEditUpdate = () => {

  };
  const handleCancelUpdate = () => {
    setIsEdit(false);
  };

  return (
    <div className="border shadow-xl border-black rounded-lg w-full">
      <table className="text-2xl shadow-black shadow">
        <tbody>
          <tr className="bg-[#686868] text-left text-white">
            <th className="p-2">Sr. No.</th>
            <th className="p-2">Project ID</th>
            <th className="p-2">Client Name</th>
            <th className="p-2">Project Name</th>
            <th className="p-2">Type</th>
            <th className="p-2">Start Date</th>
            <th className="p-2">End Date</th>
            <th className="p-2">Status</th>
            <th className="p-2">Project Target</th>
            <th className="p-2">Achieved Target</th>
            <th className="p-2">Remaining Target</th>
            <th className="p-2">CPI</th>
            <th className="p-2">CBR Status</th>
            <th className="p-2">SOW Costing</th>
            <th className="p-2">Actual Costing</th>
            <th className="p-2">SOW Status</th>
            <th className="p-2">Mandays Till Date</th>
            <th className="p-2">Remarks</th>
            <th className="p-2">Project Manager</th>
            <th className="p-2">PSF PROJECTS</th>
            <th className="p-2"></th>
            <th className="p-2"></th>
          </tr>
        </tbody>
        <tbody>
          {newFormData.map((value, index) => {
            return (
              <tr key={index} className="border-b border-gray-500">
                <td>{Math.floor(Math.random() * 90000) + 10000}</td>
                <td>{value.Project_Name}</td>
                <td>{value.AM}</td>
                <td>{value.Client}</td>
                <td>{value.Start_Date}</td>
                <td>{value.End_Date}</td>
                <td>
                  <MdModeEditOutline
                    className="cursor-pointer"
                    onClick={() => handleEditField(index)}
                  />
                </td>
                <td>
                <GrFormView className="cursor-pointer"
                    onClick={handleViewField}/>

                </td>
                {/* <td>
                  <MdDelete
                    className="cursor-pointer"
                    onClick={handleDeleteField}
                  />
                </td> */}
              </tr>
            );
          })}
        </tbody>
      </table>
      {isEdit ? (
        <div className="absolute top-1/2 left-1/2 bg-white w-3/12 h-8/12 p-8 border shadow-lg translate-x-[-50%] translate-y-[-50%]">
          {Object.keys(editedValue).map((val, ind) => {
            
            return (
              <div className="flex gap-4" key={ind}>
                <Label labelName={val} className={"p-2 w-4/12"} />
                <input
                  value={editedValue[val]}
                  className="p-2 border m-2 w-9/12"
                />
              </div>
            );
          })}
          <div className="flex justify-between">
          <Button
            name={"update"}
            className={"bg-green-300 p-4 m-2 w-full"}
            onClick={handleEditUpdate}
          />
          <Button
            name={"cancel"}
            className={"bg-red-300 p-4 m-2 w-full"}
            onClick={handleCancelUpdate}
          />
            </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default ProjectDetail;
