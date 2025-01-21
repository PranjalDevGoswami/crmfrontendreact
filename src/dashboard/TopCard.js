import React from "react";

const TopCard = ({ projectData, cardTitle, cardIcon }) => {
  const { dataToShow } = projectData;
  return (
    <div className="w-1/5 h-40 bg-[#addaec] text-[rgb(0,0,255)] rounded-md m-2 shadow-xl flex flex-col justify-between">
      <h2 className="text-xl font-bold pt-4 pl-4">{cardTitle}</h2>
      <div className="h-24 flex items-center justify-evenly text-xl">
        <span className="text-4xl cursor-pointer text-blue-600">
          {dataToShow}
        </span>
        <cardIcon className="text-4xl " />
      </div>
    </div>
  );
};

export default TopCard;
