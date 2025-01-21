import React, { useState } from "react";
import Button from "../Atom/Button";

const SalesReport = (props) => {
  const role = localStorage.getItem("role");
  const isDirectorRole = role === "Director";
  const isHodRole = role === "HOD";
  const isHod = "HOD";
  const isManager = "Manager";
  const isManagerRole = role === "Manager";
  const isTeamLead = "TeamLead";

  const isSalesDept = "1";
  const [viewDetailProjectType, setViewDetailProjectType] = useState(false);
  const [currentIndexOfHod, setCurrentIndexOfHod] = useState(null);
  const { userList, filteredData } = props;
  const userRole = localStorage.getItem("userrole");

  if (!userList || !filteredData) {
    return <div>Loading data...</div>;
  }

  const loggedInUserDept = userList.find(
    (user) => user.user_role.id == parseInt(userRole)
  )?.department?.id;

  const isSalesHod = isHodRole && loggedInUserDept == isSalesDept; // Sales department

  const usersUnderHod = userList.filter(
    (user) => user?.reports_to?.id == parseInt(userRole)
  );

  const managersUnderHod = usersUnderHod.filter(
    (user) => user.role?.name === isManager
  );
  const teamLeadsUnderHod = usersUnderHod.filter(
    (user) => user.role?.name === isTeamLead
  );

  const displayList = isDirectorRole
    ? userList.filter(
        (user) =>
          user.department?.id == isSalesDept && user.role?.name === isHod
      )
    : isSalesHod
    ? managersUnderHod.length > 0
      ? managersUnderHod
      : teamLeadsUnderHod
    : isManagerRole
    ? usersUnderHod
    : [];
  console.log("🚀 ~ SalesReport ~ displayList:", displayList);

  if (displayList.length === 0) {
    return (
      <div className="w-full">
        <h3 className="text-base">No data available.</h3>
      </div>
    );
  }

  const handleViewProjectType = (ind) => {
    setCurrentIndexOfHod(ind);
    setViewDetailProjectType(!viewDetailProjectType);
  };

  return (
    <div className="w-full">
      <div className="w-full mb-4">
        <h3 className="text-base">
          {isDirectorRole
            ? "Sales HOD Revenue Status"
            : isSalesHod
            ? "Manager Report"
            : "User Report"}
        </h3>
      </div>
      <table className="min-w-full bg-white border border-gray-200 divide-y divide-gray-200 text-xs">
        <thead className="bg-gray-50 text-sm">
          <tr>
            <th className="text-left pl-8">Name</th>
            <th className="text-right pl-8">Project Count</th>
            <th className="text-right pl-8 pr-2">Total Revenue</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 text-center text-xs">
          {displayList.map((user, ind) => {
            const usersUnder = userList.filter(
              (u) => u.reports_to?.id === user.id
            );
            const projectsUnderUser = filteredData.filter((project) =>
              usersUnder.some(
                (u) => project.created_by?.id === parseInt(u.user_role.id)
              )
            );

            const totalRevenue = projectsUnderUser.reduce(
              (acc, curr) => acc + curr.cpi * curr.sample,
              0
            );

            // Aggregate data by project type
            const projectTypeData = projectsUnderUser.reduce((acc, project) => {
              const type = project.project_type.name || "Other";
              if (!acc[type]) {
                acc[type] = { count: 0, revenue: 0 };
              }
              acc[type].count += 1;
              acc[type].revenue += project.cpi * project.sample;
              return acc;
            }, {});

            return (
              <>
                <tr className="bg-white w-full" key={ind}>
                  <td className="px-4 py-2 whitespace-nowrap text-left text-sm text-black">
                    {projectsUnderUser.length > 0 && (
                      <Button
                        name={
                          viewDetailProjectType && currentIndexOfHod === ind
                            ? " - "
                            : " + "
                        }
                        onClick={() => handleViewProjectType(ind)}
                        className="p-1 m-1 border-1 rounded-sm bg-gray-200 hover:font-bold"
                      />
                    )}
                    {user.user_role?.name.charAt(0).toUpperCase() +
                      user.user_role?.name.slice(1)}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-black text-right">
                    {projectsUnderUser.length}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-black text-right">
                    $ {totalRevenue.toFixed(2)}
                  </td>
                </tr>
                {viewDetailProjectType && currentIndexOfHod === ind && (
                  <tr className="bg-gray-100">
                    <td colSpan="3" className="p-4">
                      <table className="w-full border-collapse border border-gray-300">
                        <thead className="bg-gray-50 text-sm">
                          <tr>
                            <th className="text-left px-4 py-2 border">Type</th>
                            <th className="text-right px-4 py-2 border">
                              Count
                            </th>
                            <th className="text-right px-4 py-2 border">
                              Revenue
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {Object.entries(projectTypeData).map(
                            ([type, data], idx) => (
                              <tr className="border-b" key={idx}>
                                <td className="px-4 py-2">{type}</td>
                                <td className="px-4 py-2 text-right">
                                  {data.count}
                                </td>
                                <td className="px-4 py-2 text-right">
                                  $ {data.revenue.toFixed(2)}
                                </td>
                              </tr>
                            )
                          )}
                        </tbody>
                      </table>
                    </td>
                  </tr>
                )}
              </>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default SalesReport;
