import React from "react";

const Button = ({ onClick, className, name, type }) => {
  return (
    <button type={type} onClick={onClick} className={className}>
      {name}
    </button>
  );
};
export default Button;
