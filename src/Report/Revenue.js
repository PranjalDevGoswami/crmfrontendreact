import { PieChart } from "@mui/x-charts/PieChart";

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
    const item = projectStatus?.find((data) => data?.label === label);
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
  const getArcLabel = (params) => {
    const percent = params.value / TOTAL;
    if (percent === 0) return "";
    return {
      text: `${(percent * 100).toFixed(2)}%`,
      position: "outside", // Position the label outside the pie slice
      distance: 10,
    };
  };

  return (
    <div className="w-2/3">
      <div className="container mx-auto mt-2 flex justify-between items-stretch">
        <div className="w-[70%] flex-grow">
          <table className=" bg-white border border-gray-200 divide-y divide-gray-200 text-xs">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium  tracking-wider">
                  Revenue Category
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium  tracking-wider">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr
                className="bg-white"
                style={{
                  backgroundColor: getColorForRevenue("In Progress"),
                }}
              >
                <td className="px-1 py-1 text-sm  text-gray-900">
                  Revenue in Field
                </td>
                <td className="px-1 py-1 text-md text-black">
                  ${" " + totalRevenueInField.toFixed(2)}
                </td>
              </tr>
              <tr
                className="bg-gray-50"
                style={{ backgroundColor: getColorForRevenue("Completed") }}
              >
                <td className="px-1 py-1 text-sm  text-gray-900">
                  Revenue Executed but not billed
                </td>
                <td className="px-1 py-1 text-md text-black">
                  ${" " + revenueExecutedNotBilled.toFixed(2)}
                </td>
              </tr>
              <tr
                className="bg-white"
                style={{
                  backgroundColor: getColorForRevenue("To Be Started"),
                }}
              >
                <td className="px-1 py-1 text-sm  text-gray-900">
                  Revenue In Progress
                </td>
                <td className="px-1 py-1 text-md text-black">
                  ${" " + RevenueInPipeLine.toFixed(2)}
                </td>
              </tr>
              <tr className="">
                <td className="px-1 py-1 text-sm  text-gray-900">
                  Revenue Billed
                </td>
                <td className="px-1 py-1 text-md text-black">
                  ${" " + BilledProject.toFixed(2)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="w-[30%] flex-grow">
          <PieChart
            series={[
              {
                data,
                innerRadius: 45,
                outerRadius: 120,
                arcLabel: getArcLabel,
                arcLabel: (params) => getArcLabel(params).text, // Use the text part of the label
                arcLabelPosition: "outside",
              },
            ]}
            // onItemClick={(event, d) => {
            //   clickHandler(event, d);
            // }}
            width={260}
            height={320}
            margin={{ right: 0, top: -40, bottom: 20 }}
            slotProps={{
              legend: {
                labelStyle: {
                  tableLayout: "fixed",
                  fontSize: 11,
                },
                direction: "row",
                position: {
                  horizontal: "left",
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

export default Revenue;
