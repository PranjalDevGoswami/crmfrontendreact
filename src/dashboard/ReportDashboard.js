import React from "react";
import ProjectCount from "../project/projectCount/ProjectCount";
import PiReportChart from "../Report/PiReportChart";
import NewProject from "../project/newProject/NewProject";
import HoldProject from "../project/holdProject/HoldProject";
import InProgressProject from "../project/inprogressProject/InProgressProject";
import ProjectWiseChart from "../Report/ProjectWiseChart";
import ProjectEndThisMonth from "../project/ProjectEndThisMonth/ProjectEndThisMonth";
import Revenue from "../Report/Revenue";
import PerWeekReport from "../Report/PerWeekReport";
import RPEWeek from "../Report/RPEWeek";

const ReportDashboard = () => {
  return (
    <div className="mt-8">
      <div className="flex justify-between">
        <ProjectCount />
        <NewProject />
        <InProgressProject />
        <HoldProject />
        <ProjectEndThisMonth />
      </div>
      <div className="flex items-stretch">
        <div className="p-4 bg-white rounded-md mt-8 ml-2 w-1/2 flex-grow pb-0">
          <h3 className="text-3xl mb-2">All Project Status</h3>
          <PiReportChart />
        </div>
        <div className="p-4 bg-white rounded-md mt-8 ml-2 w-1/2 flex-grow pb-0">
          <h3 className="text-3xl mb-6">Revenue</h3>
          <Revenue />
        </div>
      </div>

      <div className="overflow-x-scroll w-full">
        <div className="p-4 bg-white rounded-md mt-8 ml-2 w-auto flex-grow pb-0">
          <h3 className="text-3xl mb-2">Sample in PipeLine</h3>
          <PerWeekReport />
        </div>
      </div>
      <div className="overflow-x-scroll w-full">
        <div className="p-4 bg-white rounded-md mt-8 ml-2 w-auto flex-grow pb-0">
          <h3 className="text-3xl mb-2">RPE</h3>
          <RPEWeek />
        </div>
      </div>
    </div>
  );
};

export default ReportDashboard;
