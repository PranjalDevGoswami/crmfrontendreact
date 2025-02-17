import React, { useState } from "react";
import LableAndInput from "../../../Molecules/LableAndInput";
import Popup from "../../../Atom/Popup";

const RaisedVpr = ({ viewRecord, vprData, setVprData, currentProject }) => {
  const [isAddOtherCost, setIsAddOtherCost] = useState(false);
  const [labelName, SetLabelName] = useState("");
  const [labelNameList, SetLabelNameList] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const handleAddLabel = (e) => {
    SetLabelName(e.target.value);
  };

  const handleSubmitLabelName = () => {
    // Trim spaces and check if the label is already present
    const newLabel = labelName.trim();

    if (!newLabel) {
      setErrorMessage("Error: Label name cannot be empty!");
      return;
    }

    if (labelNameList.includes(newLabel)) {
      setErrorMessage(`Error: Label '${newLabel}' already exists!`);
      return;
    }

    // If label is unique, add it to the list and reset inputs
    SetLabelNameList([...labelNameList, newLabel]);
    SetLabelName("");
    setErrorMessage(""); // Clear any previous errors
    setIsAddOtherCost(false);
  };
  const handleAddOtherCost = () => {
    setIsAddOtherCost(!isAddOtherCost);
  };

  const handleOtherCostChange = (index, labelName, value) => {
    setVprData((prevState) => {
      let updatedOtherCost = [...prevState.other_cost];

      // Create new object with dynamic key
      const newCostEntry = { [labelName]: value };

      // Update if entry exists, otherwise add new one
      updatedOtherCost[index] = newCostEntry;

      return {
        ...prevState,
        other_cost: updatedOtherCost,
      };
    });
  };

  return (
    <div className="p-4">
      <h3 className="text-2xl font-semibold underline pb-4">VPR Data</h3>

      {/* Grid Layout */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        <div className="text-left">
          <LableAndInput
            labelClassName={"text-left"}
            labelName="Client"
            Inputvalue={viewRecord?.clients}
            InputName="clints"
            inputChange={(e) =>
              setVprData({ ...vprData, vendor_name: e.target.value })
            }
            disabled
            inputClassName="p-2 border bg-gray-100 rounded-md cursor-not-allowed"
          />
        </div>

        <div>
          <LableAndInput
            labelClassName={"text-left"}
            labelName="Project Manager"
            Inputvalue={currentProject?.assigned_to?.name}
            InputName="project_manager"
            inputChange={(e) =>
              setVprData({ ...vprData, vendor_name: e.target.value })
            }
            disabled
            inputClassName="cursor-not-allowed p-2 border bg-gray-100 rounded-md"
          />
        </div>

        <LableAndInput
          labelClassName={"text-left"}
          labelName="Vendor Name"
          Inputvalue={vprData?.vendor_name}
          InputName="vendor_name"
          inputChange={(e) =>
            setVprData({ ...vprData, vendor_name: e.target.value })
          }
          inputClassName="p-2 border bg-white rounded-md"
        />

        <LableAndInput
          labelClassName={"text-left"}
          labelName="Invoice Amount"
          Inputvalue={vprData?.invoice_amount}
          InputName="invoice_amount"
          inputChange={(e) =>
            setVprData({ ...vprData, invoice_amount: e.target.value })
          }
          inputClassName="p-2 border bg-white rounded-md"
        />

        <LableAndInput
          labelClassName={"text-left"}
          labelName="Approved Amount"
          Inputvalue={vprData?.approved_amount}
          InputName="approved_amount"
          inputChange={(e) =>
            setVprData({ ...vprData, approved_amount: e.target.value })
          }
          inputClassName="p-2 border bg-white rounded-md"
        />

        <LableAndInput
          labelClassName={"text-left"}
          labelName="Type of Services"
          Inputvalue={vprData?.type_of_services}
          InputName="type_of_services"
          inputChange={(e) =>
            setVprData({ ...vprData, type_of_services: e.target.value })
          }
          inputClassName="p-2 border bg-white rounded-md"
        />
        {labelNameList.map((cost, index) => (
          <div key={index}>
            <LableAndInput
              labelName={cost}
              InputName={cost}
              Inputvalue={
                vprData.other_cost[index] ? vprData.other_cost[index].value : ""
              }
              inputClassName="p-2 border bg-white rounded-md"
              inputChange={(e) =>
                handleOtherCostChange(index, cost, e.target.value)
              }
            />
          </div>
        ))}

        {/* console.log("kh",index,vprData?.other_cost?.map((v)=>v[index]?.value))} */}
      </div>
      <button
        className="text-xs mt-2 p-1 text-white bg-blue-500 hover:bg-blue-600 rounded-md flex justify-start"
        onClick={handleAddOtherCost}
      >
        Add Other Cost
      </button>
      {isAddOtherCost && (
        <Popup>
          <div>
            <input
              type="text"
              value={labelName}
              onChange={handleAddLabel}
              placeholder="Enter Label Name"
              className="p-2 border bg-white rounded-md"
            />
            <button
              onClick={handleSubmitLabelName}
              className="ml-2 p-2 bg-blue-500 text-white rounded-md"
            >
              Add Label
            </button>

            {/* Display error message if label already exists */}
            {errorMessage && (
              <p className="text-red-500 mt-2">{errorMessage}</p>
            )}

            {/* Display list of added labels */}
            <ul className="flex justify-center">
              {labelNameList.map((label, index) => (
                <li
                  key={index}
                  className="p-1 border border-gray-300 bg-gray-200 rounded-md ml-1 mt-1"
                >
                  {label}
                </li>
              ))}
            </ul>
          </div>
        </Popup>
      )}
    </div>
  );
};

export default RaisedVpr;
