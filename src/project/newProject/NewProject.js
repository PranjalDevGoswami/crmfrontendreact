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
    <div className="w-80 h-48 bg-[#4CBC9A] text-white rounded-md m-2 shadow-lg">
      <h2 className="text-xl font-bold pt-4 pl-4">New Project This Month</h2>
      <div className="h-24 flex items-center justify-evenly text-xl">
        <span className="text-6xl cursor-pointer text-blue-600 font-bold">
          + {currentMonthProjects.length}
        </span>
        <BsGraphUp className="text-6xl " />
      </div>
    </div>
  );
};

export default NewProject;
