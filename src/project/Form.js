import React, { useContext } from "react";
import Button from "../components/Button.js";
import { Link, useNavigate } from "react-router-dom";
import CheckboxList from "../components/Checkbox.js";
import { PostFormData } from "../fetchApis/projects/postProjectData/PostProjectData.js";
import { ThemeContext } from "../ContextApi/ThemeContext.js";
import SweetAlert from "../components/SweetAlert.js";
import ProjectTypeComponent from "../components/Form/ProjectType.js";
import { FormDataContext } from "../ContextApi/FormDataContext.js";
import Client from "../components/Form/Client.js";
import SowFileUpload from "../components/Form/SowUpload.js";
import AddOtherCost from "../components/Form/AddOtherCost.js";
import OtherCost from "../components/Form/OtherCost.js";
import TranslationCost from "../components/Form/TranslationCost.js";
import EndDate from "../components/Form/EndDate.js";
import StartDate from "../components/Form/StartDate.js";
import ProjectManager from "../components/Form/ProjectManager.js";
import SetupFee from "../components/Form/SetupFee.js";
import CostPerInterview from "../components/Form/CostPerInterview.js";
import SampleSize from "../components/Form/SampleSize.js";
import ProjectName from "../components/Form/ProjectName.js";

const Form = () => {
  const {
    formData,
    setAdvancePAyment,
    isOtherFee,
    otherCost,
    translationCost,
  } = useContext(FormDataContext);

  const navigate = useNavigate();
  const { darkMode } = useContext(ThemeContext);

  const handleCheckboxChange = (name, checked) => {
    setAdvancePAyment(checked);
  };

  const PostProjectData = async (data) => {
    try {
      const response = await PostFormData(data);
      if (response?.status == true) {
        SweetAlert({
          title: "Project Added Successfully!!",
          text: "",
          icon: "success",
        });
      } else if (
        response?.ex?.response?.data[0] ===
        "Tentative end date cannot be in the past."
      ) {
        SweetAlert({
          title: "Error",
          text: response?.ex?.response?.data[0] || "An error occurred",
          icon: "error",
        });
      } else if (
        response?.ex?.response?.data?.upload_document[0] ===
        "The submitted data was not a file. Check the encoding type on the form."
      ) {
        SweetAlert({
          title: "Error",
          text: "File Formate Not supported",
          icon: "error",
        });
      } else {
        SweetAlert({
          title: "Error",
          text: "something went wrong",
          icon: "error",
        });
      }
    } catch (error) {
      SweetAlert({
        title: "Error",
        text: "Error fetching project data:",
        error,
        icon: "error",
      });
    }
  };

  const handleSubmit = (e) => {
    if (!isFormValid()) {
      return;
    } else {
      console.log(formData);
      PostProjectData(formData);
      navigate("/sales-dashboard");
    }
  };

  const isFormValid = () => {
    return (
      formData.name !== "" &&
      formData.project_type?.name !== "" &&
      formData.clients?.name !== "" &&
      formData.sample !== "" &&
      formData.cpi !== "" &&
      formData.set_up_fee !== "" &&
      formData.tentative_start_date !== "" &&
      formData.tentative_end_date !== ""
    );
  };

  return (
    <div
      className={`${
        darkMode ? "bg-black text-white" : "bg-white text-black"
      } relative rounded-md shadow-lg shadow-slate-600`}
    >
      <h2 className="text-3xl p-8 mt-8 underline">Add Project Details</h2>
      <form
        onSubmit={() => handleSubmit(formData)}
        className="lg:p-2 lg:pl-8 lg:pr-4 pr-8"
        encType="multipart/form-data"
      >
        <div className="lg:flex inline-block lg:flex-wrap flex-nowrap w-full gap-4">
          <div className="flex flex-col lg:w-[32%] w-full">
            <ProjectName />
          </div>
          <div className="flex flex-col lg:w-[32%] w-full">
            <ProjectTypeComponent />
          </div>
          <div className="flex flex-col lg:w-[32%] w-full">
            <Client />
          </div>
          <div className="flex flex-col lg:w-[32%] w-full">
            <SampleSize />
          </div>
          <div className="lg:w-[32%] w-full flex flex-col">
            <CostPerInterview />
          </div>
          <div className="lg:w-[32%] w-full flex flex-col relative">
            <SetupFee />
          </div>
          {isOtherFee && (
            <div className="w-4/12 h-2/4 bg-white border rounded-md shadow-md z-50 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <AddOtherCost />
            </div>
          )}
          {otherCost && <OtherCost />}
          {translationCost && <TranslationCost />}
          <div className="flex flex-col lg:w-[32%] w-full">
            <ProjectManager />
          </div>
          <div className="flex flex-col lg:w-[32%] w-full">
            <StartDate />
          </div>
          <div className="flex flex-col lg:w-[32%] w-full">
            <EndDate />
          </div>
          <div className="flex flex-col lg:w-[32%] w-full">
            <SowFileUpload />
          </div>
        </div>
        <div className="flex flex-col lg:w-[32%] w-full pt-8 pb-2">
          <CheckboxList
            InputItems={["Advanced Payment Required"]}
            onCheckboxChange={handleCheckboxChange}
          />
        </div>
        <div className="flex justify-around pt-4 pb-2 md:w-4/12 w-6/12 text-center">
          <Button
            className={`bg-green-500 p-4 mt-8 mr-2 md:w-1/2 w-full text-white font-bold ${
              isFormValid() ? "" : "opacity-50 cursor-not-allowed"
            }`}
            name={"Submit"}
            onClick={() => handleSubmit(formData)}
          />
          <Link
            to={"/sales-dashboard"}
            className="bg-red-500 p-4 mt-8 md:w-1/2 w-full text-white font-bold"
          >
            <Button className="" name={"Cancel"} />
          </Link>
        </div>
      </form>
    </div>
  );
};
export default Form;
