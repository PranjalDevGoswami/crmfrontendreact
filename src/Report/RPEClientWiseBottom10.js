import React, { useEffect, useState } from "react";
import CanvasJSReact from "@canvasjs/react-charts";

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const RPEClientWiseBottom = ({ projectData }) => {
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
          acc[clientName].revenue += revenue;
          acc[clientName].sample += sampleSize;
        } else {
          acc[clientName] = { revenue, sample: sampleSize };
        }

        return acc;
      }, {});

      const clientArray = Object.keys(clientRevenueMap).map((clientName) => ({
        name: clientName,
        totalRevenue: clientRevenueMap[clientName].revenue,
        totalSample: clientRevenueMap[clientName].sample,
      }));

      const sortedClients = clientArray
        .sort((a, b) =>
          view === "RevenueWise"
            ? a.totalRevenue - b.totalRevenue
            : a.totalSample - b.totalSample
        )
        .slice(0, 10);

      setClientData(sortedClients);
    }
  }, [projectData, view]);

  const isValidData = clientData.length > 0;

  const chartOptions = {
    animationEnabled: true,
    // height: 1000,
    title: {
      text:
        view === "RevenueWise"
          ? "Bottom 10 Clients by Revenue"
          : "Bottom 10 Clients by Sample Volume",
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
        // <div>
        <CanvasJSChart options={chartOptions} />
      ) : (
        // </div>
        <p>No valid data available for the selected projects.</p>
      )}
    </div>
  );
};

export default RPEClientWiseBottom;
