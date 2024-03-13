import React, { useState } from "react";
import Select from "react-select";

const MultipleValueDropDown = ({ onChange, className,options }) => {
  // const [selectedOption, setSelectedOption] = useState(null);
  // const options = [
  //   { value: "Other Cost", label: "Other Cost" },
  //   { value: "Translation Cost", label: "Translation Cost" },
  //   // { value: 'Cost', label: 'Cost' },
  // ];
  const setSelectedOption = (e) => {
    onChange(e);
  };

  return (
    <div className="flex flex-col w-fit">
      <Select
        className={className}
        // defaultValue={'Other Cost'}
        onChange={setSelectedOption}
        options={options}
        isMulti
      />
    </div>
  );
};

export default MultipleValueDropDown;
