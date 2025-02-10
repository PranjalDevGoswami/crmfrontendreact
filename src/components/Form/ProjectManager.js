import React, { useContext, useEffect } from "react";
import Label from "../../Atom/Label";
import Dropdown from "../DropDown";
import { FormDataContext } from "../../ContextApi/FormDataContext";
import { GetProjectManager } from "../../fetchApis/projectManager/projectManager";
import { isOperationDept } from "../../config/Departments";

const ProjectManager = () => {
  const {
    formData,
    setFormData,
    projectManagerData,
    setProjectManagerData,
    managerList,
    setManagerList,
  } = useContext(FormDataContext);

  useEffect(() => {
    const FetchProjectManager = async () => {
      try {
        const ProjectManager = await GetProjectManager();
        const Opern_Manager = ProjectManager?.data?.filter((item) => {
          return item?.department?.id == isOperationDept;
        });
        const ProjectManagerObject = Opern_Manager?.map((val) => {
          return val?.user?.name;
        });
        setManagerList(Opern_Manager);
        setProjectManagerData(ProjectManagerObject);
      } catch (error) {
        console.error("Error fetching project Manager List:", error);
      }
    };
    FetchProjectManager();
  }, []);

  const SelectOptionHandler = (name, value) => {
    setFormData({ ...formData, [name]: value });
    const selectedManager = managerList?.find(
      (manager) => manager?.user_role?.name === value
    );
    setFormData({
      ...formData,
      [name]: selectedManager?.user_role?.id,
    });
  };

  return (
    <div className="pt-2 mt-2">
      <Label labelName={"Manager  "} className={"pt-2 pb-2 pl-1"} />
      <Dropdown
        name={"project_manager"}
        className={
          "p-[10px] outline-none cursor-pointer w-[100%] bg-[#f3eded] border rounded-md"
        }
        Option_Name={["-- Select Manager --", ...projectManagerData]}
        RequireAddButton={false}
        required
        onChange={SelectOptionHandler}
        id={"project_manager"}
      />
    </div>
  );
};

export default ProjectManager;
