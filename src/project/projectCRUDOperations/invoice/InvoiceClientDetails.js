import React from 'react'

const InvoiceClientDetails = ({invoiceData,setInvoiceData}) => {
    const handleInputChange = (e) => {
        setInvoiceData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
      };
  return (
<div className="border-b pb-4 mb-4 mt-4 w-1/2">
        <label className="font-semibold">To:</label>
        <input
          type="text"
          name="clientName"
          defaultValue={invoiceData.clientName}
          onChange={handleInputChange}
          className=" p-1 w-full"
          placeholder="Name"
        />
        <input
          type="text"
          name="clientAddress"
          defaultValue={invoiceData.clientAddress}
          onChange={handleInputChange}
          className=" p-1 w-full"
          placeholder="Address"
        />
        <input
          type="text"
          name="clientPhone"
          defaultValue={invoiceData.clientPhone}
          onChange={handleInputChange}
          className=" p-1 w-full"
          placeholder="Telephone"
        />
      </div>  )
}

export default InvoiceClientDetails