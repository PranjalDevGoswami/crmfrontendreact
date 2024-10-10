import React, { useContext, useState } from "react";
import ProjectDataTable from "../project/ProjectDataTable.js";
import { useSelector } from "react-redux";

const SalesDashboard = () => {
  const [isAddProjectOpen, setIsAddProjectOpen] = useState(false);
  const [salesDepartment] = useState(false);
  const AddProjectHandler = () => {
    setIsAddProjectOpen(true);
  };
  const darkMode = useSelector((store) => store.darkMode.isDarkMode);

  return (
    <div>
      {/* <div className="flex justify-end m-8 mb-8">
        <div className="">
          <Link to={"/entry-page"}>
            <Button
              name={"Add Project"}
              onClick={AddProjectHandler}
              className={`${
                darkMode
                  ? "bg-black text-white border-white"
                  : "bg-yellow-200 border-black"
              } border rounded-lg p-2`}
            />
          </Link>
        </div>
      </div> */}
      <div className="">
        <ProjectDataTable PersonDepartment={salesDepartment} />
      </div>
    </div>
  );
};

export default SalesDashboard;
