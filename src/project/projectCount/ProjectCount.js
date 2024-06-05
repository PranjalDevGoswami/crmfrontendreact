import React, { useEffect, useState } from "react";
import { GetProjectData } from "../../fetchApis/projects/getProjectData/GetProjectData.js";
import { GoProjectRoadmap } from "react-icons/go";

const ProjectCount = () => {
  const [project, setProject] = useState([]);

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const fetchDataFromApi2 = await GetProjectData();
        const projectDataObject = fetchDataFromApi2?.data?.map((val) => {
          return val;
        });
        setProject(projectDataObject);
      } catch (error) {
        console.error("Error fetching project data:", error);
      }
    };
    fetchProjectData();
  }, []);
  const ProjectTotal = project.length;

  return (
    <div className="w-80 h-48 bg-[#4CBC9A] text-white rounded-md m-2">
      <h2 className="text-2xl font-bold pt-4 pl-4">Total Project</h2>
      <div className="h-24 flex items-center justify-evenly text-xl">
        <span className="text-2xl">{ProjectTotal}</span>
        <GoProjectRoadmap className="text-6xl " />
      </div>
    </div>
  );
};

export default ProjectCount;
