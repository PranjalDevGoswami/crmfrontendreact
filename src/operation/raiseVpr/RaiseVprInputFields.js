import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleRaiseVpr } from "../../../utils/slices/dataTableSlice";
import LableAndInput from "../../Molecules/LableAndInput";

export const RaiseVprInputFields = ({ vprData, setVprData,setUploadInvoiceIndex,uploadInvoiceIndex }) => {
  const { projects, page_number, page_size, activeTab } = useSelector(
    (store) => store.projectData
  );
  const { selectedRecord } = useSelector((store) => store.dataTable);

  const currentProject =
    projects.find((item) => item.id === selectedRecord?.id) || {};

  const inputFields = [
    {
      labelName: "Vendor Name",
      InputValue: vprData?.vendor_name,
      InputName: "vendor_name",
      inputChange: (e) =>
        setVprData({ ...vprData, vendor_name: e.target.value }),
      inputClassName: "p-2 border bg-white rounded-md",
    },
    {
      labelName: "Project Manager",
      InputValue: currentProject?.assigned_to?.name,
      InputName: "project_manager",
      inputChange: (e) =>
        setVprData({ ...vprData, project_manager: e.target.value }),
      inputClassName: "p-2 border rounded-md",
    },
    {
      labelName: "Invoice Amount",
      InputValue: vprData?.invoice_amount,
      InputName: "invoice_amount",
      inputChange: (e) =>
        setVprData({ ...vprData, invoice_amount: e.target.value }),
      inputClassName: "p-2 border bg-white rounded-md",
    },
    {
      labelName: "Approved Amount",
      InputValue: vprData?.approved_amount,
      InputName: "approved_amount",
      inputChange: (e) =>
        setVprData({ ...vprData, approved_amount: e.target.value }),
      inputClassName: "p-2 border bg-white rounded-md",
    },
    {
      labelName: "Type of Services",
      InputValue: vprData?.type_of_services,
      InputName: "type_of_services",
      inputChange: (e) =>
        setVprData({ ...vprData, type_of_services: e.target.value }),
      inputClassName: "p-2 border bg-white rounded-md",
    },
    {
      labelName: "Upload Vendor Invoice",
      // InputValue: vprData?.upload_vendor_invoice,
      InputName: `upload_vendor_invoice_${uploadInvoiceIndex}`,
      inputChange: (e) => {
        const files = Array.from(e.target.files);
        const key = `upload_vendor_invoice_${uploadInvoiceIndex}`;
        const updated = {
          ...vprData,
          [key]: [...(vprData[key] || []), ...files],
        };
        setVprData(updated);
      }
,      
      inputClassName: "p-2 border bg-white rounded-md",
      type:"file"
    },
    
  ];
  
  return (
    <>
      {inputFields.map((field, index) => (
        field.type ? 
         <LableAndInput
         InputType={field.type}
         key={index}
         labelClassName="text-left"
         labelName={field.labelName}
         Inputvalue={field.InputValue}
         InputName={field.InputName}
         inputChange={field.inputChange}
         inputClassName={field.inputClassName}
         multiple
       /> : 
        <LableAndInput
          key={index}
          labelClassName="text-left"
          labelName={field.labelName}
          Inputvalue={field.InputValue}
          InputName={field.InputName}
          inputChange={field.inputChange}
          inputClassName={field.inputClassName}
        />
      ))}
    </>
  );
};
