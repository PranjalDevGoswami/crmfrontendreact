import React, { useContext, useState } from "react";
import Label from "../Label";
import MultipleFileUpload from "../MultipleFileUpload";
import { FormDataContext } from "../../ContextApi/FormDataContext";

const SowFileUpload = () => {
  const { formData, setFormData } = useContext(FormDataContext);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({ ...formData, [name]: value });
    const formDataFile = new FormData();
    formDataFile.append("file", files[0]);
    setFormData({ ...formData, [name]: files[0] });
  };
  return (
    <div className="pt-4">
      <Label labelName={"SOW File"} className={"pt-4 pb-2"} />
      <MultipleFileUpload
        selectedFiles={selectedFiles}
        name={"upload_document"}
        handleFileChange={handleInputChange}
        className={"p-1 border bg-[#f3eded] w-full"}
      />
    </div>
  );
};

export default SowFileUpload;
