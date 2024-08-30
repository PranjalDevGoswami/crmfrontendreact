// import React, { useEffect, useState } from "react";
// import { USERROLE } from "../../utils/urls";
// import { getWithAuth } from "../provider/helper/axios";

// const AMWiseReport = ({ projectData }) => {
//   const [amList, setAmList] = useState([]);

//   useEffect(() => {
//     const fetchUserRole = async () => {
//       const userRole = await getWithAuth(USERROLE);
//       const AMList = userRole.data.filter(
//         (item) =>
//           item.role.name === "Sr.Managaer" ||
//           item.role.name === "Ass.Manager" ||
//           item.role.name === "Manager"
//       );
//       setAmList(AMList);
//     };
//     fetchUserRole();
//   }, []);

//   const projectInField = projectData.filter((item) => {
//     return item.status === "In Progress" || item.status === "To Be Started";
//   });
//   console.log("🚀 ~ projectInField ~ projectInField:", projectInField);

//   return (
//     <div className="overflow-x-auto">
//       <table className="min-w-full bg-white border border-gray-200 divide-y divide-gray-200">
//         <thead className="bg-gray-50">
//           <tr>
//             <th>AM Name</th>
//             <th>Project in field</th>
//             <th>Utilization</th>
//             <th>Total RPE</th>
//             <th>Current RPE</th>
//           </tr>
//         </thead>
//         <tbody className="divide-y divide-gray-200 text-center">
//           {amList.map((item, ind) => {
//             return (
//               <tr className="bg-white " key={ind}>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                   {item.user.name}
//                 </td>
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default AMWiseReport;

import React, { useEffect, useState } from "react";
import { USERROLE } from "../../utils/urls";
import { getWithAuth } from "../provider/helper/axios";

const AMWiseReport = ({ projectData }) => {
  const [amList, setAmList] = useState([]);

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const userRole = await getWithAuth(USERROLE);
        const AMList = userRole.data.filter(
          (item) =>
            item.role.name === "Sr.Manager" ||
            item.role.name === "Ass.Manager" ||
            item.role.name === "Manager"
        );
        setAmList(AMList);
      } catch (error) {
        console.error("Error fetching user roles:", error);
      }
    };

    fetchUserRole();
  }, []);

  const projectInField = projectData.filter((item) => {
    return item.status === "In Progress" || item.status === "To Be Started";
  });

  const TOTALRPE = projectData.filter((item) => {
    return item.status === "Completed";
  });

  const CURRENTRPE = projectData.filter((item) => {
    return item.status === "In Progress";
  });

  const segregatedProjects = amList.map((am) => {
    const projectsForAm = projectInField.filter(
      (project) => project.project_assigned_by_manager === am.user_role.id
    );
    const projectsForTOTALRPE = TOTALRPE.filter(
      (project) => project.project_assigned_by_manager === am.user_role.id
    );
    const projectsForCurrentRPE = CURRENTRPE.filter(
      (project) => project.project_assigned_by_manager === am.user_role.id
    );

    const totalRpeSum = projectsForTOTALRPE.reduce((sum, project) => {
      const achievement = parseFloat(project.total_achievement || 0);
      const cpi = parseFloat(project.cpi || 0);
      return sum + achievement * cpi;
    }, 0);
    const CurrentRpeSum = projectsForCurrentRPE.reduce((sum, project) => {
      const achievement = parseFloat(project.total_achievement || 0);
      const cpi = parseFloat(project.cpi || 0);
      return sum + achievement * cpi;
    }, 0);

    return {
      amName: am.user.name,
      amId: am.user_role.id,
      projects: projectsForAm,
      TOTALRPE: totalRpeSum,
      CURRENTRPE: CurrentRpeSum,
    };
  });

  console.log(
    "🚀 ~ segregatedProjects ~ segregatedProjects:",
    segregatedProjects.map((item) => item.TOTALRPE)
  );

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th>AM Name</th>
            <th>Project in field</th>
            <th>Utilization</th>
            <th>Total RPE</th>
            <th>Current RPE</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 text-center">
          {segregatedProjects.map((am, ind) => (
            // <div className="" key={ind}>
            <tr className="bg-white" key={ind}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {am.amName}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-bold">
                {am.projects.length}
              </td>
              <td></td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-bold">
                ${am.TOTALRPE}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-bold">
                ${am.CURRENTRPE}
              </td>
            </tr>
            // </div>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AMWiseReport;
