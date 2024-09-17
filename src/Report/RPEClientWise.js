import React, { useEffect, useState } from "react";
import CanvasJSReact from "@canvasjs/react-charts";

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const RPEClientWise = ({
  projectData,
  userList,
  setProjectType,
  projectType,
  filteredData,
  setFilteredData,
  setProjectStatus,
}) => {
  const [topClientData, setTopClientData] = useState([]);

  useEffect(() => {
    if (projectType.length > 0) {
      let filtered = projectData.filter(
        (item) =>
          item.project_type.name.toLowerCase() ===
          projectType[0].label.toLowerCase()
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(projectData);
    }
  }, [projectType, projectData]);

  useEffect(() => {
    if (filteredData && filteredData.length > 0) {
      // Step 1: Aggregate CPI * AchieveTarget and total man days for each client
      const clientAggregateMap = filteredData.reduce((acc, item) => {
        const clientName = item?.clients?.name;
        const achieveTarget = parseFloat(item.total_achievement);
        const cpi = parseFloat(item.cpi);
        const manDays = parseFloat(item.man_days);

        // Ensure the values are valid numbers before performing calculations
        const isValidAchievement = !isNaN(achieveTarget) && achieveTarget > 0;
        const isValidCpi = !isNaN(cpi) && cpi > 0;
        const isValidManDays = !isNaN(manDays) && manDays > 0;

        if (isValidAchievement && isValidCpi) {
          const revenue = achieveTarget * cpi;

          if (!acc[clientName]) {
            acc[clientName] = {
              totalRevenue: 0,
              totalManDays: 0,
            };
          }

          acc[clientName].totalRevenue += revenue;
          if (isValidManDays) {
            acc[clientName].totalManDays += manDays;
          }
        }

        return acc;
      }, {});

      // Step 2: Sort clients by total Revenue and get top and top 10
      const sortedClients = Object.keys(clientAggregateMap)
        .map((clientName) => ({
          name: clientName,
          totalRevenue: clientAggregateMap[clientName].totalRevenue,
          revenuePerEmployee:
            clientAggregateMap[clientName].totalRevenue /
            clientAggregateMap[clientName].totalManDays,
        }))
        .sort((a, b) => b.revenuePerEmployee - a.revenuePerEmployee);

      // Get top 10 clients
      const topClients = sortedClients.slice(-10);
      setTopClientData(topClients);
    }
  }, [filteredData]);

  const isValidTopData = topClientData.length > 0;

  const topChartOptions = {
    animationEnabled: true,
    // title: {
    //   text: "top 10 Clients by Revenue per Employee",
    // },
    axisX: {
      title: "Client Name",
      interval: 1,
      labelAngle: -45,
    },
    axisY: {
      title: "Revenue per Employee",
      prefix: "$",
    },
    data: [
      {
        type: "column",
        name: "Revenue per Employee",
        showInLegend: false,
        dataPoints: topClientData.map((data) => ({
          label: data.name,
          y: data.revenuePerEmployee,
        })),
      },
    ],
  };
  const label = { inputProps: { "aria-label": "Switch demo" } };
  return (
    <div className="w-full">
      {isValidTopData ? (
        <>
          <CanvasJSChart options={topChartOptions} />
        </>
      ) : (
        <p>No valid data available for the selected projects.</p>
      )}
    </div>
  );
};

export default RPEClientWise;
