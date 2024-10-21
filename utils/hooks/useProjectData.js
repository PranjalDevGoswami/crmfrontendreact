import React, { useEffect, useState } from "react";
import { getWithAuth } from "../../src/provider/helper/axios";
import { PROJECTDATAAPIS } from "../constants/urls";
import { useDispatch } from "react-redux";
import { addProject, setProjects } from "../slices/ProjectSlice";
import { useSelector } from "react-redux";

const useProjectData = () => {
  const dispatchProjectData = useDispatch();
  const count = useSelector((store) => store.ReRender.count);
  const [projectData, setProjectData] = useState([]);

  const getProjectData = async () => {
    const data = await getWithAuth(PROJECTDATAAPIS);
    const response = data?.data;
    response?.length > 0 && dispatchProjectData(setProjects(response));
    setProjectData(response);
  };
  useEffect(() => {
    getProjectData();
  }, [count]);

  return projectData;
};
export default useProjectData;
