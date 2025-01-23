import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ProjectData } from "../apis/projectData";
import { useSelector } from "react-redux";
import { setProjects } from "../slices/ProjectSlice";

const useProjectData = () => {
  const dispatch = useDispatch();
  const {page_number,page_size} = useSelector(Store=>Store.projectData)
  const [projectData, setProjectData] = useState([]);

  const getProjectData = async () => {
    try {
      const response = await ProjectData(page_number,page_size);
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
  }, [page_size,page_number]);

  return projectData;
};

export default useProjectData;
