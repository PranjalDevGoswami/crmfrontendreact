import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";

const ProjectTypeChart = ({ projectData, setProjectType, projectType }) => {
  const CawiProject = projectData.filter(
    (item) => item.project_type.name === "CAWI"
  );
  const CatiProject = projectData.filter(
    (item) => item.project_type.name === "CATI"
  );
  const CapiProject = projectData.filter(
    (item) => item.project_type.name === "CAPI"
  );

  const clickHandler = (event, d) => {
    const points = data[d.dataIndex];
    setProjectType([points]);
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
                <td className="px-4 py-2 border border-gray-300">CAWI</td>
                <td className="px-4 py-2 border border-gray-300">
                  {CawiProject.length}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 border border-gray-300">CATI </td>
                <td className="px-4 py-2 border border-gray-300">
                  {CatiProject.length}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 border border-gray-300">CAPI </td>
                <td className="px-4 py-2 border border-gray-300">
                  {CapiProject.length}
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
};

export default ProjectTypeChart;