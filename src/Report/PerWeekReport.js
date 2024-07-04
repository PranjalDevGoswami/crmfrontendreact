import React, { useEffect, useState } from "react";
import { GetProjectData } from "../fetchApis/projects/getProjectData/GetProjectData";
import { BarChart } from "@mui/x-charts/BarChart";
import { ManWorkPerDays } from "../fetchApis/projects/perDayManWork/GetDaysManWork";

const PerWeekReport = () => {
  const [project, setProject] = useState([]);
  const [projectInProgress, setProjectInProgress] = useState([]);
  const [manWorkData, setManWorkData] = useState({});

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const fetchDataFromApi2 = await GetProjectData();
        const projectDataObject = fetchDataFromApi2?.data || [];
        setProject(projectDataObject);
      } catch (error) {
        console.error("Error fetching project data:", error);
      }
    };
    fetchProjectData();
  }, []);

  useEffect(() => {
    const ProjectInProgress = project.filter(
      (item) => item?.status === "inprogress"
    );
    setProjectInProgress(ProjectInProgress);
  }, [project]);

  const fetchManWorkData = async (projectCode) => {
    try {
      const response = await ManWorkPerDays({ project_code: projectCode });
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

      for (const project of projectInProgress) {
        const { project_code } = project;
        const data = await fetchManWorkData(project_code);
        manWorkData[project_code] = data;
      }

      setManWorkData(manWorkData);
    };

    if (projectInProgress.length > 0) {
      fetchAllManWorkData();
    }
  }, [projectInProgress]);

  const chartData = projectInProgress.map((project) => {
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

  return (
    <div className="w-full">
      <BarChart
        series={series}
        xAxis={[{ data: combinedData.labels, scaleType: "band" }]}
        margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
        height={400}
        title="Project Weekly Progress"
      />
    </div>
  );
};

export default PerWeekReport;
