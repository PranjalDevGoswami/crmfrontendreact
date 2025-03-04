import { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { FilterContext } from "../../src/ContextApi/FilterContext";
import { cbrProjectData } from "../apis/cbrProjectData";
import { addFinanceProject } from "../slices/ProjectSlice";

const useCbrProjectData = () => {
  const dispatch = useDispatch();
  const [projectData, setProjectData] = useState([]);

  const getCbrProjectData = async () => {
    try {
      const response = await cbrProjectData(
      );
      if (response) {
        dispatch(addFinanceProject(response));
        setProjectData(response)
      }
    } catch (error) {
      console.error("Error fetching project data:", error);
    }
  };

  useEffect(() => {
    getCbrProjectData();
  }, []);

  return projectData;
};

export default useCbrProjectData;
