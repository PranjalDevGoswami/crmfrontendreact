import React, { useContext, useEffect, useMemo, useState } from "react";
import PiReportChart from "../Report/PiReportChart";
import Revenue from "../Report/Revenue";
import ProjectTypeChart from "../Report/ProjectTypeChart";
import AMWiseReport from "../Report/AMWiseReport";
import ClientWiseRPE from "../Report/ClientWiseRPE";
import TLWiseReport from "../Report/TLWiseReport";
import SalesReport from "../Report/SalesReport";
import PerdayReport from "../Report/PerdayReport";
import ClientInduvisualReport from "../Report/ClientInduvisualReport";
import { useSelector } from "react-redux";
import ProjectNameAndFilter from "../project/ProjectNameAndFilter";
import ReportDashBoardTopCard from "./ReportDashBoardTopCard";
import FilterProject from "../project/FilterProject";
import { FilterContext } from "../ContextApi/FilterContext";
import { getWithAuth } from "../provider/helper/axios";
import { DASHBOARDPROJECT } from "../../utils/constants/urls";

const ReportDashboard = () => {
  const [projectData, setProjectData] = useState([]);
  const [actualprojectData, setActulaProjectData] = useState([]);
  const [projectType, setProjectType] = useState([]);
  const [filteredData, setFilteredData] = useState([projectData]);
  const [projectStatus, setProjectStatus] = useState([]);
  const [clientInduvisualShow, setClientInduvisualShow] = useState(false);
  const [clientName, setClientName] = useState();
  const role = localStorage.getItem("role");
  const isDirectorRole = role === "Director";
  const isHodRole = role === "HOD";
  const department = localStorage.getItem("department");
  const isSalesDept = "1";
  const isOperationDept = "2";
  const userList = useSelector((store) => store.userData.users);

  const {filteredProjectDataWithoutStatus,setFilteredProjectDataWithoutStatus} = useContext(FilterContext);

  const showReports =
    isDirectorRole || (isHodRole && department == isSalesDept); // Sales department ID = 1

  if (!userList || !filteredData) {
    return <div>Loading data...</div>;
  }
  useEffect(() => {
    const getDashboardProject = async () => {
      try {
        const response = await getWithAuth(DASHBOARDPROJECT);
        setFilteredProjectDataWithoutStatus(response?.data || []);
      } catch (error) {
        console.error("Error fetching dashboard projects:", error);
      }
    };
  
    getDashboardProject();
  }, []);  // No need for useMemo, just use useEffect
  

  const projectDataResponse = useSelector(
    (store) => store.projectDataFiltered.projects
  );
  useEffect(() => {
    projectDataResponse.length > 0 && setProjectData(projectDataResponse);
    if(filteredProjectDataWithoutStatus.length>0){
    }
  }, [projectDataResponse,filteredProjectDataWithoutStatus]);

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
        <ReportDashBoardTopCard projectData={filteredProjectDataWithoutStatus} />
      </div>

      <div className="grid gap-4 p-4 relative grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 mt-4">
        {/* Project Filters */}
        <div className="absolute -top-4 left-4 flex space-x-2">
          {projectType.length > 0 && (
            <p className="border bg-gray-300 px-2 py-1 rounded text-xs">
              {projectType[0]?.label}
              <span
                className="p-1 cursor-pointer"
                onClick={() => setProjectType([])}
              >
                X
              </span>
            </p>
          )}
          {projectStatus.length > 0 && (
            <p className="border bg-gray-300 px-2 py-1 rounded text-xs">
              {projectStatus[0]?.label}
              <span
                className="p-1 cursor-pointer"
                onClick={() => setProjectStatus([])}
              >
                X
              </span>
            </p>
          )}
          {projectType.length > 0 && projectStatus.length > 0 && (
            <p className="border bg-gray-300 px-2 py-1 rounded text-xs">
              Clear All
              <span
                className="p-1 cursor-pointer"
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

        {/* Charts */}
        <div className="p-4 bg-white rounded-md shadow-lg">
          <h3 className="text-xl">All Project Type</h3>
          <ProjectTypeChart
            projectData={filteredProjectDataWithoutStatus}
            projectType={projectType}
            setProjectType={setProjectType}
            filteredData={filteredData}
            setFilteredData={setFilteredData}
            setProjectStatus={setProjectStatus}
          />
        </div>
        <div className="p-4 bg-white rounded-md shadow-lg">
          <h3 className="text-xl">All Project Status</h3>
          <PiReportChart
            projectData={filteredProjectDataWithoutStatus}
            projectType={projectType}
            setProjectType={setProjectType}
            filteredData={filteredData}
            setFilteredData={setFilteredData}
            setProjectStatus={setProjectStatus}
          />
        </div>
        <div className="p-4 bg-white rounded-md shadow-lg">
          <h3 className="text-xl">Revenue</h3>
          <Revenue
            projectData={filteredProjectDataWithoutStatus}
            projectType={projectType}
            filteredData={filteredData}
            setFilteredData={setFilteredData}
            projectStatus={projectStatus}
            setProjectStatus={setProjectStatus}
          />
        </div>

        {/* Report Components */}
        <div className="p-4 bg-white rounded-md shadow-lg overflow-y-scroll">
          <ClientWiseRPE
            projectData={filteredProjectDataWithoutStatus}
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

        {userList.length > 0 && department === isOperationDept && (
          <>
            <div className="p-4 bg-white rounded-md shadow-lg overflow-y-scroll">
              <AMWiseReport
                projectData={filteredProjectDataWithoutStatus}
                userList={userList}
                projectType={projectType}
                setProjectType={setProjectType}
                filteredData={filteredData}
                setFilteredData={setFilteredData}
                setProjectStatus={setProjectStatus}
              />
            </div>
            <div className="p-4 bg-white rounded-md shadow-lg overflow-y-scroll">
              <TLWiseReport
                projectData={filteredProjectDataWithoutStatus}
                userList={userList}
                projectType={projectType}
                setProjectType={setProjectType}
                filteredData={filteredData}
                setFilteredData={setFilteredData}
                setProjectStatus={setProjectStatus}
              />
            </div>
          </>
        )}

       

        {/* Full-width Perday Report */}
        {isDirectorRole && (
          <div className="p-4 bg-white rounded-md shadow-lg overflow-y-scroll col-span-full">
            <PerdayReport
              projectData={filteredProjectDataWithoutStatus}
              userList={userList}
              projectType={projectType}
              setProjectType={setProjectType}
              filteredData={filteredData}
              setFilteredData={setFilteredData}
              setProjectStatus={setProjectStatus}
            />
          </div>
        )}

        {/* {clientInduvisualShow && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md">
            <ClientInduvisualReport
              projectData={filteredProjectDataWithoutStatus}
              clientName={clientName}
            />
          </div>
        )} */}
         {showReports && (
          <div className="p-4 bg-white rounded-md shadow-lg overflow-y-scroll">
            <SalesReport
              projectData={filteredProjectDataWithoutStatus}
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
    </div>
  );
};

export default ReportDashboard;