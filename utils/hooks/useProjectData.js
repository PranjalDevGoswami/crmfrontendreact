import { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ProjectData } from "../apis/projectData";
import { useSelector } from "react-redux";
import { addTotalRows, setProjects } from "../slices/ProjectSlice";
import { FilterContext } from "../../src/ContextApi/FilterContext";

const useProjectData = () => {
  const dispatch = useDispatch();
  const { page_number, page_size } = useSelector((Store) => Store.projectData);
  const [projectData, setProjectData] = useState([]);
  const {activeTabValue} = useContext(FilterContext);

  const getProjectData = async () => {
    try {
      const response = await ProjectData(
        page_number,
        page_size,
        activeTabValue
      );
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
  }, [page_size, page_number, activeTabValue]);

  return projectData;
};

export default useProjectData;
