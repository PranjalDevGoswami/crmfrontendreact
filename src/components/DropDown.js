import React, { useEffect, useState } from "react";
import Button from "./Button";
import AddClient from "./AddClient";
import { TiPlus } from "react-icons/ti";

const Dropdown = ({
  className,
  onChange,
  Option_Name,
  RequireAddButton,
  name,
  multiple,
  defaultValue,
}) => {
  const [addOptionValue, setAddOptionValue] = useState("");
  const [openOptionField, setOpenOptionField] = useState(false);
  const [requireAddButton] = useState(RequireAddButton);
  // const [addOptionItem, setAddOptionItem] = useState(Option_Name.slice());
  const [selectedDropdownValue, setSelectedDropdownValue] = useState("");
  const [addOptionItem, setAddOptionItem] = useState([]);

  useEffect(() => {
    // Populate addOptionItem with initial options
    setAddOptionItem(Option_Name.slice());
  }, [Option_Name]);

  const OpenOptionFieldHandler = (e) => {
    e.preventDefault();
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
    const item = addOptionItem.filter((val, index) => {
      return val === addOptionValue;
    });
  };

  const HandleDropdownOnchange = (e) => {
    const value = e.target.value;
    onChange(name, value);
    setSelectedDropdownValue(value);
  };

  return (
    <div className="w-full">
      <div className="relative flex">
        <select
          className={"rounded-full p-2 " + className}
          onChange={HandleDropdownOnchange}
          name={name}
          multiple={multiple}
        >
          {addOptionItem.map((option, index) => {
            return (
              <option key={index} className="p-4 text-xl" value={option}>
                {option}
                {defaultValue}
              </option>
            );
          })}
        </select>
        {requireAddButton ? (
          <button
            onClick={OpenOptionFieldHandler}
            className="bg-yellow-200 p-2 rounded-r-full"
          >
            <TiPlus />
          </button>
        ) : (
          ""
        )}
      </div>

      {openOptionField ? (
        <div className="absolute w-1/2 left-1/2 top-1/2 translate-y-[-50%] translate-x-[-50%] duration-500 border border-black rounded z-30 shadow-2xl">
          <div className="flex flex-col justify-center items-center w-full h-full bg-white">
            <AddClient closeAddClient={setOpenOptionField} />
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
