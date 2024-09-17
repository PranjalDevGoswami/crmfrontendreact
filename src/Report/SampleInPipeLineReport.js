// import React, { useState, useEffect, useRef } from "react";
// import CanvasJSReact from "@canvasjs/react-charts";

// var CanvasJSChart = CanvasJSReact.CanvasJSChart;

// const SampleInPipeLineReport = ({ projectData, userList }) => {
//   const chartRef = useRef(null);

//   // Get the current quarter
//   const getCurrentQuarter = () => {
//     const month = new Date().getMonth() + 1;
//     if (month >= 1 && month <= 3) return "Q1";
//     if (month >= 4 && month <= 6) return "Q2";
//     if (month >= 7 && month <= 9) return "Q3";
//     return "Q4";
//   };

//   const [selectedQuarter, setSelectedQuarter] = useState(getCurrentQuarter());

//   // Group projects by quarter
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

//   // Calculate pipeline and prepare data for the chart
//   const calculatePipeline = () => {
//     const teamLeadPipeline = {};

//     // Filter projects for the selected quarter
//     const filteredProjects = groupedByQuarter[selectedQuarter];

//     filteredProjects.forEach((project) => {
//       const startDate = new Date(project.tentative_start_date);
//       const endDate = new Date(project.tentative_end_date);
//       const totalSample = parseInt(project.sample, 10);
//       const totalDays = (endDate - startDate) / (1000 * 60 * 60 * 24);
//       const pipeline = totalDays > 0 ? totalSample / totalDays : 0;

//       const teamLeadId = project.project_assigned_to_teamlead;
//       if (!teamLeadPipeline[teamLeadId]) {
//         teamLeadPipeline[teamLeadId] = Array(12).fill(0); // 12 weeks in a quarter
//       }

//       // Distribute the pipeline across weeks
//       const totalWeeks = Math.ceil(totalDays / 7);
//       for (let week = 0; week < totalWeeks; week++) {
//         teamLeadPipeline[teamLeadId][week] += pipeline / totalWeeks;
//       }
//     });

//     // Add team lead names and prepare data for the chart
//     const teamLeadData = Object.keys(teamLeadPipeline).map((teamLeadId) => {
//       const teamLead = userList.find(
//         (user) => user.id === parseInt(teamLeadId, 10)
//       );
//       return {
//         name: teamLead ? teamLead.name : "Unknown",
//         pipeline: teamLeadPipeline[teamLeadId],
//       };
//     });

//     return teamLeadData;
//   };

//   const [chartData, setChartData] = useState([]);

//   useEffect(() => {
//     setChartData(calculatePipeline());
//   }, [projectData, selectedQuarter, userList]);

//   // Prepare data points for the chart
//   const dataPoints = [];
//   chartData.forEach((teamLead) => {
//     teamLead.pipeline.forEach((value, index) => {
//       dataPoints.push({
//         label: `Week ${index + 1}`,
//         name: teamLead.name,
//         y: value,
//       });
//     });
//   });

//   const options = {
//     animationEnabled: true,
//     theme: "light2",
//     title: {
//       text: "Weekly Sample Pipeline per Team Lead",
//     },
//     axisX: {
//       title: "Week",
//       interval: 1,
//     },
//     axisY: {
//       title: "Team Lead",
//       includeZero: true,
//     },
//     data: [
//       {
//         type: "line",
//         name: "Sample Pipeline",
//         showInLegend: true,
//         dataPoints: dataPoints,
//       },
//     ],
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

// import React, { useState, useRef } from "react";
// import CanvasJSReact from "@canvasjs/react-charts";

// var CanvasJSChart = CanvasJSReact.CanvasJSChart;

// const SampleInPipeLineReport = ({ projectData, userList }) => {
//   const chartRef = useRef(null);

//   const getCurrentQuarter = () => {
//     const month = new Date().getMonth() + 1;
//     if (month >= 1 && month <= 3) return "Q1";
//     if (month >= 4 && month <= 6) return "Q2";
//     if (month >= 7 && month <= 9) return "Q3";
//     return "Q4";
//   };

//   const [selectedQuarter, setSelectedQuarter] = useState(getCurrentQuarter());

//   // Map team lead IDs to names
//   const teamLeadNames = {};
//   const operationDeparmentUser = userList.filter(
//     (item) => item?.department?.id == 2
//   );
//   const TeamLeadList = operationDeparmentUser.filter(
//     (item) => item?.role?.id == 3
//   );
//   TeamLeadList.forEach((user) => {
//     teamLeadNames[user.user.id] = user.user_role.name;
//   });
//   console.log("🚀 ~ TeamLeadList.forEach ~ TeamLeadList:", teamLeadNames);

//   // Filter projects by status
//   const filteredProjects = projectData.filter(
//     (item) => item.status === "In Progress" || item.status === "To Be Started"
//   );

//   const projectsByTeamLead = {};

//   filteredProjects.forEach((project) => {
//     const teamLead = project.project_assigned_to_teamlead;
//     const startDate = new Date(project.tentative_start_date);
//     const endDate = new Date(project.tentative_end_date);
//     const sampleSize = parseInt(project.sample, 10);

//     if (!projectsByTeamLead[teamLead]) {
//       projectsByTeamLead[teamLead] = [];
//     }

//     const month = startDate.getMonth() + 1;
//     if (
//       (selectedQuarter === "Q1" && month >= 1 && month <= 3) ||
//       (selectedQuarter === "Q2" && month >= 4 && month <= 6) ||
//       (selectedQuarter === "Q3" && month >= 7 && month <= 9) ||
//       (selectedQuarter === "Q4" && month >= 10 && month <= 12)
//     ) {
//       projectsByTeamLead[teamLead].push({ startDate, endDate, sampleSize });
//     }
//   });

//   const getWeeklySamples = (startDate, endDate, totalSampleSize) => {
//     const oneWeek = 1000 * 60 * 60 * 24 * 7;
//     const today = new Date();
//     today.setHours(0, 0, 0, 0); // Set today's date to midnight

//     if (startDate > today) {
//       startDate = today;
//     }

//     const totalDays = (endDate - startDate) / (1000 * 60 * 60 * 24);
//     const totalWeeks = Math.ceil(totalDays / 7);
//     const weeklySample = totalSampleSize / totalWeeks;

//     return Array.from({ length: totalWeeks }, (_, i) => {
//       const weekStartDate = new Date(
//         startDate.getFullYear(),
//         startDate.getMonth(),
//         startDate.getDate() + i * 7
//       );
//       // if (weekStartDate < today) return null; // Skip weeks before today
//       return { x: weekStartDate, y: weeklySample };
//     }).filter(Boolean); // Remove null values
//   };

//   const chartData = Object.keys(projectsByTeamLead).map((teamLead) => {
//     const weeklySamples = [];
//     projectsByTeamLead[teamLead].forEach((project) => {
//       const { startDate, endDate, sampleSize } = project;
//       const projectSamples = getWeeklySamples(startDate, endDate, sampleSize);

//       projectSamples.forEach((sample, index) => {
//         if (weeklySamples[index]) {
//           weeklySamples[index].y += sample.y;
//         } else {
//           weeklySamples[index] = { x: sample.x, y: sample.y };
//         }
//       });
//     });

//     return {
//       type: "line",
//       name: teamLeadNames, // Display team lead name or fallback to ID
//       // showInLegend: true,
//       dataPoints: weeklySamples,
//     };
//   });

//   const options = {
//     animationEnabled: true,
//     theme: "light2",
//     title: {
//       text: "Weekly Sample Size Distribution per Team Lead",
//     },
//     axisX: {
//       title: "Weeks",
//       valueFormatString: "YYYY-MM-DD",
//     },
//     axisY: {
//       title: "Team Lead",
//       labelFormatter: function (e) {
//         return e.teamLeadNames; // Ensure team lead names are used here
//       },
//     },
//     data: chartData,
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

import React, { useState, useRef } from "react";
import CanvasJSReact from "@canvasjs/react-charts";

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const SampleInPipeLineReport = ({ projectData, userList }) => {
  const chartRef = useRef(null);

  const getCurrentQuarter = () => {
    const month = new Date().getMonth() + 1;
    if (month >= 1 && month <= 3) return "Q1";
    if (month >= 4 && month <= 6) return "Q2";
    if (month >= 7 && month <= 9) return "Q3";
    return "Q4";
  };

  const [selectedQuarter, setSelectedQuarter] = useState(getCurrentQuarter());

  // Map team lead IDs to names
  const teamLeadNames = {};
  const operationDeparmentUser = userList.filter(
    (item) => item?.department?.id === 2
  );
  const TeamLeadList = operationDeparmentUser.filter(
    (item) => item?.role?.id === 3
  );

  TeamLeadList.forEach((user) => {
    teamLeadNames[user.user.id] = user.user.name;
  });

  // Filter projects by status
  const filteredProjects = projectData.filter(
    (item) => item.status === "In Progress" || item.status === "To Be Started"
  );

  const projectsByTeamLead = {};

  filteredProjects.forEach((project) => {
    const teamLead = project.project_assigned_to_teamlead;
    const startDate = new Date(project.tentative_start_date);
    const endDate = new Date(project.tentative_end_date);
    const sampleSize = parseInt(project.sample, 10);

    if (!projectsByTeamLead[teamLead]) {
      projectsByTeamLead[teamLead] = [];
    }

    const month = startDate.getMonth() + 1;
    if (
      (selectedQuarter === "Q1" && month >= 1 && month <= 3) ||
      (selectedQuarter === "Q2" && month >= 4 && month <= 6) ||
      (selectedQuarter === "Q3" && month >= 7 && month <= 9) ||
      (selectedQuarter === "Q4" && month >= 10 && month <= 12)
    ) {
      projectsByTeamLead[teamLead].push({ startDate, endDate, sampleSize });
    }
  });

  const getWeeklySamples = (startDate, endDate, totalSampleSize) => {
    const oneWeek = 1000 * 60 * 60 * 24 * 7;
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set today's date to midnight

    if (startDate > today) {
      startDate = today;
    }

    const totalDays = (endDate - startDate) / (1000 * 60 * 60 * 24);
    const totalWeeks = Math.ceil(totalDays / 7);
    const weeklySample = totalSampleSize / totalWeeks;

    return Array.from({ length: totalWeeks }, (_, i) => {
      const weekStartDate = new Date(
        startDate.getFullYear(),
        startDate.getMonth(),
        startDate.getDate() + i * 7
      );
      return { x: weekStartDate, y: weeklySample };
    }).filter(Boolean); // Remove null values
  };

  const chartData = Object.keys(projectsByTeamLead).map((teamLead) => {
    const weeklySamples = [];
    projectsByTeamLead[teamLead].forEach((project) => {
      const { startDate, endDate, sampleSize } = project;
      const projectSamples = getWeeklySamples(startDate, endDate, sampleSize);

      projectSamples.forEach((sample, index) => {
        if (weeklySamples[index]) {
          weeklySamples[index].y += sample.y;
        } else {
          weeklySamples[index] = { x: sample.x, y: sample.y };
        }
      });
    });

    return {
      type: "line",
      name: teamLeadNames[teamLead] || teamLead, // Display team lead name or fallback to ID
      showInLegend: true,
      dataPoints: weeklySamples,
    };
  });

  const options = {
    animationEnabled: true,
    theme: "light2",
    title: {
      text: "Weekly Sample Size Distribution per Team Lead",
    },
    axisX: {
      title: "Weeks",
      valueFormatString: "YYYY-MM-DD",
    },
    axisY: {
      title: "Team Lead",
      // labelFormatter: function (e) {
      //   return teamLeadNames[e.name] || e.name; // Map ID to name on Y axis
      // },
    },
    data: chartData,
  };

  return (
    <div className="w-full">
      <div style={{ marginBottom: "20px" }}>
        <label>Select Quarter: </label>
        <select
          value={selectedQuarter}
          onChange={(e) => setSelectedQuarter(e.target.value)}
        >
          <option value="Q1">Q1 (Jan-Mar)</option>
          <option value="Q2">Q2 (Apr-Jun)</option>
          <option value="Q3">Q3 (Jul-Sep)</option>
          <option value="Q4">Q4 (Oct-Dec)</option>
        </select>
      </div>
      <CanvasJSChart
        options={options}
        onRef={(ref) => (chartRef.current = ref)}
      />
    </div>
  );
};

export default SampleInPipeLineReport;
