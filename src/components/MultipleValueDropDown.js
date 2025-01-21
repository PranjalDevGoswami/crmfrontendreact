import React, { useState } from "react";
import Select from "react-select";

const MultipleValueDropDown = ({
  onChange,
  className,
  options,
  defaultValue,
}) => {
  const setSelectedOption = (e) => {
    onChange(e);
  };

  return (
    <div className="flex flex-col w-full">
      <Select
        className={className}
        onChange={setSelectedOption}
        options={options}
        isMulti
        defaultValue={defaultValue}
      />
    </div>
  );
};

export default MultipleValueDropDown;
