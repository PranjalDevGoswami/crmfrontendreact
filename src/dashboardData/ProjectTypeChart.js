import CanvasJSReact from "@canvasjs/react-charts";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const ProjectTypeChart = ({ projectData, setProjectType, projectType }) => {
  const CawiProject = projectData.filter(
    (item) => item?.project_type?.name === "CAWI"
  );
  const CatiProject = projectData.filter(
    (item) => item?.project_type?.name === "CATI"
  );
  const CapiProject = projectData.filter(
    (item) => item?.project_type?.name === "CAPI"
  );
  const OnlineProject = projectData.filter(
    (item) => item?.project_type?.name === "Online"
  );

  const TOTAL = projectData.length;

  const getPercent = (count) => {
    const percent = (count / TOTAL) * 100;
    return percent ? `${percent.toFixed(2)}%` : "0%";
  };

  const data = [
    {
      label: "CAWI",
      value: CawiProject.length,
      color: "#E4D4F4",
    },
    {
      label: "CATI",
      value: CatiProject.length,
      color: "#0088FE",
    },
    {
      label: "CAPI",
      value: CapiProject.length,
      color: "#FFBB28",
    },
    {
      label: "ONLINE",
      value: OnlineProject.length,
      color: "#b72e11",
    },
  ];

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
          setProjectType(e.dataPoint.name);
        },
      },
    ],
    
  };

  return (
    <div className="w-full mt-2">
      <div className="w-full block overflow-scroll no-scrollbar">
        <table className="min-w-full border-collapse border border-gray-200 text-xs">
          <thead>
            <tr>
              <th className="px-4 py-2 border border-gray-300">Metrics</th>
              <th className="px-4 py-2 border border-gray-300">Total Project</th>
              <th className="px-4 py-2 border border-gray-300">CAWI</th>
              <th className="px-4 py-2 border border-gray-300">CATI</th>
              <th className="px-4 py-2 border border-gray-300">CAPI</th>
              <th className="px-4 py-2 border border-gray-300">ONLINE</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-4 py-2 border border-gray-300">Count</td>
              <td className="px-4 py-2 border border-gray-300">{TOTAL}</td>
              <td className="px-4 py-2 border border-gray-300">
                {CawiProject.length}
              </td>
              <td className="px-4 py-2 border border-gray-300">
                {CatiProject.length}
              </td>
              <td className="px-4 py-2 border border-gray-300">
                {CapiProject.length}
              </td>
              <td className="px-4 py-2 border border-gray-300">
                {OnlineProject.length}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div id="chartContainer" style={{ height: "auto", width: "100%" }}>
        <CanvasJSChart options={options} />
      </div>
    </div>
  );
};

export default ProjectTypeChart;
