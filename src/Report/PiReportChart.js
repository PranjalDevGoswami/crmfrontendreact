import { useEffect, useState } from "react";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import { GetProjectData } from "../fetchApis/projects/getProjectData/GetProjectData";

export default function PiReportChart() {
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

  const ToBeStartedProject = project.filter(
    (item) => item.status === "to_be_started"
  );
  const InProgressProject = project.filter(
    (item) => item.status === "inprogress"
  );
  const CompletedProject = project.filter(
    (item) => item.status === "completed"
  );
  const HoldProject = project.filter((item) => item.status === "hold");
  const CbrRaisedProject = project.filter(
    (item) => item.status === "cbr_raised"
  );

  const data = [
    {
      label: "To be Started",
      value: ToBeStartedProject.length,
      color: "#0088FE",
    },
    {
      label: "In Progress",
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
      value: CbrRaisedProject.length,
      color: "#C4C4C4",
    },
  ];

  const TOTAL = data.map((item) => item.value).reduce((a, b) => a + b, 0);
  const getArcLabel = (params) => {
    const percent = params.value / TOTAL;
    return `${(percent * 100).toFixed(0)}%`;
  };

  return (
    <div className="w-1/2">
      <div className="container mx-auto mt-10 flex justify-between items-stretch">
        <div className="w-2/3 flex-grow">
          <table className="min-w-full border-collapse border border-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-2 border border-gray-300">Category</th>
                <th className="px-4 py-2 border border-gray-300">Count</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-2 border border-gray-300">All</td>
                <td className="px-4 py-2 border border-gray-300">{TOTAL}</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border border-gray-300">
                  To be Started
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {ToBeStartedProject.length}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 border border-gray-300">
                  In Progress
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {InProgressProject.length}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 border border-gray-300">Completed</td>
                <td className="px-4 py-2 border border-gray-300">
                  {CompletedProject.length}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 border border-gray-300">Hold</td>
                <td className="px-4 py-2 border border-gray-300">
                  {HoldProject.length}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 border border-gray-300">CBR Raised</td>
                <td className="px-4 py-2 border border-gray-300">
                  {CbrRaisedProject.length}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="w-1/3 flex-grow">
          <PieChart
            series={[
              {
                data,
                innerRadius: 15,
                outerRadius: 100,
                arcLabel: getArcLabel,
              },
            ]}
            width={400}
            height={400}
            margin={{ right: -20, top: 30 }}
            slotProps={{
              legend: {
                labelStyle: {
                  tableLayout: "fixed",
                },
                direction: "row",
                position: {
                  horizontal: "right",
                  vertical: "top",
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}
