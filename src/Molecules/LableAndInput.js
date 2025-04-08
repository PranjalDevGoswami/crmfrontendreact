import React from "react";
import Label from "../Atom/Label";
import Input from "../Atom/InputField";

const LableAndInput = ({
  labelName,
  InputName,
  placeholder,
  inputChange,
  InputType,
  min,
  required,
  inputValue,
  InputMax_lenght,
  InputMin_lenght,
  multiple,
  disabled,
  labelClassName,
  inputClassName,
  max,
  inputOnFocus,
  onKeyDown
}) => {
  return (
    <div className="flex flex-col w-full">
      <Label labelName={labelName} className={labelClassName} />
      <Input
        name={InputName}
        type={InputType}
        placeholder={placeholder}
        className={inputClassName}
        onChange={inputChange}
        min={min}
        required={required}
        value={inputValue}
        max_lenght={InputMax_lenght}
        min_lenght={InputMin_lenght}
        multiple={multiple}
        disabled={disabled}
        max={max}
        onfocus={inputOnFocus}
        onKeyDown={onKeyDown}
      />
    </div>
  );
};

export default LableAndInput;
