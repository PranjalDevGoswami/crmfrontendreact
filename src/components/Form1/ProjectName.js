import React, { useContext } from "react";
import LableAndInput from "../../Molecules/LableAndInput";
import { FormDataContext } from "../../ContextApi/FormDataContext";

const ProjectName = () => {
  const { formData, setFormData } = useContext(FormDataContext);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div>
      <LableAndInput
        labelName="Project Name"
        InputName="name"
        InputType="text"
        inputChange={handleInputChange}
        InputMin_lenght="1"
        InputMax_lenght="50"
        inputClassName="p-2 border bg-white mt-2 rounded-md"
        labelClassName="pt-4 pb-2"
      />
    </div>
  );
};

export default ProjectName;
