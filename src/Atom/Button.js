import React from "react";

const Button = ({ onClick, className, name, type, value }) => {
  return (
    <button type={type} onClick={onClick} className={className} value={value}>
      {name}
    </button>
  );
};
export default Button;
