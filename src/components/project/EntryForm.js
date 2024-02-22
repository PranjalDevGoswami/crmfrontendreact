import React, { useEffect, useState } from "react";
import Sidebar from "../SideBar";
import Form from "../project/Form.js";
import Breadcrumbs from "../Breadcrumbs.js";
import Header from "../partials/Header.js";


const EntryForm = ({onSubmit}) => {
  const [entryFormData,setEntryFormData] = useState()


    const handleSubmit = (formData) =>{
      setEntryFormData(formData)
      onSubmit(formData)
      console.log("formDataformData",entryFormData);
    }

    
  return (
    <div className="flex bg-[#d9d9d9]">
      <div className="sticky top-0 h-full">
        <Sidebar />
      </div>
      <div className="w-full">
        <Header />
        <div className="bg- m-8">
          <Breadcrumbs />
            <div className="w-full border rounded-lg shadow-gray-500 bg-white mt-8 mb-16">
                <h2 className="text-3xl border-color-gray-500 border-b-2 p-2 pl-8">Add Project Details</h2>
              <div className="p-4">
                <Form onSubmit={handleSubmit} />
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EntryForm;
