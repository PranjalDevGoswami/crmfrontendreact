import React from "react";
import LableAndInput from "../../../Molecules/LableAndInput";

const RaisedVpr = ({ viewRecord, vprData, setVprData }) => { 
  return (
    <div className="p-4">
      <h3 className="text-2xl font-semibold underline pb-4">VPR Data</h3>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div className="text-left">
        <LableAndInput
            labelClassName={"text-left"}
            labelName="Client"
            Inputvalue={viewRecord?.clients}
            InputName="clints"
            inputChange={(e) =>
              setVprData({ ...vprData, vendor_name: e.target.value })
            }
            disabled
            inputClassName="p-2 border bg-gray-100 rounded-md cursor-not-allowed"
          />
        </div>

        <div>
          <LableAndInput
            labelClassName={"text-left"}
            labelName="Project Manager"
            Inputvalue={viewRecord?.project_manager}
            InputName="project_manager"
            inputChange={(e) =>
              setVprData({ ...vprData, vendor_name: e.target.value })
            }
            inputClassName="p-2 border bg-gray-100 rounded-md"
          />
        </div>

        <LableAndInput
          labelClassName={"text-left"}
          labelName="Vendor Name"
          Inputvalue={vprData?.vendor_name}
          InputName="vendor_name"
          inputChange={(e) =>
            setVprData({ ...vprData, vendor_name: e.target.value })
          }
          inputClassName="p-2 border bg-white rounded-md"
        />

        <LableAndInput
          labelClassName={"text-left"}
          labelName="Invoice Amount"
          Inputvalue={vprData?.invoice_amount}
          InputName="invoice_amount"
          inputChange={(e) =>
            setVprData({ ...vprData, invoice_amount: e.target.value })
          }
          inputClassName="p-2 border bg-white rounded-md"
        />

        <LableAndInput
          labelClassName={"text-left"}
          labelName="Approved Amount"
          Inputvalue={vprData?.approved_amount}
          InputName="approved_amount"
          inputChange={(e) =>
            setVprData({ ...vprData, approved_amount: e.target.value })
          }
          inputClassName="p-2 border bg-white rounded-md"
        />

        <LableAndInput
          labelClassName={"text-left"}
          labelName="Type of Services"
          Inputvalue={vprData?.type_of_services}
          InputName="type_of_services"
          inputChange={(e) =>
            setVprData({ ...vprData, type_of_services: e.target.value })
          }
          inputClassName="p-2 border bg-white rounded-md"
        />
      </div>
    </div>
  );
};

export default RaisedVpr;
