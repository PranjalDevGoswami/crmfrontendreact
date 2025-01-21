import { createContext, useState } from "react";

export const ProjectType = createContext();

export const ProjectTypeProvider = ({ children }) => {
  const [projectTypeData, setProjectTypeData] = useState([
    "Demo CATI",
    " Demo CAWI",
  ]);
  return (
    <ProjectType.Provider value={{ projectTypeData, setProjectTypeData }}>
      {children}
    </ProjectType.Provider>
  );
};
