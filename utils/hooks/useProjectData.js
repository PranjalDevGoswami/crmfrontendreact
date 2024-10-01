import React, { useEffect, useState } from "react";
import { getWithAuth } from "../../src/provider/helper/axios";
import { PROJECTDATAAPIS } from "../constants/urls";

const useProjectData = () => {
  const [projectData, setProjectData] = useState([]);
  const getProjectData = async () => {
    const data = await getWithAuth(PROJECTDATAAPIS);
    const response = data?.data;
    setProjectData(response);
  };
  useEffect(() => {
    getProjectData();
  }, []);
  return projectData;
};

export default useProjectData;
