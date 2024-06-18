import React, { useContext, useEffect } from "react";
import Button from "../../components/Button";
import { FilterContext } from "../../ContextApi/FilterContext";
import { ThemeContext } from "../../ContextApi/ThemeContext";
const ProjectStatusTabs = ({ className }) => {
  const { activeTabValue, setActiveTabValue, setSelectedStatus } =
    useContext(FilterContext);
  const { darkMode } = useContext(ThemeContext);

  const handleActiveTab = (e) => {
    setActiveTabValue(e.target.value);
    setSelectedStatus(e.target.value);
  };

  const buttonName = [
    "To be Started",
    "Inprogress",
    "Completed",
    "Hold",
    "CBR Raised",
  ];
  const buttonValue = [
    "to_be_started",
    "inprogress",
    "completed",
    "hold",
    "cbr_raised",
  ];
  return (
    <div className={className}>
      <div className="">
        {buttonName.map((item, index) => {
          return (
            <Button
              key={index}
              name={item}
              value={buttonValue[index]}
              className={`${
                activeTabValue === buttonValue[index] && "bg-green-400"
              } ${
                darkMode
                  ? "bg-black text-white border-white border"
                  : "bg-gray-200"
              }  mr-4 p-2 rounded-md `}
              onClick={handleActiveTab}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ProjectStatusTabs;
