import React, { useContext, useEffect, useState } from "react";
// import { ProjectDetails } from "../../fetchApis/projects/getProjectData/GetProjectData.js";
import { MdPauseCircleOutline } from "react-icons/md";
import { FilterContext } from "../../ContextApi/FilterContext";

const HoldProject = () => {
  const { projectData } = useContext(FilterContext);

  // useEffect(() => {
  //   const ProjectDetail = async () => {
  //     const response = await ProjectDetails();
  //     const holdProject = response.filter((item) => {
  //       return item.status === "hold";
  //     });
  //     setProject(holdProject);
  //   };
  //   ProjectDetail();
  // }, []);
  const ProjectTotal = projectData?.length;

  return (
    <div className="w-80 h-48 bg-[#4CBC9A] text-white rounded-md m-2 shadow-lg">
      <h2 className="text-2xl font-bold pt-4 pl-4">Hold Project</h2>
      <div className="h-24 flex items-center justify-evenly text-xl">
        <span className="text-6xl cursor-pointer text-blue-600">
          {ProjectTotal}
        </span>
        <MdPauseCircleOutline className="text-6xl " />
      </div>
    </div>
  );
};

export default HoldProject;
