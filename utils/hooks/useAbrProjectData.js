import {  useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { abrProjectData } from "../apis/abrProjectData";

const useAbrProjectData = () => {
  const dispatch = useDispatch();
  const [projectData, setProjectData] = useState([]);

  const getAbrProjectData = async () => {
    try {
      const response = await abrProjectData(
      );
      if (response) {
        // dispatch(addFinanceProject(response));
        setProjectData(response)
      }
    } catch (error) {
      console.error("Error fetching project data:", error);
    }
  };

  useEffect(() => {
    getAbrProjectData();
  }, []);

  return projectData;
};

export default useAbrProjectData;
