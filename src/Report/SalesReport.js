import React from "react";

const SalesReport = (props) => {
  const { userList, filteredData } = props;
  const salesPersonHod = userList.filter(
    (user) => user.department.id === 1 && user.role.name === "HOD"
  );

  return (
    <div className="w-full">
      <div className="w-full mb-4 ">
        <h3 className="text-base">Sales Person Project Report</h3>
      </div>
      <table className="min-w-full bg-white border border-gray-200 divide-y divide-gray-200 text-xs">
        <thead className="bg-gray-50 text-sm">
          <tr>
            <th className="text-left pl-8">HOD Name</th>
            <th className="text-right pl-8">Project Count</th>
            <th className="text-right pl-8 pr-2">Total Revenue</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 text-center text-xs">
          {salesPersonHod.map((hod, ind) => {
            const usersUnderHod = userList.filter(
              (user) => user.reports_to?.id === hod.id
            );
            const projectsUnderHod = filteredData.filter((project) =>
              usersUnderHod.some(
                (user) => project.created_by === user.user_role.id
              )
            );
            const totalRevenue = projectsUnderHod.reduce(
              (acc, curr) => acc + curr.cpi * curr.sample,
              0
            );
            return (
              <tr className="bg-white" key={ind}>
                <td className="px-4 py-2 whitespace-nowrap text-left text-sm text-black">
                  {hod.user_role.name.charAt(0).toUpperCase() +
                    hod.user_role.name.slice(1)}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-black text-right">
                  {projectsUnderHod.length}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-black text-right">
                  $ {totalRevenue.toFixed(2)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default SalesReport;
