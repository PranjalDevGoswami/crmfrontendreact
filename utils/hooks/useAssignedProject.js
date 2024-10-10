import React, { useEffect, useState } from "react";
import { getWithAuth } from "../../src/provider/helper/axios";
import { UPDATETLASSIGNMENT } from "../constants/urls";

const useAssignedProject = () => {
  const [assignedProject, setAssignedProject] = useState([]);
  const getAssignedProject = async () => {
    const data = await getWithAuth(UPDATETLASSIGNMENT);
    const response = data?.data;
    setAssignedProject(response);
  };
  useEffect(() => {
    getAssignedProject();
  }, []);
  return assignedProject;
};

export default useAssignedProject;
