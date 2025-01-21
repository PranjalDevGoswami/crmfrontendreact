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
  Inputvalue,
  InputMax_lenght,
  InputMin_lenght,
  multiple,
  disabled,
  labelClassName,
  inputClassName,
  max,
  InputOnFocus,
}) => {
  return (
    <div className="flex flex-col w-full">
      <Label labelName={labelName} className={labelClassName} />
      <Input
        name={InputName}
        type={InputType}
        placeholder={placeholder}
        className={inputClassName}
        onchange={inputChange}
        min={min}
        required={required}
        value={Inputvalue}
        max_lenght={InputMax_lenght}
        min_lenght={InputMin_lenght}
        multiple={multiple}
        disabled={disabled}
        max={max}
        onfocus={InputOnFocus}
      />
    </div>
  );
};

export default LableAndInput;
