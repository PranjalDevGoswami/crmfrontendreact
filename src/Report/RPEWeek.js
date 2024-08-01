import React, { useContext, useEffect, useState } from "react";
// import { GetProjectData } from "../fetchApis/projects/getProjectData/GetProjectData";
import { ManWorkPerDays } from "../fetchApis/projects/perDayManWork/GetDaysManWork";
import { BarChart } from "@mui/x-charts/BarChart";
import { FilterContext } from "../ContextApi/FilterContext";

const RPEWeek = () => {
  const [projectInProgress, setProjectInProgress] = useState([]);
  const [manWorkData, setManWorkData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [barChartData, setBarChartData] = useState([]);
  const [totalMenRequired, setTotalMenRequired] = useState([]);
  const { projectData } = useContext(FilterContext);

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        // const fetchDataFromApi = await GetProjectData();
        const projectDataObject = projectData?.data || [];
        const filteredProjects = projectDataObject.filter(
          (item) => item.status === "inprogress"
        );
        setProjectInProgress(filteredProjects);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching project data:", error);
        setError("Error fetching project data. Please try again later.");
        setLoading(false);
      }
    };
    fetchProjectData();
  }, []);

  useEffect(() => {
    const fetchAllManWorkData = async () => {
      try {
        const updatedManWorkData = {};

        for (const project of projectInProgress) {
          const { project_code } = project;
          const response = await ManWorkPerDays({ project_code });
          if (response?.status) {
            updatedManWorkData[project_code] = response.data;
          }
        }

        setManWorkData(updatedManWorkData);
      } catch (error) {
        console.error("Error fetching man work data:", error);
        setError("Error fetching man work data. Please try again later.");
      }
    };

    if (projectInProgress.length > 0) {
      fetchAllManWorkData();
    }
  }, [projectInProgress]);

  useEffect(() => {
    const calculateBarChartData = () => {
      const newData = [];

      projectInProgress.forEach(async (project) => {
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

        if (newData.length === projectInProgress.length) {
          setBarChartData(newData.slice());
        }
      });
    };

    if (Object.keys(manWorkData).length > 0) {
      calculateBarChartData();
    }
  }, [manWorkData, projectInProgress]);

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
