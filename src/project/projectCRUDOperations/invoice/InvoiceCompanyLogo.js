import React from 'react'
import { BASEURL } from '../../../../utils/constants/urls'

const InvoiceCompanyLogo = ({selectedCompanyDetails}) => {
  return (
    <div>
         <div className="min-h-20  my-6 w-32">
        <img
          alt="company-logo"
          src={BASEURL + selectedCompanyDetails?.logo}
          className="h-auto"
        />
      </div>
    </div>
  )
}

export default InvoiceCompanyLogo