import React, { useContext, useEffect, useState } from "react";
import Drawer from "@mui/material/Drawer";
import DataTable from "react-data-table-component";
import {
  AssignColumns,
  conditionalRowStylesForTL,
  customStyles,
} from "../../utils/DataTablesData.js";
import Dropdown from "../components/DropDown.js";
import { UpdateTeamLead } from "../fetchApis/projects/updateTeamLead/updateLeamTead.js";
import SweetAlert from "../components/SweetAlert.js";
import { DataTableContext } from "../ContextApi/DataTableContext.js";
import { PROJECT_MANAGER, UPDATETLASSIGNMENT } from "../../utils/urls.js";
import { getWithAuth } from "../provider/helper/axios.js";
import { FilterContext } from "../ContextApi/FilterContext.js";

const AssignedProject = ({ setMultiEditFieldOpen }) => {
  const userrole = localStorage.getItem("userrole");
  const { setIsDrawerOpen, selectedRow, setSelectedRow, setIsMultiEdit } =
    useContext(DataTableContext);
  const { teamLeadAssiged, setTeamLeadAssiged } = useContext(FilterContext);
  const [openRight, setOpenRight] = useState(true);
  const [selectedEditData, setSelectedEditData] = useState(selectedRow);
  const [selectTL, setSelectTL] = useState(["No TL Assigned"]);
  const [assignData, setAssignData] = useState([]);
  const { projectData } = useContext(FilterContext);

  useEffect(() => {
    const getTeamLead = async () => {
      try {
        const ProjectManager = await getWithAuth(
          `${PROJECT_MANAGER}${userrole}/teamleads/`
        );
        const TeamLeadList = ProjectManager?.data?.team_leads?.map((item) => {
          return item;
        });
        setSelectTL(TeamLeadList);
      } catch (error) {
        console.error("Error fetching project type List:", error);
      }
    };
    getTeamLead();
  }, []);

  useEffect(() => {
    const CheckTLAssigned = async () => {
      try {
        const response = await getWithAuth(UPDATETLASSIGNMENT);
        const data = response?.data;
        const ProjectAlreadyAssigned = data.filter((item) => item?.assigned_to);
        const selectedRowIds = selectedRow.map((item) => item.id);
        const selectedRowTlAssigned = ProjectAlreadyAssigned.filter((item) =>
          selectedRowIds.includes(item.project_id)
        );
        setTeamLeadAssiged(selectedRowTlAssigned);
        console.log("🚀 ~ CheckTLAssigned ~ data:", selectedRowTlAssigned);
      } catch (error) {
        console.error("Error checking TL assignment:", error);
      }
    };
    CheckTLAssigned();
  }, [selectedRow]);

  const closeDrawerRight = () => {
    document.body.classList.remove("DrawerBody");
    setIsDrawerOpen(false);
    setMultiEditFieldOpen(false);
    setOpenRight(false);
    setIsMultiEdit(false);
    setSelectedRow([]);
  };

  const PostProjectData = async (data) => {
    try {
      const response = await UpdateTeamLead(data);
      SweetAlert({
        title: "Success",
        text: response.data.message,
        icon: "success",
      });
    } catch (error) {
      SweetAlert({
        title: "Error",
        text: "Error fetching project data:",
        error,
        icon: "error",
      });
    }
  };

  const handleAssignedProject = () => {
    if (assignData.length > 0) {
      PostProjectData(assignData);
      setOpenRight(false);
      setIsDrawerOpen(false);
      setMultiEditFieldOpen(false);
      setIsMultiEdit(false);
      document.body.classList.remove("DrawerBody");
    } else {
      SweetAlert({
        title: "Info",
        text: "Please Select a Project TL for Update",
        icon: "info",
      });
    }
  };

  const handleSelectTL = (index, name, value) => {
    if (value === "No TL Assigned") {
      SweetAlert({
        title: "info",
        text: "No TL Assiged.",
        icon: "info",
      });
    }
    const Selected_TeamLead = selectTL.filter(
      (item) => item.user_role.name === value
    );
    if (value === Selected_TeamLead[0]?.user_role?.name) {
      const projectCode = selectedRow[index].project_code;
      const projectId = selectedRow[index].id;
      setAssignData((prevData) => [
        ...prevData,
        {
          project_id: projectId,
          assigned_by: parseInt(userrole),
          assigned_to: parseInt(Selected_TeamLead[0].user_role.id),
        },
      ]);
    }
  };
  const addField = selectedEditData.map((item, index) => {
    const projectID = item?.id;
    const projectWithTL = teamLeadAssiged?.find(
      (item) => item?.project_id === projectID
    );
    if (projectWithTL && projectWithTL?.assigned_to) {
      return {
        ...item,
        assigned: <p>{projectWithTL?.project_assigned_to?.name}</p>,
      };
    } else {
      return {
        ...item,
        assigned: (
          <Dropdown
            Option_Name={[
              "--Select TL--",
              ...selectTL.map((item) => item?.user_role?.name),
            ]}
            onChange={(name, value) => handleSelectTL(index, name, value)}
            className={"p-2 bg-white"}
            name={"project_teamlead"}
            value={assignData[index]?.user_role?.name}
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
          Update
        </button>
      ),
    },
  ];
  return (
    <React.Fragment>
      <Drawer
        anchor={"right"}
        open={openRight}
        onClose={closeDrawerRight}
        PaperProps={{
          sx: {
            width: 1200,
            padding: 2,
          },
        }}
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
