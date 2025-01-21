import React, { useContext, useState } from "react";
import Label from "../../Atom/Label";
import MultipleFileUpload from "../MultipleFileUpload";
import { FormDataContext } from "../../ContextApi/FormDataContext";

const SowFileUpload = () => {
  const { formData, setFormData } = useContext(FormDataContext);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleInputChange = (e) => {
    const { name, files } = e.target;

    const newFiles = Array.from(files);
    const updatedFiles = [...selectedFiles, ...newFiles];
    setSelectedFiles(updatedFiles);

    setFormData((prevData) => ({
      ...prevData,
      [name]: updatedFiles,
    }));
  };

  return (
    <div className="pt-2">
      <Label labelName={"SOW File"} className={"pt-2 pb-2 pl-1"} />
      <MultipleFileUpload
        selectedFiles={selectedFiles}
        name={"upload_document"}
        handleFileChange={handleInputChange}
        className={"p-1 border bg-[#f3eded] w-full rounded-md"}
      />
    </div>
  );
};

export default SowFileUpload;
