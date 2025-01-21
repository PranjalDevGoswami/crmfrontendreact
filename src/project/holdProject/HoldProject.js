import React, { useContext, useEffect, useState } from "react";
// import { ProjectDetails } from "../../fetchApis/projects/getProjectData/GetProjectData.js";
import { MdPauseCircleOutline } from "react-icons/md";
import { FilterContext } from "../../ContextApi/FilterContext";
import { useNavigate } from "react-router-dom";

const HoldProject = ({ projectData }) => {
  const Navigate = useNavigate();
  const { activeTabValue, setActiveTabValue, setSelectedStatus } =
    useContext(FilterContext);
  const ProjectOnHold = projectData?.filter(
    (item) => item?.status === "On Hold"
  );
  const handleProjectReport = () => {
    Navigate("/operation-dashboard");
    setActiveTabValue("On Hold");
    setSelectedStatus("On Hold");
  };

  return (
    <div className="w-1/5 h-40 bg-[#addaec] text-[rgb(0,0,255)] rounded-md m-2 shadow-xl flex flex-col justify-between">
      <h2 className="text-xl font-bold pt-4 pl-4">Hold Project</h2>
      <div className="h-24 flex items-center justify-evenly text-xl">
        <span
          className="text-4xl cursor-pointer text-blue-600"
          onClick={handleProjectReport}
        >
          {ProjectOnHold && ProjectOnHold.length}
        </span>
        <MdPauseCircleOutline className="text-4xl " />
      </div>
    </div>
  );
};

export default HoldProject;
