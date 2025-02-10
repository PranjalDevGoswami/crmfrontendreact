import React, { useEffect, useState } from "react";
import COMPANY_LOGO from "../../assets/mainlogo.png";
import CountryCode from "../../../utils/constants/countryCode";
import { getWithAuth } from "../../provider/helper/axios";
import {
  GETALLCOMPANYNAME,
  GETCOMPANYDETAILS,
} from "../../../utils/constants/urls";

const CreateInvoice = () => {
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [companyName, setCompanyName] = useState([]);
  const [selectedCompanyDetails, setSelectedCompanyDetails] = useState(null);
  const [invoiceData, setInvoiceData] = useState({
    invoiceNumber: "UINV202400xx",
    date: "2024-01-01",
    dueDate: "2024-01-07",
    buyer: "Xxx Xxxxxx",
    services: "CATI",
    clientName: "Xxxxxxxxx Xxxxxxx",
    clientAddress: "Suite xx, xth Floor, Xxx Xxxx, XX x000x",
    clientPhone: "+x xxx xxx xxxx",
    studyName: "Study Name",
    costComponents: "Data Collection",
    sample: 0,
    cpi: 0,
    totalCost: "$0",
    advance: "$-",
    bankDetails: {
      accountTitle: "Unimrkt Research Inc.",
      accountNumber: "4830 5272 9299",
      wireABA: "026009593",
      wireACH: "021000322",
      swiftCode: "BOFAUS3N",
      bankName: "Bank of America",
      bankAddress: "1293 Broadway, New York, NY 10001",
    },
  });

  const inVoiceNumber  = '001NOV001-abr-25'

  const getCompany = async (id) => {
    const response = await getWithAuth(GETCOMPANYDETAILS(id));
    setSelectedCompanyDetails(response?.data?.data);
    const companyName = await getWithAuth(GETALLCOMPANYNAME);
    setCompanyName(companyName?.data?.data);
  };
  useEffect(() => {
    const id = selectedCompany?.id || 1;
    getCompany(id);
  }, [selectedCompany]);

  useEffect(() => {
    setInvoiceData((prev) => ({
      ...prev,
      totalCost: `$${(prev.sample * prev.cpi).toFixed(2)}`,
    }));
  }, [invoiceData.sample, invoiceData.cpi]);

  const handleCompanyChange = (event) => {
    if (event !== "--select company name--") {
      const company = companyName.find((c) => c.name === event.target.value);
      setSelectedCompany(company);
    }
  };

  const handleGenerateInvoice = () => {
    console.log("generate Invoice");
  };

  const handleInputChange = (e) => {
    setInvoiceData({ ...invoiceData, [e.target.name]: e.target.value });
  };

  return (
    <div className="w-full mx-auto bg-white shadow-lg rounded-lg p-6">
      <div className="">
        <img
          alt="company-logo"
          src={COMPANY_LOGO}
          className="w-32 h-auto my-6"
        />
      </div>
      {/* Header Section */}
      <div className="flex justify-between border-b pb-4 mb-4">
        <div className="w-5/12">
          <label className="font-semibold text-gray-800 ">Company:</label>
          <select
            className="border border-gray-300 rounded-md p-2 ml-2"
            onChange={handleCompanyChange}
          >
            <option value={"--select company name--"}>
              --select company name--
            </option>
            {companyName.map((company, index) => (
              <option key={index} value={company.name}>
                {company.name}
              </option>
            ))}
          </select>
          <input
            className="mt-2 text-gray-600 border rounded p-1 w-full"
            value={selectedCompanyDetails?.address}
            readOnly
          />
          <input
            className="mt-2 text-gray-600 border rounded p-1 w-full"
            value={"selectedCompanyDetails.email"}
            readOnly
          />
        </div>
        <div className="text-left w-5/12">
          <label className="font-semibold text-lg">INVOICE #</label>
          <input
            type="text"
            name="invoiceNumber"
            value={inVoiceNumber}
            onChange={handleInputChange}
            className="border p-1 w-full"
          />
          <label className="mt-2 font-semibold">Date:</label>
          <input
            type="date"
            name="date"
            value={invoiceData.date}
            onChange={handleInputChange}
            className="border p-1 w-full"
          />
          <label className="font-semibold">Due Date:</label>
          <input
            type="date"
            name="dueDate"
            value={invoiceData.dueDate}
            onChange={handleInputChange}
            className="border p-1 w-full"
          />
        </div>
      </div>

      {/* Client Section */}
      <div className="border-b pb-4 mb-4">
        <label className="font-semibold">To:</label>
        <input
          type="text"
          name="clientName"
          value={invoiceData.clientName}
          onChange={handleInputChange}
          className="border p-1 w-full"
        />
        <input
          type="text"
          name="clientAddress"
          value={invoiceData.clientAddress}
          onChange={handleInputChange}
          className="border p-1 w-full"
        />
        <input
          type="text"
          name="clientPhone"
          value={invoiceData.clientPhone}
          onChange={handleInputChange}
          className="border p-1 w-full"
        />
      </div>

      {/* Buyer & Service */}
      <div className="grid grid-cols-2 gap-4 border-b pb-4 mb-4">
        <div>
          <label className="font-semibold">Buyer:</label>
          <input
            type="text"
            name="buyer"
            value={invoiceData.buyer}
            onChange={handleInputChange}
            className="border p-1 w-full"
          />
        </div>
        <div>
          <label className="font-semibold">Services:</label>
          <input
            type="text"
            name="services"
            value={invoiceData.services}
            onChange={handleInputChange}
            className="border p-1 w-full"
          />
        </div>
      </div>

      {/* Table */}
      <div className="border-b pb-4 mb-4">
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-3 py-2">Description</th>
              <th className="border px-3 py-2">Cost Components</th>
              <th className="border px-3 py-2">Sample</th>
              <th className="border px-3 py-2">CPI</th>
              <th className="border px-3 py-2">Total Costing (USD)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border p-2">
                <input
                  type="text"
                  name="studyName"
                  value={invoiceData.studyName}
                  onChange={handleInputChange}
                  className="w-full"
                />
              </td>
              <td className="border p-2">
                <input
                  type="text"
                  name="costComponents"
                  value={invoiceData.costComponents}
                  onChange={handleInputChange}
                  className="w-full"
                />
              </td>
              <td className="border p-2">
                <input
                  type="number"
                  name="sample"
                  value={invoiceData.sample}
                  onChange={handleInputChange}
                  className="w-full"
                />
              </td>
              <td className="border p-2">
                <input
                  type="number"
                  name="cpi"
                  value={invoiceData.cpi}
                  onChange={handleInputChange}
                  className="w-full"
                />
              </td>
              <td className="border p-2">
                <input
                  type="text"
                  name="totalCost"
                  value={invoiceData.totalCost}
                  onChange={handleInputChange}
                  className="w-full"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Bank Details */}
      {/* Payment Details (Changes with Company Selection) */}
      <div className="border-t pt-4 mt-4">
        <h2 className="font-semibold text-lg mb-2">Payment Details:</h2>
        <p>
          <span className="font-semibold">Account Title:</span>{" "}
          {selectedCompanyDetails?.account_number}
        </p>
        <p>
          <span className="font-semibold">Account Number:</span>{" "}
          {selectedCompanyDetails?.account_number}
        </p>
        {/* <p>
          <span className="font-semibold">Wire ABA#:</span>{" "}
          {selectedCompanyDetails.bankDetails.wireABA}
        </p>
        <p>
          <span className="font-semibold">Wire ACH#:</span>{" "}
          {selectedCompanyDetails.}
        </p> */}
        <p>
          <span className="font-semibold">Swift Code:</span>{" "}
          {selectedCompanyDetails?.swift_code}
        </p>
        <p>
          <span className="font-semibold">Bank Name:</span>{" "}
          {selectedCompanyDetails?.bank_name}
        </p>
        <p>
          <span className="font-semibold">Bank Address:</span>{" "}
          {selectedCompanyDetails?.bank_address}
        </p>
      </div>
     <div className="flex justify-end">
     <button
        onClick={handleGenerateInvoice}
        className="border border-gray-300 rounded-md bg-green-400 hover:bg-green-600 p-2 text-white"
      >
        Generate Invoice
      </button>
     </div>
    </div>
  );
};

export default CreateInvoice;
