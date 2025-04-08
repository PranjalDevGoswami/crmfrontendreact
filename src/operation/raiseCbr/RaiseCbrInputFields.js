import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleIsVprHasData, toggleRaiseVpr } from "../../../utils/slices/dataTableSlice";

export const RaiseCbrInputFields = ({ sampleData, setSampleData }) => {
  const { projects, page_number, page_size, activeTab } = useSelector(
    (store) => store.projectData
  );
  const { selectedRecord, isRaiseVpr,isVprHasData } = useSelector(
    (store) => store.dataTable
  );
  const dispatch = useDispatch();

  const currentProject =
    projects.find((item) => item.id === selectedRecord?.id) || {};

  const totalNumberOfSurvey = currentProject?.project_samples.reduce(
    (acc, item) => {
      return (acc = acc + Number(item.sample));
    },
    0
  );

  const NumberOfAddnSurvey =
    Number(selectedRecord?.initial_sample_size) - Number(totalNumberOfSurvey);

  return [
    {
      labelName: "Project Code",
      InputValue: selectedRecord?.project_code.toUpperCase(),
      disabled: true,
    },
    {
      labelName: "Project Name",
      InputValue: selectedRecord?.name,
      disabled: true,
    },
    { labelName: "Status", InputValue: "CBR Raised", disabled: true },
    {
      labelName: "Samples",
      InputValue: sampleData.samples,
      isCustomComponent: true,
    },
    {
      labelName: "Project Manager",
      InputValue: currentProject?.assigned_to?.name,
      disabled: true,
    },
    {
      labelName: "Client",
      InputValue: selectedRecord?.clients,
      disabled: true,
    },
    // {
    //   labelName: "PO Number",
    //   InputValue: sampleData.purchase_order_number,
    //   inputChange: (e) =>
    //     setSampleData({ ...sampleData, purchase_order_number: e.target.value }),
    // },
    {
      labelName: "Client Contact Person",
      InputValue: sampleData?.client_contact_person,
      inputChange: (e) =>
        setSampleData({ ...sampleData, client_contact_person: e.target.value }),
    },
    {
      labelName: "Client Email Address",
      InputValue: sampleData?.client_email_address,
      inputChange: (e) =>
        setSampleData({ ...sampleData, client_email_address: e.target.value }),
    },
    {
      labelName: "Client Purchase Order No",
      InputValue: sampleData?.client_purchase_order_no,
      inputChange: (e) =>
        setSampleData({
          ...sampleData,
          client_purchase_order_no: e.target.value,
        }),
    },
    {
      labelName: "Number of Surveys (Initial SOW)",
      InputValue: selectedRecord?.initial_sample_size,
      disabled: true,
    },
    {
      labelName: "Number of Additional Surveys",
      InputValue:
        NumberOfAddnSurvey > 0
          ? NumberOfAddnSurvey
          : `(-${Math.abs(NumberOfAddnSurvey)})`,
      disabled: true,
    },
    {
      labelName: "Total Surveys to be Billed",
      InputType: "number",
      InputValue: sampleData?.total_surveys_to_be_billed,
      inputChange: (e) =>
        setSampleData({
          ...sampleData,
          total_surveys_to_be_billed: e.target.value,
        }),
    },
    {
      labelName: "Other Billing Instructions",
      InputValue: sampleData?.other_billing_instructions,
      inputChange: (e) =>
        setSampleData({
          ...sampleData,
          other_billing_instructions: e.target.value,
        }),
    },
    {
      labelName: "Remarks",
      InputValue: sampleData.remarks,
      inputChange: (e) =>
        setSampleData({ ...sampleData, remarks: e.target.value }),
    },
    {
      labelName: "Attach Mails",
      InputValue: sampleData.attachMail,
      inputChange: (e) =>
        setSampleData({ ...sampleData, attachMail: e.target.value }),
    },
    {
      labelName: "Raised VPR",
      isCheckbox: true,
      isCheck:isVprHasData,
      inputChange: () => {dispatch(toggleRaiseVpr());dispatch(toggleIsVprHasData(true))},
    },
  ];
};
