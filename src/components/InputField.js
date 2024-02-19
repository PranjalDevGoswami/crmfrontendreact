// import React from "react";

// const Input = ({type,className,placeholder,onchange,value,max_lenght,min_lenght,required,name,min,disabled,multiple}) =>{
//     return(
//         <input type={type} className={className} placeholder={placeholder} onChange={onchange} value={value} maxLength={max_lenght} minLength={min_lenght} required={required} name={name} min={min} disabled={disabled} multiple={multiple}/>
//     )
// }

// export default Input


import React from "react";

const Input = ({ type, value, onChange, max_length, min_length, name,disabled,multiple, className, required, placeholder }) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      className={className}
      minLength={min_length}
      maxLength={max_length}
      name={name}
      disabled={disabled}
      multiple={multiple}
      required={required}
      placeholder={placeholder}
    />
  );
};

export default Input;