import React from "react";
import { BsGraphUp } from "react-icons/bs";

const NewProject = ({ projectData }) => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  const currentMonthProjects = projectData?.filter((project) => {
    const startDate = new Date(project?.tentative_start_date);
    return (
      startDate.getFullYear() === currentYear &&
      startDate.getMonth() === currentMonth
    );
  });

  return (
    <div className="w-1/5 h-40 bg-[#addaec] text-[rgb(0,0,255)] rounded-md m-2 shadow-xl flex flex-col justify-between">
      <h2 className="text-xl font-bold pt-4 pl-4">New Project This Month</h2>
      <div className="h-24 flex items-center justify-evenly text-xl">
        <span className="text-4xl cursor-pointer text-blue-600">
          {currentMonthProjects.length}
        </span>
        <BsGraphUp className="text-4xl " />
      </div>
    </div>
  );
};

export default NewProject;
