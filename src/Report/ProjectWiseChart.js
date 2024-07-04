import { useEffect, useState } from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { ProjectDetails } from "../fetchApis/projects/getProjectData/GetProjectData";

export default function ProjectWiseChart() {
  const [projectSampleSize, setProjectSampleSize] = useState([]);
  const [projectAchieveTarget, setProjectAchieveTarget] = useState([]);
  const [projectCode, setProjectCode] = useState([]);

  useEffect(() => {
    const ProjectDetail = async () => {
      const response = await ProjectDetails();
      const monthofProject = response.map((item) => item.tentative_end_date);
      const getCurrentMonthDates = (monthofProject) => {
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth(); // Note: getMonth() returns 0-indexed month (0 for January, 1 for February, etc.)
        const currentYear = currentDate.getFullYear();
        return monthofProject.filter((date) => {
          const dateObj = new Date(date);
          return (
            dateObj.getMonth() === currentMonth &&
            dateObj.getFullYear() === currentYear
          );
        });
      };
      const currentMonthDates = getCurrentMonthDates(monthofProject);
      const currentMonthProject = response.filter((item) => {
        return currentMonthDates.includes(item?.tentative_end_date);
      });
      const projectSample = currentMonthProject.map((item) => item?.sample);
      setProjectSampleSize(projectSample);

      const ProjectCode = currentMonthProject.map((item) =>
        item?.project_code.toUpperCase()
      );
      setProjectCode(ProjectCode);

      const ProjectAchievement = currentMonthProject.map(
        (item) => item?.total_achievement || "0"
      );
      setProjectAchieveTarget(ProjectAchievement);
    };
    ProjectDetail();
  }, []);

  series = [
    { data: projectSampleSize, label: "sample", stack: "total" },
    {
      data: projectAchieveTarget,
      label: "Achieved Target",
      stack: "total",
      color: "#bd1d1d",
    },
  ];

  xAxis = [{ data: projectCode, scaleType: "band" }];

  return (
    <div className="w-1/2">
      <BarChart
        series={series}
        xAxis={xAxis}
        margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
        // width={850}
        height={400}
        title="Project this Month"
      />
    </div>
  );
}
