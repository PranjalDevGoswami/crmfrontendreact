import React, { useContext, useState } from "react";
import { RaiseCBRPostApi } from "../../fetchApis/projects/raiseCBR/RaiseCbr";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AssignedProject from "../../project/AssignedProject.js";
import SweetAlert from "../../components/SweetAlert.js";
import { DataTableContext } from "../../ContextApi/DataTableContext.js";

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

  const { isAddManDays, setIsAddManDays } = useContext(DataTableContext);

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
  const handleStatus = (record) => {
    setIsStatus(true);
  };
  const HandleAddManDays = () => {
    setIsAddManDays(true);
  };
  const handleAssignProject = () => {
    console.log("Assigned Project");
  };
  const endDateStr = record.tentative_end_date;
  const endDate = new Date(endDateStr);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  endDate.setHours(0, 0, 0, 0);
  const DateValidate = today <= endDate;
  return (
    <div>
      <div className="relative text-white overflow-visible rounded-md rounded-tr-none z-50">
        <div className="w-40 h-54 ">
          {role === "TeamLeadOperation" ||
          role === "superuser" ||
          (role === "Team Lead" && department == 2) ? (
            <div className="flex flex-col p-1 ml-2 mr-2 text-sm">
              <button
                className="border-b border-black text-left bg-[#bd1d1d] z-50 p-2 hover:bg-yellow-200 hover:text-black rounded-sm"
                onClick={handleViewProject}
              >
                View
              </button>
              {record.status !== "completed" &&
                record.status !== "cbr_raised" &&
                record.status !== "hold" &&
                DateValidate == true && (
                  <button
                    className="border-b border-black text-left bg-[#bd1d1d] z-50 p-2 hover:bg-yellow-200 hover:text-black rounded-sm"
                    onClick={HandleAddManDays}
                  >
                    Add Mandays
                  </button>
                )}
              {record.status !== "completed" &&
                record.status !== "cbr_raised" &&
                record.status !== "hold" && (
                  <button
                    className="border-b border-black text-left bg-[#bd1d1d] z-50 p-2 hover:bg-yellow-200 hover:text-black rounded-sm"
                    onClick={() => {
                      HandleOnEdit(record);
                    }}
                  >
                    Edit Request
                  </button>
                )}
              {record.status !== "completed" &&
                record.status !== "cbr_raised" &&
                record.status !== "hold" &&
                DateValidate == true && (
                  <button
                    className="border-b border-black text-left bg-[#bd1d1d] z-50 p-2 hover:bg-yellow-200 hover:text-black rounded-sm"
                    onClick={() => handleStatus(record)}
                  >
                    Status Update
                  </button>
                )}
              {record.status === "completed" &&
              record.status !== "hold" &&
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
              {role === "superuser" && (
                <button
                  className="border-b border-black text-left bg-[#bd1d1d] z-50 p-2 hover:bg-yellow-200 hover:text-black rounded-sm w-full"
                  onClick={() => handleGetInvoice(record)}
                >
                  Get Invoice
                </button>
              )}
            </div>
          ) : (
            (department == 1 ||
              department == 3 ||
              role === "Director" ||
              role === "superuser" ||
              role === "AM/Manager") && (
              <button
                className="border-b border-black text-left bg-[#bd1d1d] z-50 p-2 hover:bg-yellow-200 hover:text-black rounded-sm w-full"
                onClick={handleViewProject}
              >
                <Link to={"/view"}>View</Link>
              </button>
            )
          )}
        </div>
        {/* {(role === "AM/Manager" || department == 2 || department == 1) &&
          role !== "superuser" &&
          role !== "Director" && (
            <div className="">
              <button
                className="border-b border-black text-left bg-[#bd1d1d] z-50 p-2 hover:bg-yellow-200 hover:text-black rounded-sm w-full"
                onClick={handleViewProject}
              >
                <Link to={"/view"}>View</Link>
              </button>
            </div>
          )} */}
        {department == 3 && (
          <button
            className="border-b border-black text-left bg-[#bd1d1d] z-50 p-2 hover:bg-yellow-200 hover:text-black rounded-sm w-full"
            onClick={() => handleGetInvoice(record)}
          >
            Get Invoice
          </button>
        )}
      </div>
    </div>
  );
};

export default OpereationButton;
