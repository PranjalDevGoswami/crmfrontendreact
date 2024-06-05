import { useEffect, useState } from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { GetProjectData } from "../fetchApis/projects/getProjectData/GetProjectData";

export default function ReportChart() {
  const [project, setProject] = useState([]);

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const fetchDataFromApi2 = await GetProjectData();
        const projectDataObject = fetchDataFromApi2?.data?.map((val) => {
          return val;
        });
        setProject(projectDataObject);
      } catch (error) {
        console.error("Error fetching project data:", error);
      }
    };
    fetchProjectData();
  }, []);

  const ProjectTotal = project.length;

  const ToBeStartedProject = project.filter((item) => {
    return item.status == "to_be_started";
  });
  const InProgressProject = project.filter((item) => {
    return item.status == "inprogress";
  });
  const CompletedProject = project.filter((item) => {
    return item.status == "completed";
  });
  const HoldProject = project.filter((item) => {
    return item.status == "hold";
  });
  const Cbr_raisedProject = project.filter((item) => {
    return item.status == "cbr_raised";
  });

  const data = [
    {
      label: "To be Started",
      value: ToBeStartedProject.length,
      color: "#0088FE",
    },
    {
      label: "InProgress",
      value: InProgressProject.length,
      color: "#00C49F",
    },
    {
      label: "Completed",
      value: CompletedProject.length,
      color: "#FFBB28",
    },
    {
      label: "Hold",
      value: HoldProject.length,
      color: "#FF8042",
    },
    {
      label: "CBR Raised",
      value: Cbr_raisedProject.length,
      color: "#C4C4C4",
    },
  ];

  const TOTAL = data.map((item) => item.value).reduce((a, b) => a + b, 0);
  const getArcLabel = (params) => {
    const percent = params.value / TOTAL;
    return `${(percent * 100).toFixed(0)}%`;
  };

  return (
    <div className="bg-gray-100 border w-1/2 p-2">
      <PieChart
        series={[
          {
            data,
            arcLabel: getArcLabel,
          },
        ]}
        width={600}
        height={400}
      />
    </div>
  );
}
