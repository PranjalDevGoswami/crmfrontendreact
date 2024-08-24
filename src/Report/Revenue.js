// import React from "react";
// const Revenue = ({ projectData, projectType }) => {
//   const CPI = projectData.map((item) => item?.cpi);
//   const unexecuted_Sample = projectData.map(
//     (item) => item?.remaining_interview || 0
//   );
//   const executed_Sample = projectData.map(
//     (item) => item?.total_achievement || 0
//   );

//   const inPipeLine = projectData.filter(
//     (item) => item?.status === "To Be Started"
//   );
//   const PipeLineProject = inPipeLine.map((item) => item.sample);
//   const PipeLineProjectCost = inPipeLine.map((item) => item.cpi);

//   const RevenueBilled = projectData.filter(
//     (item) => item?.status === "CBR Raised"
//   );
//   const RevenueBilledProject = RevenueBilled.map((item) => item.sample);
//   const RevenueBilledProjectCost = RevenueBilled.map((item) => item.cpi);

//   const totalRevenueInField = unexecuted_Sample.reduce(
//     (accumulator, item, index) => {
//       const subtotal = item * CPI[index];
//       return accumulator + subtotal;
//     },
//     0
//   );

//   const revenueExecutedNotBilled = executed_Sample.reduce(
//     (accumulator, item, index) => {
//       const subtotal = item * CPI[index];
//       return accumulator + subtotal;
//     },
//     0
//   );

//   const BilledProject = RevenueBilledProject.reduce(
//     (accumulator, item, index) => {
//       const subtotal = item * RevenueBilledProjectCost[index];
//       return accumulator + subtotal;
//     },
//     0
//   );

//   const RevenueInPipeLine = PipeLineProject.reduce(
//     (accumulator, item, index) => {
//       const subtotal = item * PipeLineProjectCost[index];
//       return accumulator + subtotal;
//     },
//     0
//   );

//   return (
//     <div className="overflow-x-auto">
//       <table className="min-w-full bg-white border border-gray-200 divide-y divide-gray-200">
//         <thead className="bg-gray-50">
//           <tr>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Revenue Category
//             </th>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Amount
//             </th>
//           </tr>
//         </thead>
//         <tbody className="divide-y divide-gray-200">
//           <tr className="bg-white">
//             <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//               Revenue in Field
//             </td>
//             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//               {/* CPI*Unexecuted Sample (for project in field) */}$
//               {" " + totalRevenueInField}
//             </td>
//           </tr>
//           <tr className="bg-gray-50">
//             <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//               Revenue Executed but not billed
//             </td>
//             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//               ${" " + revenueExecutedNotBilled}
//             </td>
//           </tr>
//           <tr className="bg-white">
//             <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//               Revenue Pipeline
//             </td>
//             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//               ${" " + RevenueInPipeLine}
//             </td>
//           </tr>
//           <tr className="bg-gray-50">
//             <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//               Revenue Billed
//             </td>
//             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//               ${" " + BilledProject}
//             </td>
//           </tr>
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Revenue;

import React from "react";

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
      const subtotal = item * CPI[index];
      return accumulator + subtotal;
    },
    0
  );

  const revenueExecutedNotBilled = executed_Sample.reduce(
    (accumulator, item, index) => {
      const subtotal = item * CPI[index];
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
    const item = projectStatus.find((data) => data?.label === label);
    return item ? item.color : "transparent";
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Revenue Category
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
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
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              Revenue in Field
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              ${" " + totalRevenueInField}
            </td>
          </tr>
          <tr
            className="bg-gray-50"
            style={{ backgroundColor: getColorForRevenue("Completed") }}
          >
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              Revenue Executed but not billed
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              ${" " + revenueExecutedNotBilled}
            </td>
          </tr>
          <tr
            className="bg-white"
            style={{
              backgroundColor: getColorForRevenue("To Be Started"),
            }}
          >
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              Revenue Pipeline
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              ${" " + RevenueInPipeLine}
            </td>
          </tr>
          <tr className="bg-gray-50">
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              Revenue Billed
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              ${" " + BilledProject}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Revenue;
