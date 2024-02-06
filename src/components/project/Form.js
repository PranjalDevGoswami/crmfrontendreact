import React, { useState } from "react";
import Label from "../Label";
import Input from "../InputField";
import Dropdown from "../DropDown";
import Button from "../Button";

const Form = ({onSubmit}) => {
  const [formData, setFormData] = useState({
    Project_id: "",
    Project_Name: "",
    Project_Type: "",
    Client: "",
    Sample: "",
    Cost_Per_Interview: "",
    Setup_fee: "",
    Operation_team: "",
    Start_Date:'',
    End_Date:''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const SelectOptionHandler = (name, value) => {
    console.log("[name]: value ",value);
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData)
    console.log("Form data:", formData);
    setFormData({ Project_id: "",
    Project_Name: "",
    Project_Type: "",
    Client: "",
    Sample: "",
    Cost_Per_Interview: "",
    Setup_fee: "",
    Operation_team: "", });
  };

  return (
    <div >
      <form onSubmit={handleSubmit} className="flex flex-col w-full bg-gray-300 shadow-md p-8 border gap-4">
        {/* <Label labelName={"Project ID"} />
        <Input
          name={"Project_id"}
          type={"number"}
          className={"border p-4"}
          onchange={handleInputChange} disabled
        /> */}
        <Label labelName={"Project Name"} />
        <Input
          type={"text"}
          name={"Project_Name"}
          className={"border p-4"}
          onchange={handleInputChange}
          min_lenght={"1"}
          max_lenght={"50"}
        />
        <Label labelName={"Project Type"} />
        <Dropdown
          name={"Project_Type"}
          className={"p-4 outline-none cursor-pointer w-full"}
          Option_Name={["-- Choose Project Type --", "A", "B"]}
          RequireAddButton={false}
          onChange={SelectOptionHandler}
        />
        <Label labelName={"Client"} />
        <Dropdown
          name={"Client"}
          className={"p-4 outline-none cursor-pointer w-full relative"}
          Option_Name={["-- Choose Client --", "Client 1", "Client 2"]}
          RequireAddButton={true}
          onChange={SelectOptionHandler}
        />
        <Label labelName={"Sample"} />
        <Input
          name={"Sample"}
          type={"text"}
          className={"border p-4"}
          onchange={handleInputChange}
        />
        <Label labelName={"Cost Per Interview"} />
        <Input
          name={"Cost_Per_Interview"}
          type={"text"}
          className={"border p-4"}
          onchange={handleInputChange}
        />
        <Label labelName={"Setup Fee "} />
        <Input
          name={"Setup_fee"}
          type={"text"}
          className={"border p-4"}
          onchange={handleInputChange}
        />
        <Label labelName={"Other Cost "} />
        <Input
          name={"Other_cost"}
          type={"text"}
          className={"border p-4"}
          onchange={handleInputChange}
        />
        <Label labelName={"Operation Team  "} />
        <Input
          name={"Operation_team"}
          type={"text"}
          className={"border p-4"}
          onchange={handleInputChange}
        />
        <div className="flex flex-col justify-between w-full gap-4">
        <Label labelName={"Start Date"} />
        <Input
        name={'Start_Date'}
          type={"date"}
          placeholder={"dd/mm/yyyy"}
          className={"w-full p-4"}
          onchange={handleInputChange}
        />
      </div>
      <div className="flex flex-col justify-between w-full gap-4">
        <Label labelName={"End Date"} />
        <Input
        name={'End_Date'}
          type={"date"}
          placeholder={"dd/mm/yyyy"}
          className={"w-full p-4"}
          onchange={handleInputChange}
        />
      </div>
        <Button className="bg-green-500 p-4 mt-2" name={"Submit"} />
      </form>
    </div>
  );
};

export default Form;
