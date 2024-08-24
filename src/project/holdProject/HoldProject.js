import React, { useContext, useEffect, useState } from "react";
// import { ProjectDetails } from "../../fetchApis/projects/getProjectData/GetProjectData.js";
import { MdPauseCircleOutline } from "react-icons/md";
import { FilterContext } from "../../ContextApi/FilterContext";

const HoldProject = ({ projectData }) => {
  const ProjectOnHold = projectData?.filter(
    (item) => item?.status === "On Hold"
  );

  return (
    <div className="w-80 h-48 bg-[#4CBC9A] text-white rounded-md m-2 shadow-lg">
      <h2 className="text-2xl font-bold pt-4 pl-4">Hold Project</h2>
      <div className="h-24 flex items-center justify-evenly text-xl">
        <span className="text-6xl cursor-pointer text-blue-600">
          {ProjectOnHold && ProjectOnHold.length}
        </span>
        <MdPauseCircleOutline className="text-6xl " />
      </div>
    </div>
  );
};

export default HoldProject;
