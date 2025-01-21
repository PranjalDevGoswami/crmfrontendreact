import { PieChart } from "@mui/x-charts/PieChart";
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
    {
      label: "ONLINE",
      value: OnlineProject.length,
      color: "#b72e11",
    },
  ];
  const TOTAL = data.map((item) => item.value).reduce((a, b) => a + b, 0);
  const getArcLabel = (params) => {
    const percent = params.value / TOTAL;
    if (percent === 0) return "";
    return `${(percent * 100).toFixed(0)}%`;
  };
  return (
    // <div className="w-full">
    //   <div className="container mx-auto mt-2 flex justify-between items-stretch">
    //     <div className="w-1/3 block">
    //       <table className="min-w-full border-collapse border border-gray-200 text-xs">
    //         <thead>
    //           <tr>
    //             <th className="px-4 py-2 border border-gray-300">Category</th>
    //             <th className="px-4 py-2 border border-gray-300">Count</th>
    //           </tr>
    //         </thead>
    //         <tbody>
    //           <tr>
    //             <td className="px-4 py-2 border border-gray-300">
    //               Total Project
    //             </td>
    //             <td className="px-4 py-2 border border-gray-300">{TOTAL}</td>
    //           </tr>
    //           <tr>
    //             <td className="px-4 py-2 border border-gray-300">CAWI</td>
    //             <td className="px-4 py-2 border border-gray-300">
    //               {CawiProject.length}
    //             </td>
    //           </tr>
    //           <tr>
    //             <td className="px-4 py-2 border border-gray-300">CATI </td>
    //             <td className="px-4 py-2 border border-gray-300">
    //               {CatiProject.length}
    //             </td>
    //           </tr>
    //           <tr>
    //             <td className="px-4 py-2 border border-gray-300">CAPI </td>
    //             <td className="px-4 py-2 border border-gray-300">
    //               {CapiProject.length}
    //             </td>
    //           </tr>
    //           <tr>
    //             <td className="px-4 py-2 border border-gray-300">ONLINE </td>
    //             <td className="px-4 py-2 border border-gray-300">
    //               {OnlineProject.length}
    //             </td>
    //           </tr>
    //         </tbody>
    //       </table>
    //     </div>
    //     <div className="w-2/3 relative">
    //       <PieChart
    //         series={[
    //           {
    //             data,
    //             innerRadius: 45,
    //             outerRadius: 120,
    //             arcLabel: getArcLabel,
    //           },
    //         ]}
    //         onItemClick={(event, d) => {
    //           clickHandler(event, d);
    //         }}
    //         width={380}
    //         height={300}
    //         margin={{ right: 30, top: -30 }}
    //         slotProps={{
    //           legend: {
    //             labelStyle: {
    //               tableLayout: "relative",
    //               fontSize: 11,
    //             },
    //             direction: "row",
    //             position: {
    //               horizontal: "right",
    //               vertical: "bottom",
    //             },
    //             itemMarkWidth: 20,
    //             itemMarkHeight: 10,
    //             markGap: 1,
    //             itemGap: 10,
    //           },
    //         }}
    //       />
    //     </div>
    //   </div>
    // </div>
    <div className="w-full">
  <div className="container mx-auto mt-2 flex flex-wrap justify-between items-stretch">
    {/* Table Section */}
    <div className="w-full lg:w-1/2 block">
      <div className="overflow-auto max-h-[400px]">
        <table className="w-full border-collapse border border-gray-200 text-xs">
          <thead>
            <tr>
              <th className="px-4 py-2 border border-gray-300">Category</th>
              <th className="px-4 py-2 border border-gray-300">Count</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-4 py-2 border border-gray-300">Total Project</td>
              <td className="px-4 py-2 border border-gray-300">{TOTAL}</td>
            </tr>
            <tr>
              <td className="px-4 py-2 border border-gray-300">CAWI</td>
              <td className="px-4 py-2 border border-gray-300">{CawiProject.length}</td>
            </tr>
            <tr>
              <td className="px-4 py-2 border border-gray-300">CATI</td>
              <td className="px-4 py-2 border border-gray-300">{CatiProject.length}</td>
            </tr>
            <tr>
              <td className="px-4 py-2 border border-gray-300">CAPI</td>
              <td className="px-4 py-2 border border-gray-300">{CapiProject.length}</td>
            </tr>
            <tr>
              <td className="px-4 py-2 border border-gray-300">ONLINE</td>
              <td className="px-4 py-2 border border-gray-300">{OnlineProject.length}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    {/* Pie Chart Section */}
    <div className="w-full lg:w-1/2 relative mt-4 lg:mt-0 flex justify-center items-center">
      <PieChart
        series={[
          {
            data,
            innerRadius: 45,
            outerRadius: 120,
            arcLabel: getArcLabel,
          },
        ]}
        onItemClick={(event, d) => {
          clickHandler(event, d);
        }}
        width={380}
        height={300}
        margin={{ right: 30, top: -30 }}
        slotProps={{
          legend: {
            labelStyle: {
              tableLayout: "relative",
              fontSize: 11,
            },
            direction: "row",
            position: {
              horizontal: "right",
              vertical: "bottom",
            },
            itemMarkWidth: 20,
            itemMarkHeight: 10,
            markGap: 1,
            itemGap: 10,
          },
        }}
      />
    </div>
  </div>
</div>

  );
};

export default ProjectTypeChart;
