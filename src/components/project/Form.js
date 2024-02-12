import React, { useState } from "react";
import Label from "../Label";
import Input from "../InputField";
import Dropdown from "../DropDown";
import Button from "../Button";
import CheckboxList from "../Checkbox";
import { Link } from "react-router-dom";
import MultipleValueDropDown from "../MultipleValueDropDown";

const Form = ({ onSubmit }) => {
  const [showOtherCostDetails, setShowOtherCostDetails] = useState(false);
  const [showTranslatorCostDetails, setShowTranslatorCostDetails] = useState(false);
  const [otherCost,setOtherCost] = useState(false)
  const [translationCost,setTranslationCost] = useState(false)
  const [formData, setFormData] = useState({
    Project_id: "",
    Project_Name: "",
    Project_Type: "",
    Client: "",
    Sample: "",
    Cost_Per_Interview: "",
    Setup_fee: "",
    Operation_team: "",
    Start_Date: "",
    End_Date: "",
    Other_Cost: '',
    Translator_Cost: '',
    Other_Cost_Details: "", // Additional field for Other Cost Details
    Translator_Cost_Details: ""
  });

  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (name, checked) => {
    setFormData({ ...formData, [name]: checked });
    if (name === "Other Cost") {
      console.log("checked");

      setShowOtherCostDetails(checked);
      setOtherCost(checked)
    } else if (name === "Translator Cost") {
      setShowTranslatorCostDetails(checked);
      setTranslationCost(checked)
    }
  };


  const SelectOptionHandler = (name, value) => {
    setFormData({ ...formData, [name]: value });
    console.log("checked",value);
    if (value === "Other Cost") {

      // setShowOtherCostDetails(checked);
      setOtherCost(!otherCost)
    } else if (value === "Translator Cost") {
      // setShowTranslatorCostDetails(checked);
      setTranslationCost(!translationCost)
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      Project_id: "",
      Project_Name: "",
      Project_Type: "",
      Client: "",
      Sample: "",
      Cost_Per_Interview: "",
      Setup_fee: "",
      Operation_team: "",
      Other_Cost: false,
      Translator_Cost: false,
      Other_Cost_Details: "", // Additional field for Other Cost Details
      Translator_Cost_Details: ""
    });
  };
 

  const today = new Date();
  // Subtract one day from today's date
  const minDate = new Date(today);
  minDate.setDate(minDate.getDate() - 1);

  return (
    <div className="relative">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-full p-8 gap-4"
      >
                <Label labelName={"Project Name"} className={""} />
                <Input
                  type={"text"}
                  name={"Project_Name"}
                  className={"border p-4"}
                  onchange={handleInputChange}
                  min_lenght={"1"}
                  max_lenght={"50"}
                  required
                />
            
              <Label labelName={"Project Type"} className={""} />
              <Dropdown
                name={"Project_Type"}
                className={"p-4 outline-none cursor-pointer w-[100%]"}
                Option_Name={["-- Choose Project Type --", "A", "B"]}
                RequireAddButton={false}
                required
                onChange={SelectOptionHandler}
              />
           
                <Label labelName={"Client"} className={""} />
                <Dropdown
                  name={"Client"}
                  className={"p-4 outline-none cursor-pointer w-[100%] relative"}
                  Option_Name={["-- Choose Client --", "Client 1", "Client 2"]}
                  RequireAddButton={true}
                  required
                  onChange={SelectOptionHandler}
                />
             
                <Label labelName={"Sample"} className={""} />
                <Input
                  name={"Sample"}
                  type={"text"}
                  className={"border p-4"}
                  onchange={handleInputChange}
                  required
                />
             
              <Label labelName={"Cost Per Interview"} className={""} />
              <Input
                name={"Cost_Per_Interview"}
                type={"text"}
                className={"border p-4"}
                onchange={handleInputChange}
                required
              />
           
              <Label labelName={"Setup Fee "} className={""} />
              <Input
                name={"Setup_fee"}
                type={"text"}
                className={"border p-4"}
                onchange={handleInputChange}
                required
              />
              
            {/* <CheckboxList InputItems={['Other Cost','Translator Cost']}/> */}
                <Label labelName={"Select AM  "} className={""} />
                <Dropdown
                  name={"Client"}
                  className={"p-4 outline-none cursor-pointer w-[100%] relative"}
                  Option_Name={["-- Choose AM --", "AM 1", "AM 2"]}
                  RequireAddButton={false}
                  required
                  onChange={SelectOptionHandler}
                /> 


              <Label labelName={"Other Cost"} className={""} />
                
                <MultipleValueDropDown options={['1,2,3,4,5']}/>
              
              {/* Additional fields based on checkbox selection */}
              {otherCost && (
                <>
                  <Label labelName={"Other Cost"} className={""} />
                  <Input
                    type={"text"}
                    name={"Other_Cost"}
                    value={formData.Other_Cost}
                    className={"border p-4"}
                    onChange={handleInputChange}
                    required
                  />
                </>
              )}
              {translationCost && (
                <>
                  <Label labelName={"Translator Cost"} className={""} />
                  <Input
                    type={"text"}
                    name={"Translator_Cost"}
                    value={formData.Translator_Cost}
                    className={"border p-4"}
                    onChange={handleInputChange}
                    required
                  />
                </>
              )}

              <Label labelName={"Start Date"} className={""} />
              <Input
                name={"Start_Date"}
                type={"date"}
                placeholder={"dd/mm/yyyy"}
                className={" p-4"}
                onchange={handleInputChange}
                min={minDate.toISOString().split("T")[0]}
                required
              />
            
                <Label labelName={"End Date"} className={""} />
                <Input
                  name={"End_Date"}
                  type={"date"}
                  placeholder={"dd/mm/yyyy"}
                  className={ "p-4"}
                  onchange={handleInputChange}
                  min={minDate.toISOString().split("T")[0]}
                  required
                />
                <div className="flex justify-around">
                 <Link to={'/sales-dashboard'} className="inline-block w-1/2 mr-2"> <Button className="bg-green-500 p-4 mt-8 w-full " name={"Submit"} /></Link>
                  <Button className="bg-red-500 p-4 mt-8 w-1/2" name={"Cancel"} />
                </div>
      </form>
      {/* <div className="absolute top-2 right-2 bg-red-400 rounded-[50%] p-2 text-xl text-white cursor-pointer w-10 h-10 flex items-center justify-center" onClick={HandleCloseForm}>X</div> */}
    </div>
  );
};

export default Form;
