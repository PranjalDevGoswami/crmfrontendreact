import React, { useContext } from "react";
import { GoProjectRoadmap } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { FilterContext } from "../../ContextApi/FilterContext";

const ProjectCount = ({ projectData }) => {
  const Navigate = useNavigate();
  const { activeTabValue, setActiveTabValue, setSelectedStatus } =
    useContext(FilterContext);
  const ProjectTotal = projectData?.length;
  const handleProjectReport = () => {
    Navigate("/operation-dashboard");
    setActiveTabValue("all");
    setSelectedStatus("all");
  };

  return (
    <div className="w-1/5 h-40 bg-[#addaec] text-[rgb(0,0,255)] rounded-md m-2 shadow-xl flex flex-col justify-between">
      <h2 className="text-xl font-bold pt-4 pl-4">Total Project</h2>
      <div className="h-24 flex items-center justify-evenly text-xl">
        <span
          className="text-4xl cursor-pointer text-blue-600"
          onClick={handleProjectReport}
        >
          {ProjectTotal}
        </span>
        <GoProjectRoadmap className="text-4xl " />
      </div>
    </div>
  );
};

export default ProjectCount;
