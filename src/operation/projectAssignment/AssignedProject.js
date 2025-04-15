import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UpdateTeamLead } from "../../fetchApis/projects/updateTeamLead/updateLeamTead";
import SweetAlert from "../../components/SweetAlert";
import { ProjectData } from "../../../utils/apis/projectData";
import { setProjects } from "../../../utils/slices/projectSlice";
import { useHandleOutsideClick } from "../../../utils/hooks/useHandleOutSideClick";
import Tooltip from "../../components/Tooltip";
import {
  setSelectedRow,
  toggleIsDrawerOpen,
  toggleIsMultiEdit,
} from "../../../utils/slices/dataTableSlice";
import AssignProjectTable from "./AssignProjectTable.js";
import useGetTeamLeadUnderManager from "../../../utils/hooks/useGetTeamLeadUnderManagers";
import { addProjectAssignment } from "../../../utils/slices/projectAssignmentSlice.js";

const AssignedProject = ({ setMultiEditFieldOpen }) => {
  const { page_size, page_number, activeTab } = useSelector(
    (store) => store.projectData
  );
  const { projectAssignmentData } = useSelector(
    (store) => store.projectAssignment
  );
  const darkMode = useSelector((store) => store.themeSetting.isDarkMode);
  const handleAssignedProjectDrawer = useRef();
  const dispatch = useDispatch();

  const [openRight, setOpenRight] = useState(true);

  const userrole = localStorage.getItem("userrole");
  const teamlead = useGetTeamLeadUnderManager(userrole);

  const closeDrawerRight = () => {
    document.body.classList.remove("DrawerBody");
    dispatch(toggleIsDrawerOpen());
    dispatch(toggleIsMultiEdit(false));
    dispatch(setSelectedRow([]));
    setMultiEditFieldOpen(false);
    setOpenRight(false);
  };
  useHandleOutsideClick(handleAssignedProjectDrawer, closeDrawerRight);

  const finalData = projectAssignmentData.flatMap((item) => {
    if (Array.isArray(item.AssignedTo)) {
      return item.AssignedTo.map((name) => {
        const matchedTeamLead = teamlead?.find((tl) => tl.label === name);
        return matchedTeamLead
          ? {
              project_id: item.project_id,
              assigned_by: userrole,
              assigned_to: matchedTeamLead.value,
              project_client_pm: item.project_client_pm || "",
              purchase_order_no: item.purchase_order_no || "",
            }
          : null;
      }).filter((entry) => entry !== null);
    }

    return [];
  });

  const PostProjectData = async (data) => {
    try {
      const response = await UpdateTeamLead(data);
      SweetAlert({
        title: "Success",
        text: response.data.message,
        icon: "success",
      });
      dispatch(addProjectAssignment([]));
      closeDrawerRight();

      const projectData = await ProjectData(page_number, page_size);
      dispatch(setProjects({ data: projectData?.results, reset: true }));
    } catch (error) {
      SweetAlert({
        title: "Error",
        text: "Error in UpdateTeamLead:",
        error,
        icon: "error",
      });
    }
  };

  const handleProjectAssignment = () => {
    if (finalData.length > 0) {
      PostProjectData(finalData);
    } else {
      SweetAlert({
        title: "Error",
        text: "Please Select a Project TL for Update",
        icon: "error",
      });
    }
  };

  return (
    <React.Fragment>
      {openRight && (
        <div
          className={`${
            darkMode ? "bg-black text-white" : "bg-white text-black"
          } fixed top-0 right-0 w-full max-w-6xl h-full shadow-lg z-50 p-4 delay-300 transition-all overflow-scroll`}
          ref={handleAssignedProjectDrawer}
        >
          <div className="mb-6 w-1/3">
            <h3 className="text-xl underline pb-4">
              Assigned Project to TeamLead
            </h3>
          </div>
          <div className="overflow-y-visible text-center">
            <AssignProjectTable />
            <button
              className="bg-green-500 hover:bg-green-700 rounded-md p-2 text-white m-1"
              onClick={handleProjectAssignment}
            >
              Submit
            </button>
          </div>
          <button
            className="absolute top-4 right-4 p-2 bg-red-500 rounded text-white"
            onClick={closeDrawerRight}
          >
            <Tooltip text={"Close Drawer"} position="left">
              X
            </Tooltip>
          </button>
        </div>
      )}
    </React.Fragment>
  );
};

export default AssignedProject;
