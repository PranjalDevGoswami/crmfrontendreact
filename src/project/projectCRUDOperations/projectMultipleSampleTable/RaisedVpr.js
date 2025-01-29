import React, {useEffect, useState } from "react";
import { ClientList } from "../../../fetchApis/clientList/ClientList";
import Label from "../../../Atom/Label";
import LableAndInput from "../../../Molecules/LableAndInput";
import Dropdown from "../../../components/DropDown";
import ProjectManager from "../../../components/Form/ProjectManager";

const RaisedVpr = ({viewRecord ,vprData, setVprData}) => {  
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

  return (
    <div>
      <h3 className="text-xl underline pb-2">VPR Data</h3>
      <div className="flex items-center flex-wrap justify-start w-full rounded-sm">
        {/* <div className="ProjectOperationEdit">
          <LableAndInput
            labelName={"Project Code"}
            Inputvalue={viewRecord?.project_code?.toUpperCase()}
            desabled={true}
            inputClassName={"cursor-not-allowed p-2 border bg-[#f3eded] rounded-md"}
            labelClassName={"pt-4 pb-2 text-left"}
          />
        </div>

        <div className="ProjectOperationEdit">
          <LableAndInput
            labelName={"Project Name"}
            Inputvalue={viewRecord?.project_name}
            desabled={true}
            inputClassName={"cursor-not-allowed p-2 border bg-[#f3eded] rounded-md"}
            labelClassName={"pt-4 pb-2 text-left"}
          />
        </div> */}

        <div className="ProjectOperationEdit mt-4 text-left">
          <Label labelName={"Client"} className={"pb-2 mt-4"} />
          <Dropdown
            Option_Name={["--Select Client--", ...clientListData?.map((item) => item?.name)]}
            onChange={(name, value) =>
              setVprData({ ...vprData, name_of_client: value })
            }
            className={"p-2 mt-2 border w-full bg-[#f3eded] rounded-md"}
            name={"name_of_client"}
            id={"client update"}
          />
        </div>

        <div className="ProjectOperationEdit mt-4 text-left">
          <ProjectManager />
        </div>

        <div className="ProjectOperationEdit mt-4 text-left rounded-md">
          <LableAndInput
            labelName={"Vendor Name"}
            Inputvalue={vprData?.vendor_name}
            InputName="vendor_name"
            inputChange={(e) =>
              setVprData({ ...vprData, vendor_name: e.target.value })
            }
            inputClassName={"p-2 border bg-[#f3eded] rounded-md"}
          />
        </div>

        <div className="ProjectOperationEdit mt-4 text-left rounded-md">
          <LableAndInput
            labelName={"Invoice Amount"}
            Inputvalue={vprData?.invoice_amount}
            InputName="invoice_amount"
            inputChange={(e) =>
              setVprData({ ...vprData, invoice_amount: e.target.value })
            }
            inputClassName={"p-2 border bg-[#f3eded] rounded-md"}
          />
        </div>

        <div className="ProjectOperationEdit mt-4 text-left rounded-md">
          <LableAndInput
            labelName={"Approved Amount"}
            Inputvalue={vprData?.approved_amount}
            InputName="approved_amount"
            inputChange={(e) =>
              setVprData({ ...vprData, approved_amount: e.target.value })
            }
            inputClassName={"p-2 border bg-[#f3eded] rounded-md"}
          />
        </div>

        <div className="ProjectOperationEdit mt-4 text-left rounded-md">
          <LableAndInput
            labelName={"Type of Services"}
            Inputvalue={vprData?.type_of_services}
            InputName="type_of_services"
            inputChange={(e) =>
              setVprData({ ...vprData, type_of_services: e.target.value })
            }
            inputClassName={"p-2 border bg-[#f3eded] rounded-md"}
          />
        </div>
      </div>
    </div>
  );
};

export default RaisedVpr;
