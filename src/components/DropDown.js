import React, { useState } from "react";
import Button from "./Button";
import Input from "./InputField";

const Dropdown = ({ className, onChange ,Option_Name,RequireAddButton,name}) => {

  const [addOptionValue, setAddOptionValue] = useState("");
  const [openOptionField, setOpenOptionField] = useState(false);
  const [requireAddButton] = useState(RequireAddButton)
  const [addOptionItem, setAddOptionItem] = useState(Option_Name);

  const OpenOptionFieldHandler = () => {
    setAddOptionValue("");
    setOpenOptionField(true);
  };

  const OptionInputHandler = (e) => {
    setAddOptionValue(e.target.value);
  };

  const SubmitInputValueHandler = () => {
    {
      addOptionValue !== ""
        ? setOpenOptionField(false)
        : alert("Please Fill the Field");
    }
    setAddOptionItem([...addOptionItem, addOptionValue]);
    const item = addOptionItem.filter((val,index)=>{
        return val === addOptionValue;
    })
    // console.log('item',item);
  };

  const HandleDropdownOnchange = (e) =>{
    const value = (e.target.value)
    onChange(name,value)
  }

  return (
    <div className="flex w-full">
     <div className="relative w-full">
     <select className={className} onChange={HandleDropdownOnchange} name={name}>
        {addOptionItem.map((option,index) => {
          return <option key={index} className="p-4 text-xl" value={option}>{option}</option>;
        })}
      </select>
      {requireAddButton?<Button
        className="bg-green-300 p-2 absolute right-0 top-[3.3rem] text-sm"
        name="add client"
        onClick={OpenOptionFieldHandler}
      />:''}
      
     </div>
     
      {openOptionField ? (
        <div className="fixed bg-gray-300 bg-opacity-80 w-1/2 left-1/2 h-1/2 top-1/2 translate-y-[-50%] translate-x-[-50%] duration-500 border border-black rounded">
          <div className="flex justify-center items-center w-full h-full">
            <Input
              type="text"
              className="p-4"
              value={addOptionValue}
              onchange={OptionInputHandler}
            />
            <Button
              name="Submit"
              className="p-4 bg-green-400"
              onClick={SubmitInputValueHandler}
            />
          </div>
          <Button
            name="X"
            className="absolute top-3 right-3 bg-red-400 p-2 rounded"
            onClick={() => {
              setOpenOptionField(false);
            }}
          />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
export default Dropdown;
