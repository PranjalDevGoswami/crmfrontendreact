import React, { useContext, useState, useEffect } from "react";
import Button from "../../components/Button";
import { FilterContext } from "../../ContextApi/FilterContext";
import { ThemeContext } from "../../ContextApi/ThemeContext";

const ProjectStatusTabs = ({ className }) => {
  const { activeTabValue, setActiveTabValue, setSelectedStatus } =
    useContext(FilterContext);
  const { darkMode } = useContext(ThemeContext);
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const handleActiveTab = (e, index) => {
    setActiveTabValue(e.target.value);
    setSelectedStatus(e.target.value);
    setActiveTabIndex(index);
  };

  const buttonName = [
    "All",
    "To be Started",
    "Inprogress",
    "Completed",
    "Hold",
    "CBR Raised",
  ];
  const buttonValue = [
    "all",
    "to_be_started",
    "inprogress",
    "completed",
    "hold",
    "cbr_raised",
  ];

  useEffect(() => {
    setActiveTabIndex(buttonValue.indexOf(activeTabValue));
  }, [activeTabValue]);

  return (
    <div className={className}>
      <div
        className={`${
          darkMode ? "bg-black text-white border" : "bg-gray-300"
        } relative flex border-b`}
      >
        {buttonName.map((item, index) => (
          <Button
            key={index}
            name={item}
            value={buttonValue[index]}
            className={`${
              activeTabValue === buttonValue[index]
                ? "text-white bg-green-400 border-b-green-700 border-b-[5px]"
                : darkMode
                ? "text-gray-400 hover:text-blue-600"
                : "text-gray-600 hover:text-blue-600"
            } px-4 py-2 focus:outline-none transition-all duration-500`}
            onClick={(e) => handleActiveTab(e, index)}
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectStatusTabs;
