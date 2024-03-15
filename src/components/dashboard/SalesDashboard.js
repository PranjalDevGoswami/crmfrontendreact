import React, { useEffect, useState } from "react";
import Sidebar from "../SideBar";
import Input from "../InputField";
import ProjectDetail from "../ProjectDetail.js";
import Button from "../Button.js";
import { CiSearch } from "react-icons/ci";
import Dropdown from "../DropDown.js";
import Breadcrumbs from "../Breadcrumbs.js";
import Header from "../partials/Header.js";
import { Link } from "react-router-dom";
import ProjectDataTable from "../project/ProjectDataTable.js";

const SalesDashboard = () => {
  const [isAddProjectOpen, setIsAddProjectOpen] = useState(false);
  const [formDataList, setFormDataList] = useState([]);
  const [optionSelected, setOptionSelected] = useState();
  const [SearchItemFiled, setSearchItemFiled] = useState([]);
  const [salesDepartment] = useState(false)
  const AddProjectHandler = () => {
    setIsAddProjectOpen(true);
  };

  const HandleCloseForm = () => {
    setIsAddProjectOpen(false);
  };
  const HandleFilterSelect = (name, value) => {
    setOptionSelected(value);
  };

  useEffect(() => {
    setSearchItemFiled([...SearchItemFiled, optionSelected]);
  }, [optionSelected]);

  const SearchFilterHandler = () => {
    console.log("searching....",);
  };

  return (
    <div>
    <div className="w-full sticky top-0 z-20">
    <Header />
    </div>
    <div className="flex bg-[#d9d9d9]">
      <div className="sticky top-32 h-screen">
        <Sidebar />
      </div>
        <div className="">
          <div className="p-8">
          <Breadcrumbs />
          </div>
          <div className="flex justify-end m-8 mb-8">
            
            <div className="">
              <Link to={'/entry-page'}>
              <Button
                name={"Add Project"}
                onClick={AddProjectHandler}
                className={"border border-black rounded-lg bg-yellow-200 p-2"}
              />
               </Link>
              
            </div>
          </div>
        <div className=" m-8 mb-8">
          {/* <div className="w-1/3">
          <BarChart chartData={chartData} />
          </div> */}
          <div className="">
          <ProjectDataTable PersonDepartment={salesDepartment}/>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default SalesDashboard;
