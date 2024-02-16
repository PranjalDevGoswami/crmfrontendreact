import React, { useState } from "react";
import Label from "../Label";
import Input from "../InputField";
import Dropdown from "../DropDown";
import Button from "../Button";
import { Link } from "react-router-dom";
import MultipleValueDropDown from "../MultipleValueDropDown";
import CheckboxList from "../Checkbox";
import MultipleFileUpload from "../MultipleFileUpload";
import { setFormData1 } from "../../store";

const Form = ({ onSubmit }) => {
  const [otherCost, setOtherCost] = useState(false);
  const [translationCost, setTranslationCost] = useState(false);
  const [isOtherFee, setIsOtherFee] = useState(false);
  const [otherFeeValue, setOtherFeeValue] = useState();
  const [advancePAyment, setAdvancePAyment] = useState(false);
  const [formData, setFormData] = useState({
    Project_id: "",
    Project_Name: "",
    Project_Type: "",
    Client: "",
    AM: "",
    Sample: "",
    Cost_Per_Interview: "",
    Setup_fee: "",
    Operation_team: "",
    Start_Date: "",
    End_Date: "",
    Other_Cost: "",
    Translator_Cost: "",
    Other_Cost_Details: "", // Additional field for Other Cost Details
    Translator_Cost_Details: "",
    Advance_payment_required: advancePAyment,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (name, checked) => {
    console.log("check", name, checked);
    setAdvancePAyment(checked);
  };

  const SelectOptionHandler = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = (e) => {
    setFormData1(formData);
    setFormData({
      Project_id: "",
      Project_Name: "",
      Project_Type: "",
      Client: "",
      AM: "",
      Sample: "",
      Cost_Per_Interview: "",
      Setup_fee: "",
      Operation_team: "",
      Start_Date: "",
      End_Date: "",
      Other_Cost: "",
      Translator_Cost: "",
      Other_Cost_Details: "", // Additional field for Other Cost Details
      Translator_Cost_Details: "",
      Advance_payment_required: advancePAyment,
    });
    console.log("formData", formData);
  };

  const OpenOtherFee = () => {
    setIsOtherFee(true);
    // console.log("other fee");
  };
  const CloseOtherFeehandler = () => {
    setIsOtherFee(false);
  };

  const today = new Date();
  // Subtract one day from today's date
  const minDate = new Date(today);
  minDate.setDate(minDate.getDate() - 1);

  const MultipleValueSection = (selectedOptions) => {
    const selectedValues = selectedOptions.map((option) => option.value);
    setOtherFeeValue(selectedValues);
    console.log("other", otherFeeValue);

    // Check if 'Other Cost' is selected
    if (selectedValues.includes("Other Cost")) {
      setOtherCost(true);
    } else {
      setOtherCost(false);
    }

    // Check if 'Translation Cost' is selected
    if (selectedValues.includes("Translation Cost")) {
      setTranslationCost(true);
    } else {
      setTranslationCost(false);
    }
  };

  const isFormValid = () => {
    return (
      formData.Project_Name !== "" &&
      formData.Project_Type !== "" &&
      formData.Client !== "" &&
      formData.Sample !== "" &&
      formData.Cost_Per_Interview !== "" &&
      formData.Setup_fee !== "" &&
      formData.Start_Date !== "" &&
      formData.End_Date !== ""
    );
  };

  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="p-2 pl-8">
        <div className="flex flex-wrap w-full gap-4">
        <div className="flex flex-col w-[32%]">
          <Label labelName={"Project Name"} className={"pt-4 pb-2"} required />
          <Input
            type={"text"}
            name={"Project_Name"}
            className={"border p-2 bg-[#f3eded]"}
            onchange={handleInputChange}
            min_lenght={"1"}
            max_lenght={"50"}
            required
          />
        </div>
        <div className="flex flex-col w-[32%]">
          <Label labelName={"Project Type"} className={"pt-4 pb-2"} required />
          <Dropdown
            name={"Project_Type"}
            className={
              "p-2 outline-none cursor-pointer w-[100%] bg-[#f3eded] border"
            }
            Option_Name={["-- Select Project Type --", "A", "B"]}
            RequireAddButton={false}
            required
            onChange={SelectOptionHandler}
          />
        </div>
        <div className="flex flex-col w-[32%]">
          <Label labelName={"Client"} className={"pt-4 pb-2"} />
          <Dropdown
            name={"Client"}
            className={
              "p-2 outline-none cursor-pointer w-[100%] relative bg-[#f3eded] border"
            }
            Option_Name={["-- Select Client --", "Client 1", "Client 2"]}
            RequireAddButton={true}
            required
            onChange={SelectOptionHandler}
          />
        </div>
        <div className="flex flex-col w-[32%]">
          <Label labelName={"Sample"} className={"pt-4 pb-2"} />
          <Input
            name={"Sample"}
            type={"number"}
            className={"border p-2 bg-[#f3eded]"}
            onchange={handleInputChange}
            required
          />
        </div>
        <div className="flex flex-col w-[32%]">
          <Label labelName={"Cost Per Interview"} className={"pt-4 pb-2"} />
          <Input
            name={"Cost_Per_Interview"}
            type={"number"}
            className={"border p-2 bg-[#f3eded]"}
            onchange={handleInputChange}
            required
          />
        </div>
        <div className="flex flex-col w-[32%] relative">
          {/* <div className="flex"> */}
          <Label labelName={"Setup Fee "} className={"pt-4 pb-2"} />
          <Input
            name={"Setup_fee"}
            type={"number"}
            className={"border p-2 bg-[#f3eded] w-full"}
            onchange={handleInputChange}
            required
          />
          <Button
            className={
              "bg-green-300 p-1 absolute right-0 top-[4.7rem] translate-y-[50%] text-sm"
            }
            name={"Other Fee"}
            onClick={OpenOtherFee}
          />
        </div>
        {/* <div className="flex flex-col w-[32%] relative"> */}
        {isOtherFee ? (
          <div className="w-1/2 h-2/3 bg-white border rounded-md shadow-md z-50 absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%">
            <div className="bg-white w-full h-full flex items-center justify-center relative">
              <div className="flex flex-col w-2/3 relative">
                <Label
                  labelName={"Other Cost"}
                  className={"pt-4 pb-2"}
                />

                <MultipleValueDropDown
                  onChange={MultipleValueSection}
                  className={"w-full bg-[#f3eded]"}
                />
              </div>
              <Button
                name={"X"}
                className={
                  "bg-red-400 p-2 w-8 h-8 rounded-full absolute top-4 right-8 flex items-center justify-center text-white"
                }
                onClick={CloseOtherFeehandler}
              />
            </div>
          </div>
        ) : (
          ""
        )}
        {/* Additional fields based on checkbox selection */}
        {otherCost ? (
          <div className="flex flex-col w-[32%]">
            <Label labelName={"Other Cost"} className={"pt-4 pb-2"} />
            <Input
              type={"number"}
              name={"Other_Cost"}
              // value={formData.Other_Cost}
              className={"border p-2 bg-[#f3eded]"}
              onChange={handleInputChange}
              required
            />
          </div>
        ) : (
          ""
        )}
        {translationCost && (
          <div className="flex flex-col w-[32%]">
            <Label labelName={"Translator Cost"} className={"pt-4 pb-2"} />
            <Input
              type={"number"}
              name={"Translator_Cost"}
              // value={formData.Translator_Cost}
              className={"border p-2 bg-[#f3eded]"}
              onChange={handleInputChange}
              required
            />
          </div>
        )}
        {/* </div> */}
        <div className="flex flex-col w-[32%]">
          <Label labelName={"Select AM  "} className={"pt-4 pb-2"} />
          <Dropdown
            name={"AM"}
            className={
              "p-2 outline-none cursor-pointer w-[100%] relative bg-[#f3eded] border"
            }
            Option_Name={["-- Select AM --", "AM 1", "AM 2"]}
            RequireAddButton={false}
            required
            onChange={SelectOptionHandler}
          />
        </div>
        <div className="flex flex-col w-[32%]">
          <Label labelName={"Start Date"} className={"pt-4 pb-2"} />
          <Input
            name={"Start_Date"}
            type={"date"}
            placeholder={"dd/mm/yyyy"}
            className={" p-2 border bg-[#f3eded]"}
            onchange={handleInputChange}
            min={minDate.toISOString().split("T")[0]}
            required
          />
        </div>
        <div className="flex flex-col w-[32%]">
          <Label labelName={"End Date"} className={"pt-4 pb-2"} />
          <Input
            name={"End_Date"}
            type={"date"}
            placeholder={"dd/mm/yyyy"}
            className={"p-2 border bg-[#f3eded]"}
            onchange={handleInputChange}
            min={minDate.toISOString().split("T")[0]}
            required
          />
        </div>
        <div className="flex flex-col w-[32%]">
          <Label labelName={"SOW File"} className={"pt-4 pb-2"} />
          <MultipleFileUpload className={'p-1 border bg-[#f3eded] w-full'}/>
        </div>
        
        </div>
        <div className="flex flex-col w-[32%] pt-8 pb-2">
          <CheckboxList
            InputItems={["Advanced Payment Required"]}
            onCheckboxChange={handleCheckboxChange}
          />
        </div>
        {/* <div className="flex flex-col w-[32%]"> */}
          <div className="flex justify-around pt-4 pb-2">
            <Link
              to={isFormValid() ? "/sales-dashboard" : ""}
              className="inline-block w-1/2 mr-2"
            >
              <Button
                className={`bg-green-500 p-4 mt-8 w-full text-white font-bold ${
                  isFormValid() ? "" : "opacity-50 cursor-not-allowed"
                }`}
                name={"Submit"}
                onClick={() => handleSubmit(formData)}
              />
            </Link>
            <Button className="bg-red-500 p-4 mt-8 w-1/2 text-white font-bold" name={"Cancel"} />
          </div>
        {/* </div> */}
      </form>
    </div>
  );
};

export default Form;
