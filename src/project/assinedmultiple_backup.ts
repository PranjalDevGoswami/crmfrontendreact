import React, { useEffect, useState } from "react";
import { Drawer, Button } from "@material-tailwind/react";
import DataTable from "react-data-table-component";
import { AssignColumns, customStyles } from "../../utils/DataTablesData.js";
import Dropdown from "../components/DropDown.js";
import { GetProjectManager } from "../fetchApis/projectManager/projectManager";
import { PostFormData } from "../fetchApis/projects/postProjectData/PostProjectData.js";
import { GetProjectData } from "../fetchApis/projects/getProjectData/GetProjectData.js";
import { UpdateTeamLead } from "../fetchApis/projects/updateTeamLead/updateLeamTead.js";

const AssignedProject = ({
  selectedRow,
  setIsDrawerOpen,
  setMultiEditFieldOpen,
}) => {
  const [openRight, setOpenRight] = useState(true);
  const [selectedEditData, setSelectedEditData] = useState(selectedRow);
  const [project_id, setProject_id] = useState();
  const [project_name, setProject_name] = useState();
  const [assignData, setAssignData] = useState({
    name: project_name,
    project_id: project_id,
    project_teamlead: "",
  });
  const [selectTL, setSelectTL] = useState(["TL1", "TL2"]);
  const [teamLeadNameID, setTeamLeadNameID] = useState();
  const username = localStorage.getItem("username");

  useEffect(() => {
    const fetchProjectData = async () => {
      const projectCode = selectedRow?.map((item) => item.project_code);
      const projectName = selectedRow?.map((item) => item.name);
      try {
        const fetchDataFromApi2 = await GetProjectData();
        const projectDataObject = fetchDataFromApi2?.data?.map((val) => {
          return val;
        });

        const project = projectDataObject.find(
          (project) => project.project_code === projectCode
        );
        if (project) {
          setProject_id(project.id);
          setProject_name(projectName);
          setAssignData({ ...assignData, project_id: project.id });
        }
      } catch (error) {
        console.error("Error fetching project data:", error);
      }
    };
    fetchProjectData();
  }, [selectedRow]);
  console.log(project_id);
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
        console.log("🚀 ~ TeamLeadList ~ TeamLeadList:", TeamLeadList);
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
  const PostProjectData = async (projectId, data) => {
    try {
      await UpdateTeamLead(projectId, data);
    } catch (error) {
      console.error("Error fetching project data:", error);
    }
  };

  const handleAssignedProject = () => {
    PostProjectData(project_id, assignData);
    setOpenRight(false);
    setIsDrawerOpen(false);
    setMultiEditFieldOpen(false);
    document.body.classList.remove("DrawerBody");
  };

  const handleSelectTL = (index, name, value) => {
    const teamleadArray = teamLeadNameID[0];
    const selectedTeamLead = teamleadArray.find((tl) => tl.name === value);
    if (selectedTeamLead) {
      setAssignData({
        ...assignData,
        [name]: value,
        project_teamlead: selectedTeamLead.id,
      });
    } else {
      // Handle case where selected team lead is not found
      console.error("Selected team lead not found");
    }
  };

  const addField = selectedEditData.map((item, index) => ({
    ...item,
    assigned: (
      <Dropdown
        key={`status_${item.id}`}
        Option_Name={["--Select TL--", ...selectTL]}
        onChange={(name, value) => handleSelectTL(index, name, value)}
        className={"p-2 bg-gray-300"}
        name={"project_teamlead"}
        value={assignData[index]?.status}
      />
    ),
  }));

  const updatedDataWithButton = [
    ...addField,
    {
      name: (
        <button
          className="bg-green-300 p-4 "
          onClick={() => {
            handleAssignedProject();
          }}
        >
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
        size="1200px"
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
          />
        </div>
      </Drawer>
    </React.Fragment>
  );
};

export default AssignedProject;
