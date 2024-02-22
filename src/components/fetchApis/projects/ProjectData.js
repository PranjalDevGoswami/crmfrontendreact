import React, { useEffect, useState } from "react";
import { PROJECTDATAAPIS } from "../../../../utils/Apis";
import { useDispatch } from "react-redux";

const ProjectData = () => {
  const [projectDataFetch, setProjectDataFetch] = useState([]);

  const dispatchProjectData = useDispatch();

  useEffect(() => {
    FetchFormadata();
  }, []);

  const FetchFormadata = async () => {
    const projectData = await fetch(PROJECTDATAAPIS);
    const projectDataJson = await projectData.json();
    setProjectDataFetch(projectDataJson);
    console.log("projectDataJsonprojectDataJson", projectDataJson);
  };
  dispatchProjectData(addFormData(projectDataFetch));
  return <div>ProjectDetails</div>;
};

export default ProjectData;
