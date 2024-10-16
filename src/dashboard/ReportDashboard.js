import React, { useEffect, useState } from "react";
import PiReportChart from "../Report/PiReportChart";
import Revenue from "../Report/Revenue";
import ProjectTypeChart from "../Report/ProjectTypeChart";
import AMWiseReport from "../Report/AMWiseReport";
import ClientWiseRPE from "../Report/ClientWiseRPE";
import TLWiseReport from "../Report/TLWiseReport";
import SalesReport from "../Report/SalesReport";
import PerdayReport from "../Report/PerdayReport";
import { isSalesDept } from "../config/Departments";
import ClientInduvisualReport from "../Report/ClientInduvisualReport";
import { useSelector } from "react-redux";
import ProjectNameAndFilter from "../project/ProjectNameAndFilter";
import ReportDashBoardTopCard from "./ReportDashBoardTopCard";
import { isDirector, isHod } from "../config/Role";
import FilterProject from "../project/FilterProject";

const ReportDashboard = () => {
  const [projectData, setProjectData] = useState([]);
  const [actualprojectData, setActulaProjectData] = useState([]);
  const [projectType, setProjectType] = useState([]);
  const [filteredData, setFilteredData] = useState([projectData]);
  const [projectStatus, setProjectStatus] = useState([]);
  const [clientInduvisualShow, setClientInduvisualShow] = useState(false);
  const [clientName, setClientName] = useState();

  const department = localStorage.getItem("department");
  const role = localStorage.getItem("role");
  const userList = useSelector((store) => store.userData.users);

  const showReports =
    role === isDirector || (role === isHod && department == isSalesDept); // Sales department ID = 1

  if (!userList || !filteredData) {
    return <div>Loading data...</div>;
  }

  const projectDataResponse = useSelector(
    (store) => store.projectDataFiltered.projects
  );
  useEffect(() => {
    projectDataResponse.length > 0 && setProjectData(projectDataResponse);
  }, [projectDataResponse]);

  useEffect(() => {
    if (projectStatus.length > 0) {
      const statusWiseFilter = filteredData.filter((item) => {
        return item.status === projectStatus[0]?.label;
      });
      setProjectData(statusWiseFilter);
    } else {
      setProjectData(actualprojectData);
    }
  }, [projectStatus]);

  return (
    <div className="mt-12 relative">
      <ProjectNameAndFilter
        data={projectDataResponse}
        ProjectHeading={"All Project Report"}
        NoProjectHeading={"No Project"}
      />
      <div className="flex justify-end mr-2 mt-2">
        <FilterProject />
      </div>

      <div>
        <ReportDashBoardTopCard projectData={projectDataResponse} />
      </div>

      <div className="flex items-stretch overflow-hidden relative">
        <div className="absolute top-1 left-0 flex">
          {projectType.length > 0 && (
            <p className="border bg-gray-300 w-fit px-2 py-1 rounded text-xs mx-2">
              {projectType[0]?.label} &nbsp;
              <span
                className=" p-1 text-xs cursor-pointer"
                onClick={() => setProjectType([])}
              >
                X
              </span>
            </p>
          )}
          {projectStatus.length > 0 && (
            <p className="border bg-gray-300 w-fit px-2 py-1 rounded text-xs mx-2">
              {projectStatus[0]?.label} &nbsp;
              <span
                className=" p-1 text-xs cursor-pointer"
                onClick={() => setProjectStatus([])}
              >
                X
              </span>
            </p>
          )}
          {projectType.length > 0 && projectStatus.length > 0 && (
            <p className="border bg-gray-300 w-fit px-2 py-1 rounded text-xs mx-2">
              clear all &nbsp;
              <span
                className=" p-1 text-xs cursor-pointer"
                onClick={() => {
                  setProjectType([]);
                  setProjectStatus([]);
                }}
              >
                X
              </span>
            </p>
          )}
        </div>

        <div className="p-4 bg-white rounded-md mt-8 ml-2 w-1/3 flex-grow pb-0 shadow-lg">
          <h3 className="text-xl">All Project Type</h3>
          <ProjectTypeChart
            projectData={projectDataResponse}
            projectType={projectType}
            setProjectType={setProjectType}
            filteredData={filteredData}
            setFilteredData={setFilteredData}
            setProjectStatus={setProjectStatus}
          />
        </div>
        <div className="p-4 bg-white rounded-md mt-8 ml-2 w-1/3 flex-grow pb-0 shadow-lg">
          <h3 className="text-xl mb-2">All Project Status</h3>
          <PiReportChart
            projectData={projectDataResponse}
            projectType={projectType}
            setProjectType={setProjectType}
            filteredData={filteredData}
            setFilteredData={setFilteredData}
            setProjectStatus={setProjectStatus}
          />
        </div>
        <div className="p-4 bg-white rounded-md mt-8 ml-2 w-1/3 flex-grow pb-0 shadow-lg">
          <h3 className="text-xl mb-2">Revenue</h3>
          <Revenue
            projectData={projectDataResponse}
            projectType={projectType}
            filteredData={filteredData}
            setFilteredData={setFilteredData}
            projectStatus={projectStatus}
            setProjectStatus={setProjectStatus}
          />
        </div>
      </div>
      <div className="flex items-stretch">
        <div className="p-4 mb-4 bg-white rounded-md mt-8 ml-2 w-1/3 flex-grow pb-0 shadow-lg  h-[490px] overflow-y-scroll no-scrollbar">
          <ClientWiseRPE
            projectData={projectDataResponse}
            userList={userList}
            projectType={projectType}
            setProjectType={setProjectType}
            filteredData={filteredData}
            setFilteredData={setFilteredData}
            setProjectStatus={setProjectStatus}
            setClientInduvisualShow={setClientInduvisualShow}
            setClientName={setClientName}
          />
        </div>
        {userList.length > 0 && (
          <div className="p-4 bg-white rounded-md mt-8 ml-2 w-1/3 flex-grow pb-0 shadow-lg h-[490px] overflow-y-scroll overflow-x-scroll no-scrollbar">
            <AMWiseReport
              projectData={projectDataResponse}
              userList={userList}
              projectType={projectType}
              setProjectType={setProjectType}
              filteredData={filteredData}
              setFilteredData={setFilteredData}
              setProjectStatus={setProjectStatus}
            />
          </div>
        )}
        {userList.length > 0 && (
          <div className="p-4 bg-white rounded-md mt-8 ml-2 w-1/3 flex-grow pb-0 shadow-lg h-[490px] overflow-y-scroll no-scrollbar">
            <TLWiseReport
              projectData={projectDataResponse}
              userList={userList}
              projectType={projectType}
              setProjectType={setProjectType}
              filteredData={filteredData}
              setFilteredData={setFilteredData}
              setProjectStatus={setProjectStatus}
            />
          </div>
        )}
      </div>
      {showReports && (
        <div className="flex items-stretch">
          <div className="p-4 bg-white rounded-md mt-4 ml-2 w-1/3 flex-grow pb-4 mb-4 shadow-lg overflow-y-scroll no-scrollbar">
            <SalesReport
              projectData={projectDataResponse}
              userList={userList}
              projectType={projectType}
              setProjectType={setProjectType}
              filteredData={filteredData}
              setFilteredData={setFilteredData}
              setProjectStatus={setProjectStatus}
            />
          </div>
          <div className="p-4 bg-white rounded-md mt-4 ml-2 w-2/3 flex-grow pb-4 mb-4 shadow-lg overflow-y-scroll no-scrollbar">
            <PerdayReport
              projectData={projectDataResponse}
              userList={userList}
              projectType={projectType}
              setProjectType={setProjectType}
              filteredData={filteredData}
              setFilteredData={setFilteredData}
              setProjectStatus={setProjectStatus}
            />
          </div>
        </div>
      )}
      {clientInduvisualShow && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2">
          <ClientInduvisualReport
            projectData={projectDataResponse}
            clientName={clientName}
          />
        </div>
      )}
    </div>
  );
};

export default ReportDashboard;
