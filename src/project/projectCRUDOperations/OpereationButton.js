import React, { useState } from "react";
import View from "./View";
import { RaiseCBRPostApi } from "../../fetchApis/projects/raiseCBR/RaiseCbr";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AssignedProject from "../../project/AssignedProject.js";

const OpereationButton = ({
  record,
  isView,
  setisView,
  setisEdit,
  isEdit,
  setIsStatus,
}) => {
  const role = localStorage.getItem("role");
  const department = localStorage.getItem("department");
  const navigate = useNavigate();
  const [viewEditRecord, setEditRecord] = useState();
  const [updatedValue, setUpdatedValue] = useState({
    project_code: "",
    date: "",
    man_days: "",
    total_achievement: "",
  });
  const [isInvoice, setIsInvoice] = useState(false);

  const HandleOnEdit = (record) => {
    setisEdit(true);
    setEditRecord(record);
    setUpdatedValue({
      ...updatedValue,
      project_code: record?.project_code,
      name: record?.name,
    });
  };

  const handleViewProject = () => {
    setisView(true);
    navigate("/view", { state: record });
  };

  const handleRaiseCBR = (record) => {
    PostRaiseCBR({ project_code: record.project_code });
  };
  const handleGetInvoice = (record) => {
    // e.preventDefault();
    setIsInvoice(true);
    navigate("/invoice", { state: record });
  };
  const PostRaiseCBR = async (data) => {
    try {
      await RaiseCBRPostApi(data);
    } catch (error) {
      console.error("Error fetching project data:", error);
    }
  };
  const handleStatus = (record) => {
    setIsStatus(true);
  };
  const HandleAddManDays = () => {
    setisEdit(true);
  };
  const handleAssignProject = () => {
    console.log("Assigned Project");
  };
  return (
    <div>
      <div className="relative text-white overflow-visible rounded-md rounded-tr-none z-50">
        <div className="w-40 h-54 ">
          {role === "TeamLeadOperation" ||
          (role === "Team Lead" && department == 2) ? (
            <div className="flex flex-col p-1 ml-2 mr-2 text-sm">
              <button
                className="border-b border-black text-left bg-[#bd1d1d] z-50 p-2 hover:bg-yellow-200 hover:text-black rounded-sm"
                onClick={handleViewProject}
              >
                {/* <Link to={'/view'}> */}
                View
                {/* </Link> */}
              </button>
              {record.status !== "completed" &&
              record.status !== "cbr_raised" ? (
                <button
                  className="border-b border-black text-left bg-[#bd1d1d] z-50 p-2 hover:bg-yellow-200 hover:text-black rounded-sm"
                  onClick={HandleAddManDays}
                >
                  Add Mandays
                </button>
              ) : (
                ""
              )}
              {record.status !== "completed" &&
              record.status !== "cbr_raised" ? (
                <button
                  className="border-b border-black text-left bg-[#bd1d1d] z-50 p-2 hover:bg-yellow-200 hover:text-black rounded-sm"
                  onClick={() => {
                    HandleOnEdit(record);
                  }}
                >
                  Edit Target Request
                </button>
              ) : (
                ""
              )}
              {record.status !== "completed" &&
              record.status !== "cbr_raised" ? (
                <button
                  className="border-b border-black text-left bg-[#bd1d1d] z-50 p-2 hover:bg-yellow-200 hover:text-black rounded-sm"
                  onClick={() => handleStatus(record)}
                >
                  Status Update
                </button>
              ) : (
                ""
              )}
              {record.status === "completed" &&
              record.status !== "cbr_raised" ? (
                <button
                  className="border-black text-left bg-[#bd1d1d] z-50 p-2 hover:bg-yellow-200 hover:text-black rounded-sm"
                  onClick={() => handleRaiseCBR(record)}
                >
                  Raise CBR
                </button>
              ) : (
                ""
              )}
            </div>
          ) : department == 1 || department == 3 ? (
            <button
              className="border-b border-black text-left bg-[#bd1d1d] z-50 p-2 hover:bg-yellow-200 hover:text-black rounded-sm w-full"
              onClick={handleViewProject}
            >
              <Link to={"/view"}>View</Link>
            </button>
          ) : (
            ""
          )}
        </div>
        {role === "AM/Manager" ? (
          <div className="">
            <button
              className="border-b border-black text-left bg-[#bd1d1d] z-50 p-2 hover:bg-yellow-200 hover:text-black rounded-sm w-full"
              onClick={handleViewProject}
            >
              <Link to={"/view"}>View</Link>
            </button>
            {/* <button
            className="border-b border-black text-left bg-[#bd1d1d] z-50 p-2 hover:bg-yellow-200 hover:text-black rounded-sm w-full"
            onClick={handleAssignProject}
          >
            
          </button> */}
          </div>
        ) : (
          ""
        )}
        {department == 3 ? (
          <button
            className="border-b border-black text-left bg-[#bd1d1d] z-50 p-2 hover:bg-yellow-200 hover:text-black rounded-sm w-full"
            onClick={() => handleGetInvoice(record)}
          >
            Get Invoice
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default OpereationButton;
