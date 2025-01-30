import React, { useContext, useState } from "react";
import LableAndInput from "../../Molecules/LableAndInput";
import Dropdown from "../../components/DropDown";
import Label from "../../Atom/Label";
import { ChangeStatus } from "../../fetchApis/projects/changeStatus/changeStatus";
import SweetAlert from "../../components/SweetAlert";
import { DataTableContext } from "../../ContextApi/DataTableContext";
import { ProjectData } from "../../../utils/apis/projectData";
import { setProjects } from "../../../utils/slices/ProjectSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { FilterContext } from "../../ContextApi/FilterContext";

const UpdateStatus = ({ viewRecord }) => {
  const {page_number,page_size} = useSelector(store=>store.projectData)
 const {activeTabValue} = useContext(FilterContext)
  const [updatedStatus, setUpdatedStatus] = useState({
    project_id: viewRecord.id,
    status: "",
  });
  const { setChangeProjectStatus } = useContext(DataTableContext);
  const dispatch = useDispatch();
  const handleCancelUpdate = () => {
    setChangeProjectStatus(false);
    document.body.classList.remove("DrawerBody");
  };
  const PostUpdateEditData = async (data) => {
    const response = await ChangeStatus(data);
    if (response?.status == true) {
      document.body.classList.remove("DrawerBody");
      setChangeProjectStatus(false);
      SweetAlert({
        title: "Success",
        text: "Status Change Sucessfully!!",
        icon: "success",
      });
      const projectData = await ProjectData(page_number,page_size,activeTabValue);
      dispatch(setProjects(projectData?.results));
    } else {
      SweetAlert({
        title: "Error",
        text: "please select Status",
        icon: "error",
      });
    }
  };

  const handleEditUpdate = () => {
    PostUpdateEditData(updatedStatus);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedStatus({
      ...updatedStatus,
      [name]: value,
    });
  };
  const handleFilterOption = (name, value) => {
    setUpdatedStatus({
      ...updatedStatus,
      [name]: value,
    });
  };
  return (
    <div className="">
      <h3 className="text-xl underline pb-4">Change Project Status</h3>
      {/* <div className="flex items-center flex-col justify-between"> */}
      <div className="flex items-center flex-wrap justify-center w-full rounded-sm">
        <div className="ProjectOperationEdit">
          <LableAndInput
            labelName={"Project Code"}
            Inputvalue={viewRecord.project_code.toUpperCase()}
            desabled={true}
            inputClassName={"cursor-not-allowed p-2 border bg-[#f3eded]"}
            labelClassName={"pt-4 pb-2 text-left"}
            inputChange={handleInputChange}
          />
        </div>
        <div className="ProjectOperationEdit">
          <LableAndInput
            labelName={"Project Name"}
            Inputvalue={viewRecord.name}
            desabled={true}
            inputClassName={"cursor-not-allowed p-2 border bg-[#f3eded]"}
            labelClassName={"pt-4 pb-2 text-left"}
            inputChange={handleInputChange}
          />
        </div>
        <div className="ProjectOperationEdit">
          <LableAndInput
            labelName={"Current Status"}
            Inputvalue={viewRecord.status}
            desabled={true}
            inputClassName={"cursor-not-allowed p-2 border bg-[#f3eded]"}
            labelClassName={"pt-4 pb-2 text-left"}
            inputChange={handleInputChange}
          />
        </div>
        <div className="ProjectOperationEdit mt-4 text-left">
          <Label labelName={"Status"} className={"pb-2 mt-4"} />
          <Dropdown
            Option_Name={[
              "--Select Status--",
              "In Progress",
              "On Hold",
              "Completed",
            ]}
            onChange={(name, value) => handleFilterOption(name, value)}
            className={"p-2 mt-2 border w-full"}
            name={"status"}
            id={"status update"}
          />
        </div>
        <div className="flex pt-10">
          <button
            onClick={handleEditUpdate}
            className={
              "bg-green-300 p-4 m-2 flex items-center w-full rounded text-white hover:bg-green-500"
            }
          >
            Update
          </button>
          <button
            onClick={handleCancelUpdate}
            className={
              "bg-red-300 p-4 m-2 flex items-center w-full rounded text-white hover:bg-red-500"
            }
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateStatus;
