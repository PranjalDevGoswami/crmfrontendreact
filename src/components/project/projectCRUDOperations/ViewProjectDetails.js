import React, { useState } from 'react'

const ViewProjectDetails = ({record}) => {
  const [viewEdit, setViewEdit] = useState(false);
  const [viewEditRecord, setEditRecord] = useState();
  const [updatedValue, setUpdatedValue] = useState({
    project_code: "",
    date: "",
    man_days: "",
    total_achievement: "",
  });
  
  const HandleOnEdit = (record) => {
    setViewEdit(true);
    setEditRecord(record);
    setUpdatedValue({
      ...updatedValue,
      project_code: record?.project_code,
      name: record?.name,
    });
  };

  return (
    <div className="absolute right-0 top-3.5 w-40 h-54 z-50 bg-yellow-200 overflow-visible rounded-md">
                  <div className="flex flex-col p-2 ml-4 mr-4 text-sm">
                    <button className="border-b border-black">View</button>
                    <button className="border-b border-black">Add Mandays</button>
                    <button className="border-b border-black"
                      onClick={() => {
                        HandleOnEdit(record);
                      }}
                    >
                      Edit Request/Edit
                    </button>
                    <button className="border-b border-black">Status Update</button>
                    <button className="">Raise CBR</button>
                  </div>
                </div>
  )
}

export default ViewProjectDetails
