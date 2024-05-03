import React, { useEffect, useState } from "react";
import ProjectDataTable from "../project/ProjectDataTable.js";

const FinanceDashboard = ({ showEdit }) => {
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

export default FinanceDashboard;
