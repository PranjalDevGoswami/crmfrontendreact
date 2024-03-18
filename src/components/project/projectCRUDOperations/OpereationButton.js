import React, { useState } from "react";
import View from "./View";
import { RaiseCBRPostApi } from "../../fetchApis/projects/raiseCBR/RaiseCbr";
import { Link } from 'react-router-dom';

const OpereationButton = ({ record, isView, setisView,setisEdit,isEdit,setIsStatus }) => {
  const [viewEditRecord, setEditRecord] = useState();

  const [updatedValue, setUpdatedValue] = useState({
    project_code: "",
    date: "",
    man_days: "",
    total_achievement: "",
  });

  const HandleOnEdit = (record) => {
    setisEdit(true);
    setEditRecord(record);
    setUpdatedValue({
      ...updatedValue,
      project_code: record?.project_code,
      name: record?.name,
    });
  };

  const handleViewProject = () => {
    setisView(true);
    // setisEdit(true);

  };
  const handleRaiseCBR = (record) => {
    PostRaiseCBR(record.project_code);
  };

  const PostRaiseCBR = async (data) => {
    try {
      await RaiseCBRPostApi(data);
    } catch (error) {
      console.error("Error fetching project data:", error);
    }
  };
const handleStatus = (record) =>{
  setIsStatus(true);

}
  const HandleAddManDays = () => {
    setisEdit(true);
  };
  return (
    <div className="relative">
      <div className="w-40 h-54 z-50  text-white overflow-visible rounded-md rounded-tr-none">
        <div className="flex flex-col p-1 ml-2 mr-2 text-sm">
          <button className="border-b border-black bg-[#bd1d1d] z-50 p-2 hover:bg-yellow-200 hover:text-black rounded-sm" onClick={handleViewProject}>
            <Link to={'/view'}>
            View
            </Link>
          </button>
          <button className="border-b border-black bg-[#bd1d1d] z-50 p-2 hover:bg-yellow-200 hover:text-black rounded-sm" onClick={HandleAddManDays}>
            Add Mandays
          </button>
          <button
            className="border-b border-black bg-[#bd1d1d] z-50 p-2 hover:bg-yellow-200 hover:text-black rounded-sm"
            onClick={() => {
              HandleOnEdit(record);
            }}
          >
            Edit Target Request
          </button>
          <button className="border-b border-black bg-[#bd1d1d] z-50 p-2 hover:bg-yellow-200 hover:text-black rounded-sm" onClick={()=>handleStatus(record)}>Status Update</button>
          <button className="border-black bg-[#bd1d1d] z-50 p-2 hover:bg-yellow-200 hover:text-black rounded-sm" onClick={() => handleRaiseCBR(record)}>
            Raise CBR
          </button>
        </div>
      </div>
    </div>
  );
};

export default OpereationButton;
