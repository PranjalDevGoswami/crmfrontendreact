import React, { useState } from "react";
import Sidebar from "../SideBar";
import { FaRegUserCircle } from "react-icons/fa";
import Input from "../InputField";
import ProjectDetail from "../ProjectDetail.js";
import Button from "../Button.js";
import Form from "../project/Form.js";
import { CiSearch } from "react-icons/ci";
import Dropdown from "../DropDown.js";


const SalesDashboard = () => {
  const [isAddProjectOpen, setIsAddProjectOpen] = useState(false);
  const [formDataList, setFormDataList] = useState([]);

  const AddProjectHandler = () => {
    setIsAddProjectOpen(true);
  };
  const handleFormSubmit = (formData) => {
    console.log("formDataformDataformDataformData", formData);
    setFormDataList([...formDataList, formData]);
    setIsAddProjectOpen(false);
  };

  return (
    <div className="flex bg-[#d9d9d9]">
      <div className="">
        <Sidebar />
      </div>
      <div className="w-full">
        <div className="flex justify-between w-full h-24 p-4 border-b-2 border-[#F66A3E] bg-white">
          <div className="w-11/12"></div>
          <div className="w-1/12 text-right">
            <FaRegUserCircle className="text-4xl" />
          </div>
        </div>
        <div className="m-auto">
          <div className="flex justify-between m-8 mb-8">
            <div className="w-2/4 flex">
              <div className="relative w-1/2">
              <Input
                type={"text"}
                className={"p-4 w-11/12 relative rounded-lg"}
              />
              <CiSearch className="absolute top-1/2 text-xl translate-y-[-50%] left-4"/>
              </div>
              <div className="w-1/2">              
              <Dropdown Option_Name={['filter','Date','AM','Client']} className={'p-4 bg-white w-full border border-black outline-none rounded-lg'}/>
              </div>
            </div>
            <div className="flex justify-around">
              <Button name={"Add Project"} onClick={AddProjectHandler} className={'border border-black rounded-lg bg-yellow-200 p-2'}/>
              {isAddProjectOpen ? (
                <div className="fixed top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-9/12 h-4/5 overflow-y-scroll">
                  <Form onSubmit={handleFormSubmit} />
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <ProjectDetail data={formDataList} />
          </div>
      </div>
    </div>
  );
};

export default SalesDashboard;
