import React, { useContext, useEffect, useState } from "react";
import { PiDotsThreeOutlineLight } from "react-icons/pi";

const InProgressProject = ({ projectData }) => {
  const ProjectTotal = projectData?.length;
  const ProjectInProgress = projectData?.filter(
    (item) => item?.status === "In Progress"
  );

  return (
    <div className="w-80 h-48 bg-[#4CBC9A] text-white rounded-md m-2 shadow-lg">
      <h2 className="text-2xl font-bold pt-4 pl-4">Inprogress Project</h2>
      <div className="h-24 flex items-center justify-evenly text-xl">
        <span className="text-6xl cursor-pointer text-blue-600">
          {ProjectInProgress.length}
        </span>
        <PiDotsThreeOutlineLight className="text-6xl " />
      </div>
    </div>
  );
};

export default InProgressProject;
