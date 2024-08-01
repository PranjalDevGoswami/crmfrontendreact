import React, { useContext, useEffect } from "react";
import Label from "../Label";
import Dropdown from "../DropDown";
import { FormDataContext } from "../../ContextApi/FormDataContext";
import { GetProjectManager } from "../../fetchApis/projectManager/projectManager";

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
          return item?.department?.id == 2;
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
      (manager) => manager?.user?.name === value
    );
    setFormData({
      ...formData,
      [name]: selectedManager?.user?.id,
    });
  };

  return (
    <div className="pt-3">
      <Label labelName={"Manager  "} className={"pt-4 pb-2"} />
      <Dropdown
        name={"project_manager"}
        className={
          "p-3 outline-none cursor-pointer w-[100%] relative bg-[#f3eded] border mt-2"
        }
        Option_Name={["-- Select Manager --", ...projectManagerData]}
        RequireAddButton={false}
        required
        onChange={SelectOptionHandler}
      />
    </div>
  );
};

export default ProjectManager;
