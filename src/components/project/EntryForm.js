import React, { useEffect, useState } from "react";
import Sidebar from "../SideBar";
import { FaRegUserCircle } from "react-icons/fa";
import Form from "../project/Form.js";

const EntryForm = ({entryFormData}) => {
  const [entryFormData,setEntryFormData] = useState()


    const handleSubmit = (formData) =>{
      setEntryFormData(formData)
      console.log("formDataformData",entryFormData);
    }


  return (
    <div className="flex bg-[#d9d9d9]">
      <div className="">
        <Sidebar />
      </div>
      <div className="w-full">
        <div className="flex justify-between w-full h-32 p-4 border-b-2 border-[#F66A3E] bg-white  sticky z-50 top-0">
          <div className="w-11/12"></div>
          <div className="w-1/12 text-right flex items-center ">
            <span className="m-2">UserName</span>
            <FaRegUserCircle className="text-4xl cursor-pointer" />
          </div>
        </div>
        <div className="m-auto bg-">
            <div className="flex justify-around">
              <div className="w-3/4 p-8 border rounded-lg shadow-gray-500 bg-white mt-16 mb-16">
                <h2 className="text-3xl border-color-gray-500 border-b-2 pb-4">Project Details</h2>
                <Form onSubmit={handleSubmit} />
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EntryForm;
