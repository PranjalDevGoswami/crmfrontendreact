// import React, { useContext, useState, useEffect } from "react";
// import Button from "../../components/Button";
// import { FilterContext } from "../../ContextApi/FilterContext";
// import { ThemeContext } from "../../ContextApi/ThemeContext";

// const ProjectStatusTabs = ({ className }) => {
//   const { activeTabValue, setActiveTabValue, setSelectedStatus } =
//     useContext(FilterContext);
//   const { darkMode } = useContext(ThemeContext);
//   const [activeTabIndex, setActiveTabIndex] = useState(0);

//   const handleActiveTab = (e, index) => {
//     setActiveTabValue(e.target.value);
//     setSelectedStatus(e.target.value);
//     setActiveTabIndex(index);
//   };

//   const buttonName = [
//     "All",
//     "To be Started",
//     "In Progress",
//     "Completed",
//     "On Hold",
//     "CBR Raised",
//   ];
//   const buttonValue = [
//     "all",
//     "To be started",
//     "In Progress",
//     "Completed",
//     "On Hold",
//     "cbr_raised",
//   ];

//   useEffect(() => {
//     setActiveTabIndex(buttonValue.indexOf(activeTabValue));
//   }, [activeTabValue]);

//   return (
//     <div className={className}>
//       <div
//         className={`${
//           darkMode ? "bg-black text-white border" : "bg-gray-300"
//         } relative flex border-b`}
//       >
//         {buttonName.map((item, index) => (
//           <Button
//             key={index}
//             name={item}
//             value={buttonValue[index]}
//             className={`${
//               activeTabValue === buttonValue[index]
//                 ? "text-white bg-green-400 border-b-green-700 border-b-[4px]"
//                 : darkMode
//                 ? "text-gray-400 hover:text-blue-600"
//                 : "text-gray-600 hover:text-blue-600"
//             } px-2 py-2 focus:outline-none transition-all duration-500 text-sm mr-2`}
//             onClick={(e) => handleActiveTab(e, index)}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ProjectStatusTabs;

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
    "In Progress",
    "Completed",
    "On Hold",
    "CBR Raised",
  ];
  const buttonValue = [
    "all",
    "To be started",
    "In Progress",
    "Completed",
    "On Hold",
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
        } relative flex overflow-x-auto no-scrollbar`}
      >
        <div className="flex flex-nowrap">
          {buttonName.map((item, index) => (
            <Button
              key={index}
              name={item}
              value={buttonValue[index]}
              className={`${
                activeTabValue === buttonValue[index]
                  ? "text-white bg-green-400 border-b-green-700 border-b-[4px]"
                  : darkMode
                  ? "text-gray-400 hover:text-blue-600"
                  : "text-gray-600 hover:text-blue-600"
              } px-2 py-2 focus:outline-none transition-all duration-500 text-sm mr-2`}
              onClick={(e) => handleActiveTab(e, index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectStatusTabs;
