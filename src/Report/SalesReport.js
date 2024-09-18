// import React from "react";

// const SalesReport = (props) => {
//   const { userList, filteredData } = props;
//   const salesPersonHod = userList.filter(
//     (user) => user.department.id === 1 && user.role.name === "HOD"
//   );

//   return (
//     <div className="w-full">
//       <div className="w-full mb-4 ">
//         <h3 className="text-base">Sales Person Project Report</h3>
//       </div>
//       <table className="min-w-full bg-white border border-gray-200 divide-y divide-gray-200 text-xs">
//         <thead className="bg-gray-50 text-sm">
//           <tr>
//             <th className="text-left pl-8">HOD Name</th>
//             <th className="text-right pl-8">Project Count</th>
//             <th className="text-right pl-8 pr-2">Total Revenue</th>
//           </tr>
//         </thead>
//         <tbody className="divide-y divide-gray-200 text-center text-xs">
//           {salesPersonHod.map((hod, ind) => {
//             const usersUnderHod = userList.filter(
//               (user) => user.reports_to?.id === hod.id
//             );
//             const projectsUnderHod = filteredData.filter((project) =>
//               usersUnderHod.some(
//                 (user) => project.created_by === user.user_role.id
//               )
//             );
//             const totalRevenue = projectsUnderHod.reduce(
//               (acc, curr) => acc + curr.cpi * curr.sample,
//               0
//             );
//             return (
//               <tr className="bg-white" key={ind}>
//                 <td className="px-4 py-2 whitespace-nowrap text-left text-sm text-black">
//                   {hod.user_role.name.charAt(0).toUpperCase() +
//                     hod.user_role.name.slice(1)}
//                 </td>
//                 <td className="px-4 py-2 whitespace-nowrap text-sm text-black text-right">
//                   {projectsUnderHod.length}
//                 </td>
//                 <td className="px-4 py-2 whitespace-nowrap text-sm text-black text-right">
//                   $ {totalRevenue.toFixed(2)}
//                 </td>
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default SalesReport;

import React, { useEffect } from "react";

const SalesReport = (props) => {
  const { userList, filteredData } = props;
  const loggedInUser = localStorage.getItem("role");
  const loggedInUserId = localStorage.getItem("userrole");
  const loggedInUserDeptId = localStorage.getItem("department");

  if (!userList || !filteredData) {
    return <div>Loading data...</div>;
  }

  const isDirector = loggedInUser === "Director";
  const isHod = loggedInUser === "HOD";
  const isManager = loggedInUser === "Manager";

  const loggedInUserDept = userList.find(
    (user) => user.user_role.id === parseInt(loggedInUserId)
  )?.department?.id;

  const isSalesHod = isHod && loggedInUserDept === 1; // Sales department

  const usersUnderHod = userList.filter(
    (user) => user?.reports_to?.id === parseInt(loggedInUserId)
  );

  const managersUnderHod = usersUnderHod.filter(
    (user) => user.role?.name === "Manager"
  );
  const teamLeadsUnderHod = usersUnderHod.filter(
    (user) => user.role?.name === "Team Lead"
  );

  const displayList = isDirector
    ? userList.filter(
        (user) => user.department?.id === 1 && user.role?.name === "HOD"
      )
    : isSalesHod
    ? managersUnderHod.length > 0
      ? managersUnderHod
      : teamLeadsUnderHod
    : isManager
    ? usersUnderHod
    : [];

  if (displayList.length === 0) {
    return (
      <div className="w-full">
        <h3 className="text-base">No data available for the selected user</h3>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="w-full mb-4">
        <h3 className="text-base">
          {isDirector
            ? "HOD Project Report"
            : isSalesHod
            ? managersUnderHod.length > 0
              ? "Manager Report"
              : "Team Lead Report"
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
              isDirector
                ? usersUnder.some(
                    (u) => project.created_by === parseInt(u.user_role.id)
                  )
                : userList.some(
                    (u) => project.created_by === parseInt(u.user_role.id)
                  )
            );

            const totalRevenue = projectsUnderUser.reduce(
              (acc, curr) => acc + curr.cpi * curr.sample,
              0
            );

            return (
              <tr className="bg-white" key={ind}>
                <td className="px-4 py-2 whitespace-nowrap text-left text-sm text-black">
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
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default SalesReport;
