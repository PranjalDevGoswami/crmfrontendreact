import React, { useContext, useState } from "react";
import { RaiseCBRPostApi } from "../../fetchApis/projects/raiseCBR/RaiseCbr";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AssignedProject from "../../project/AssignedProject.js";
import SweetAlert from "../../components/SweetAlert.js";
import { DataTableContext } from "../../ContextApi/DataTableContext.js";
import { department, isHod, isSuperUser } from "../../config/Role.js";
import { isFinanceDept, isOperationDept } from "../../config/Departments.js";

const OpereationButton = () => {
  const navigate = useNavigate();
  const [viewEditRecord, setEditRecord] = useState();
  const [updatedValue, setUpdatedValue] = useState({
    project_code: "",
    date: "",
    man_days: "",
    total_achievement: "",
  });

  const {
    isAddManDays,
    setIsAddManDays,
    isView,
    setisView,
    setisEdit,
    isEdit,
    selectedRecord,
    setChangeProjectStatus,
  } = useContext(DataTableContext);

  const [isInvoice, setIsInvoice] = useState(false);
  const role = localStorage.getItem("role");

  const HandleOnEdit = (selectedRecord) => {
    setisEdit(true);
    setIsAddManDays(false);
    setChangeProjectStatus(false);
    setisView(false);
    setEditRecord(selectedRecord);
    setUpdatedValue({
      ...updatedValue,
      project_code: selectedRecord?.project_code,
      name: selectedRecord?.name,
    });
  };
  const handleStatus = (selectedRecord) => {
    setChangeProjectStatus(true);
    setisEdit(false);
    setIsAddManDays(false);
    setisView(false);
  };
  const HandleAddManDays = () => {
    setIsAddManDays(true);
    setisEdit(false);
    setChangeProjectStatus(false);
    setisView(false);
  };
  // const handleAssignProject = () => {
  //   console.log("Assigned Project");
  //   setChangeProjectStatus(false);
  //   setisEdit(false);
  //   setIsAddManDays(false);
  //   setisView(false);
  // };

  const handleViewProject = () => {
    setisView(true);
    setChangeProjectStatus(false);
    setisEdit(false);
    setIsAddManDays(false);
    navigate("/view", { state: selectedRecord });
  };

  const handleRaiseCBR = (selectedRecord) => {
    PostRaiseCBR({ project_code: selectedRecord.project_code });
  };
  const handleGetInvoice = (selectedRecord) => {
    // e.preventDefault();
    setIsInvoice(true);
    navigate("/invoice", { state: selectedRecord });
  };
  const PostRaiseCBR = async (data) => {
    try {
      const response = await RaiseCBRPostApi(data);
      if (response?.status == true) {
        SweetAlert({
          title: "CBR has been Raised !!!",
          text: "",
          icon: "success",
        });
      } else if (response?.ex?.response?.data?.project_code) {
        SweetAlert({
          title: "project code : " + response?.ex?.response?.data?.project_code,
        });
      }
    } catch (error) {
      console.error("Error fetching project data:", error);
      SweetAlert({
        title: "Error",
        text: "Error fetching project data:",
        error,
        icon: "error",
      });
    }
  };

  const endDateStr = selectedRecord.tentative_end_date;
  const endDate = new Date(endDateStr);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  endDate.setHours(0, 0, 0, 0);
  const DateValidate = today <= endDate;
  return (
    <div>
      <div className="relative text-white overflow-visible rounded-md rounded-tr-none z-50">
        <div className="w-40 h-54 ">
          <div className="flex flex-col p-1 ml-2 mr-2 text-sm">
            <button
              className="border-b border-black text-left bg-[#bd1d1d] z-50 p-2 hover:bg-yellow-200 hover:text-black rounded-sm"
              onClick={handleViewProject}
            >
              View
            </button>
            {department == isOperationDept && (
              <>
                {selectedRecord.status !== "Project Initiated" &&
                  selectedRecord.status !== "Completed" &&
                  selectedRecord.status !== "Cbr Raised" &&
                  selectedRecord.status !== "On Hold" &&
                  role !== isHod &&
                  DateValidate == true && (
                    <button
                      className="border-b border-black text-left bg-[#bd1d1d] z-50 p-2 hover:bg-yellow-200 hover:text-black rounded-sm"
                      onClick={HandleAddManDays}
                    >
                      Add Mandays
                    </button>
                  )}
                {selectedRecord.status !== "Project Initiated" &&
                  selectedRecord.status !== "Completed" &&
                  selectedRecord.status !== "Cbr Raised" &&
                  selectedRecord.status !== "On Hold" &&
                  role !== isHod && (
                    <button
                      className="border-b border-black text-left bg-[#bd1d1d] z-50 p-2 hover:bg-yellow-200 hover:text-black rounded-sm"
                      onClick={() => {
                        HandleOnEdit(selectedRecord);
                      }}
                    >
                      Edit Request
                    </button>
                  )}
                {selectedRecord.status !== "Project Initiated" &&
                  selectedRecord.status !== "Completed" &&
                  selectedRecord.status !== "Cbr Raised" &&
                  role !== isHod && (
                    <button
                      className="border-b border-black text-left bg-[#bd1d1d] z-50 p-2 hover:bg-yellow-200 hover:text-black rounded-sm"
                      onClick={() => handleStatus(selectedRecord)}
                    >
                      Status Update
                    </button>
                  )}
                {selectedRecord.status === "Completed" &&
                  selectedRecord.status !== "On Hold" &&
                  selectedRecord.status !== "Cbr Raised" &&
                  role !== isHod && (
                    <button
                      className="border-black text-left bg-[#bd1d1d] z-50 p-2 hover:bg-yellow-200 hover:text-black rounded-sm"
                      onClick={() => handleRaiseCBR(selectedRecord)}
                    >
                      Raise CBR
                    </button>
                  )}
                {role === isSuperUser && (
                  <button
                    className="border-b border-black text-left bg-[#bd1d1d] z-50 p-2 hover:bg-yellow-200 hover:text-black rounded-sm w-full"
                    onClick={() => handleGetInvoice(selectedRecord)}
                  >
                    Get Invoice
                  </button>
                )}
              </>
            )}
          </div>
        </div>
        {department == isFinanceDept && (
          <button
            className="border-b border-black text-left bg-[#bd1d1d] z-50 p-2 hover:bg-yellow-200 hover:text-black rounded-sm w-full"
            onClick={() => handleGetInvoice(selectedRecord)}
          >
            Get Invoice
          </button>
        )}
      </div>
    </div>
  );
};

export default OpereationButton;
