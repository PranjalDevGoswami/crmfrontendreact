import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProjectName from "./Form/ProjectName";
import ProjectTypeComponent from "./Form/ProjectType";
import Client from "./Form/Client";
import SampleSize from "./Form/SampleSize";
import IsMultipleSample from "./Form/IsMultipleSample";
import Popup from "../../Atom/Popup";
import AddMultipleSample from "./Form/AddMultipleSample";
import CostPerInterview from "./Form/CostPerInterview";
import SetupFee from "./Form/SetupFee";
import AddOtherCost from "./Form/AddOtherCost";
import OtherCost from "./Form/OtherCost";
import TranslationCost from "./Form/TranslationCost";
import ProjectManager from "./Form/ProjectManager";
import StartDate from "./Form/StartDate";
import EndDate from "./Form/EndDate";
import SowFileUpload from "./Form/SowUpload";
import MultipleSampleCpiRecord from "./Form/MultipleSampleCpiRecord";
import CheckboxList from "../../components/Checkbox";
import Button from "../../Atom/Button";
import ABR from "../createAdvancePayment/ABR";
import {
  addFormData,
  toggleAdvancedPayment,
  toggleAdvancedPaymentHasData,
} from "../../../utils/slices/projectEntryFormSlice";
import { useProjectEntryFormValidation } from "../../../utils/hooks/useProjectEntryFormValidation";
import { usePostFormData } from "../../../utils/hooks/usePostFormData";

const Form = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isMultipleSample = useSelector(
    (store) => store.addMultipleSampleCpi.isMultipleSample
  );
  const MultiSampleCpiRecord = useSelector(
    (store) => store.addMultipleSampleCpi.sampleCpiRecord
  );
  const darkMode = useSelector((store) => store.themeSetting.isDarkMode);
  const {
    form,
    isOtherCostSelected,
    isAddOtherCost,
    isAddTranslationCost,
    isAdvancedPayment,
    isAdvancedPaymentHasData,
    abr,
  } = useSelector((store) => store.projectEntryForm);
 
  const { activeTab, page_number, page_size } = useSelector(
    (store) => store.projectData
  );
  const user = localStorage.getItem("username");

  const handleSubmit = (e) => {
    e.preventDefault();
    let updatedSamples = form.project_samples;
    if (MultiSampleCpiRecord.length === 0) {
      updatedSamples = [
        ...form.project_samples, // Existing samples
        { cpi: form.cpi, sample: form.sample }, // New sample
      ];
    } else {
      updatedSamples = MultiSampleCpiRecord;
    }
    // Update state with the new project_samples array
    dispatch(
      addFormData({
        ...form,
        project_samples: updatedSamples,
      })
    );

    const updatedFormData = {
      ...form,
      project_samples: updatedSamples,
    };

    usePostFormData(
      updatedFormData,
      dispatch,
      navigate,
      page_number,
      page_size,
      activeTab,
      abr,
      isAdvancedPaymentHasData,
      user
    );
  };

  const isFormValid = useProjectEntryFormValidation(form);

  const handleCancel = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  return (
    <div
      className={`${
        darkMode ? "bg-black text-white" : "bg-white text-black"
      } relative rounded-md shadow-lg shadow-slate-600 h-full`}
    >
      <h2 className="text-2xl p-2 mt-2 bg-[#bd1d1d] text-white text-center">
        Add Project Details
      </h2>
      <form
        onSubmit={(e) => handleSubmit(e, form)}
        className="lg:p-2 lg:pl-8 lg:pr-4 pr-8"
        encType="multipart/form-data"
        id="1234"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <ProjectName />
          <ProjectTypeComponent />
          <Client />
          <div className="relative">
            <SampleSize />
            <div className="absolute -bottom-5 left-1">
              <IsMultipleSample />
            </div>
          </div>
          {isMultipleSample && (
            <Popup>
              <AddMultipleSample />
            </Popup>
          )}
          <CostPerInterview />
          <SetupFee />
          {isOtherCostSelected && (
            <Popup>
              <AddOtherCost />
            </Popup>
          )}
          {isAddOtherCost && <OtherCost />}
          {isAddTranslationCost && <TranslationCost />}
          <ProjectManager />
          <StartDate />
          <EndDate />
          <SowFileUpload />
          {MultiSampleCpiRecord.length > 0 && <MultipleSampleCpiRecord />}
        </div>
        <CheckboxList
          label={"Advanced Payment Required"}
          checked={isAdvancedPaymentHasData}
          onCheckboxChange={() => {
            dispatch(toggleAdvancedPayment());
            dispatch(toggleAdvancedPaymentHasData(true));
          }}
        />
        <div className="flex justify-around pt-2 pb-2 md:w-3/12 w-5/12 text-center">
          <Button
            className={`bg-[#10b981] p-2 mt-6 mr-2 md:w-5/12 w-full text-white font-bold rounded-md ${
              isFormValid ? "" : "opacity-50 cursor-not-allowed"
            }`}
            name={"Submit"}
            onClick={(e) => handleSubmit(e, form)}
            disabled={!isFormValid}
          />
          <Button
            className="bg-[#ef4444] p-2 mt-6 md:w-5/12 w-full text-white font-bold rounded-md"
            name={"Cancel"}
            onClick={handleCancel}
          />
        </div>
      </form>
      {isAdvancedPayment && (
        <Popup className={"!w-2/3"}>
          <ABR />
        </Popup>
      )}
    </div>
  );
};
export default Form;
