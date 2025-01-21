import React from "react";
import CanvasJSReact from "@canvasjs/react-charts";

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const ClientInduvisualReport = ({ clientName, projectData }) => {
  const currentClient = projectData?.filter(
    (item) => item?.clients?.name === clientName
  );
  // console.log("🚀 ~ ClientInduvisualReport ~ currentClient:", currentClient);
  const chartOptions = {
    data: [
      {
        type: "column",
        dataPoints: currentClient.map((client) => ({
          label: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
          y: [5, 10, 15],
        })),
      },
    ],
  };
  return (
    <div>
      <CanvasJSChart options={chartOptions} />
    </div>
  );
};

export default ClientInduvisualReport;
