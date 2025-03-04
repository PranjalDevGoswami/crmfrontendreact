import React from "react";

const InvoiceBuyerDetails = ({ invoiceData, setInvoiceData }) => {
  const handleInputChange = (e) => {
    setInvoiceData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  return (
    <div className="grid grid-cols-2 gap-4 border-b pb-4 mb-4">
      <div>
        <label className="font-semibold">Buyer:</label>
        <input
          type="text"
          name="buyer"
          defaultValue={invoiceData.buyer}
          onChange={handleInputChange}
          className="border p-1 w-full"
        />
      </div>
      <div>
        <label className="font-semibold">Services:</label>
        <input
          type="text"
          name="services"
          defaultValue={invoiceData.services}
          onChange={handleInputChange}
          className="border p-1 w-full"
        />
      </div>
    </div>
  );
};

export default InvoiceBuyerDetails;
