import React, { useEffect, useState } from "react";
import ProjectCount from "../project/projectCount/ProjectCount";
import PiReportChart from "../Report/PiReportChart";
import NewProject from "../project/newProject/NewProject";
import HoldProject from "../project/holdProject/HoldProject";
import InProgressProject from "../project/inprogressProject/InProgressProject";
import ProjectEndThisMonth from "../project/ProjectEndThisMonth/ProjectEndThisMonth";
import Revenue from "../Report/Revenue";
import { GetProjectData } from "../fetchApis/projects/getProjectData/GetProjectData";
import ProjectTypeChart from "../Report/ProjectTypeChart";
import AMWiseReport from "../Report/AMWiseReport";
import { getWithAuth } from "../provider/helper/axios";
import ClientWiseRPE from "../Report/ClientWiseRPE";
import TLWiseReport from "../Report/TLWiseReport";
import SalesReport from "../Report/SalesReport";
import PerdayReport from "../Report/PerdayReport";
import { allManagerRoles, isDirector, isHod } from "../config/Role";
import { isSalesDept } from "../config/Departments";
import ClientInduvisualReport from "../Report/ClientInduvisualReport";
import { USERROLE } from "../../utils/constants/urls";

const ReportDashboard = () => {
  const [projectData, setProjectData] = useState([]);
  const [actualprojectData, setActulaProjectData] = useState([]);
  const [projectType, setProjectType] = useState([]);
  const [filteredData, setFilteredData] = useState([projectData]);
  const [projectStatus, setProjectStatus] = useState([]);
  const [userList, setUserList] = useState([]);
  const [clientInduvisualShow, setClientInduvisualShow] = useState(false);
  const [clientName, setClientName] = useState();

  const department = localStorage.getItem("department");
  const userRole = localStorage.getItem("userrole");
  const role = localStorage.getItem("role");

  const showReports =
    role === isDirector || (role === isHod && department == isSalesDept); // Sales department ID = 1

  if (!userList || !filteredData) {
    return <div>Loading data...</div>;
  }

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const userRole = await getWithAuth(USERROLE);
        setUserList(userRole?.data);
      } catch (error) {
        console.error("Error fetching user roles:", error);
      }
    };
    fetchUserRole();
  }, []);

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const fetchDataFromApi2 = await GetProjectData();
        const projectDataObject = fetchDataFromApi2?.data;
        if (role === isDirector) {
          setProjectData(projectDataObject);
          setActulaProjectData(projectDataObject);
          return;
        } else if (role === isHod && userList.length > 0) {
          const HodUsers = userList.filter(
            (user) => user?.reports_to?.id == userRole
          );

          const ProjectUnderHod = projectDataObject.filter((project) =>
            HodUsers.some(
              (user) =>
                project.project_assigned_by_manager?.id == user.user_role.id ||
                project.assigned_to?.id == user.user_role.id ||
                project.created_by?.id == user.user_role.id
            )
          );
          setProjectData(ProjectUnderHod);
          setActulaProjectData(ProjectUnderHod);
        } else if (allManagerRoles.includes(role)) {
          const ManagerUsers = userList.filter(
            (user) => user?.reports_to?.id == userRole
          );

          const ProjectUnderManager = projectDataObject.filter(
            (project) =>
              project.project_assigned_to_teamlead?.id == userRole ||
              project?.assigned_to?.id == userRole ||
              project.project_assigned_by_manager?.id == userRole
          );
          setProjectData(ProjectUnderManager);
          setActulaProjectData(ProjectUnderManager);
        }
      } catch (error) {
        console.error("Error fetching project data:", error);
      }
    };
    fetchProjectData();
  }, [role, userList, projectType]);

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
    <div className="mt-8 relative">
      <div className="flex justify-between">
        <ProjectCount projectData={projectData} />
        <NewProject projectData={projectData} />
        <InProgressProject projectData={projectData} />
        <HoldProject projectData={projectData} />
        <ProjectEndThisMonth projectData={projectData} />
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
            projectData={projectData}
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
            projectData={projectData}
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
            projectData={projectData}
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
            projectData={projectData}
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
              projectData={projectData}
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
              projectData={projectData}
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
              projectData={projectData}
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
              projectData={projectData}
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
            projectData={projectData}
            clientName={clientName}
          />
        </div>
      )}

      <div className="">
        {/* Render SampleInPipeLineReport only if userList has data */}
        {/* {userList.length > 0 && (
          <div className="p-4 bg-white rounded-md mt-8 ml-2 w-auto flex-grow pb-0 overflow-x-scroll shadow-lg">
            <h3 className="text-xl mb-2">Sample in PipeLine</h3>
            <SampleInPipeLineReport
              projectData={projectData}
              userList={userList}
            />
          </div>
        )} */}
      </div>
      {/* <div className="overflow-x-scroll w-full flex">
        <div className="p-4 bg-white rounded-md mt-8 ml-2 w-1/2 flex-grow pb-0 shadow-lg ">
          <h3 className="text-xl mb-2">RPE CLientWise(Top 10)</h3>
          <RPEClientWise
            projectData={projectData}
            userList={userList}
            projectType={projectType}
            setProjectType={setProjectType}
            filteredData={filteredData}
            setFilteredData={setFilteredData}
            setProjectStatus={setProjectStatus}
          />
        </div>
        <div className="p-4 bg-white rounded-md mt-8 ml-2 w-1/2 flex-grow pb-0 shadow-lg">
          <h3 className="text-xl mb-2">RPE CLientWise(Bottom 10)</h3>
          <RPEClientWiseBottom10
            projectData={projectData}
            userList={userList}
            projectType={projectType}
            setProjectType={setProjectType}
            filteredData={filteredData}
            setFilteredData={setFilteredData}
            setProjectStatus={setProjectStatus}
          />
        </div>
      </div> */}
      {/* <div className="overflow-x-scroll w-full">
        <div className="p-4 bg-white rounded-md mt-8 ml-2 w-auto flex-grow pb-0 shadow-lg">
          <h3 className="text-xl mb-2">RPE CLientWise(Bottom 10)</h3>
          <RPEClientWiseBottom10
            projectData={projectData}
            userList={userList}
            projectType={projectType}
            setProjectType={setProjectType}
            filteredData={filteredData}
            setFilteredData={setFilteredData}
            setProjectStatus={setProjectStatus}
          />
        </div>
      </div> */}
      {/* <div className="p-4 bg-white rounded-md mt-8 ml-2 w-1/3 flex-grow pb-0 overflow-x-scroll shadow-lg">
        <h3 className="text-xl mb-2">RPE</h3>
        <RPEWeek projectData={projectData} />
      </div> */}
    </div>
  );
};

export default ReportDashboard;
