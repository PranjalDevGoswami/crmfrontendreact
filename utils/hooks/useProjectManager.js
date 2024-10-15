import React, { useContext, useEffect, useState } from "react";
import { FilterContext } from "../../src/ContextApi/FilterContext";
import { GetProjectManager } from "../../src/fetchApis/projectManager/projectManager";

const useManagerList = () => {
  const { managerListArray, setManagerListArray } = useContext(FilterContext);

  const FetchProjectManager = async () => {
    try {
      const ProjectManager = await GetProjectManager();
      const ProjectManagerObject = ProjectManager?.data?.map((val) => {
        return val?.user;
      });
      setManagerListArray(ProjectManagerObject);
    } catch (error) {
      console.error("Error fetching project Manager List:", error);
    }
  };

  useEffect(() => {
    FetchProjectManager();
  }, []);

  return managerListArray;
};

export default useManagerList;
