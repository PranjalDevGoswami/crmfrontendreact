import CanvasJSReact from "@canvasjs/react-charts";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const Revenue = ({
  projectType = [],
  filteredData,
  setFilteredData,
  projectStatus,
  setProjectStatus,
}) => {
  const CPI = filteredData.map((item) => item?.cpi);

  const unexecuted_Sample = filteredData.map(
    (item) => item?.remaining_interview || 0
  );

  const executed_Sample = filteredData.map(
    (item) => item?.total_achievement || 0
  );

  const inPipeLine = filteredData.filter(
    (item) => item?.status === "To Be Started"
  );

  const PipeLineProject = inPipeLine.map((item) => item.sample);

  const PipeLineProjectCost = inPipeLine.map((item) => item.cpi);

  const RevenueBilled = filteredData.filter(
    (item) => item?.status === "CBR Raised"
  );

  const RevenueBilledProject = RevenueBilled.map((item) => item.sample);
  
  const RevenueBilledProjectCost = RevenueBilled.map((item) => item.cpi);

  const totalRevenueInField = unexecuted_Sample.reduce(
    (accumulator, item, index) => {
      const subtotal = Number(item) * Number(CPI[index]);
      return accumulator + (isNaN(subtotal) ? 0 : subtotal);
    },
    0
  );

  const revenueExecutedNotBilled = executed_Sample.reduce(
    (accumulator, item, index) => {
      const subtotal = Number(item * CPI[index]);
      return accumulator + subtotal;
    },
    0
  );

  const BilledProject = RevenueBilledProject.reduce(
    (accumulator, item, index) => {
      const subtotal = item * RevenueBilledProjectCost[index];
      return accumulator + subtotal;
    },
    0
  );

  const RevenueInPipeLine = PipeLineProject.reduce(
    (accumulator, item, index) => {
      const subtotal = item * PipeLineProjectCost[index];
      return accumulator + subtotal;
    },
    0
  );

  const getColorForRevenue = (label) => {
    const item = projectStatus === label;
    return item ? item.color : "transparent";
  };

  const data = [
    {
      label: "Revenue Executed Not Billed",
      value: revenueExecutedNotBilled,
      color: "#E4D4F4",
    },
    {
      label: "Total Revenue InField",
      value: totalRevenueInField,
      color: "#0088FE",
    },
    {
      label: "Billed Project",
      value: BilledProject,
      color: "#FFBB28",
    },
    {
      label: "Revenue InProgress",
      value: RevenueInPipeLine,
      color: "#00C49F",
    },
  ];

  const TOTAL = data.map((item) => item.value).reduce((a, b) => a + b, 0);
  // const getArcLabel = (params) => {
  //   const percent = params.value / TOTAL;
  //   if (percent === 0) return "";
  //   return {
  //     text: `${(percent * 100).toFixed(0)}%`,
  //     position: "outside", // Position the label outside the pie slice
  //     distance: 10,
  //   };
  // };
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
        dataPoints: data.map((item) => ({
          name: item.label,
          y: ((item.value / TOTAL) * 100).toFixed(2),
        })),
        click: function (e) {
          setProjectType(e.dataPoint.name);
        },
      },
    ],
  };

  return (
    <div className="w-full mt-2">
      {/* <div className="w-full overflow-scroll no-scrollbar"> */}
      {/* <div className="w-full overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">

          <table className="bg-white border border-gray-200 divide-y divide-gray-200 text-xs">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium tracking-wider">
                  Category
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium tracking-wider">
                  Revenue in Field
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium tracking-wider">
                  Revenue Executed but Not Billed
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium tracking-wider">
                  Revenue In Progress
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium tracking-wider">
                  Revenue Billed
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-1 py-1 text-sm text-gray-900">Amount</td>
                <td
                  className="px-1 py-1 text-md text-black"
                  style={{ backgroundColor: getColorForRevenue("In Progress") }}
                >
                  ${" " + totalRevenueInField.toFixed(2)}
                </td>
                <td
                  className="px-1 py-1 text-md text-black"
                  style={{ backgroundColor: getColorForRevenue("Completed") }}
                >
                  ${" " + revenueExecutedNotBilled.toFixed(2)}
                </td>
                <td
                  className="px-1 py-1 text-md text-black"
                  style={{
                    backgroundColor: getColorForRevenue("To Be Started"),
                  }}
                >
                  ${" " + RevenueInPipeLine.toFixed(2)}
                </td>
                <td className="px-1 py-1 text-md text-black">
                  ${" " + BilledProject.toFixed(2)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>   */}

      <div className="w-full overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
        <table className="min-w-full border-collapse border border-gray-200 text-xs">
          <thead>
            <tr>
              <th className="px-4 py-2 border border-gray-300">Category</th>
              <th className="px-4 py-2 border border-gray-300">
                {" "}
                Revenue in Field
              </th>
              <th className="px-4 py-2 border border-gray-300">
                Revenue Executed but Not Billed
              </th>
              <th className="px-4 py-2 border border-gray-300">
                {" "}
                Revenue In Progress
              </th>
              <th className="px-4 py-2 border border-gray-300">
                {" "}
                Revenue Billed
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-4 py-2 border border-gray-300">Amount</td>
              <td className="px-4 py-2 border border-gray-300">
                ${" " + totalRevenueInField.toFixed(2)}
              </td>
              <td className="px-4 py-2 border border-gray-300">
                ${" " + revenueExecutedNotBilled.toFixed(2)}{" "}
              </td>
              <td className="px-4 py-2 border border-gray-300">
                ${" " + RevenueInPipeLine.toFixed(2)}{" "}
              </td>
              <td className="px-4 py-2 border border-gray-300">
                ${" " + BilledProject.toFixed(2)}{" "}
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

export default Revenue;
