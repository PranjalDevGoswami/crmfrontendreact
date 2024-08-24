import React, { useEffect, useState } from "react";
import { ManWorkPerDays } from "../fetchApis/projects/perDayManWork/GetDaysManWork";
import { BarChart } from "@mui/x-charts/BarChart";

const RPEWeek = ({ projectData }) => {
  const [manWorkData, setManWorkData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [barChartData, setBarChartData] = useState([]);
  const [totalMenRequired, setTotalMenRequired] = useState([]);

  useEffect(() => {
    const fetchAllManWorkData = async () => {
      try {
        const updatedManWorkData = {};
        for (const project of projectData) {
          const { id } = project;
          const response = await ManWorkPerDays({ project_id: id });
          if (response?.status) {
            updatedManWorkData[id] = response.data;
          }
        }
        setManWorkData(updatedManWorkData);
      } catch (error) {
        console.error("Error fetching man work data:", error);
        setError("Error fetching man work data. Please try again later.");
      }
    };
    if (projectData.length > 0) {
      fetchAllManWorkData();
    }
  }, [projectData]);

  useEffect(() => {
    const calculateBarChartData = () => {
      const newData = [];

      projectData.forEach(async (project) => {
        const { project_code, sample, name } = project;
        const projectData = manWorkData[project_code] || [];
        const firstWeekData = projectData.slice(0, 5);

        const totalAchievedTarget = firstWeekData.reduce(
          (sum, entry) => sum + Number(entry?.total_achievement ?? 0),
          0
        );

        const totalMenRequired = firstWeekData.reduce(
          (sum, entry) => sum + (entry.man_days ?? 0),
          0
        );
        setTotalMenRequired(totalMenRequired);

        const sampleRatio =
          totalMenRequired > 0
            ? (totalAchievedTarget ?? 0) / totalMenRequired
            : 0;

        newData.push({
          project_code: project_code,
          sampleRatio: sampleRatio,
        });

        if (newData.length === projectData.length) {
          setBarChartData(newData.slice());
        }
      });
    };

    if (Object.keys(manWorkData).length > 0) {
      calculateBarChartData();
    }
  }, [manWorkData, projectData]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="w-full">
      {barChartData.length > 0 ? (
        <BarChart
          series={[
            {
              data: barChartData.map((item) => item.sampleRatio),
              label: "Total Achieved Target/Total Men Required (Weekly)",
            },
          ]}
          xAxis={[
            {
              data: barChartData.map((item) => item.project_code),
              scaleType: "band",
            },
          ]}
          margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
          height={400}
          title="Project Weekly Progress"
        />
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default RPEWeek;
