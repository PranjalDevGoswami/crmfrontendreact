import React, { useContext, useEffect, useState } from "react";
import { RaiseCBRPostApi } from "../../fetchApis/projects/raiseCBR/RaiseCbr";
import { useNavigate } from "react-router-dom";
import { DataTableContext } from "../../ContextApi/DataTableContext.js";
import { useSelector } from "react-redux";
const isSalesDept = "1";
const isOperationDept = "2";
const isFinanceDept = "3";
const isPreSalesDept = "4";

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
    setIsAddManDays,
    setisView,
    setisEdit,
    selectedRecord,
    setChangeProjectStatus,
    setIsUploadSow,
    showRaiseCbr,setShowRaiseCbr
  } = useContext(DataTableContext);
  const [projectList,setProjectList] = useState()

  const [isInvoice, setIsInvoice] = useState(false);
  const department = localStorage.getItem("department");
  const role = localStorage.getItem("role");
  const isHodRole = role === "HOD";
  const isSuperUserRole = role === "superUser";

  const projectResponse = useSelector((store)=>store.projectData.projects)
   
  useEffect(()=>{
      const newList = projectResponse.filter((item)=>item.id == selectedRecord.id)
    setProjectList(newList)
    },[selectedRecord])
    
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
  
  const handleViewProject = () => {
    setisView(true);
    setChangeProjectStatus(false);
    setisEdit(false);
    setIsAddManDays(false);
    navigate("/view", { state: selectedRecord });
  };
  const HandleSowUpload = () => {
    console.log("selectedRecord",((projectList.map((item)=>item.documents.length)>0)) );
    
    setIsUploadSow(true);
  };
  const handleRaiseCBR = (selectedRecord) => {    
    // PostRaiseCBR(selectedRecord.id,{ project_code: selectedRecord.project_code });
        setShowRaiseCbr(!showRaiseCbr)
  };
  const handleGetInvoice = (selectedRecord) => {
    // e.preventDefault();
    setIsInvoice(true);
    navigate("/invoice", { state: selectedRecord });
  };
  const PostRaiseCBR = async (id,data) => {
    console.log("id,data",id,data);
    
    // try {
    //   const response = await RaiseCBRPostApi(id,data);
    //   if (response?.status == true) {
    //     SweetAlert({
    //       title: "CBR has been Raised !!!",
    //       text: "",
    //       icon: "success",
    //     });
    //   } else if (response?.ex?.response?.data?.project_code) {
    //     SweetAlert({
    //       title: "project code : " + response?.ex?.response?.data?.project_code,
    //     });
    //   }
    // } catch (error) {
    //   console.error("Error fetching project data:", error);
    //   SweetAlert({
    //     title: "Error",
    //     text: "Error fetching project data:",
    //     error,
    //     icon: "error",
    //   });
    // }
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
                  selectedRecord.status !== "CBR Raised" &&
                  selectedRecord.status !== "On Hold" &&
                  // !isHodRole &&
                  DateValidate == true && (
                    <button
                      className="border-b border-black text-left bg-[#bd1d1d] z-50 p-2 hover:bg-yellow-200 hover:text-black rounded-sm"
                      onClick={HandleAddManDays}
                    >
                      Add Mandays
                    </button>
                  )}
                {
                  selectedRecord.status !== "Completed" &&
                  selectedRecord.status !== "CBR Raised" &&
                  selectedRecord.status !== "On Hold" &&
                  // !isHodRole && 
                  (
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
                  // selectedRecord.status !== "Completed" &&
                  selectedRecord.status !== "CBR Raised" &&
                  // !isHodRole && 
                  (
                    <button
                      className="border-b border-black text-left bg-[#bd1d1d] z-50 p-2 hover:bg-yellow-200 hover:text-black rounded-sm"
                      onClick={() => handleStatus(selectedRecord)}
                    >
                      Status Update
                    </button>
                  )}
                {selectedRecord.status === "Completed" &&
                  selectedRecord.status !== "On Hold" &&
                  selectedRecord.status !== "CBR Raised" &&
                  // !isHodRole && 
                  (
                    <button
                      className="border-black text-left bg-[#bd1d1d] z-50 p-2 hover:bg-yellow-200 hover:text-black rounded-sm"
                      onClick={() => handleRaiseCBR(selectedRecord)}
                    >
                      Raise CBR
                    </button>
                  )}
                {isSuperUserRole && (
                  <button
                    className="border-b border-black text-left bg-[#bd1d1d] z-50 p-2 hover:bg-yellow-200 hover:text-black rounded-sm w-full"
                    onClick={() => handleGetInvoice(selectedRecord)}
                  >
                    Get Invoice
                  </button>
                )}
              </>
            )}
            {department == isSalesDept &&  role !== 'viewer' &&(
              <button
                className="border-b border-black text-left bg-[#bd1d1d] z-50 p-2 hover:bg-yellow-200 hover:text-black rounded-sm"
                onClick={() => {
                  HandleSowUpload(selectedRecord);
                }}
              >
                {(projectList?.map((item)=>item?.documents?.length)>0)
                  ? "Update SOW"
                  : "Upload SOW"
                  }
              </button>
            )}
             {/* {department == isFinanceDept && (
          <button
            className="border-b border-black text-left bg-[#bd1d1d] z-50 p-2 hover:bg-yellow-200 hover:text-black rounded-sm w-full"
            onClick={() => handleGetInvoice(selectedRecord)}
          >
            Get Invoice
          </button>
        )} */}
          </div>
        </div>
       
      </div>
    </div>
  );
};

export default OpereationButton;
