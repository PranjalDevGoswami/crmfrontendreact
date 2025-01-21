import React, { useContext, useEffect, useRef } from "react";
import { useSelector } from "react-redux";

const Input = ({
  type,
  className,
  placeholder,
  onchange,
  value,
  max_lenght,
  min_lenght,
  required,
  name,
  min,
  max,
  disabled,
  multiple,
  onfocus,
  onBlur,
  id,
}) => {
  const darkMode = useSelector((store) => store.darkMode.isDarkMode);
  const inputRef = useRef(null);

  useEffect(() => {
    const inputElement = inputRef.current;
    const handleWheel = (e) => {
      e.preventDefault();
    };

    if (inputElement) {
      inputElement.addEventListener("wheel", handleWheel);
    }

    return () => {
      if (inputElement) {
        inputElement.removeEventListener("wheel", handleWheel);
      }
    };
  }, []);

  const preventMinus = (e) => {
    if (e.code === "Minus") {
      e.preventDefault();
    }
  };
  return (
    <input
      type={type}
      className={
        `${darkMode && "bg-black text-white"} rounded-full ` + className
      }
      placeholder={placeholder}
      onChange={onchange}
      value={value}
      maxLength={max_lenght}
      minLength={min_lenght}
      required={required}
      name={name}
      min={min}
      max={max}
      disabled={disabled}
      multiple={multiple}
      onFocus={onfocus}
      ref={inputRef}
      onKeyDown={preventMinus}
      onBlur={onBlur}
      id={id}
    />
  );
};

export default Input;
