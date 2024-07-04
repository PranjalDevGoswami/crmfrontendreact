import { createContext, useEffect, useState } from "react";
import { ProjectDetails } from "../fetchApis/projects/getProjectData/GetProjectData";

export const FetchProject = createContext();

export const FetchProjectProvider = ({ children }) => {
  const [projectList, setProjectList] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      const getProject = async () => {
        const response = await ProjectDetails();
        setProjectList(response);
      };
      getProject();
    }
  }, []);

  return (
    <FetchProject.Provider value={{ projectList, setProjectList }}>
      {children}
    </FetchProject.Provider>
  );
};
