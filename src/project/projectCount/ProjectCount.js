import React from "react";
import { GoProjectRoadmap } from "react-icons/go";

const ProjectCount = ({ projectData }) => {
  const ProjectTotal = projectData?.length;

  return (
    <div className="w-1/5 h-40 bg-[#addaec] text-[rgb(0,0,255)] rounded-md m-2 shadow-xl flex flex-col justify-between">
      <h2 className="text-xl font-bold pt-4 pl-4">Total Project</h2>
      <div className="h-24 flex items-center justify-evenly text-xl">
        <span className="text-4xl cursor-pointer text-blue-600">
          {ProjectTotal}
        </span>
        <GoProjectRoadmap className="text-4xl " />
      </div>
    </div>
  );
};

export default ProjectCount;
