import React from 'react'

const InvoiceType = ({ABRDetails,setInvoiceData,data}) => {
    const handleInvoiceTypeChange = (e) => {
        setInvoiceData((prev) => ({ ...prev, ["advanceType"]: e.target.value }));
      };
  return (
    <div>
        <div className="flex flex-col w-1/2">
          <label className="font-semibold text-gray-800 ">Invoice Type:</label>
          <select
            className="border border-gray-300 rounded-md p-2"
            onChange={handleInvoiceTypeChange}
            name="advanceType"
          >
            <option value={"--select company name--"}>
              --select invoice type--
            </option>
            <option
              value="ABR"
              disabled={
                ABRDetails?.map((item) => item?.project === data.project?.id)
                  ? false
                  : true
              }
            >
              ABR
            </option>
            <option value={"CBR"}>CBR</option>
          </select>
        </div>
    </div>
  )
}

export default InvoiceType