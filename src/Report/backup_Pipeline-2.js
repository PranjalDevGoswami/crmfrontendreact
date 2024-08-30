// import React, { useState, useRef } from "react";
// import CanvasJSReact from "@canvasjs/react-charts";

// var CanvasJSChart = CanvasJSReact.CanvasJSChart;

// const SampleInPipeLineReport = ({ projectData }) => {
//   const chartRef = useRef(null);

//   const getCurrentQuarter = () => {
//     const month = new Date().getMonth() + 1;
//     if (month >= 1 && month <= 3) return "Q1";
//     if (month >= 4 && month <= 6) return "Q2";
//     if (month >= 7 && month <= 9) return "Q3";
//     return "Q4";
//   };

//   const [selectedQuarter, setSelectedQuarter] = useState(getCurrentQuarter());

//   const groupedByQuarter = {
//     Q1: [],
//     Q2: [],
//     Q3: [],
//     Q4: [],
//   };

//   projectData = projectData.filter(
//     (item) => item.status === "In Progress" || item.status === "To Be Started"
//   );

//   projectData.forEach((item) => {
//     const startDate = new Date(item.tentative_start_date);
//     const month = startDate.getMonth() + 1;

//     if (month >= 1 && month <= 3) groupedByQuarter.Q1.push(item);
//     else if (month >= 4 && month <= 6) groupedByQuarter.Q2.push(item);
//     else if (month >= 7 && month <= 9) groupedByQuarter.Q3.push(item);
//     else if (month >= 10 && month <= 12) groupedByQuarter.Q4.push(item);
//   });

//   const getWeekNumber = (date) => {
//     const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
//     const dayOfMonth = date.getDate();
//     return Math.floor(dayOfMonth / 7) + 1;
//   };

//   const calculateTotalWeeks = (startDate, endDate) => {
//     const oneWeek = 1000 * 60 * 60 * 24 * 7; // One week in milliseconds
//     const differenceInTime = endDate - startDate;
//     const totalWeeks = Math.ceil(differenceInTime / oneWeek);
//     return totalWeeks;
//   };

//   const calculateWeeklySample = (sampleSize, totalWeeks) => {
//     const weeklySample = sampleSize / totalWeeks;
//     return weeklySample;
//   };

//   const filteredProjects = groupedByQuarter[selectedQuarter].map((project) => {
//     const startDate = new Date(project.tentative_start_date);
//     const endDate = new Date(project.tentative_end_date);
//     const totalWeeks = calculateTotalWeeks(startDate, endDate);
//     const weeklySample = calculateWeeklySample(
//       parseInt(project.sample, 10),
//       totalWeeks
//     );

//     const weekSamples = Array.from({ length: totalWeeks }, (_, i) => ({
//       x: new Date(
//         startDate.getFullYear(),
//         startDate.getMonth(),
//         startDate.getDate() + i * 7
//       ),
//       y: weeklySample,
//     }));

//     return {
//       type: "line",
//       name: project.name,
//       showInLegend: true,
//       dataPoints: weekSamples,
//     };
//   });

//   const options = {
//     animationEnabled: true,
//     theme: "light2",
//     title: {
//       text: "Weekly Sample Size Distribution per Project",
//     },
//     axisX: {
//       title: "Weeks",
//       valueFormatString: "YYYY-MM-DD",
//     },
//     axisY: {
//       title: "Weekly Sample Size",
//       includeZero: true,
//     },
//     data: filteredProjects,
//   };

//   return (
//     <div className="w-full">
//       <div style={{ marginBottom: "20px" }}>
//         <label>Select Quarter: </label>
//         <select
//           value={selectedQuarter}
//           onChange={(e) => setSelectedQuarter(e.target.value)}
//         >
//           <option value="Q1">Q1 (Jan-Mar)</option>
//           <option value="Q2">Q2 (Apr-Jun)</option>
//           <option value="Q3">Q3 (Jul-Sep)</option>
//           <option value="Q4">Q4 (Oct-Dec)</option>
//         </select>
//       </div>
//       <CanvasJSChart
//         options={options}
//         onRef={(ref) => (chartRef.current = ref)}
//       />
//     </div>
//   );
// };

// export default SampleInPipeLineReport;
