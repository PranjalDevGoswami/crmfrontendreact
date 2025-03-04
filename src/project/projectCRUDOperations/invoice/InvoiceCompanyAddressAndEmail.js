import React from 'react'

const InvoiceCompanyAddressAndEmail = ({selectedCompanyDetails,invoiceData,setInvoiceData}) => {
    const handleInputChange = (e) => {
        setInvoiceData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
      };
  return (
        <div className="w-5/12">
          <div className="flex flex-col">
            <label className="mt-2 font-semibold">Address:</label>
            <input
              className="mt-2 text-gray-600 border rounded p-1 w-full"
              defaultValue={selectedCompanyDetails?.address}
              readOnly
            />
          </div>
          <div className="flex flex-col">
            <label className="mt-2 font-semibold">Email:</label>
            <input
              name="clientEmail"
              className="mt-2 text-gray-600 border rounded p-1 w-full"
              defaultValue={
                selectedCompanyDetails?.email || invoiceData.clientEmail
              }
              onChange={handleInputChange}
            />
          </div>
        </div>
  )
}

export default InvoiceCompanyAddressAndEmail