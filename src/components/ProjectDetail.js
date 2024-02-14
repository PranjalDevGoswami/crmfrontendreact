import React, { useState } from "react";
import { getFormData } from "../store";
import { MdModeEditOutline, MdDelete } from "react-icons/md";

const ProjectDetail = ({ data }) => {

// const [isNull,setIsNull] = useState(false)

    const projectID =  Math.floor(Math.random() * 90000) + 10000;


  const formData = getFormData();
  console.log('formmmmm',formData);

  // Ensure formData is an object
//   if (typeof formData !== "object" || formData === null) {
//     console.error("formData is not an object:", formData);
//     return null; // Render nothing if formData is not an object
//   }

  const { Project_Name, Client, Start_Date, End_Date, AM } = formData;


  const handleEditField = () =>{
    console.log('edit clicked',formData);
  }

  const handleDeleteField = () =>{
    console.log('deleted');
  }

  return (
    <div className="border shadow-xl border-black w-11/12 rounded-lg">
      <table className="text-2xl  w-full shadow-black shadow">
        <tbody>
          <tr className="bg-[#686868] text-left text-white">
            <th className="p-2">Project ID</th>
            <th className="p-2">Project Name</th>
            <th className="p-2">AM Name</th>
            <th className="p-2">Client Name</th>
            <th className="p-2">Start Date</th>
            <th className="p-2">End Date</th>
            <th className="p-2"></th>
            <th className="p-2"></th>
          </tr>
        </tbody>
        <tbody>
          <tr className="border-b border-gray-500">
            <td>{55765}</td>
            <td>Test</td>
            <td>ABCDE</td>
            <td>D</td>
            <td>2024-02-15</td>
            <td>2024-04-23</td>
            <td>
              <MdModeEditOutline className="cursor-pointer" onClick={handleEditField}/>
            </td>
            <td>
              <MdDelete className="cursor-pointer" onClick={handleDeleteField}/>
            </td>
          </tr>
        </tbody>
        <tbody>
           
                <tr className="border-b border-gray-500">
                <td>{75676}</td>
                <td>XYZA</td>
                <td>Test2</td>
                <td>E</td>
                <td>2024-01-24</td>
                <td>2024-03-15</td>
                <td>
                  <MdModeEditOutline className="cursor-pointer" onClick={handleEditField}/>
                </td>
                <td>
                  <MdDelete className="cursor-pointer" onClick={handleDeleteField}/>
                </td>
              </tr>
         
        </tbody>
        <tbody>
                <tr className="border-b border-gray-500 last:border-none">
                <td>{projectID}</td>
                <td>{Project_Name}</td>
                <td>{AM}</td>
                <td>{Client}</td>
                <td>{Start_Date}</td>
                <td>{End_Date}</td>
                <td>
                  <MdModeEditOutline className="cursor-pointer" onClick={handleEditField}/>
                </td>
                <td>
                  <MdDelete className="cursor-pointer" onClick={handleDeleteField}/>
                </td>
              </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ProjectDetail;
