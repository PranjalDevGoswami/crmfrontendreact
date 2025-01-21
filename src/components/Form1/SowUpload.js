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
    <div className="pt-4">
      <Label labelName={"SOW File"} className={"pt-4 pb-2"} />
      <MultipleFileUpload
        selectedFiles={selectedFiles}
        name={"upload_document"}
        handleFileChange={handleInputChange}
        className={"p-1 border bg-white w-full"}
      />
    </div>
  );
};

export default SowFileUpload;
