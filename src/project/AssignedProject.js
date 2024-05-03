import React, { useEffect, useState } from "react";
import { Drawer } from "@material-tailwind/react";
import DataTable from "react-data-table-component";
import {
  AssignColumns,
  conditionalRowStylesForTL,
  customStyles,
} from "../../utils/DataTablesData.js";
import Dropdown from "../components/DropDown.js";
import { GetProjectManager } from "../fetchApis/projectManager/projectManager";
import { GetProjectData } from "../fetchApis/projects/getProjectData/GetProjectData.js";
import { UpdateTeamLead } from "../fetchApis/projects/updateTeamLead/updateLeamTead.js";

const AssignedProject = ({
  selectedRow,
  setIsDrawerOpen,
  setMultiEditFieldOpen,
  teamLeadAssiged,
}) => {
  const [openRight, setOpenRight] = useState(true);
  const [selectedEditData, setSelectedEditData] = useState(selectedRow);
  const [selectTL, setSelectTL] = useState(["TL1", "TL2"]);
  const [allProjectList, setAllProjectList] = useState();
  const [project_id, setProject_id] = useState([]);
  const [teamLeadNameID, setTeamLeadNameID] = useState();
  const [assignData, setAssignData] = useState({
    ids: [...project_id],
    projects: [],
  });
  const username = localStorage.getItem("username");

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const fetchDataFromApi2 = await GetProjectData();
        const projectDataObject = fetchDataFromApi2?.data?.map((val) => {
          return val;
        });
        setAllProjectList(projectDataObject);
      } catch (error) {
        console.error("Error fetching project data:", error);
      }
    };
    fetchProjectData();
  }, [selectedRow]);

  useEffect(() => {
    const getTeamLead = async () => {
      try {
        const ProjectManager = await GetProjectManager();
        const ManagerName = ProjectManager?.data?.filter((item) => {
          return item?.name === username;
        });
        const TeamLeadList = ManagerName?.map((val) => {
          const tl = val?.manager_teamlead;
          return tl.map((val) => val);
        });
        setTeamLeadNameID(TeamLeadList);
        const TL_Name = TeamLeadList.map((val) => val);
        const names = [];
        TL_Name.forEach((array) => {
          array.forEach((item) => {
            names.push(item.name);
          });
        });
        setSelectTL(names);
      } catch (error) {
        console.error("Error fetching project type List:", error);
      }
    };
    getTeamLead();
  }, []);

  const closeDrawerRight = () => {
    document.body.classList.remove("DrawerBody");
    setIsDrawerOpen(false);
    setMultiEditFieldOpen(false);
    setOpenRight(false);
  };

  const PostProjectData = async (data) => {
    try {
      const response = await UpdateTeamLead(data);
      alert(response.data.message);
    } catch (error) {
      console.error("Error fetching project data:", error);
    }
  };

  const handleAssignedProject = () => {
    PostProjectData(assignData);
    setOpenRight(false);
    setIsDrawerOpen(false);
    setMultiEditFieldOpen(false);
    document.body.classList.remove("DrawerBody");
  };

  const handleSelectTL = (index, name, value) => {
    const teamleadArray = teamLeadNameID[0];
    const Selected_TeamLead = teamleadArray.filter(
      (item) => item.name === value
    );

    if (value === Selected_TeamLead[0]?.name) {
      const updatedAssignData = { ...assignData };
      const projectCode = selectedRow[index].project_code;
      const filteredItem = allProjectList.find(
        (item) => item.project_code === projectCode
      );
      if (!updatedAssignData.ids.includes(filteredItem.id)) {
        updatedAssignData.ids.push(filteredItem.id);
      }
      const existingProjectIndex = updatedAssignData.projects.findIndex(
        (project) => project.project_id === filteredItem.id
      );

      if (existingProjectIndex !== -1) {
        updatedAssignData.projects[existingProjectIndex].project_teamlead =
          Selected_TeamLead[0].id;
      } else {
        updatedAssignData.projects.push({
          project_id: filteredItem.id,
          project_teamlead: Selected_TeamLead[0].id,
        });
      }
      setAssignData(updatedAssignData);
    }
  };

  const addField = selectedEditData.map((item, index) => {
    const projectCode = item.project_code;
    const projectWithTL = teamLeadAssiged.find(
      (project) => project.project_code === projectCode
    );
    if (projectWithTL && projectWithTL.project_teamlead) {
      return {
        ...item,
        assigned: <p>{projectWithTL?.project_teamlead?.name}</p>,
      };
    } else {
      return {
        ...item,
        assigned: (
          <Dropdown
            Option_Name={["--Select TL--", ...selectTL]}
            onChange={(name, value) => handleSelectTL(index, name, value)}
            className={"p-2 bg-white"}
            name={"project_teamlead"}
            value={assignData[index]?.status}
          />
        ),
      };
    }
  });

  const updatedDataWithButton = [
    ...addField,
    {
      name: (
        <button className="bg-green-300 p-4 " onClick={handleAssignedProject}>
          update
        </button>
      ),
    },
  ];
  return (
    <React.Fragment>
      <Drawer
        placement="right"
        open={openRight}
        onClose={closeDrawerRight}
        className="p-4 top-32 !h-[90%] !overflow-scroll"
        size={1200}
      >
        <div className="mb-6 w-1/3">
          <h3 className="text-xl underline pb-4">
            Assigned Project to TeamLead
          </h3>
        </div>
        <div className="overflow-scroll">
          <DataTable
            columns={AssignColumns}
            data={updatedDataWithButton}
            customStyles={customStyles}
            conditionalRowStyles={conditionalRowStylesForTL}
            pagination
          />
        </div>
      </Drawer>
    </React.Fragment>
  );
};

export default AssignedProject;
