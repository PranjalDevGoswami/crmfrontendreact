import React, { useEffect, useState } from "react";
import { ProjectDetails } from "../../fetchApis/projects/getProjectData/GetProjectData.js";
import { GoProjectRoadmap } from "react-icons/go";

const ProjectCount = () => {
  const [project, setProject] = useState([]);

  useEffect(() => {
    const ProjectDetail = async () => {
      const response = await ProjectDetails();
      setProject(response);
    };
    ProjectDetail();
  }, []);
  const ProjectTotal = project?.length;

  return (
    <div className="w-80 h-48 bg-[#4CBC9A] text-white rounded-md m-2 shadow-lg">
      <h2 className="text-2xl font-bold pt-4 pl-4">Total Project</h2>
      <div className="h-24 flex items-center justify-evenly text-xl">
        <span className="text-6xl cursor-pointer text-blue-600">
          {ProjectTotal}
        </span>
        <GoProjectRoadmap className="text-6xl " />
      </div>
    </div>
  );
};

export default ProjectCount;
