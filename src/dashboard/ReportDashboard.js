import React, { useEffect, useState } from "react";
import ProjectCount from "../project/projectCount/ProjectCount";
import PiReportChart from "../Report/PiReportChart";
import NewProject from "../project/newProject/NewProject";
import HoldProject from "../project/holdProject/HoldProject";
import InProgressProject from "../project/inprogressProject/InProgressProject";
import ProjectEndThisMonth from "../project/ProjectEndThisMonth/ProjectEndThisMonth";
import Revenue from "../Report/Revenue";
import RPEWeek from "../Report/RPEWeek";
import { GetProjectData } from "../fetchApis/projects/getProjectData/GetProjectData";
import ProjectTypeChart from "../Report/ProjectTypeChart";
import RPEClientWise from "../Report/RPEClientWise";
import RPEClientWiseBottom10 from "../Report/RPEClientWiseBottom10";
import SampleInPipeLineReport from "../Report/SampleInPipeLineReport";
import AMWiseReport from "../Report/AMWiseReport";

const ReportDashboard = () => {
  const [projectData, setProjectData] = useState([]);
  const [projectType, setProjectType] = useState([]);
  const [filteredData, setFilteredData] = useState([projectData]);
  const [projectStatus, setProjectStatus] = useState([]);

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const fetchDataFromApi2 = await GetProjectData();
        const projectDataObject = fetchDataFromApi2?.data?.map((val) => val);
        setProjectData(projectDataObject);
      } catch (error) {
        console.error("Error fetching project data:", error);
      }
    };
    fetchProjectData();
  }, []);

  return (
    <div className="mt-8">
      <div className="flex justify-between">
        <ProjectCount projectData={projectData} />
        <NewProject projectData={projectData} />
        <InProgressProject projectData={projectData} />
        <HoldProject projectData={projectData} />
        <ProjectEndThisMonth projectData={projectData} />
      </div>
      <div className="flex items-stretch">
        <div className="p-4 bg-white rounded-md mt-8 ml-2 w-1/2 flex-grow pb-0">
          <h3 className="text-3xl mb-2">All Project Type</h3>
          <ProjectTypeChart
            projectData={projectData}
            projectType={projectType}
            setProjectType={setProjectType}
            filteredData={filteredData}
            setFilteredData={setFilteredData}
            setProjectStatus={setProjectStatus}
          />
        </div>
        <div className="p-4 bg-white rounded-md mt-8 ml-2 w-1/2 flex-grow pb-0">
          <h3 className="text-3xl mb-2">All Project Status</h3>
          <PiReportChart
            projectData={projectData}
            projectType={projectType}
            setProjectType={setProjectType}
            filteredData={filteredData}
            setFilteredData={setFilteredData}
            setProjectStatus={setProjectStatus}
          />
        </div>
      </div>
      <div className="flex items-stretch">
        {/* <div className="p-4 bg-white rounded-md mt-8 ml-2 w-1/2 flex-grow pb-0">
          <h3 className="text-3xl mb-2">All Project Status</h3>
          <ProjectTypeChart
            projectData={projectData}
            projectType={projectType}
            setProjectType={setProjectType}
          />
        </div> */}
        <div className="p-4 bg-white rounded-md mt-8 ml-2 w-1/2 flex-grow pb-0">
          <h3 className="text-3xl mb-6">Revenue</h3>
          <Revenue
            projectData={projectData}
            projectType={projectType}
            filteredData={filteredData}
            setFilteredData={setFilteredData}
            projectStatus={projectStatus}
            setProjectStatus={setProjectStatus}
          />
        </div>
        <div className="p-4 bg-white rounded-md mt-8 ml-2 w-1/2 flex-grow pb-0">
          <h3 className="text-3xl mb-2">AMWise Report</h3>
          <AMWiseReport projectData={projectData} />
        </div>
      </div>
      <div className="">
        <div className="p-4 bg-white rounded-md mt-8 ml-2 w-auto flex-grow pb-0 overflow-x-scroll">
          <h3 className="text-3xl mb-2">RPE</h3>
          <RPEWeek projectData={projectData} />
        </div>
      </div>
      <div className="">
        <div className="p-4 bg-white rounded-md mt-8 ml-2 w-auto flex-grow pb-0 overflow-x-scroll">
          <h3 className="text-3xl mb-2">Sample in PipeLine</h3>
          <SampleInPipeLineReport projectData={projectData} />
        </div>
      </div>
      <div className="overflow-x-scroll w-full">
        <div className="p-4 bg-white rounded-md mt-8 ml-2 w-auto flex-grow pb-0">
          <h3 className="text-3xl mb-2">RPE CLientWise(Top 10)</h3>
          <RPEClientWise projectData={projectData} />
        </div>
      </div>
      <div className="overflow-x-scroll w-full">
        <div className="p-4 bg-white rounded-md mt-8 ml-2 w-auto flex-grow pb-0">
          <h3 className="text-3xl mb-2">RPE CLientWise(Bottom 10)</h3>
          <RPEClientWiseBottom10 projectData={projectData} />
        </div>
      </div>
    </div>
  );
};

export default ReportDashboard;
