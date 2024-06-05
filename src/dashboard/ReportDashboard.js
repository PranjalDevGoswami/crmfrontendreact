import React from "react";
import ProjectCount from "../project/projectCount/ProjectCount";
import ReportChart from "../chart/ReportChart";
import NewProject from "../project/newProject/NewProject";

const ReportDashboard = () => {
  return (
    <div>
      <div className="flex">
        <ProjectCount />
        <NewProject />
      </div>
      <ReportChart />
    </div>
  );
};

export default ReportDashboard;
