import React, { useState } from "react";

const MultipleValueDropDown = ({
  onChange,
  className,
  options,
  value = [],
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSelectOption = (selectedValue) => {
    let updatedSelectedOptions;
    if (value.includes(selectedValue)) {
      updatedSelectedOptions = value.filter((val) => val !== selectedValue);
    } else {
      updatedSelectedOptions = [...value, selectedValue];
    }
    onChange(updatedSelectedOptions);
  };

  const handleRemoveOption = (val) => {
    const updated = value.filter((v) => v !== val);
    onChange(updated);
  };

  return (
    <div className={`relative ${className}`}>
      <div
        className="w-full p-2 border rounded-md bg-white cursor-pointer"
        onClick={() => setIsDropdownOpen((prev) => !prev)}
      >
        {value.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {value.map((val) => {
              const label = options.find((o) => o.value === val)?.label;
              return (
                <span
                  key={val}
                  className="flex items-center px-2 py-1 text-sm text-white bg-blue-500 rounded"
                >
                  {label}
                  <button
                    className="ml-1 text-white hover:text-gray-200"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveOption(val);
                    }}
                  >
                    ×
                  </button>
                </span>
              );
            })}
          </div>
        ) : (
          <span className="text-gray-400">Select options...</span>
        )}
      </div>

      {isDropdownOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-md">
          {options.map((opt) => (
            <div
              key={opt.value}
              className={`flex items-center px-2 py-2 cursor-pointer hover:bg-blue-100 ${
                value.includes(opt.value) ? "bg-blue-50" : ""
              }`}
              onClick={() => handleSelectOption(opt.value)}
            >
              <input
                type="checkbox"
                checked={value.includes(opt.value)}
                onChange={() => handleSelectOption(opt.value)}
                className="mr-2"
              />
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultipleValueDropDown;
