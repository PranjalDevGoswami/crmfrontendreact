import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addTotalRows, setProjects } from "../slices/projectSlice";
import { ProjectData } from "../apis/projectData";
import { useSelector } from "react-redux";

const useProjectData = () => {
  const dispatch = useDispatch();
  const { page_number, page_size, activeTab } = useSelector(
    (Store) => Store.projectData
  );
  const [projectData, setProjectData] = useState([]);

  const getProjectData = async () => {
    try {
      const response = await ProjectData(page_number, page_size, activeTab);
      if (response) {
        dispatch(setProjects(response?.results));
        dispatch(addTotalRows(response?.count));
        setProjectData(response?.results);
      }
    } catch (error) {
      console.error("Error fetching project data:", error);
    }
  };

  useEffect(() => {
    getProjectData();
  }, [page_number, page_size, activeTab]);

  return projectData;
};

export default useProjectData;
