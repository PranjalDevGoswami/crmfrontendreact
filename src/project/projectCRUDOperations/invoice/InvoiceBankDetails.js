import React from 'react'

const InvoiceBankDetails = ({selectedCompanyDetails}) => {
  return (
    <div className="border-t pt-4 mt-4">
    <h2 className="font-semibold text-lg mb-2">Payment Details:</h2>
    <p>
      <span className="font-semibold">Account Title:</span>
      {selectedCompanyDetails?.account_title}
    </p>
    <p>
      <span className="font-semibold">Account Number:</span>
      {selectedCompanyDetails?.account_number}
    </p>
    <p>
      <span className="font-semibold">Wire ABA#:</span>
      {selectedCompanyDetails?.bankDetails?.wireABA}
    </p>
    <p>
      <span className="font-semibold">Wire ACH#:</span>
      {selectedCompanyDetails?.bankDetails?.wireACH}
    </p>
    <p>
      <span className="font-semibold">Swift Code:</span>
      {selectedCompanyDetails?.swift_code}
    </p>
    <p>
      <span className="font-semibold">Bank Name:</span>
      {selectedCompanyDetails?.bank_name}
    </p>
    <p>
      <span className="font-semibold">Bank Address:</span>
      {selectedCompanyDetails?.bank_address}
    </p>
  </div>  )
}

export default InvoiceBankDetails