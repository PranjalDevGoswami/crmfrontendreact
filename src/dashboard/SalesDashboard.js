import React, { useState } from "react";
import Button from "../components/Button.js";
import { Link } from "react-router-dom";
import ProjectDataTable from "../project/ProjectDataTable.js";

const SalesDashboard = () => {
  const [isAddProjectOpen, setIsAddProjectOpen] = useState(false);
  const [salesDepartment] = useState(false);
  const AddProjectHandler = () => {
    setIsAddProjectOpen(true);
  };

  return (
    <div>
      <div className="flex justify-end m-8 mb-8">
        <div className="">
          <Link to={"/entry-page"}>
            <Button
              name={"Add Project"}
              onClick={AddProjectHandler}
              className={"border border-black rounded-lg bg-yellow-200 p-2"}
            />
          </Link>
        </div>
      </div>
      <div className="">
        <ProjectDataTable PersonDepartment={salesDepartment} />
      </div>
    </div>
  );
};

export default SalesDashboard;
