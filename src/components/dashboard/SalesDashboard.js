import React, { useEffect, useState } from "react";
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
  const [optionSelected, setOptionSelected] = useState();
  const [SearchItemFiled, setSearchItemFiled] = useState([]);

  const AddProjectHandler = () => {
    setIsAddProjectOpen(true);
  };
  const handleFormSubmit = (formData) => {
    setFormDataList([...formDataList, formData]);
    setIsAddProjectOpen(false);
  };
  const HandleCloseForm = () => {
    setIsAddProjectOpen(false);
  };
  const HandleFilterSecect = (name, value) => {
    setOptionSelected(value);
  };

  useEffect(() => {
    setSearchItemFiled([...SearchItemFiled, optionSelected]);
  }, [optionSelected]);

  const SearchFilterHandler = () => {
    
  };

  return (
    <div className="flex bg-[#d9d9d9]">
      <div className="">
        <Sidebar />
      </div>
      <div className="w-full">
        <div className="flex justify-between w-full h-24 p-4 border-b-2 border-[#F66A3E] bg-white">
          <div className="w-11/12"></div>
          <div className="w-1/12 text-right flex items-center">
            <span className="m-2">UserName</span>
            <FaRegUserCircle className="text-4xl cursor-pointer" />
          </div>
        </div>
        <div className="m-auto">
          <div className="flex justify-between m-8 mb-8">
            <div className="w-2/4 flex">
              <div className="relative w-1/2">
                <Input
                  type={"text"}
                  className={
                    "w-11/12 relative rounded-lg pl-8 pt-4 pb-4 pr-4 bg-white"
                  }
                  value={SearchItemFiled.join(" ")}
                  onchange={SearchFilterHandler}
                />
                <CiSearch className="absolute top-1/2 text-xl translate-y-[-50%] left-4" />
              </div>
              <div className="w-1/2">
                <Dropdown
                  Option_Name={["filter", "Date", "AM", "Client"]}
                  className={
                    "p-4 bg-white w-full border border-black outline-none rounded-lg"
                  }
                  onChange={HandleFilterSecect}
                />
              </div>
            </div>
            <div className="flex justify-around">
              <Button
                name={"Add Project"}
                onClick={AddProjectHandler}
                className={"border border-black rounded-lg bg-yellow-200 p-2"}
              />
              {isAddProjectOpen ? (
                <div className="fixed top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-9/12 h-4/5 overflow-y-scroll">
                  <Form
                    onSubmit={handleFormSubmit}
                    HandleCloseForm={HandleCloseForm}
                  />
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-center w-full">
          <ProjectDetail data={formDataList} />
        </div>
      </div>
    </div>
  );
};

export default SalesDashboard;
