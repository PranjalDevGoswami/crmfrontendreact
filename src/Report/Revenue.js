import React, { useEffect, useState } from "react";
import { GetProjectData } from "../fetchApis/projects/getProjectData/GetProjectData";

const Revenue = () => {
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
  const CPI = project.map((item) => item?.cpi);
  const unexecuted_Sample = project.map(
    (item) => item?.remaining_interview || 0
  );
  const executed_Sample = project.map((item) => item?.total_achievement || 0);

  const inPipeLine = project.filter((item) => item?.status === "to_be_started");
  const PipeLineProject = inPipeLine.map((item) => item.sample);
  const PipeLineProjectCost = inPipeLine.map((item) => item.cpi);

  const RevenueBilled = project.filter((item) => item?.status === "cbr_raised");
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
          <tr className="bg-white">
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              Revenue in Field
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {/* CPI*Unexecuted Sample (for project in field) */}$
              {" " + totalRevenueInField}
            </td>
          </tr>
          <tr className="bg-gray-50">
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              Revenue Executed but not billed
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              ${" " + revenueExecutedNotBilled}
            </td>
          </tr>
          <tr className="bg-white">
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
