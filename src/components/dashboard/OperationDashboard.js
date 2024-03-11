import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../SideBar";
import Input from "../InputField";
import ProjectDetail from "../ProjectDetail.js";
import Button from "../Button.js";
import { CiSearch } from "react-icons/ci";
import Dropdown from "../DropDown.js";
import Breadcrumbs from "../Breadcrumbs.js";
import Header from "../partials/Header.js";
import ProjectDataTable from "../project/ProjectDataTable.js";

const OperationDashboard = ({showEdit}) => {
  const [isAddProjectOpen, setIsAddProjectOpen] = useState(false);
  const [formDataList, setFormDataList] = useState([]);
  const [optionSelected, setOptionSelected] = useState();
  const [SearchItemFiled, setSearchItemFiled] = useState([]);
  const [operationDepartment] = useState(true)
 

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
    console.log("searching....",);
  };

  return (
    <div className="">
    <div className="w-full sticky top-0 z-20">
    <Header />
    </div>
    <div className="flex bg-[#d9d9d9] ">
      <div className="sticky top-32 h-screen">
        <Sidebar />
      </div>
        <div className="overflow-hidden">
          <div className="p-8">
          <Breadcrumbs />
          </div>
          <div className="m-8 mb-8">
            <ProjectDataTable PersonDepartment={operationDepartment}/>
        </div>
          </div>
        </div>
      </div>
  );
};

export default OperationDashboard;
