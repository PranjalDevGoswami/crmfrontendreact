import React from "react";
import ProjectCount from "../project/projectCount/ProjectCount";
import NewProject from "../project/newProject/NewProject";
import InProgressProject from "../project/inprogressProject/InProgressProject";
import HoldProject from "../project/holdProject/HoldProject";
import ProjectEndThisMonth from "../project/ProjectEndThisMonth/ProjectEndThisMonth";

const ReportDashBoardTopCard = ({ projectData }) => {
  return (
    <div className="flex justify-between">
      <ProjectCount projectData={projectData} />
      <NewProject projectData={projectData} />
      <InProgressProject projectData={projectData} />
      <HoldProject projectData={projectData} />
      <ProjectEndThisMonth projectData={projectData} />
    </div>
  );
};

export default ReportDashBoardTopCard;
