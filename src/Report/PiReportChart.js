import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import { useEffect, useState } from "react";

export default function PiReportChart({
  projectData,
  setProjectType,
  projectType,
  filteredData,
  setFilteredData,
  setProjectStatus,
}) {
  useEffect(() => {
    if (projectType.length > 0) {
      let filtered = projectData.filter(
        (item) =>
          item.project_type.name.toLowerCase() ===
          projectType[0].label.toLowerCase()
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(projectData);
    }
  }, [projectType, projectData]);

  const ToBeStartedProject = filteredData.filter(
    (item) => item.status === "To Be Started"
  );
  const InProgressProject = filteredData.filter(
    (item) => item.status === "In Progress"
  );
  const CompletedProject = filteredData.filter(
    (item) => item.status === "Completed"
  );
  const HoldProject = filteredData.filter((item) => item.status === "On Hold");
  const CbrRaisedProject = filteredData.filter(
    (item) => item.status === "Cbr Raised"
  );
  const InitiatedProject = filteredData.filter(
    (item) => item.status === "Project Initiated"
  );
  const clickHandler = (event, d) => {
    const points = data[d.dataIndex];
    setProjectStatus([points]);
  };
  // console.log(projectType);

  const data = [
    {
      label: "Project Initiated",
      value: InitiatedProject.length,
      color: "#E4D4F4",
    },
    {
      label: "To Be Started",
      value: ToBeStartedProject.length,
      color: "#0088FE",
    },
    {
      label: "In Progress",
      value: InProgressProject.length,
      color: "#FFBB28",
    },
    {
      label: "Completed",
      value: CompletedProject.length,
      color: "#00C49F",
    },
    {
      label: "On Hold",
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
                  Project Initiated
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {InitiatedProject.length}
                </td>
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
                <td className="px-4 py-2 border border-gray-300">On Hold</td>
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
                innerRadius: 10,
                outerRadius: 100,
                arcLabel: getArcLabel,
              },
            ]}
            onItemClick={(event, d) => {
              clickHandler(event, d);
            }}
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
