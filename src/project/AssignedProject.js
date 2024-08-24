import React, { useContext, useEffect, useState } from "react";
import Drawer from "@mui/material/Drawer";
import DataTable from "react-data-table-component";
import {
  AssignColumns,
  conditionalRowStylesForTL,
  customStyles,
} from "../../utils/DataTablesData.js";
import { UpdateTeamLead } from "../fetchApis/projects/updateTeamLead/updateLeamTead.js";
import SweetAlert from "../components/SweetAlert.js";
import { DataTableContext } from "../ContextApi/DataTableContext.js";
import { PROJECT_MANAGER, UPDATETLASSIGNMENT } from "../../utils/urls.js";
import { getWithAuth } from "../provider/helper/axios.js";
import { FilterContext } from "../ContextApi/FilterContext.js";
import Select from "react-select";

const AssignedProject = ({ setMultiEditFieldOpen }) => {
  const userrole = localStorage.getItem("userrole");
  const { setIsDrawerOpen, selectedRow, setSelectedRow, setIsMultiEdit } =
    useContext(DataTableContext);
  const { teamLeadAssiged, setTeamLeadAssiged } = useContext(FilterContext);
  const [openRight, setOpenRight] = useState(true);
  const [selectedEditData, setSelectedEditData] = useState(selectedRow);
  const [selectTL, setSelectTL] = useState([]);
  const [isSelectTLLoaded, setIsSelectTLLoaded] = useState(false);
  const [assignedDataList, setAssignedDataList] = useState([]);

  useEffect(() => {
    const getTeamLead = async () => {
      try {
        const ProjectManager = await getWithAuth(
          `${PROJECT_MANAGER}${userrole}/teamleads/`
        );
        const TeamLeadList = ProjectManager?.data?.subordinates?.map(
          (item) => ({
            value: item.user_role.id,
            label: item.user_role.name,
          })
        );
        setSelectTL(TeamLeadList);
        setIsSelectTLLoaded(true);
      } catch (error) {
        console.error("Error fetching project type List:", error);
      }
    };
    getTeamLead();
  }, [userrole]);

  useEffect(() => {
    const CheckTLAssigned = async () => {
      try {
        const response = await getWithAuth(UPDATETLASSIGNMENT);
        const data = response?.data;
        const ProjectAlreadyAssigned = data.filter(
          (item) => item?.project_assigned_to
        );
        const selectedRowIds = selectedRow.map((item) => item.id);
        const selectedRowTlAssigned = ProjectAlreadyAssigned.filter((item) =>
          selectedRowIds.includes(item.project_id)
        );
        setTeamLeadAssiged(selectedRowTlAssigned);
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
    if (assignedDataList.length > 0) {
      PostProjectData(assignedDataList);
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

  const handleSelectTL = (index, selectedOption) => {
    if (!selectedOption || selectedOption.length === 0) {
      SweetAlert({
        title: "Info",
        text: "No TL Assigned.",
        icon: "info",
      });
      return;
    }

    const newAssignedDataList = selectedOption.map((option) => ({
      project_id: selectedRow[index].id,
      assigned_by: parseInt(userrole),
      assigned_to: option.value,
    }));

    setAssignedDataList((prevData) => {
      const updatedData = prevData.filter(
        (data) => data.project_id !== selectedRow[index].id
      );
      newAssignedDataList.forEach((newData) => {
        const exists = updatedData.some(
          (data) =>
            data.project_id === newData.project_id &&
            data.assigned_to === newData.assigned_to
        );
        if (!exists) {
          updatedData.push(newData);
        }
      });
      return updatedData;
    });
  };

  const addField = selectedEditData?.map((item, index) => {
    const projectID = item?.id;
    const projectWithTL = teamLeadAssiged?.find(
      (item) => item?.project_id === projectID
    );
    if (projectWithTL && projectWithTL?.project_assigned_to) {
      return {
        ...item,
        assigned: (
          <p key={index}>
            {projectWithTL?.project_assigned_to
              ?.map((item) => item.name)
              .join(" , ")}
          </p>
        ),
      };
    } else {
      return {
        ...item,
        assigned: (
          <Select
            isMulti
            key={`select-${index}`}
            options={selectTL}
            onChange={(selectedOption) => handleSelectTL(index, selectedOption)}
            className={"relative"}
            name={"project_teamlead"}
            value={assignedDataList[index]?.user_role?.name}
          />
        ),
      };
    }
  });

  const updatedDataWithButton = isSelectTLLoaded
    ? [
        ...addField,
        {
          name: (
            <button
              className="bg-green-300 p-4 "
              onClick={handleAssignedProject}
            >
              Update
            </button>
          ),
        },
      ]
    : selectedEditData;

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
