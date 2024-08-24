import React, { useEffect, useState } from "react";
import { ManWorkPerDays } from "../fetchApis/projects/perDayManWork/GetDaysManWork";
import { BarChart } from "@mui/x-charts/BarChart";
import ReportByTerm from "./ReportByTerm";

const PerWeekReport = ({ projectData }) => {
  const [manWorkData, setManWorkData] = useState({});
  const [selectedTerm, setSelectedTerm] = useState();

  const fetchManWorkData = async (id) => {
    try {
      const response = await ManWorkPerDays({ project_id: id });
      if (response?.status) {
        return response.data;
      }
    } catch (error) {
      console.error("Error fetching man work data:", error);
    }
    return [];
  };

  useEffect(() => {
    const fetchAllManWorkData = async () => {
      const manWorkData = {};
      for (const project of projectData) {
        const { id } = project;
        const data = await fetchManWorkData(id);
        manWorkData[id] = data;
      }
      setManWorkData(manWorkData);
    };
    if (projectData.length > 0) {
      fetchAllManWorkData();
    }
  }, [projectData]);
  console.log(selectedTerm);

  const chartData = projectData.map((project) => {
    const { project_code, sample, tentative_start_date, tentative_end_date } =
      project;
    const startDate = new Date(tentative_start_date);
    const endDate = new Date(tentative_end_date);
    const totalDays = (endDate - startDate) / (1000 * 3600 * 24);
    const totalWeeks = Math.ceil(totalDays / 7);

    const manWorkEntries = manWorkData[project_code] || [];
    const weeklyAchievements = Array(totalWeeks).fill(0);
    const samplePerWeek = sample / totalWeeks;

    // Sum up the entries for each week
    manWorkEntries.forEach((entry, index) => {
      const weekIndex = Math.floor(index / 5);
      if (weekIndex < totalWeeks) {
        weeklyAchievements[weekIndex] += parseFloat(
          entry.total_achievement || 0
        );
      }
    });

    return {
      project_code,
      target: Array(totalWeeks).fill(samplePerWeek),
      achieved: weeklyAchievements,
      totalWeeks,
    };
  });

  const combinedData = {
    target: [],
    achieved: [],
    labels: [],
  };

  chartData.forEach((data) => {
    combinedData.target.push(...data.target);
    combinedData.achieved.push(...data.achieved);
    combinedData.labels.push(
      ...Array.from(
        { length: data.totalWeeks },
        (_, i) => `${data.project_code} - Week ${i + 1}`
      )
    );
  });

  const series = [
    {
      data: combinedData.target,
      label: "Target",
    },
    {
      data: combinedData.achieved,
      label: "Achieved",
      color: "#bd1d1d",
    },
  ];

  const xLabels = combinedData.labels.map((item) => item);

  const chartSetting = {
    xAxis: [
      {
        label: "rainfall (mm)",
      },
    ],
    // width: 500,
    height: 400,
  };

  const valueFormatter = (value) => `${value}mm`;

  const dataset = [
    {
      london: 59,
      paris: 57,
      newYork: 86,
      seoul: 21,
      month: "Jan",
    },
  ];

  return (
    <div className="w-full">
      <div className="text-right w-full">
        <ReportByTerm setSelectedTerm={setSelectedTerm} />
      </div>
      <div className="w-screen overflow-scroll">
        {/* <LineChart
          // width={500}
          height={300}
          series={series}
          xAxis={[{ scaleType: "point", data: xLabels }]}
        /> */}
        <BarChart
          dataset={dataset}
          xAxis={[{ scaleType: "band", dataKey: "month" }]}
          series={[
            {
              dataKey: "Remaining Target",
              label: "Remaining Target",
              valueFormatter,
            },
            {
              dataKey: "Achieved Target",
              label: "Achieved Target",
              valueFormatter,
            },
          ]}
          layout="horizontal"
          {...chartSetting}
        />
      </div>
    </div>
  );
};

export default PerWeekReport;
