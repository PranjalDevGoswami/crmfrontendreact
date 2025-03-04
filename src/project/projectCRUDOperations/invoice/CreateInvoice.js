import React, { useContext, useEffect, useState } from "react";
import { getWithAuth, postWithAuth } from "../../../provider/helper/axios";
import {
  ADVANCEBILLING,
  FINANCEPROJECT,
  GENERATEINVOICE,
  GETALLCOMPANYNAME,
  GETCBR,
  GETCOMPANYDETAILS,
} from "../../../../utils/constants/urls";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { FilterContext } from "../../../ContextApi/FilterContext";
import SweetAlert from "../../../components/SweetAlert";
import InvoiceCompanyLogo from "./InvoiceCompanyLogo";
import InvoiceCompanyName from "./InvoiceCompanyName";
import InvoiceType from "./InvoiceType";
import InvoiceCompanyAddressAndEmail from "./InvoiceCompanyAddressAndEmail";
import InvoiceDateAndDueDate from "./InvoiceDateAndDueDate";
import InvoiceClientDetails from "./InvoiceClientDetails";
import InvoiceBuyerDetails from "./InvoiceBuyerDetails";
import InvoiceBankDetails from "./InvoiceBankDetails";
import InvoiceSampleAndCostDetails from "./InvoiceSampleAndCostDetails";
import { addFinanceProject } from "../../../../utils/slices/ProjectSlice";
import { useDispatch } from "react-redux";
import { cbrProjectData } from "../../../../utils/apis/cbrProjectData";
import { addFilterProjectData } from "../../../../utils/slices/FilterProjectDataSlice";

const CreateInvoice = () => {
  const { financeProjectData, clientsList, setFinanceProjectData,setFilteredProjectData } =
    useContext(FilterContext);
  const location = useLocation();
  const { state: data } = location;
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const currentProject = financeProjectData.filter(
    (item) => item?.project?.id === data?.project?.id
  );
  const currentClient = clientsList.filter(
    (cName) => cName.name.toLowerCase() === data?.clients.toLowerCase()
  );
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [companyName, setCompanyName] = useState([]);
  const [selectedCompanyDetails, setSelectedCompanyDetails] = useState(null);
  const [ABRDetails, setABRDetails] = useState([]);
  const [CBRDetails, setCBRDetails] = useState([]);
  const [financeProject, setFinanceProject] = useState();

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
    clientAddress: currentClient[0]?.address,
    clientEmail: currentClient[0]?.email,
    clientName: currentClient[0]?.name,
    clientPhone: currentClient[0]?.phone_number,
    cbr: CBRDetails?.id,
    cost_components: "",
    description: "",
    cpi: 0, // Keep numbers as 0
    date: "",
    dueDate: "",
    sample: 0, // Keep numbers as 0
    services: data?.project_type,
    studyName: "",
    totalCost: CBRDetails?.reduce((total, cbr) => {
      return (
        total +
        cbr?.final_samples?.reduce((sum, item) => {
          return sum + Number(item.sample) * Number(item.cpi);
        }, 0)
      );
    }, 0).toFixed(2),
    final_payment: (
      CBRDetails?.reduce((total, cbr) => {
        return (
          total +
          cbr?.final_samples?.reduce((sum, item) => {
            return sum + Number(item.sample) * Number(item.cpi);
          }, 0)
        );
      }, 0) - (ABRDetails[0]?.advance_invoice_amount || 0)
    ).toFixed(2),
  });

  const [invoiceFinalData, setInvoiceFinalData] = useState({
    advance_paid: ABRDetails[0]?.advance_invoice_amount || 0,
    buyer_name: invoiceData?.buyer,
    cbr: CBRDetails[0]?.id,
    cost_components: [],
    description: "",
    due_date: invoiceData?.dueDate,
    entity: selectedCompany?.id,
    final_payment: invoiceData?.final_payment,
    issue_date: invoiceData?.date,
    po_number: CBRDetails[0]?.po_number,
    project: data?.project?.id,
    services: invoiceData?.services,
    total_cost_usd: invoiceData?.totalCost,
    type: invoiceData?.advanceType,
  });
  useEffect(() => {
    setInvoiceFinalData((prev) => ({
      ...prev,
      entity: selectedCompany?.id,
      buyer_name: invoiceData?.buyer,
      due_date: invoiceData?.dueDate,
      final_payment: invoiceData?.final_payment,
      issue_date: invoiceData?.date,
      services: invoiceData?.services,
      total_cost_usd: invoiceData?.totalCost,
      type: invoiceData?.advanceType,
      cost_components: invoiceData?.cost_components,
      description: invoiceData?.description,
    }));
  }, [
    invoiceData?.buyer,
    invoiceData?.dueDate,
    invoiceData?.final_payment,
    invoiceData?.date,
    invoiceData?.services,
    invoiceData?.totalCost,
    invoiceData?.advanceType,
    invoiceData?.cost_components,
    invoiceData?.description,
  ]);
  useEffect(() => {
    setInvoiceFinalData((prev) => ({
      ...prev,
      cbr: CBRDetails[0]?.id,
      po_number: CBRDetails[0]?.po_number,
    }));
  }, [CBRDetails]);
  const getFinaceProject = async () => {
    const response = await getWithAuth(FINANCEPROJECT);
    setFinanceProject(response?.data);
  };
  useEffect(() => {
    getFinaceProject;
  }, []);

  useEffect(() => {
    if (financeProject) {
      setFinanceProjectData(financeProject);
      setFilteredProjectData(financeProject);
    }
  }, [financeProject]);

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
  }, [selectedCompanyDetails]);

  useEffect(() => {
    setInvoiceData((prev) => ({
      ...prev,
      totalCost: `${(prev.sample * prev.cpi).toFixed(2)}`,
    }));
  }, [invoiceData.sample, invoiceData.cpi]);

  const getCOmpanyDropdownDetails = async () => {
    const companyName = await getWithAuth(GETALLCOMPANYNAME);
    setCompanyName(companyName?.data?.data);
  };

  useEffect(() => {
    getCOmpanyDropdownDetails();
  }, []);

  const getCompany = async (id) => {
    const response = await getWithAuth(GETCOMPANYDETAILS(id));
    const abrResponse = await getWithAuth(ADVANCEBILLING);
    const currentProjectWithABR = abrResponse?.data?.filter(
      (item) => item?.project === data?.project?.id
    );
    setABRDetails(currentProjectWithABR);
    setSelectedCompanyDetails(response?.data?.data);
    if (financeProjectData) {
      const cbrResponse = await getWithAuth(GETCBR(data?.project?.id));
      setCBRDetails(cbrResponse?.data);
    }
  };
  useEffect(() => {
    const id = selectedCompany?.id;
    if (id) {
      getCompany(id);
    }
    getCOmpanyDropdownDetails();
  }, [selectedCompany]);

  const handleGenerateInvoice = async () => {
    console.log(invoiceFinalData);
    const response = await postWithAuth(GENERATEINVOICE, invoiceFinalData);
    if (response.status == true) {
      SweetAlert({
        title: "success",
        text: "Invoice Created Successfully",
        icon: "success",
      });
      navigate(-1);
      getFinaceProject()
      const response = await cbrProjectData();
        dispatch(addFinanceProject(response));
        dispatch(addFilterProjectData(response))
    }
  };

  return (
    <div className="w-8/12 mx-auto bg-white shadow-lg rounded-lg p-6">
      <InvoiceCompanyLogo selectedCompanyDetails={selectedCompanyDetails} />
      {/* Header Section */}
      <div className="grid grid-cols-2 gap-4 my-4">
        <InvoiceCompanyName
          setSelectedCompany={setSelectedCompany}
          companyName={companyName}
        />
        <InvoiceType
          setInvoiceData={setInvoiceData}
          ABRDetails={ABRDetails}
          data={data}
        />
      </div>
      <div className="grid gap-4 grid-cols-2 border-b border-black pb-4">
        <InvoiceCompanyAddressAndEmail
          selectedCompanyDetails={selectedCompanyDetails}
          invoiceData={invoiceData}
          setInvoiceData={setInvoiceData}
        />
        <InvoiceDateAndDueDate
          invoiceData={invoiceData}
          setInvoiceData={setInvoiceData}
        />
      </div>

      {/* Client Section */}
      <InvoiceClientDetails
        invoiceData={invoiceData}
        setInvoiceData={setInvoiceData}
      />

      {/* Buyer & Service */}
      <InvoiceBuyerDetails
        invoiceData={invoiceData}
        setInvoiceData={setInvoiceData}
      />

      {/* Table */}
      <InvoiceSampleAndCostDetails
        CBRDetails={CBRDetails}
        setInvoiceData={setInvoiceData}
        invoiceData={invoiceData}
        ABRDetails={ABRDetails}
        setInvoiceFinalData={setInvoiceFinalData}
      />

      {/* Bank Details */}
      <InvoiceBankDetails selectedCompanyDetails={selectedCompanyDetails} />
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
