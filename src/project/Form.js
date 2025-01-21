import React, { useContext, useEffect } from "react";
import Button from "../Atom/Button.js";
import { useNavigate } from "react-router-dom";
import CheckboxList from "../components/Checkbox.js";
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
import { useSelector } from "react-redux";
import AddMultipleSample from "../components/Form/AddMultipleSample.js";
import IsMultipleSample from "../components/Form/IsMultipleSample.js";
import { useDispatch } from "react-redux";
import MultipleSampleCpiRecord from "../components/Form/MultipleSampleCpiRecord.js";
import { usePostFormData } from "../../utils/hooks/usePostFormData.js";
import Popup from "../Atom/Popup.js";
import { useProjectEntryFormValidation } from "../../utils/hooks/useProjectEntryFormValidation.js";

const Form = () => {
  const {
    formData,
    setAdvancePAyment,
    isOtherFee,
    otherCost,
    translationCost,
    SetProjectAdded,
    setFormData,
  } = useContext(FormDataContext);

  const isMultipleSample = useSelector(
    (store) => store.addMultipleSampleCpi.isMultipleSample
  );
  const MultipleSampleRecord = useSelector(
    (store) => store.MultiSampleCpiRecord.sampleCpiRecord
  );

  const dispatchAddMultipleSampleCpi = useDispatch();
  const dispatchAddMultipleSampleCpiCheckbox = useDispatch();
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const darkMode = useSelector((store) => store.darkMode.isDarkMode);

  const handleCheckboxChange = (name, checked) => {
    setAdvancePAyment(checked);
  };
  const MultiSampleCpiRecord = useSelector(
    (store) => store.MultiSampleCpiRecord.sampleCpiRecord
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    let updatedSamples = formData.project_samples;
    if (MultiSampleCpiRecord.length === 0) {
      updatedSamples = [
        ...formData.project_samples, // Existing samples
        { cpi: formData.cpi, sample: formData.sample }, // New sample
      ];
    } else {
      updatedSamples = MultiSampleCpiRecord;
    }

    // Update state with the new project_samples array
    setFormData({
      ...formData,
      project_samples: updatedSamples,
    });

    // Log the updated data in the desired format
    const updatedFormData = {
      ...formData,
      project_samples: updatedSamples,
    };

    if (!isFormValid) {
      return SweetAlert({
        title: "Warning",
        text: "Fill all required fields",
        icon: "warning",
      });
    } else {
      usePostFormData(
        updatedFormData,
        SetProjectAdded,
        dispatch,
        dispatchAddMultipleSampleCpi,
        dispatchAddMultipleSampleCpiCheckbox,
        navigate,
        setFormData
      );
    }
  };

  const isFormValid = useProjectEntryFormValidation(formData);

  const handleCancel = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  return (
    <div
      className={`${
        darkMode ? "bg-black text-white" : "bg-white text-black"
      } relative rounded-md shadow-lg shadow-slate-600`}
    >
      <h2 className="text-2xl p-2 mt-2 bg-[#bd1d1d] text-white text-center">
        Add Project Details
      </h2>
      <form
        onSubmit={(e) => handleSubmit(e, formData)}
        className="lg:p-2 lg:pl-8 lg:pr-4 pr-8"
        encType="multipart/form-data"
        id="1234"
      >
        <div className="lg:flex inline-block lg:flex-wrap flex-nowrap w-full gap-4 mt-4">
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
            <div className="relative">
              <SampleSize />
              <div className="absolute -bottom-5 left-1">
                <IsMultipleSample />
              </div>
            </div>
          </div>
          {isMultipleSample && (
            <Popup>
              <AddMultipleSample />
            </Popup>
          )}
          <div className="lg:w-[32%] w-full flex flex-col">
            <CostPerInterview />
          </div>
          <div className="lg:w-[32%] w-full flex flex-col relative">
            <SetupFee />
          </div>
          {isOtherFee && (
            <Popup>
              <AddOtherCost />
            </Popup>
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
          {MultipleSampleRecord.length > 0 && (
            <div className="flex w-full">
              <MultipleSampleCpiRecord />
            </div>
          )}
        </div>
        <div className="flex flex-col lg:w-[32%] w-full pt-8 pb-2">
          <CheckboxList
            InputItems={["Advanced Payment Required"]}
            onCheckboxChange={handleCheckboxChange}
          />
        </div>
        <div className="flex justify-around pt-2 pb-2 md:w-3/12 w-5/12 text-center">
          <Button
            className={`bg-[#10b981] p-2 mt-6 mr-2 md:w-5/12 w-full text-white font-bold rounded-md ${
              isFormValid ? "" : "opacity-50 cursor-not-allowed"
            }`}
            name={"Submit"}
            onClick={(e) => handleSubmit(e, formData)}
          />
          <Button
            className="bg-[#ef4444] p-2 mt-6 md:w-5/12 w-full text-white font-bold rounded-md"
            name={"Cancel"}
            onClick={handleCancel}
          />
        </div>
      </form>
    </div>
  );
};
export default Form;
