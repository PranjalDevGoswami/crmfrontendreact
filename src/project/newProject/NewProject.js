// import React, { useEffect, useState } from "react";
// import { GetProjectData } from "../../fetchApis/projects/getProjectData/GetProjectData";
// import { BsGraphUp } from "react-icons/bs";

// const NewProject = () => {
//   const [project, setProject] = useState([]);

//   useEffect(() => {
//     const fetchProjectData = async () => {
//       try {
//         const fetchDataFromApi2 = await GetProjectData();
//         const projectDataObject = fetchDataFromApi2?.data?.map((val) => {
//           return val;
//         });
//         setProject(projectDataObject);
//       } catch (error) {
//         console.error("Error fetching project data:", error);
//       }
//     };
//     fetchProjectData();
//   }, []);

//   const currentDate = new Date();
//   const currentYear = currentDate.getFullYear();
//   const currentMonth = currentDate.getMonth();

//   let count = 0;

//   const abc = project.forEach((project) => {
//     const startDate = new Date(project.tentative_start_date);
//     if (
//       startDate.getFullYear() === currentYear &&
//       startDate.getMonth() === currentMonth
//     ) {
//       count++;
//     }
//   });
//   console.log(abc);

//   const ProjectInCurrentMonth = project.filter((item) => {
//     return item;
//   });
//   console.log("🚀 ~ ProjectInCurrentMonth ~ ProjectInCurrentMonth:", abc);
//   return (
//     <div className="w-48 h-48 bg-[#4CBC9A] text-white rounded-md m-2">
//       <div className="flex-col h-48 flex items-center justify-center text-xl">
//         <BsGraphUp className="text-6xl " />
//         <h2>New Project</h2>
//         <span className="text-2xl">{ProjectInCurrentMonth.length}</span>
//       </div>
//     </div>
//   );
// };

// export default NewProject;
import React, { useEffect, useState } from "react";
import { GetProjectData } from "../../fetchApis/projects/getProjectData/GetProjectData";
import { BsGraphUp } from "react-icons/bs";

const NewProject = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const fetchDataFromApi2 = await GetProjectData();
        const projectDataObject = fetchDataFromApi2?.data ?? [];
        setProjects(projectDataObject);
      } catch (error) {
        console.error("Error fetching project data:", error);
      }
    };
    fetchProjectData();
  }, []);

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  const currentMonthProjects = projects.filter((project) => {
    const startDate = new Date(project.tentative_start_date);
    return (
      startDate.getFullYear() === currentYear &&
      startDate.getMonth() === currentMonth
    );
  });

  return (
    <div className="w-80 h-48 bg-[#4CBC9A] text-white rounded-md m-2">
      <h2 className="text-2xl font-bold pt-4 pl-4">New Project</h2>
      <div className="h-24 flex items-center justify-evenly text-xl">
        <span className="text-2xl font-bold">
          + {currentMonthProjects.length}
        </span>
        <BsGraphUp className="text-6xl " />
      </div>
    </div>
  );
};

export default NewProject;
