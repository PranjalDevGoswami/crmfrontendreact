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
  const handleSubmit =  (e) => {
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
      <form onSubmit={handleSubmit} className="flex flex-col w-full p-8 gap-4">
        <Label labelName={"Project Name"} className={""} required />
        <Input
          type={"text"}
          name={"Project_Name"}
          className={"border p-2"}
          onchange={handleInputChange}
          min_lenght={"1"}
          max_lenght={"50"}
          required
        />

        <Label labelName={"Project Type"} className={""} required />
        <Dropdown
          name={"Project_Type"}
          className={
            "p-2 outline-none cursor-pointer w-[100%] bg-transparent border"
          }
          Option_Name={["-- Choose Project Type --", "A", "B"]}
          RequireAddButton={false}
          required
          onChange={SelectOptionHandler}
        />

        <Label labelName={"Client"} className={""} />
        <Dropdown
          name={"Client"}
          className={
            "p-2 outline-none cursor-pointer w-[100%] relative bg-transparent border"
          }
          Option_Name={["-- Choose Client --", "Client 1", "Client 2"]}
          RequireAddButton={true}
          required
          onChange={SelectOptionHandler}
        />

        <Label labelName={"Sample"} className={""} />
        <Input
          name={"Sample"}
          type={"number"}
          className={"border p-2"}
          onchange={handleInputChange}
          required
        />

        <Label labelName={"Cost Per Interview"} className={""} />
        <Input
          name={"Cost_Per_Interview"}
          type={"text"}
          className={"border p-2"}
          onchange={handleInputChange}
          required
        />

        <div className="relative">
          <Label labelName={"Setup Fee "} className={""} />
          <Input
            name={"Setup_fee"}
            type={"text"}
            className={"border p-2 w-full"}
            onchange={handleInputChange}
            required
          />
          <Button
            className={
              "bg-green-300 p-2 absolute right-0 top-[5.1rem] translate-y-[-0%] text-sm"
            }
            name={"Add Other Fee"}
            onClick={OpenOtherFee}
          />
        </div>
        {isOtherFee ? (
          <div className="w-1/2 h-1/3 bg-white border rounded-md shadow-md z-50 absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%">
            <div className="bg-white w-full h-full flex items-center justify-center relative">
              <Label labelName={"Other Cost"} className={"p-2"} />

              <MultipleValueDropDown
                onChange={MultipleValueSection}
                className={"w-full"}
              />
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
          <>
            <Label labelName={"Other Cost"} className={""} />
            <Input
              type={"text"}
              name={"Other_Cost"}
              // value={formData.Other_Cost}
              className={"border p-2"}
              onChange={handleInputChange}
              required
            />
          </>
        ) : (
          ""
        )}
        {translationCost && (
          <>
            <Label labelName={"Translator Cost"} className={""} />
            <Input
              type={"text"}
              name={"Translator_Cost"}
              // value={formData.Translator_Cost}
              className={"border p-2"}
              onChange={handleInputChange}
              required
            />
          </>
        )}
        <Label labelName={"Select AM  "} className={""} />
        <Dropdown
          name={"AM"}
          className={
            "p-2 outline-none cursor-pointer w-[100%] relative bg-transparent border"
          }
          Option_Name={["-- Choose AM --", "AM 1", "AM 2"]}
          RequireAddButton={false}
          required
          onChange={SelectOptionHandler}
        />

        <Label labelName={"Start Date"} className={""} />
        <Input
          name={"Start_Date"}
          type={"date"}
          placeholder={"dd/mm/yyyy"}
          className={" p-2 border"}
          onchange={handleInputChange}
          min={minDate.toISOString().split("T")[0]}
          required
        />

        <Label labelName={"End Date"} className={""} />
        <Input
          name={"End_Date"}
          type={"date"}
          placeholder={"dd/mm/yyyy"}
          className={"p-2 border"}
          onchange={handleInputChange}
          min={minDate.toISOString().split("T")[0]}
          required
        />
        <CheckboxList
          InputItems={["Advanced Payment Required"]}
          onCheckboxChange={handleCheckboxChange}
        />
        <Label labelName={"SOW File"} className={"pt-4"} />
        <MultipleFileUpload />
        <div className="flex justify-around">
          <Link
            to={isFormValid() ? "/sales-dashboard" : ""}
            className="inline-block w-1/2 mr-2"
          >
            <Button
              className={`bg-green-500 p-4 mt-8 w-full ${
                isFormValid() ? "" : "opacity-50 cursor-not-allowed"
              }`}
              name={"Submit"}
              onClick={() => handleSubmit(formData)}
            />
          </Link>
          <Button className="bg-red-500 p-4 mt-8 w-1/2" name={"Cancel"} />
        </div>
      </form>
    </div>
  );
};

export default Form;
