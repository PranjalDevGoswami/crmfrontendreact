import React from "react";

const AdvancePaymentCheckbox = ({ checked,className,onClick,value,placeholder }) => {
  return <input type={"checkbox"} className={className} onClick={onClick} value={value} placeholder={placeholder} checked={checked}/>
};

export default AdvancePaymentCheckbox;

