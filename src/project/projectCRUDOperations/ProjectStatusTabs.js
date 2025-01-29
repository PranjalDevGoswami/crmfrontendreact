import React, { useContext, useState, useEffect } from "react";
import Button from "../../Atom/Button";
import { FilterContext } from "../../ContextApi/FilterContext";
import { useSelector } from "react-redux";
import { isFinanceDept } from "../../config/Departments";
import { useLocation, useParams } from "react-router-dom";

const ProjectStatusTabs = ({ className }) => {
  const { activeTabValue, setActiveTabValue, setSelectedStatus } =
    useContext(FilterContext);
  const darkMode = useSelector((store) => store.darkMode.isDarkMode);
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const handleActiveTab = (e, index) => {
    setActiveTabValue(e.target.value);
    setSelectedStatus(e.target.value);
    setActiveTabIndex(index);
  };
  const location = useLocation();
  
  // const buttonName = [
  //   "All",
  //   "Project Initiated",
  //   "To Be Started",
  //   "In Progress",
  //   "On Hold",
  //   "Completed",
  //   "CBR Raised",
  // ];
  // const buttonValue = [
  //   "all",
  //   "Project Initiated",
  //   "To Be Started",
  //   "In Progress",
  //   "On Hold",
  //   "Completed",
  //   "cbr_raised",
  // ];

  const department = localStorage.getItem('department') 

// Define button names and values with all possible options
// const allButtons = [
//   { name: "All", value: "all" },
//   { name: "Project Initiated", value: "Project Initiated" },
//   { name: "To Be Started", value: "To Be Started" },
//   { name: "In Progress", value: "In Progress" },
//   { name: "On Hold", value: "On Hold" },
//   { name: "Completed", value: "Completed" },
//   { name: "CBR", value: "cbr raised" },
//   (department == isFinanceDept) && { name: "VBR", value: "vbr_raised" },
//   (department ==  isFinanceDept) && { name: "ABR", value: "abr_raised" },
// ];
// console.log("🚀 ~ ProjectStatusTabs ~ allButtons:", allButtons)

// // Separate into buttonName and buttonValue arrays
// const buttonName = allButtons.map(({ name }) => name);
// const buttonValue = allButtons.map(({ value }) => value);


// const allButtons = department == isFinanceDept
//   ? [
//       { name: "Invoice to be Raised", value: "cbr raised" },
//       { name: "Invoice Generated", value: "Invoice Generated" },
//       { name: "Payment Received", value: "Payment Received" },
//       { name: "Advanced Billing Raised", value: "Advanced Billing Raised" },
//       { name: "Advanced Invoice Generated", value: "Advanced Invoice Generated" },
//       { name: "Advance Payment Received", value: "Advance Payment Received" },      
//     ]
//   : [
//       { name: "All", value: "all" },
//       { name: "Project Initiated", value: "Project Initiated" },
//       { name: "To Be Started", value: "To Be Started" },
//       { name: "In Progress", value: "In Progress" },
//       { name: "On Hold", value: "On Hold" },
//       { name: "Completed", value: "Completed" },
//       { name: "CBR", value: "cbr raised" },
//     ];


const allButtons =
  isFinanceDept
    ? location.pathname === "/cbr"
      ? [
          { name: "Invoice to be Raised", value: "cbr raised" },
          { name: "Invoice Generated", value: "Invoice Generated" },
          { name: "Payment Received", value: "Payment Received" },
        ]
      : location.pathname === "/abr"
      ? [
          { name: "Advanced Billing Raised", value: "Advanced Billing Raised" },
          { name: "Advanced Invoice Generated", value: "Advanced Invoice Generated" },
          { name: "Advance Payment Received", value: "Advance Payment Received" },
        ]
      : [] // Default case when not /cbr or /abr
    : [
        { name: "All", value: "all" },
        { name: "Project Initiated", value: "Project Initiated" },
        { name: "To Be Started", value: "To Be Started" },
        { name: "In Progress", value: "In Progress" },
        { name: "On Hold", value: "On Hold" },
        { name: "Completed", value: "Completed" },
        { name: "CBR", value: "cbr raised" },
      ];


// Separate into buttonName and buttonValue arrays
const buttonName = allButtons.map(({ name }) => name);
const buttonValue = allButtons.map(({ value }) => value);


  useEffect(() => {
    setActiveTabIndex(buttonValue?.indexOf(activeTabValue));
  }, [activeTabValue]);

  return (
    <div className={className}>
      <div
        className={`${
          darkMode ? "bg-black text-white" : ""
        } relative flex overflow-x-auto no-scrollbar`}
      >
        <div className="flex flex-nowrap">
          {buttonName.map((item, index) => (
            <Button
              key={index}
              name={item}
              value={buttonValue[index]}
              className={`${
                activeTabValue == buttonValue[index]
                  ? "text-white bg-green-400"
                  : darkMode
                  ? "text-gray-400 hover:text-blue-600"
                  : "text-gray-600 hover:text-blue-600"
              } px-2 py-2 focus:outline-none transition-all duration-500 text-sm mr-2 bg-gray-100 rounded-md filterTabsButton`}
              onClick={(e) => handleActiveTab(e, index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectStatusTabs;
