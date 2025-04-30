import { useEffect } from "react";
import CanvasJSReact from "@canvasjs/react-charts";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default function ProjectStatusReport({
  projectData,
  setProjectType,
  projectType,
  filteredData,
  setFilteredData,
  setProjectStatus,
}) {
  useEffect(() => {
    if (projectType.length > 0) {
      let filtered = projectData.filter((item) => {
        return (
          item.project_type?.name.toLowerCase() === projectType.toLowerCase()
        );
      });

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
    (item) => item.status === "CBR Raised"
  );
  const InitiatedProject = filteredData.filter(
    (item) => item.status === "Project Initiated"
  );
  const clickHandler = (event, d) => {
    const points = data[d.dataIndex];
    setProjectStatus([points]);
  };

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
    if (percent === 0) return "";
    return {
      text: `${(percent * 100).toFixed(0)}%`,
      position: "outside", // Position the label outside the pie slice
      distance: 10,
    };
  };
  const options = {
    animationEnabled: true,
    subtitles: [
      {
        text: "",
        verticalAlign: "center",
        fontSize: 2,
        dockInsidePlotArea: true,
      },
    ],
    data: [
      {
        type: "doughnut",
        indexLabelPlacement: "outside",
        radius: "70%",
        innerRadius: "20%",
        showInLegend: true,
        indexLabel: "{name}: {y}",
        yValueFormatString: "#,###'%'",
        // dataPoints: data.map((item) => ({
        //   name: item.label,
        //   y: ((item.value / TOTAL) * 100).toFixed(2),
        // })),
        dataPoints: data
          .map((item) => {
            const percentage = (item.value / TOTAL) * 100;
            if (percentage > 0) {
              return {
                name: item.label,
                y: parseFloat(percentage.toFixed(2)),
              };
            }
            return null;
          })
          .filter(Boolean),
        click: function (e) {
          setProjectStatus(e.dataPoint.name);
        },
      },
    ],
  };

  return (
    <div className="w-full mt-2">
      <div className="w-full overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
        <table className="min-w-full border-collapse border border-gray-200 text-xs">
          <thead>
            <tr>
              <th className="px-4 py-1 border border-gray-300">Category</th>
              <th className="px-4 py-1 border border-gray-300">
                Total Project
              </th>
              <th className="px-4 py-1 border border-gray-300">
                Project Initiated
              </th>
              <th className="px-4 py-1 border border-gray-300">
                To Be Started
              </th>
              <th className="px-4 py-1 border border-gray-300">In Progress</th>
              <th className="px-4 py-1 border border-gray-300">Completed</th>
              <th className="px-4 py-1 border border-gray-300">On Hold</th>
              <th className="px-4 py-1 border border-gray-300">CBR Raised</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-4 py-1 border border-gray-300">Count</td>
              <td className="px-4 py-1 border border-gray-300">{TOTAL}</td>
              <td className="px-4 py-1 border border-gray-300">
                {InitiatedProject.length}
              </td>
              <td className="px-4 py-1 border border-gray-300">
                {ToBeStartedProject.length}
              </td>
              <td className="px-4 py-1 border border-gray-300">
                {InProgressProject.length}
              </td>
              <td className="px-4 py-1 border border-gray-300">
                {CompletedProject.length}
              </td>
              <td className="px-4 py-1 border border-gray-300">
                {HoldProject.length}
              </td>
              <td className="px-4 py-1 border border-gray-300">
                {CbrRaisedProject.length}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="container mx-auto mt-2 flex justify-between items-stretch">
        <div id="chartContainer" style={{ height: "auto", width: "100%" }}>
          <CanvasJSChart options={options} />
        </div>
      </div>
    </div>
  );
}
