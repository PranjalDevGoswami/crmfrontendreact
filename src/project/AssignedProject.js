// import React, { useContext, useEffect, useState } from "react";
// import Drawer from "@mui/material/Drawer";
// import DataTable from "react-data-table-component";
// import {
//   AssignColumns,
//   conditionalRowStylesForTL,
//   customStyles,
// } from "../../utils/tableData/DataTablesData.js";
// import { UpdateTeamLead } from "../fetchApis/projects/updateTeamLead/updateLeamTead.js";
// import SweetAlert from "../components/SweetAlert.js";
// import { DataTableContext } from "../ContextApi/DataTableContext.js";
// import { getWithAuth } from "../provider/helper/axios.js";
// import { FilterContext } from "../ContextApi/FilterContext.js";
// import Select from "react-select";
// import {
//   PROJECT_MANAGER,
//   UPDATETLASSIGNMENT,
// } from "../../utils/constants/urls.js";
// import { useDispatch } from "react-redux";
// import { addReRender } from "../../utils/slices/ReRenderSlice.js";
// import InputField from "../components/InputField.js";

// const AssignedProject = ({ setMultiEditFieldOpen }) => {
//   const { setIsDrawerOpen, selectedRow, setSelectedRow, setIsMultiEdit } =
//     useContext(DataTableContext);
//   const { teamLeadAssiged, setTeamLeadAssiged } = useContext(FilterContext);
//   const [openRight, setOpenRight] = useState(true);
//   const [selectedEditData, setSelectedEditData] = useState(selectedRow);
//   const [selectTL, setSelectTL] = useState([]);
//   const [isSelectTLLoaded, setIsSelectTLLoaded] = useState(false);
//   const [assignedDataList, setAssignedDataList] = useState([]);
//   const [existingAssignedData, setExistingAssignedData] = useState([]);
//   const userRole = localStorage.getItem("userrole");

//   useEffect(() => {
//     const getTeamLead = async () => {
//       try {
//         const ProjectManager = await getWithAuth(
//           `${PROJECT_MANAGER}${userRole}/teamleads/`
//         );
//         const TeamLeadList = ProjectManager?.data?.subordinates?.map(
//           (item) => ({
//             value: item.user_role.id,
//             label: item.user_role.name,
//           })
//         );
//         setSelectTL(TeamLeadList);
//         setIsSelectTLLoaded(true);
//       } catch (error) {
//         console.error("Error fetching project type List:", error);
//       }
//     };
//     getTeamLead();
//   }, [userRole]);

//   useEffect(() => {
//     const CheckTLAssigned = async () => {
//       try {
//         const response = await getWithAuth(UPDATETLASSIGNMENT);
//         const data = response?.data || [];
//         setExistingAssignedData(data);
//         const ProjectAlreadyAssigned = data.filter(
//           (item) => item?.project_assigned_to
//         );
//         const selectedRowIds = selectedRow.map((item) => item.id);
//         const selectedRowTlAssigned = ProjectAlreadyAssigned.filter((item) =>
//           selectedRowIds.includes(item.project_id)
//         );
//         setTeamLeadAssiged(selectedRowTlAssigned);
//       } catch (error) {
//         console.error("Error checking TL assignment:", error);
//       }
//     };
//     CheckTLAssigned();
//   }, [selectedRow]);

//   const closeDrawerRight = () => {
//     document.body.classList.remove("DrawerBody");
//     setIsDrawerOpen(false);
//     setMultiEditFieldOpen(false);
//     setOpenRight(false);
//     setIsMultiEdit(false);
//     setSelectedRow([]);
//   };

//   const PostProjectData = async (data) => {
//     try {
//       const postResponse = await UpdateTeamLead(data);
//       SweetAlert({
//         title: "Success",
//         text: postResponse.data.message,
//         icon: "success",
//       });
//     } catch (error) {
//       SweetAlert({
//         title: "Error",
//         text: "Error updating project data:",
//         icon: "error",
//       });
//     }
//   };

//   const handleAssignedProject = () => {
//     const updatedDataList = assignedDataList.map((assignedData) => {
//       const existingAssignedDataItem = existingAssignedData.find(
//         (item) => item.project_id === assignedData.project_id
//       );

//       return {
//         ...assignedData,
//         assigned_to: existingAssignedDataItem
//           ? existingAssignedDataItem.assigned_to?.id ||
//             assignedData.assigned_to?.id
//           : assignedData.assigned_to?.id,
//         project_client_pm:
//           assignedData.project_client_pm ||
//           existingAssignedDataItem?.project_client_pm,
//         purchase_order_no:
//           assignedData.purchase_order_no ||
//           existingAssignedDataItem?.purchase_order_no,
//       };
//     });

//     const hasAssignedTo = updatedDataList.some((data) => data.assigned_to?.id);

//     if (hasAssignedTo) {
//       PostProjectData(updatedDataList);
//       setOpenRight(false);
//       setIsDrawerOpen(false);
//       setMultiEditFieldOpen(false);
//       setIsMultiEdit(false);
//       document.body.classList.remove("DrawerBody");
//     } else {
//       SweetAlert({
//         title: "Info",
//         text: "Please ensure you have selected all required fields.",
//         icon: "info",
//       });
//     }
//   };

//   const handleSelectTL = (index, selectedOption) => {
//     if (!selectedOption || selectedOption.length === 0) {
//       SweetAlert({
//         title: "Info",
//         text: "No TL Assigned.",
//         icon: "info",
//       });
//       return;
//     }

//     const newAssignedDataList = selectedOption.map((option) => ({
//       project_id: selectedRow[index].id,
//       assigned_by: parseInt(userRole),
//       assigned_to: option.value,
//     }));

//     setAssignedDataList((prevData) => {
//       const updatedData = prevData.filter(
//         (data) => data.project_id !== selectedRow[index].id
//       );
//       newAssignedDataList.forEach((newData) => {
//         const exists = updatedData.some(
//           (data) =>
//             data.project_id === newData.project_id &&
//             data.assigned_to === newData.assigned_to?.id
//         );
//         if (!exists) {
//           updatedData.push(newData);
//         }
//       });
//       return updatedData;
//     });
//   };
//   const handleInputChange = (event, index) => {
//     const { name, value } = event.target;
//     const newAssignedDataList = [...assignedDataList];
//     const currentData = newAssignedDataList[index];
//     if (!currentData) {
//       newAssignedDataList[index] = { project_id: selectedRow[index]?.id };
//     }
//     newAssignedDataList[index] = {
//       ...newAssignedDataList[index],
//       [name]: value || "",
//     };
//     console.log("Updated Assigned Data List:", newAssignedDataList);
//     setAssignedDataList(newAssignedDataList);
//   };

//   const addField = selectedEditData?.map((item, index) => {
//     const projectID = item?.id;
//     const projectWithTL = teamLeadAssiged?.find(
//       (item) => item?.project_id === projectID
//     );

//     const isTLMandatory = !projectWithTL?.project_assigned_to?.id;

//     return {
//       ...item,
//       assigned: projectWithTL?.project_assigned_to?.id ? (
//         <p key={index}>
//           {projectWithTL?.project_assigned_to?.id
//             ?.map((assignedItem) => assignedItem.name)
//             .join(" , ")}
//         </p>
//       ) : (
//         <Select
//           isMulti
//           key={`select-${index}`}
//           options={selectTL}
//           onChange={(selectedOption) => handleSelectTL(index, selectedOption)}
//           className={`relative overflow-y-scroll w-56 ${
//             isTLMandatory ? "border-red-500" : ""
//           }`}
//           name={"project_teamlead"}
//           placeholder={isTLMandatory ? "Required" : "Optional"}
//         />
//       ),
//       project_client_pm: projectWithTL?.project_client_pm ? (
//         <p>{projectWithTL?.project_client_pm}</p>
//       ) : (
//         <InputField
//           id={`client-pm-${index}`}
//           type={"text"}
//           className={"p-2 border border-black rounded-md w-20"}
//           placeholder="Optional"
//           onchange={handleInputChange}
//           name={"project_client_pm"}
//         />
//       ),
//       email: projectWithTL?.project_client_pm ? (
//         <p>{projectWithTL?.project_client_pm}</p>
//       ) : (
//         <InputField
//           id={`client-pm-${index}`}
//           type={"email"}
//           className={"p-2 border border-black rounded-md w-20"}
//           placeholder="Optional"
//           onchange={handleInputChange}
//           name={"email"}
//         />
//       ),
//       purchase_order_no: projectWithTL?.purchase_order_no ? (
//         <p>{projectWithTL?.purchase_order_no}</p>
//       ) : (
//         <InputField
//           id={`purchase-order-${index}`}
//           type={"text"}
//           className={"p-2 border border-black rounded-md w-20"}
//           placeholder="Optional"
//           onchange={handleInputChange}
//           name={"purchase_order_no"}
//         />
//       ),
//     };
//   });

//   const updatedDataWithButton = isSelectTLLoaded
//     ? [
//         ...addField,
//         {
//           name: (
//             <button
//               className="bg-green-300 p-4 float-right"
//               onClick={handleAssignedProject}
//             >
//               Update
//             </button>
//           ),
//         },
//       ]
//     : selectedEditData;

//   return (
//     <React.Fragment>
//       <Drawer
//         anchor={"right"}
//         open={openRight}
//         onClose={closeDrawerRight}
//         PaperProps={{
//           sx: {
//             width: 1130,
//             padding: 2,
//           },
//         }}
//       >
//         <div className="flex justify-between">
//           <h1 className="text-lg font-semibold">Assign Team Leads</h1>
//         </div>
//         <DataTable
//           columns={AssignColumns}
//           data={updatedDataWithButton}
//           customStyles={customStyles}
//           conditionalRowStyles={conditionalRowStylesForTL}
//           pagination
//         />
//       </Drawer>
//     </React.Fragment>
//   );
// };

// export default AssignedProject;

import React, { useContext, useEffect, useState } from "react";
import Drawer from "@mui/material/Drawer";
import DataTable from "react-data-table-component";
import {
  AssignColumns,
  conditionalRowStylesForTL,
  customStyles,
} from "../../utils/tableData/DataTablesData.js";
import { UpdateTeamLead } from "../fetchApis/projects/updateTeamLead/updateLeamTead.js";
import SweetAlert from "../components/SweetAlert.js";
import { DataTableContext } from "../ContextApi/DataTableContext.js";
import { getWithAuth } from "../provider/helper/axios.js";
import { FilterContext } from "../ContextApi/FilterContext.js";
import Select from "react-select";
import {
  PROJECT_MANAGER,
  UPDATETLASSIGNMENT,
} from "../../utils/constants/urls.js";
import { useDispatch } from "react-redux";
import { ProjectData } from "../../utils/apis/projectData.js";
import { setProjects } from "../../utils/slices/ProjectSlice.js";
import { useSelector } from "react-redux";

const AssignedProject = ({ setMultiEditFieldOpen }) => {
  const userrole = localStorage.getItem("userrole");
  const { setIsDrawerOpen, selectedRow, setSelectedRow, setIsMultiEdit} =
    useContext(DataTableContext);
  const { teamLeadAssiged, setTeamLeadAssiged } = useContext(FilterContext);
  const [openRight, setOpenRight] = useState(true);
  const [selectedEditData, setSelectedEditData] = useState(selectedRow);
  const [selectTL, setSelectTL] = useState([]);
  const [isSelectTLLoaded, setIsSelectTLLoaded] = useState(false);
  const [assignedDataList, setAssignedDataList] = useState([]);
  const dispatch = useDispatch();
  const {page_number,page_size} = useSelector(store=>store.projectData)

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
  console.log("🚀 ~ getTeamLead ~ ProjectManager:", selectTL)


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
      // dispatchReRender(addReRender());
      const projectData = await ProjectData(page_number,page_size);
      dispatch(setProjects(projectData?.results));
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
    // dispatchReRender(addReRender());
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
            className={"relative !overflow-y-scroll w-56"}
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
              className="bg-green-300 p-4 float-right"
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
