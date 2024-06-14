import { createContext, useEffect, useState } from "react";
import { GetProjectData } from "../fetchApis/projects/getProjectData/GetProjectData";

export const FetchProject = createContext();

export const FetchProjectProvider = ({ children }) => {
  const [projectList, setProjectList] = useState();

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const fetchDataFromApi2 = await GetProjectData();
        const projectDataObject = fetchDataFromApi2?.data?.map((val) => {
          return val;
        });
        setProjectList(projectDataObject);
        // Filter based on selected status and client
        let filteredData = projectDataObject;
        if (selectedStatus && selectedStatus !== "--Select Status--") {
          filteredData = filteredData.filter(
            (item) => item.status == selectedStatus
          );
        }
        if (selectedHod && selectedHod !== "--Select HOD--") {
          filteredData = filteredData.filter(
            (item) => item?.project_hod?.name == selectedHod
          );
        }
        if (selectedManager && selectedManager !== "--Select Manager--") {
          filteredData = filteredData.filter(
            (item) => item?.project_manager?.name == selectedManager
          );
        }
        if (selectedTl && selectedTl !== "--Select TeamLead--") {
          filteredData = filteredData.filter(
            (item) => item?.project_teamlead?.name == selectedTl
          );
        }
        if (selectedClient && selectedClient !== "--Select Client--") {
          filteredData = filteredData.filter(
            (item) => item.clients.name === selectedClient
          );
        }
        if (role === "Team Lead") {
          filteredData = filteredData?.filter((item) => {
            return item?.project_teamlead?.id == user_id;
          });
        }
        if (role === "AM/Manager") {
          filteredData = filteredData?.filter((item) => {
            return item?.project_manager?.id == user_id;
          });
        }
        if (role === "HOD") {
          filteredData = filteredData?.filter((item) => {
            return item?.project_hod?.id == user_id;
          });
        }
        if (role === "superuser") {
          filteredData = filteredData?.filter((item) => {
            return item;
          });
        }
        if (department == 1) {
          filteredData = projectDataObject?.filter((item) => {
            return item.user_id == user_id;
          });
          if (selectedStatus && selectedStatus !== "--Select Status--") {
            filteredData = filteredData.filter(
              (item) => item.status == selectedStatus
            );
          }
          if (selectedClient && selectedClient !== "--Select Client--") {
            filteredData = filteredData.filter(
              (item) => item.clients.name === selectedClient
            );
          }
        }

        setTeamLeadAssiged(filteredData);
        setFilteredProjectData(filteredData);
      } catch (error) {
        console.error("Error fetching project data:", error);
      }
    };
    fetchProjectData();
  }, [
    token,
    isDrawerOpen,
    selectedStatus,
    selectedClient,
    selectedManager,
    selectedHod,
    selectedTl,
  ]);
  return (
    <FetchProject.Provider value={{ projectList, setProjectList }}>
      {children}
    </FetchProject.Provider>
  );
};
