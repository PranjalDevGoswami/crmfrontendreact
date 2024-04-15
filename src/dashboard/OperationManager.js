import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import Breadcrumbs from "../components/Breadcrumbs.js";
import Header from "../partials/Header.js";
import ProjectDataTable from "../project/ProjectDataTable.js";
import SideBar from "../components/SideBar.js";

const OperationManager = ({ showEdit }) => {
  const [isAddProjectOpen, setIsAddProjectOpen] = useState(false);
  const [formDataList, setFormDataList] = useState([]);
  const [optionSelected, setOptionSelected] = useState();
  const [SearchItemFiled, setSearchItemFiled] = useState([]);
  const [operationDepartment] = useState(true);

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
    console.log("searching....");
  };

  return (
    <div className="">
      <div className="">
        <div className="m-8 mb-8">
          <ProjectDataTable PersonDepartment={operationDepartment} />
        </div>
      </div>
    </div>
  );
};

export default OperationManager;
