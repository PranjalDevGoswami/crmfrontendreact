import React, { useContext, useEffect, useState } from "react";
import Button from "./Button";
import AddClient from "./Form/AddClient";
import { TiPlus } from "react-icons/ti";
import { CloseAddClient } from "../ContextApi/CloseAddClientContext";
import { useSelector } from "react-redux";
import Popup from "./Popup";

const Dropdown = ({
  className,
  onChange,
  Option_Name,
  RequireAddButton,
  name,
  multiple,
  defaultValue,
  selectedOption,
  id,
}) => {
  const [addOptionValue, setAddOptionValue] = useState("");
  const [requireAddButton] = useState(RequireAddButton);
  const [selectedDropdownValue, setSelectedDropdownValue] = useState("");
  const [addOptionItem, setAddOptionItem] = useState([]);

  const darkMode = useSelector((store) => store.darkMode.isDarkMode);
  const { closeAddClient, setCloseAddClient } = useContext(CloseAddClient);

  useEffect(() => {
    setAddOptionItem(Option_Name?.slice());
  }, [Option_Name]);

  const OpenOptionFieldHandler = (e) => {
    e.preventDefault();
    setAddOptionValue("");
    setCloseAddClient(true);
  };

  const HandleDropdownOnchange = (e) => {
    const value = e.target.value;
    onChange(name, value);
    setSelectedDropdownValue(value);
  };

  return (
    <div className="w-full">
      <div className="relative flex p-1">
        <select
          className={
            `${darkMode && "bg-black border-white"} rounded-full p-2 ` +
            className
          }
          onChange={HandleDropdownOnchange}
          name={name}
          multiple={multiple}
          value={selectedOption}
          id={id}
        >
          {addOptionItem?.map((option, index) => {
            return (
              <option key={index} className="p-4 text-xl" value={option}>
                {option?.charAt(0)?.toUpperCase() + option?.slice(1)}
                {defaultValue}
              </option>
            );
          })}
        </select>
        {requireAddButton && (
          <button
            onClick={OpenOptionFieldHandler}
            className="bg-yellow-200 p-2 rounded-r-full mt-2"
          >
            <TiPlus />
          </button>
        )}
      </div>

      {closeAddClient && (
        <Popup>
          <AddClient />
          <Button
            name="X"
            className="absolute top-3 right-3 bg-red-400 p-2 rounded"
            onClick={() => {
              setCloseAddClient(!closeAddClient);
            }}
          />
        </Popup>
      )}
    </div>
  );
};
export default Dropdown;
