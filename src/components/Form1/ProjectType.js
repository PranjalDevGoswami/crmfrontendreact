import React, { useContext, useEffect } from "react";
import Label from "../../Atom/Label";
import Dropdown from "../DropDown";
import { FetchProjectType } from "../../fetchApis/projects/projectType/ProjectTypeList";
import { ProjectType } from "../../ContextApi/ProjectTypeContext";
import { FormDataContext } from "../../ContextApi/FormDataContext";

const ProjectTypeComponent = () => {
  // Context to manage project type and form data
  const { projectTypeData, setProjectTypeData } = useContext(ProjectType);
  const { formData, setFormData } = useContext(FormDataContext);

  const ProjectTypeListData = projectTypeData;

  useEffect(() => {
    const FetchProjectManager = async () => {
      const type = await FetchProjectType();
      setProjectTypeData(type);
    };
    FetchProjectManager();
  }, []);

  const SelectOptionHandler = (name, value) => {
    setFormData({ ...formData, [name]: value });
    const ProjectTypeIndex = projectTypeData.filter(
      (item) => item?.name === value
    );

    setFormData({
      ...formData,
      [name]: ProjectTypeIndex[0]?.id,
    });
  };

  return (
    <div className="pt-4">
      <Label labelName="Project Type" className="pt-4 pb-2" required />
      <Dropdown
        name="project_type"
        className="p-3 mt-2 outline-none cursor-pointer w-full bg-white border rounded-md"
        Option_Name={["-- Select Project Type --", ...ProjectTypeListData.map((item) => item?.name)]}
        RequireAddButton={false}
        required
        onChange={SelectOptionHandler}
        id="project_type"
      />
    </div>
  );
};

export default ProjectTypeComponent;
