import React, { useState } from "react";
import { RaiseVprInputFields } from "./RaiseVprInputFields";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleIsVprHasData,
  toggleRaiseVpr,
} from "../../../utils/slices/dataTableSlice";
import { FreelancerInputFields } from "./FreelancerInputFields";

const RaiseVpr = ({ setVprData }) => {
  const dispatch = useDispatch();
  const { selectedRecord } = useSelector((store) => store.dataTable);
  const { projects } = useSelector((store) => store.projectData);

  const currentProject =
    projects.find((item) => item.id === selectedRecord?.id) || {};

  const initialVendorData = {
    project: selectedRecord?.id,
    status: "pending",
    name_of_client: selectedRecord?.clients,
    project_code: selectedRecord?.project_code,
    project_name: selectedRecord?.name,
    vendor_name: "",
    type_of_services: selectedRecord?.project_type,
    invoice_amount: null,
    approved_amount: null,
    name_of_project_manager: currentProject?.assigned_to?.name,
    other_cost: [],
  };
  const [uploadInvoiceIndex, setUploadInvoiceIndex] = useState(0);

  const [vendorData, setVendorData] = useState([
    // { id: 0, data: initialVendorData },
  ]);
  const [isFreelancerSelect, setIsFreelancerSelect] = useState(false);
  const [freelancerData, setFreelancerData] = useState();

  const handleAddMoreVendor = () => {
    setVendorData((prev) => [
      ...prev,
      { id: prev.length, data: initialVendorData },
    ]);
  
    // Increment only if this is not the first entry
    setUploadInvoiceIndex((prev) => (vendorData.length > 0 ? prev + 1 : prev));
  };
  

  const handleAddFreelancer = () => {
    setIsFreelancerSelect(true);
  };

  const handleInputChange = (id, updatedData) => {
    setVendorData((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, data: { ...item.data, ...updatedData } }
          : item
      )
    );
  };

  const handleSubmit = () => {
    // const baseData = {
    //   vprs: vendorData.map((item) => item.data),
    //   freelancer: isFreelancerSelect,
    // };
    const baseData = {
      vprs: vendorData.map((item) => {
        const cleanedData = { ...item.data };
        // Remove keys like 'upload_vendor_invoice_0', 'upload_vendor_invoice_1' from each item
        Object.keys(cleanedData).forEach((key) => {
          if (key.startsWith('upload_vendor_invoice_')) {
            delete cleanedData[key];
          }
        });
        return cleanedData;
      }),
      // freelancer: isFreelancerSelect,
    };
    
    // Now, collect all upload_invoice_* fields from vendorData
    vendorData.forEach((item) => {
      const data = item.data;
      Object.keys(data).forEach((key) => {
        if (key.startsWith('upload_vendor_invoice_')) {
          baseData[key] = data[key];
        }
      });
    });
    

    const formattedData = freelancerData
    ? {
      ...baseData,
      project_id: selectedRecord?.id,
      
      total_amount: freelancerData?.total_amount,
      upload_freelancer_invoice: freelancerData?.upload_freelancer_invoice,
    }
    : baseData;

    setVprData(formattedData);
    dispatch(toggleRaiseVpr());
  };

  return (
    <div className="p-4">
      <h3 className="text-2xl font-semibold underline pb-4">VPR Data</h3>

      <div className="">
        {vendorData.length > 0 &&
          vendorData.map((item) => (
            <div
              key={item.id}
              className="border p-4 rounded-lg grid grid-cols-2 gap-4"
            >
              <RaiseVprInputFields
                vprData={item.data}
                uploadInvoiceIndex={uploadInvoiceIndex}
                setUploadInvoiceIndex={setUploadInvoiceIndex}
                setVprData={(updatedData) =>
                  handleInputChange(item.id, updatedData)
                }
              />
            </div>
          ))}
        {isFreelancerSelect && (
          <div className="border p-4 rounded-lg grid grid-cols-2 gap-4">
            <FreelancerInputFields
              freelancerData={freelancerData}
              setFreelancerData={setFreelancerData}
            />
          </div>
        )}
        <div className="flex">
          <button
            className="text-xs ml-5 p-1 text-white bg-blue-500 hover:bg-blue-600 rounded-md flex justify-start"
            onClick={handleAddMoreVendor}
          >
            {vendorData.length > 0 ? "Add More Vendors" : "Add Vendor"}
          </button>
          <button
            className="text-xs ml-5 p-1 text-white bg-blue-500 hover:bg-blue-600 rounded-md flex justify-start"
            onClick={handleAddFreelancer}
          >
            Add Freelancer
          </button>
        </div>
      </div>

      {(vendorData.length > 0 || isFreelancerSelect) && (
        <div className="flex justify-center">
          <button
            className="p-2 mr-2 text-white bg-green-500 hover:bg-green-600 rounded-md"
            onClick={handleSubmit}
          >
            Submit
          </button>
          <button
            className="p-2 bg-red-400 text-white rounded-md hover:bg-red-500"
            onClick={() => {
              dispatch(toggleRaiseVpr());
              dispatch(toggleIsVprHasData(false));
            }}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default RaiseVpr;
