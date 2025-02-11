import React, { useContext, useEffect, useState } from "react";
import { FormDataContext } from "../../ContextApi/FormDataContext";
import LableAndInput from "../../Molecules/LableAndInput";
import { FilterContext } from "../../ContextApi/FilterContext";

const AdvancePayment = ({ abrData, setAbrData }) => {
  const userName = localStorage.getItem('username')
  const { formData, setAdvancePayment, managerList } =
    useContext(FormDataContext);
  const { clientListDataWithId } = useContext(FilterContext);
  const [client, setClient] = useState("");
  const [managerName, setManagerName] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const selectedClient = clientListDataWithId.filter(
      (client) => client.id === formData?.clients
    );
    setClient(selectedClient[0]);
    const selectedManager = managerList?.filter(
      (manager) => manager.user.id == formData?.project_manager
    );
    console.log("🚀 ~ useEffect ~ selectedManager:", selectedManager)
    const selectedManagerName = selectedManager?.map(
      (user) => user?.user?.name
    );
    setManagerName(selectedManagerName);
  }, [formData?.clients, formData?.project_manager]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAbrData((prev) => ({ ...prev, [name]: value }));
  };

  const handleABR = () => {
    const errorMessage = validateForm();
    if (errorMessage) {
      setError(errorMessage);
    } else {
      setAdvancePayment(false);
    }
  };

  const validateForm = () => {
    if (!abrData?.total_project_cost)
      return "Total Cost of Project is required.";
    if (!abrData?.advance_invoice_percentage)
      return "Advance Invoice Percentage is required.";
    if (!abrData?.advance_invoice_amount)
      return "Advance Invoice Amount is required.";
    if (!abrData?.contact_person_name) return "Name Required.";
    if (!abrData?.contact_person_email) return "Email Required.";
    if (!abrData?.total_project_cost)
      return "Total Cost of Project (Amount) Required.";
    return "";
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      {/* Title & Close Button */}
      <div className="flex justify-between items-center border-b pb-4 mb-4">
        <h1 className="text-xl font-semibold text-gray-800">
          Advance Billing Requisition
        </h1>
        <button
          className="bg-red-500 hover:bg-red-700 font-bold border border-gray-300 text-white px-2 py-2 rounded-md absolute top-0 right-0"
          onClick={() => setAdvancePayment(false)}
        >
          X
        </button>
      </div>

      {/* Form Fields Grid Layout */}
      {/* <div className="grid grid-cols-3 gap-4">
        <LableAndInput
          labelName="Name of Client"
          InputName={"client"}
          Inputvalue={client?.name}
          InputType={"text"}
          inputClassName="border border-gray-300 rounded-md p-2 w-full cursor-not-allowed"
          inputChange={handleInputChange}
          disabled
        />
        <LableAndInput
          labelName="Address of Client (In case of new client)"
          InputName="client_address"
          inputClassName="border border-gray-300 rounded-md p-2 w-full"
          Inputvalue={client?.address || abrData?.client_address}
          inputChange={handleInputChange}
        />
        <LableAndInput
          labelName="City"
          InputName="client_city"
          inputClassName="border border-gray-300 rounded-md p-2 w-full"
          Inputvalue={client?.city || abrData?.client_city}
          inputChange={handleInputChange}
        />
        <LableAndInput
          labelName="Country"
          InputName="client_country"
          inputClassName="border border-gray-300 rounded-md p-2 w-full"
          Inputvalue={client?.country || abrData?.client_country}
          inputChange={handleInputChange}
        />
        <LableAndInput
          labelName="Project Name (as per SOW)"
          InputName="project"
          Inputvalue={formData?.name || abrData?.project}
          inputClassName="border border-gray-300 rounded-md p-2 w-full cursor-not-allowed"
          inputChange={handleInputChange}
          disabled
        />
       <div>
       <LableAndInput
          labelName="Contact Person - Name"
          InputName="contact_person_name"
          Inputvalue={client?.contact_person || abrData?.contact_person_name}
          inputClassName="border border-gray-300 rounded-md p-2 w-full"
          inputChange={handleInputChange}
        />
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
       </div>
       <div>
       <LableAndInput
          labelName="Contact Person - Email ID"
          InputName="contact_person_email"
          Inputvalue={client?.email || abrData?.contact_person_email}
          inputClassName="border border-gray-300 rounded-md p-2 w-full"
          inputChange={handleInputChange}
        />
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
       </div>
        <LableAndInput
          labelName="CC: Other Persons - Email ID (if any)"
          InputName="cc_emails"
          Inputvalue={client?.email_id_for_cc || abrData?.email_id_for_cc}
          inputClassName="border border-gray-300 rounded-md p-2 w-full"
          inputChange={handleInputChange}
        />
        <LableAndInput
          labelName="Specific Billing Instruction (if any)"
          InputName="specific_billing_instruction"
          Inputvalue={abrData?.specific_billing_instruction}
          inputClassName="border border-gray-300 rounded-md p-2 w-full"
          inputChange={handleInputChange}
        />
        <div>
        <LableAndInput
          labelName="Total Cost of Project (Amount)"
          InputName="total_project_cost"
          Inputvalue={abrData?.total_project_cost}
          inputClassName="border border-gray-300 rounded-md p-2 w-full"
          inputChange={handleInputChange}
        />
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
       <div>
       <LableAndInput
          labelName="Advance Invoice as per SOW (Percentage)"
          InputName="advance_invoice_percentage"
          Inputvalue={abrData?.advance_invoice_percentage}
          inputClassName="border border-gray-300 rounded-md p-2 w-full"
          inputChange={handleInputChange}
        />
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
       </div>
        <div>
        <LableAndInput
          labelName="Advance Invoice as per SOW (Amount)"
          InputName="advance_invoice_amount"
          Inputvalue={abrData?.advance_invoice_amount}
          inputClassName="border border-gray-300 rounded-md p-2 w-full"
          inputChange={handleInputChange}
        />
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
        <LableAndInput
          labelName="Sales Owner"
          InputName="sales_owner"
          Inputvalue={abrData?.sales_owner}
          inputClassName="border border-gray-300 rounded-md p-2 w-full"
          inputChange={handleInputChange}
        />
        <LableAndInput
          labelName="Name of Project Manager"
          InputName="project_manager"
          Inputvalue={managerName}
          inputClassName="border border-gray-300 rounded-md p-2 w-full cursor-not-allowed"
          inputChange={handleInputChange}
          disabled
        />
      </div> */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <LableAndInput
          labelClassName={"text-left"}
          labelName="Name of Client"
          InputName="client"
          Inputvalue={client?.name}
          InputType="text"
          inputClassName="border border-gray-300 rounded-md p-2 w-full cursor-not-allowed min-w-[200px] break-words"
          inputChange={handleInputChange}
          disabled
        />
        <LableAndInput
          labelClassName={"text-left"}
          labelName="Address of Client (In case of new client)"
          InputName="client_address"
          inputClassName="border border-gray-300 rounded-md p-2 w-full min-w-[200px] break-words"
          Inputvalue={client?.address || abrData?.client_address}
          inputChange={handleInputChange}
        />
        <LableAndInput
          labelClassName={"text-left"}
          labelName="City"
          InputName="client_city"
          inputClassName="border border-gray-300 rounded-md p-2 w-full min-w-[200px] break-words"
          Inputvalue={client?.city || abrData?.client_city}
          inputChange={handleInputChange}
        />
        <LableAndInput
          labelClassName={"text-left"}
          labelName="Country"
          InputName="client_country"
          inputClassName="border border-gray-300 rounded-md p-2 w-full min-w-[200px] break-words"
          Inputvalue={client?.country || abrData?.client_country}
          inputChange={handleInputChange}
        />
        <LableAndInput
          labelClassName={"text-left"}
          labelName="Project Name (as per SOW)"
          InputName="project"
          Inputvalue={formData?.name || abrData?.project}
          inputClassName="border border-gray-300 rounded-md p-2 w-full cursor-not-allowed min-w-[200px] break-words"
          inputChange={handleInputChange}
          disabled
        />
        <div>
          <LableAndInput
            labelClassName={"text-left"}
            labelName="Contact Person - Name"
            InputName="contact_person_name"
            Inputvalue={client?.contact_person || abrData?.contact_person_name}
            inputClassName="border border-gray-300 rounded-md p-2 w-full min-w-[200px] break-words"
            inputChange={handleInputChange}
          />
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
        <div>
          <LableAndInput
            labelClassName={"text-left"}
            labelName="Contact Person - Email ID"
            InputName="contact_person_email"
            Inputvalue={client?.email || abrData?.contact_person_email}
            inputClassName="border border-gray-300 rounded-md p-2 w-full min-w-[200px] break-words"
            inputChange={handleInputChange}
          />
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
        <LableAndInput
          labelClassName={"text-left"}
          labelName="CC: Other Persons - Email ID (if any)"
          InputName="cc_emails"
          Inputvalue={client?.email_id_for_cc || abrData?.email_id_for_cc}
          inputClassName="border border-gray-300 rounded-md p-2 w-full min-w-[200px] break-words"
          inputChange={handleInputChange}
        />
        <LableAndInput
          labelClassName={"text-left"}
          labelName="Specific Billing Instruction (if any)"
          InputName="specific_billing_instruction"
          Inputvalue={abrData?.specific_billing_instruction}
          inputClassName="border border-gray-300 rounded-md p-2 w-full min-w-[200px] break-words"
          inputChange={handleInputChange}
        />
        <div>
          <LableAndInput
            labelClassName={"text-left"}
            labelName="Total Cost of Project (Amount)"
            InputName="total_project_cost"
            Inputvalue={abrData?.total_project_cost}
            inputClassName="border border-gray-300 rounded-md p-2 w-full min-w-[200px] break-words"
            inputChange={handleInputChange}
          />
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
        <div>
          <LableAndInput
            labelClassName={"text-left"}
            labelName="Advance Invoice as per SOW (Percentage)"
            InputName="advance_invoice_percentage"
            Inputvalue={abrData?.advance_invoice_percentage}
            inputClassName="border border-gray-300 rounded-md p-2 w-full min-w-[200px] break-words"
            inputChange={handleInputChange}
          />
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
        <div>
          <LableAndInput
            labelClassName={"text-left"}
            labelName="Advance Invoice as per SOW (Amount)"
            InputName="advance_invoice_amount"
            Inputvalue={abrData?.advance_invoice_amount}
            inputClassName="border border-gray-300 rounded-md p-2 w-full min-w-[200px] break-words"
            inputChange={handleInputChange}
          />
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
        <LableAndInput
          labelClassName={"text-left"}
          labelName="Sales Owner"
          InputName="sales_owner"
          Inputvalue={userName}
          inputClassName="border border-gray-300 rounded-md p-2 w-full min-w-[200px] break-words"
          inputChange={handleInputChange}
        />
        <LableAndInput
          labelClassName={"text-left"}
          labelName="Name of Project Manager"
          InputName="project_manager"
          Inputvalue={managerName}
          inputClassName="border border-gray-300 rounded-md p-2 w-full cursor-not-allowed min-w-[200px] break-words"
          inputChange={handleInputChange}
          disabled
        />
      </div>

      {/* Submit Button */}
      <div className="flex justify-end mt-6">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200"
          onClick={handleABR}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default AdvancePayment;
