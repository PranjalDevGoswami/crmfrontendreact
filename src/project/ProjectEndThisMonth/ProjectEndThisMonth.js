import React from "react";
import { BsSkipEnd } from "react-icons/bs";

const ProjectEndThisMonth = ({ projectData }) => {
  const getCurrentMonthDates = (projectData) => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    return projectData.filter((date) => {
      const dateObj = new Date(date.tentative_end_date);
      return (
        dateObj.getMonth() === currentMonth &&
        dateObj.getFullYear() === currentYear
      );
    });
  };

  const currentMonthDates = getCurrentMonthDates(projectData);

  const ProjectTotal = currentMonthDates?.length;

  const handleTrendingProject = () => {
    console.log("Trending Project");
  };

  return (
    <div className="w-1/5 h-40 bg-[#addaec] text-[rgb(0,0,255)] rounded-md m-2 shadow-xl flex flex-col justify-between">
      <h2 className="text-xl font-bold pt-4 pl-4">
        Project To be End This Month
      </h2>
      <div className="h-24 flex items-center justify-evenly text-xl">
        <span
          className="text-4xl cursor-pointer text-blue-600"
          onClick={handleTrendingProject}
        >
          {ProjectTotal}
        </span>
        <BsSkipEnd className="text-4xl" />
      </div>
    </div>
  );
};

export default ProjectEndThisMonth;
