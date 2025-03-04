import React from 'react'

const InvoiceDateAndDueDate = ({invoiceData,setInvoiceData}) => {
    const handleInputChange = (e) => {
        setInvoiceData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
      };
  return (
    <div className="text-left w-5/12">
          <label className="mt-2 font-semibold">Date:</label>
          <input
            type="date"
            name="date"
            defaultValue={invoiceData.date}
            onChange={handleInputChange}
            className="border p-1 w-full"
          />
          <label className="font-semibold">Due Date:</label>
          <input
            type="date"
            name="dueDate"
            defaultValue={invoiceData.dueDate}
            onChange={handleInputChange}
            className="border p-1 w-full"
          />
        </div>
  )
}

export default InvoiceDateAndDueDate