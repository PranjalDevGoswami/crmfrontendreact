import React, { useEffect, useState } from "react";
import { getWithAuth } from "../../provider/helper/axios";
import {
  ADVANCEBILLING,
  BASEURL,
  GETABRDETAILS,
  GETALLCOMPANYNAME,
  GETCBR,
  GETCOMPANYDETAILS,
} from "../../../utils/constants/urls";
import { useLocation } from "react-router-dom";

const CreateInvoice = () => {
  const location = useLocation();
  const { state: data } = location;

  const [selectedCompany, setSelectedCompany] = useState(null);
  const [companyName, setCompanyName] = useState([]);
  const [selectedCompanyDetails, setSelectedCompanyDetails] = useState(null);
  const [ABRDetails, setABRDetails] = useState([]);
  const [CBRDetails, setCBRDetails] = useState([]);

  const [invoiceData, setInvoiceData] = useState({
    advanceType: "",
    // no need to send bank details
    bankDetails: {
      accountNumber: selectedCompanyDetails?.account_number,
      accountTitle: selectedCompanyDetails?.account_title,
      bankAddress: selectedCompanyDetails?.bank_address,
      bankName: selectedCompanyDetails?.bank_name,
      swiftCode: selectedCompanyDetails?.swift_code,
      wireABA: selectedCompanyDetails?.wireABA,
      wireACH: selectedCompanyDetails?.wireACH,
    },
    buyer: "",
    clientAddress: "",
    clientEmail: "",
    clientName: "",
    clientPhone: "",
    costComponents: "",
    cpi: 0, // Keep numbers as 0
    date: "",
    dueDate: "",
    sample: 0, // Keep numbers as 0
    services: "",
    studyName: "",
    totalCost: "",
  });

  const [invoiceFinalData, setInvoiceFinalData] = useState({
    advance_paid: 200.0,
    buyer_name: invoiceData?.buyer,
    cbr: 3, // cbr_id
    cost_components: [
      {
        name: "C-level",
        sample: 10,
        cpi: 50,
      },
      {
        name: "VP Level/Director Level",
        sample: 5,
        cpi: 40,
      },
      {
        name: "Manager Level",
        sample: 8,
        cpi: 30,
      },
      {
        name: "Setup Cost",
        sample: 1,
        cpi: 200,
      },
    ],
    description: "Invoice for software development services",
    due_date: invoiceData?.dueDate,
    entity: selectedCompany?.id,
    final_payment: 940.0,
    issue_date: invoiceData?.date,
    po_number: 'PO-123456',
    project: data?.id,
    services: invoiceData?.services,
    total_cost_usd: invoiceData?.totalCost,
    type: "ABR",
  });

  useEffect(() => {
    if (selectedCompanyDetails) {
      setInvoiceData((prev) => ({
        ...prev,
        bankDetails: {
          accountNumber: selectedCompanyDetails.account_number,
          accountTitle: selectedCompanyDetails.account_title,
          bankAddress: selectedCompanyDetails.bank_address,
          bankName: selectedCompanyDetails.bank_name,
          swiftCode: selectedCompanyDetails.swift_code,
          wireABA: selectedCompanyDetails.wireABA,
          wireACH: selectedCompanyDetails.wireACH,
        },
      }));
    }
  }, [selectedCompanyDetails]); // Runs whenever selectedCompanyDetails changes
  
  const getCompany = async (id) => {
    const response = await getWithAuth(GETCOMPANYDETAILS(id));
    const abrResponse = await getWithAuth(ADVANCEBILLING);
    setABRDetails(abrResponse?.data?.map((item) => item?.project));
    setSelectedCompanyDetails(response?.data?.data);
    const cbrResponse = await getWithAuth(GETCBR(data?.id));
    console.log("🚀 ~ getCompany ~ cbrResponse:", cbrResponse)
    setCBRDetails(cbrResponse?.data);
  };
  const getCOmpanyDropdownDetails = async () => {
    const companyName = await getWithAuth(GETALLCOMPANYNAME);
    setCompanyName(companyName?.data?.data);
  };

  useEffect(() => {
    const id = selectedCompany?.id;
    if (id) {
      getCompany(id);
    }
    getCOmpanyDropdownDetails();
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
    console.log("generate Invoice",invoiceFinalData);
  };

  const handleInputChange = (e) => {
    setInvoiceData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  useEffect(() => {
    console.log(invoiceData);
  }, [invoiceData]);

  const handleInvoiceTypeChange = (e) => {
    setInvoiceData((prev)=>({...prev,['advanceType']:e.target.value}))
  };
  return (
    <div className="w-8/12 mx-auto bg-white shadow-lg rounded-lg p-6">
      <div className="min-h-20  my-6 w-32">
        <img
          alt="company-logo"
          src={BASEURL + selectedCompanyDetails?.logo}
          className="h-auto"
        />
      </div>
      {/* Header Section */}
      <div className="grid grid-cols-2 gap-4 my-4">
        <div className="flex flex-col w-1/2">
          <label className="font-semibold text-gray-800 ">Company:</label>
          <select
            className="border border-gray-300 rounded-md p-2"
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
        </div>
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
              disabled={ABRDetails.includes(data?.id) ? false : true}
            >
              ABR
            </option>
            <option value={"CBR"}>CBR</option>
          </select>
        </div>
      </div>
      <div className="grid gap-4 grid-cols-2 border-b border-black pb-4">
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
      </div>

      {/* Client Section */}
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
      </div>

      {/* Buyer & Service */}
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

      {/* Table */}
      <div className="pb-4 mb-4">
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
            {CBRDetails &&
              CBRDetails?.map((cbr) => {
                const { sample, target_group, cpi } = cbr.final_samples[0];
                return (
                  <tr key={cbr.final_samples[0]?.id}>
                    <td className="border p-2">
                      <input
                        type="text"
                        name="discription"
                        defaultValue={CBRDetails[0]?.final_samples?.cpi}
                        onChange={handleInputChange}
                        className="w-full bg-white border p-2"
                        placeholder="Final Cost"
                      />
                    </td>
                    <td className="border p-2">
                      <input
                        type="text"
                        name="studyName"
                        defaultValue={target_group || "TG"}
                        onChange={handleInputChange}
                        className="w-full bg-white border p-2"
                      />
                    </td>
                    <td className="border p-2">
                      <input
                        type="number"
                        name="sample"
                        defaultValue={sample}
                        onChange={handleInputChange}
                        className="w-full bg-white border p-2"
                      />
                    </td>
                    <td className="border p-2">
                      <input
                        type="text"
                        name="costComponents"
                        defaultValue={cpi}
                        onChange={handleInputChange}
                        className="w-full bg-white border p-2"
                      />
                    </td>

                    <td className="border p-2">
                      <input
                        type="text"
                        name="totalCost"
                        defaultValue={
                          CBRDetails[0]?.final_samples?.cpi || `$${(sample * cpi).toFixed(2)}`
                        }
                        onChange={handleInputChange}
                        className="w-full bg-white border p-2"
                        placeholder="Final Cost"
                      />
                    </td>
                  </tr>
                );
              })}
               <tr>
                <td className=""></td>
                <td className=""></td>
                <td className=""></td>
                <td className="border p-2">ABR Data</td>
                <td className="border p-2">{}`$${(2000).toFixed(2)}`</td>
              </tr>
              <tr>
                <td className=""></td>
                <td className=""></td>
                <td className=""></td>
                <td className="border p-2">Final Invoice</td>
                <td className="border p-2">`$${(4000).toFixed(2)}`</td>
              </tr>
          </tbody>
        </table>
      </div>

      {/* Bank Details */}
      {/* Payment Details (Changes with Company Selection) */}
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
