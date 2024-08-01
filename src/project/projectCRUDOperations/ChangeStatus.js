import React, { useContext, useState } from "react";
import LableAndInput from "../../components/LableAndInput";
import Dropdown from "../../components/DropDown";
import Label from "../../components/Label";
import { ChangeStatus } from "../../fetchApis/projects/changeStatus/changeStatus";
import SweetAlert from "../../components/SweetAlert";
import { DataTableContext } from "../../ContextApi/DataTableContext";

const ChangeStatus = ({ viewRecord }) => {
  const [updatedStatus, setUpdatedStatus] = useState({
    project_code: viewRecord.project_code,
    status: "",
  });
  const { setChangeStatus } = useContext(DataTableContext);

  const handleCancelUpdate = () => {
    setChangeStatus(false);
    document.body.classList.remove("DrawerBody");
  };
  const PostUpdateEditData = async (data) => {
    // const response = await ChangeStatus(data);
    // if (response?.status == true) {
    //   setUpdatedStatus({
    //     project_code: "",
    //     status: "",
    //   });
    //   document.body.classList.remove("DrawerBody");
    //   setChangeStatus(false);
    //   SweetAlert({
    //     title: "Status Change Sucessfully!!",
    //     text: "",
    //     icon: "success",
    //   });
    // } else {
    //   SweetAlert({
    //     title: "please select Status",
    //     text: "",
    //     icon: "info",
    //   });
    // }
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
    <div className="absolute top-1/2 left-1/2 bg-white p-8 border border-black drop-shadow-lg shadow-2xl shadow-slate-400 translate-x-[-50%] translate-y-[-50%] z-40">
      <h3 className="text-xl underline pb-4">Change Project Status</h3>
      <div className="flex items-center flex-col justify-between">
        <div className="w-11/12">
          <LableAndInput
            labelName={"Project Code"}
            Inputvalue={viewRecord.project_code.toUpperCase()}
            desabled={true}
            inputClassName={"cursor-not-allowed p-2 border bg-[#f3eded]"}
            labelClassName={"pt-4 pb-2"}
            inputChange={handleInputChange}
          />
        </div>
        <div className="w-11/12">
          <LableAndInput
            labelName={"Project Name"}
            Inputvalue={viewRecord.name}
            desabled={true}
            inputClassName={"cursor-not-allowed p-2 border bg-[#f3eded]"}
            labelClassName={"pt-4 pb-2"}
            inputChange={handleInputChange}
          />
        </div>
        <div className="w-11/12 mt-4">
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

export default ChangeStatus;
