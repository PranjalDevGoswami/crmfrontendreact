import React, { useState, useRef } from "react";
import CanvasJSReact from "@canvasjs/react-charts";
import { isFinanceDept, isOperationDept } from "../config/Departments";

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
    (item) => item?.department?.id == isOperationDept
  );
  const TeamLeadList = operationDeparmentUser.filter(
    (item) => item?.role?.id == isFinanceDept
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
    const teamLead = project.project_assigned_to_teamlead?.id;
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
