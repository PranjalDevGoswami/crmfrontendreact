import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../SideBar";
import { FaRegUserCircle } from "react-icons/fa";
import Input from "../InputField";
import ProjectDetail from "../ProjectDetail.js";
import Button from "../Button.js";
import Form from "../project/Form.js";
import { CiSearch } from "react-icons/ci";
import Dropdown from "../DropDown.js";
import BarChart from "../BarChart.js";
import { UserData } from "../../../utils/Data.js";

const SalesDashboard = () => {
  const [isAddProjectOpen, setIsAddProjectOpen] = useState(false);
  const [formDataList, setFormDataList] = useState([]);
  const [optionSelected, setOptionSelected] = useState();
  const [SearchItemFiled, setSearchItemFiled] = useState([]);
  const [labelsYears, setLabelsYears] = useState([]);
  const [chartData, setChartData] = useState(
    {
    labels: UserData.map((data) => data.year), 
    datasets: [
      {
        label: "Users Gained ",
        data: UserData.map((data) => data.userGain),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0"
        ],
        borderColor: "black",
        borderWidth: 2
      }
    ]
  }
  );

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
    console.log("searching....",data);
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
        <div className="flex justify-between m-8 mb-8">
          <div className="w-2/3">
            <h2 className="p-4 text-4xl underline">All Project Details</h2>
          <ProjectDetail/>
          </div>
          <div className="w-1/3">
          <BarChart chartData={chartData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesDashboard;
