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

const SalesDashboard = () => {
  const [isAddProjectOpen, setIsAddProjectOpen] = useState(false);
  const [formDataList, setFormDataList] = useState([]);
  const [optionSelected, setOptionSelected] = useState();
  const [SearchItemFiled, setSearchItemFiled] = useState([]);
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
    <div className="flex bg-[#d9d9d9]">
      <div className="">
        <Sidebar />
      </div>
      <div className="w-full">
        <Header />
        <div className="m-auto">
          <div className="p-8">
          <Breadcrumbs />
          </div>
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
                  onChange={HandleFilterSelect}
                />
              </div>
            </div>
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
        </div>
        <div className=" m-8 mb-8">
          {/* <div className="w-1/3">
          <BarChart chartData={chartData} />
          </div> */}
          <div className="">
            <h2 className="p-4 text-4xl underline">All Project Details</h2>
          <ProjectDetail data={formDataList}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesDashboard;
