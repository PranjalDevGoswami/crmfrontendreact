// import React, { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { addFilterProjectData } from "../slices/FilterProjectDataSlice";

// const useProjectDataWithRoleWiseFilter = () => {
//   const [filterProjectData, setFilterProjectData] = useState([]);
//   const userRole = localStorage.getItem("userrole");
//   const role = localStorage.getItem("role");

//   const projectDataResponse = useSelector((store) => store.projectData.projects);
//   const userDataResponse = useSelector((store) => store.userData.users);
//   const dispatch = useDispatch();

//   // Recursive function to collect all users under a specific user
//   const getAllUsersUnderRole = (userId, users) => {
//     const directReports = users.filter((user) => user?.reports_to?.id == userId);
//     const allReports = [...directReports];

//     directReports.forEach((report) => {
//       const indirectReports = getAllUsersUnderRole(report.user_role.id, users);
//       allReports.push(...indirectReports);
//     });

//     return allReports;
//   };

//   // Unified project filter function
//   const filterProjectsByUsers = (projects, users, roleId) => {
//     return projects.filter((project) => {
//       const isManagedByUser = users.some(
//         (user) =>
//           project.project_assigned_by_manager?.id == user.user_role.id ||
//           project.assigned_to?.id == user.user_role.id ||
//           project.created_by?.id == user.user_role.id
//       );

//       const isAssignedToRole = project.project_assigned_to_teamlead?.some(
//         (teamLead) => teamLead.id == roleId
//       );

//       return (
//         isManagedByUser ||
//         isAssignedToRole ||
//         project.assigned_to?.id == roleId ||
//         project.created_by?.id == roleId ||
//         project.project_assigned_by_manager?.id == roleId
//       );
//     });
//   };

//   const fetchProjectData = async () => {
//     if (role === "viewer" || role === "Director") {
//       setFilterProjectData(projectDataResponse);
//       dispatch(addFilterProjectData(projectDataResponse));
//       return;
//     }

//     if (userDataResponse.length > 0) {
//       const allUsers = getAllUsersUnderRole(userRole, userDataResponse);
//       const filteredProjects = filterProjectsByUsers(projectDataResponse, allUsers, userRole);

//       setFilterProjectData(filteredProjects);
//       dispatch(addFilterProjectData(filteredProjects));
//     }
//   };

//   useEffect(() => {
//     fetchProjectData();
//   }, [projectDataResponse]);

//   return filterProjectData;
// };

// export default useProjectDataWithRoleWiseFilter;


import { useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import { addFilterProjectData } from "../slices/FilterProjectDataSlice";

const useProjectDataWIthRoleWiseFilter = () => {
  const projectDataResponse = useSelector(
    (store) => store.projectData.projects
  );  
  const dispatch = useDispatch(); 

  const fetchProjectData = async () => {
      dispatch(addFilterProjectData(projectDataResponse));
      return;
  };

  useEffect(() => {
    fetchProjectData();
  }, [projectDataResponse]);

};

export default useProjectDataWIthRoleWiseFilter;