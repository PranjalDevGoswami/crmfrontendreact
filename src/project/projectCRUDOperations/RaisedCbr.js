import React, { useContext, useEffect, useState } from "react";
import LableAndInput from "../../Molecules/LableAndInput";
import Dropdown from "../../components/DropDown";
import Label from "../../Atom/Label";
import { DataTableContext } from "../../ContextApi/DataTableContext";
import { useSelector } from "react-redux";
import Popup from "../../Atom/Popup";
import { RaiseCBRPostApi } from "../../fetchApis/projects/raiseCBR/RaiseCbr";
import SweetAlert from "../../components/SweetAlert";
import RaisedVpr from "./projectMultipleSampleTable/RaisedVpr";
import { ClientList } from "../../fetchApis/clientList/ClientList";

const RaisedCbr = ({ viewRecord }) => {
  const { projects } = useSelector((store) => store.projectData);
  const { setShowRaiseCbr } = useContext(DataTableContext);

  const [samplePopupOpen, setSamplePopupOpen] = useState(false);
  const [toggleVpr, setToggleVpr] = useState(false);
  const [sampleData, setSampleData] = useState({
    project: viewRecord?.id,
    project_code: viewRecord?.project_code,
    project_name: viewRecord?.name,
    status: "CBR Raised",
    samples: [],
    remarks: "",
    client: "",
    client_contact_person: "",
    client_email_address: "",
    client_purchase_order_no: "",
    number_of_surveys_initial_sow: "",
    number_of_additional_surveys: "",
    total_surveys_to_be_billed: "",
    other_billing_instructions: "",
    sales_owner: "",
    project_manager_name: "",
  });
  const [vprData, setVprData] = useState({
    project: viewRecord?.id,
    status: "pending",
    name_of_client: "",
    project_code: viewRecord?.project_code,
    project_name: viewRecord?.name,
    vendor_name: "",
    type_of_services: "",
    invoice_amount: null,
    approved_amount: null,
    name_of_project_manager: "",
  });
  const [clientListData, setClientListData] = useState([]);

  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        const ClientData = await ClientList();
        setClientListData(ClientData?.data);
      } catch (error) {
        console.error("Error fetching client data:", error);
      }
    };
    fetchDataFromApi();
  }, []);

  const currentProject =
    projects.find((item) => item.id === viewRecord?.id) || {};
  const projectSamples = currentProject.project_samples || [];

  const handleCancelUpdate = () => {
    setShowRaiseCbr(false);
    document.body.classList.remove("DrawerBody");
  };

  const handleSubmitData = async () => {
    console.log(sampleData);
    const response = await RaiseCBRPostApi(viewRecord?.id, sampleData);
    if (response) {
      SweetAlert({
        title: "success",
        text: response?.data?.message,
        icon: "success",
      });
      setShowRaiseCbr(false);
    } else {
      SweetAlert({
        title: "error",
        text: response?.data?.message,
        icon: "error",
      });
    }
  };

  const handleSampleClick = () => {
    setSampleData({
      ...sampleData,
      samples: projectSamples.map(({ id, sample, cpi, target_group }) => ({
        id,
        sample,
        cpi,
        target_group,
      })),
    });
    setSamplePopupOpen(true);
  };

  const handleSampleChange = (index, field, value) => {
    const updatedSamples = [...sampleData.samples];
    updatedSamples[index][field] = value;
    setSampleData({ ...sampleData, samples: updatedSamples });
  };

  const handlePopupSubmit = () => {
    setSamplePopupOpen(false);
  };
  const handlePopupCancel = () => {
    setSamplePopupOpen(false);
  };
  return (
    <div>
      <h3 className="text-xl underline pb-2">CBR Data</h3>
      <div className="flex items-center flex-wrap justify-start w-full rounded-sm">
        <div className="ProjectOperationEdit">
          <LableAndInput
            labelName={"Project Code"}
            Inputvalue={viewRecord?.project_code.toUpperCase()}
            desabled={true}
            inputClassName={
              "cursor-not-allowed p-2 border bg-[#f3eded] rounded-md"
            }
            labelClassName={"pt-4 pb-2 text-left"}
          />
        </div>

        <div className="ProjectOperationEdit">
          <LableAndInput
            labelName={"Project Name"}
            Inputvalue={viewRecord?.name}
            desabled={true}
            inputClassName={
              "cursor-not-allowed p-2 border bg-[#f3eded] rounded-md"
            }
            labelClassName={"pt-4 pb-2 text-left"}
          />
        </div>

        <div className="ProjectOperationEdit mt-4 text-left">
          <Label labelName={"Status"} className={"pb-2 mt-4"} />
          <Dropdown
            Option_Name={["CBR Raised", "In Progress", "On Hold", "Completed"]}
            onChange={(name, value) =>
              setSampleData({ ...sampleData, status: value })
            }
            className={"p-2 mt-2 border w-full bg-[#f3eded] rounded-md"}
            name={"status"}
            id={"status update"}
          />
        </div>

        <div className="ProjectOperationEdit mt-4 text-left">
          <Label labelName={"Samples"} className={"pb-2 mt-4"} />
          <div
            className="p-2 border mt-2 cursor-pointer bg-[#f3eded] rounded-md"
            onClick={handleSampleClick}
          >
            {sampleData.samples.length > 0
              ? sampleData.samples
                  .map(
                    (s) => ` ${s.sample} (CPI: ${s.cpi}, TG: ${s.target_group})`
                  )
                  .join(", ")
              : "Click to add samples"}
          </div>
        </div>
        {/**
        new fields
        
        ** */}
        <div className="ProjectOperationEdit mt-4 text-left rounded-md">
          <Label labelName={"Client"} className={"pb-2 mt-4"} />
          <Dropdown
            Option_Name={[
              "--Select Client--",
              ...clientListData?.map((item) => item?.name),
            ]}
            onChange={(name, value) =>
              setVprData({ ...vprData, name_of_client: value })
            }
            className={"p-2 mt-2 border w-full bg-[#f3eded] rounded-md"}
            name={"name_of_client"}
            id={"client update"}
          />
        </div>
        <div className="ProjectOperationEdit mt-4 text-left rounded-md">
          <LableAndInput
            labelName={"Remarks"}
            Inputvalue={sampleData.remarks}
            InputName="remarks"
            inputChange={(e) =>
              setSampleData({ ...sampleData, remarks: e.target.value })
            }
            inputClassName={"p-2 border bg-[#f3eded] rounded-md"}
          />
        </div>

        <div className="ProjectOperationEdit mt-4 text-left rounded-md flex">
          <label className="ml-4">Raised VPR</label>
          <input
            type={"checkbox"}
            InputName="toggleCheckBox"
            onChange={(e) => setToggleVpr(!toggleVpr)}
            className={"p-2 border bg-[#f3eded] rounded-md mr-2"}
          />
        </div>
      </div>
      {toggleVpr && (
        <RaisedVpr
          viewRecord={viewRecord}
          vprData={vprData}
          setVprData={setVprData}
        />
      )}
      <div className="flex justify-center pt-10">
        <button
          onClick={handleSubmitData}
          className={
            "bg-green-300 p-4 m-2 flex items-center justify-center w-2/12 rounded text-white hover:bg-green-500"
          }
        >
          Submit
        </button>
        <button
          onClick={handleCancelUpdate}
          className={
            "bg-red-300 p-4 m-2 flex items-center justify-center w-2/12 rounded text-white hover:bg-red-500"
          }
        >
          Cancel
        </button>
      </div>

      {/* Sample Popup */}
      {samplePopupOpen && (
        <Popup>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full bg-gray-900 bg-opacity-50">
            <div className="bg-white p-6 rounded-md  border shadow-md w-full">
              <h3 className="text-lg font-bold mb-4">Add Sample Details</h3>
              {sampleData.samples.map((sample, index) => (
                <div
                  key={sample.id}
                  className="mb-3 flex items-start space-x-4"
                >
                  <LableAndInput
                    labelName={`Sample ID: ${sample.id}`}
                    Inputvalue={sample.sample}
                    inputChange={(e) =>
                      handleSampleChange(index, "sample", e.target.value)
                    }
                    inputClassName={"p-2 border w-full rounded-md"}
                  />
                  <LableAndInput
                    labelName={"CPI"}
                    Inputvalue={sample.cpi}
                    inputChange={(e) =>
                      handleSampleChange(index, "cpi", e.target.value)
                    }
                    inputClassName={"p-2 border w-full rounded-md"}
                  />
                  <LableAndInput
                    labelName={"Target Group"}
                    Inputvalue={sample.target_group}
                    inputChange={(e) =>
                      handleSampleChange(index, "target_group", e.target.value)
                    }
                    inputClassName={"p-2 border w-full rounded-md"}
                  />
                </div>
              ))}

              <button
                onClick={handlePopupSubmit}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Submit
              </button>
              <button
                onClick={handlePopupCancel}
                className="px-4 py-2 ml-4 bg-red-500 text-white rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </Popup>
      )}
    </div>
  );
};

export default RaisedCbr;
