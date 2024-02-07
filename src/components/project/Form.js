import React, { useState } from "react";
import Label from "../Label";
import Input from "../InputField";
import Dropdown from "../DropDown";
import Button from "../Button";

const Form = ({onSubmit,HandleCloseForm}) => {
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
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData)
    setFormData({ Project_id: "",
    Project_Name: "",
    Project_Type: "",
    Client: "",
    Sample: "",
    Cost_Per_Interview: "",
    Setup_fee: "",
    Operation_team: "", });
  };

  const today = new Date();
  // Subtract one day from today's date
  const minDate = new Date(today);
  minDate.setDate(minDate.getDate() - 1);

  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="flex flex-col w-full bg-gray-300 shadow-md p-8 border gap-4">
        <Label labelName={"Project Name"} />
        <Input
          type={"text"}
          name={"Project_Name"}
          className={"border p-4"}
          onchange={handleInputChange}
          min_lenght={"1"}
          max_lenght={"50"}
          required
        />
        <Label labelName={"Project Type"} />
        <Dropdown
          name={"Project_Type"}
          className={"p-4 outline-none cursor-pointer w-full"}
          Option_Name={["-- Choose Project Type --", "A", "B"]}
          RequireAddButton={false}
          required
          onChange={SelectOptionHandler} 
        />
        <Label labelName={"Client"} />
        <Dropdown
          name={"Client"}
          className={"p-4 outline-none cursor-pointer w-full relative"}
          Option_Name={["-- Choose Client --", "Client 1", "Client 2"]}
          RequireAddButton={true}
          required
          onChange={SelectOptionHandler} 
        />
        <Label labelName={"Sample"} />
        <Input
          name={"Sample"}
          type={"text"}
          className={"border p-4"}
          onchange={handleInputChange}
          required
        />
        <Label labelName={"Cost Per Interview"} />
        <Input
          name={"Cost_Per_Interview"}
          type={"text"}
          className={"border p-4"}
          onchange={handleInputChange}
          required
        />
        <Label labelName={"Setup Fee "} />
        <Input
          name={"Setup_fee"}
          type={"text"}
          className={"border p-4"}
          onchange={handleInputChange}
          required
        />
        <Label labelName={"Other Cost "} />
        <Input
          name={"Other_cost"}
          type={"text"}
          className={"border p-4"}
          onchange={handleInputChange}
          required
        />
        <Label labelName={"Operation Team  "} />
        <Input
          name={"Operation_team"}
          type={"text"}
          className={"border p-4"}
          onchange={handleInputChange}
          required
        />
        <div className="flex flex-col justify-between w-full gap-4">
        <Label labelName={"Start Date"} />
        <Input
        name={'Start_Date'}
          type={"date"}
          placeholder={"dd/mm/yyyy"}
          className={"w-full p-4"}
          onchange={handleInputChange}
          min={minDate.toISOString().split('T')[0]}
          required
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
          min={minDate.toISOString().split('T')[0]}

          required
        />
      </div>
        <Button className="bg-green-500 p-4 mt-2" name={"Submit"} />
      </form>
      <div className="absolute top-2 right-2 bg-red-400 rounded-[50%] p-2 text-xl text-white cursor-pointer w-10 h-10 flex items-center justify-center" onClick={HandleCloseForm}>X</div>
    </div>
  );
};

export default Form;
