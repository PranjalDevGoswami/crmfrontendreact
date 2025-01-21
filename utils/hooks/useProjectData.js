import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setProjects } from "../slices/ProjectSlice";
import { useSelector } from "react-redux";
import { ProjectData } from "../apis/projectData";

const useProjectData = () => {
  const dispatch = useDispatch();
  const count = useSelector((store) => store.ReRender.count);
  const [projectData, setProjectData] = useState([]);

  const getProjectData = async () => {
    try {
      const response = await ProjectData();
      if (response) {
        dispatch(setProjects(response));
        setProjectData(response);
      }
    } catch (error) {
      console.error("Error fetching project data:", error);
    }
  };

  useEffect(() => {
    getProjectData();
  }, [count]);

  return projectData;
};

export default useProjectData;
