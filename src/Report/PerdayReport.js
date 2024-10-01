import React, { useEffect, useState } from "react";
import CanvasJSReact from "@canvasjs/react-charts";
import { getWithAuth } from "../provider/helper/axios";
import { ALLWORKANDMENDAYS } from "../../utils/constants/urls";

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const PerdayReport = (props) => {
  const [dataPoints, setDataPoints] = useState([]);

  const { filteredData } = props;

  const findProjectCPI = (projectId) => {
    const project = filteredData.find((proj) => proj.id === projectId);
    return project ? parseFloat(project.cpi) : 0;
  };

  const calculateRpePerDay = (projects) => {
    const rpeData = {};

    projects.forEach((project) => {
      const updateDate = project?.update_date?.split("T")[0];
      const cpi = findProjectCPI(project?.project_id);
      const rpePerDay = project?.total_achievement * cpi;
      if (rpeData[updateDate]) {
        rpeData[updateDate] += rpePerDay;
      } else {
        rpeData[updateDate] = rpePerDay;
      }
    });

    return rpeData;
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await getWithAuth(ALLWORKANDMENDAYS);
      const projectData = response.data;

      const rpeDataPoints = calculateRpePerDay(projectData);

      const fullDataPoints = generateFullDateRange(rpeDataPoints);
      setDataPoints(fullDataPoints);
    };
    fetchData();
  }, [filteredData]);

  const getDateRangeForLastMonth = () => {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - 1);
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(23, 59, 59, 999);

    const startFormatted = startDate.toISOString().split("T")[0];
    const endFormatted = endDate.toISOString().split("T")[0];

    return { start: startFormatted, end: endFormatted };
  };

  const generateFullDateRange = (rpeData) => {
    const fullData = [];
    const { start, end } = getDateRangeForLastMonth();

    const startDate = new Date(start);
    const endDate = new Date(end);

    let loopDate = new Date(startDate);

    while (loopDate <= endDate) {
      const formattedDate = loopDate.toISOString().split("T")[0];
      fullData.push({
        x: new Date(loopDate),
        y: rpeData[formattedDate] || 0,
      });
      loopDate.setDate(loopDate.getDate() + 1);
    }

    return fullData;
  };

  const options = {
    animationEnabled: true,
    exportEnabled: false,
    theme: "light2",
    title: {
      text: "Revenue Day Wise",
    },
    axisY: {
      title: "Revenue",
      suffix: "$",
    },
    axisX: {
      title: "Dates",
      interval: 1,
      intervalType: "day",
      valueFormatString: "DD-MM",
      labelFormatter: function (e) {
        const date = e.value;
        const options = { day: "2-digit" };
        return date.toLocaleDateString("en-GB", options);
      },
    },
    data: [
      {
        type: "line",
        toolTipContent: "{x}: {y}$",
        nullHandling: "ignore",
        dataPoints: dataPoints,
      },
    ],
  };

  return (
    <div>
      <CanvasJSChart options={options} />
    </div>
  );
};

export default PerdayReport;
