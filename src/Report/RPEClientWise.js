import React, { useEffect, useState } from "react";
import CanvasJSReact from "@canvasjs/react-charts";

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const RPEClientWise = ({ projectData }) => {
  const [clientData, setClientData] = useState([]);
  const [view, setView] = useState("RevenueWise"); // Toggle view state

  useEffect(() => {
    if (projectData && projectData.length > 0) {
      const clientRevenueMap = projectData.reduce((acc, item) => {
        const clientName = item.clients.name;
        const sampleSize = parseInt(item.sample, 10);
        const cpi = parseFloat(item.cpi); // Assume cpi is a string and needs conversion to float

        const revenue = sampleSize * cpi;

        if (acc[clientName]) {
          acc[clientName] += revenue;
        } else {
          acc[clientName] = revenue;
        }

        return acc;
      }, {});

      const clientArray = Object.keys(clientRevenueMap).map((clientName) => ({
        name: clientName,
        totalRevenue: clientRevenueMap[clientName],
        totalSample: projectData
          .filter((item) => item.clients.name === clientName)
          .reduce((sum, item) => sum + parseInt(item.sample, 10), 0),
      }));

      const sortedClients = clientArray
        .sort(
          (a, b) =>
            (view === "RevenueWise" ? b.totalRevenue : b.totalSample) -
            (view === "RevenueWise" ? a.totalRevenue : a.totalSample)
        )
        .slice(0, 10);

      setClientData(sortedClients);
    }
  }, [projectData, view]);

  const isValidData = clientData.length > 0;

  const chartOptions = {
    animationEnabled: true,
    title: {
      text: view === "RevenueWise" ? "Client Revenue" : "Client Sample Volume",
    },
    axisX: {
      title: "Client",
      interval: 1,
      labelAngle: -45,
    },
    axisY: {
      title: view === "RevenueWise" ? "Revenue" : "Sample Volume",
      prefix: view === "RevenueWise" ? "$" : "",
    },
    data: [
      {
        type: "column", // Change to 'line' or 'column' based on preference
        name:
          view === "RevenueWise"
            ? "Revenue per Client"
            : "Sample Volume per Client",
        showInLegend: true,
        dataPoints: clientData.map((data) => ({
          label: data.name,
          y: view === "RevenueWise" ? data.totalRevenue : data.totalSample,
        })),
      },
    ],
  };

  return (
    <div className="w-full">
      <div className="toggle-buttons">
        <button
          className="p-2 m-2 rounded-sm bg-red-200"
          onClick={() => setView("VolumeWise")}
        >
          Volume Wise
        </button>
        <button
          className="p-2 m-2 rounded-sm bg-red-200"
          onClick={() => setView("RevenueWise")}
        >
          Revenue Wise
        </button>
      </div>
      {isValidData ? (
        <CanvasJSChart options={chartOptions} />
      ) : (
        <p>No valid data available for the selected projects.</p>
      )}
    </div>
  );
};

export default RPEClientWise;
