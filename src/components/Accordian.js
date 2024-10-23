import React, { useState } from "react";
import { IoIosArrowDropdown, IoIosArrowDropup } from "react-icons/io";

const Accordion = ({
  options,
  title,
  name,
  onChange,
  selectedOptions = [],
  isOpen,
  onToggle,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showMore, setShowMore] = useState(false);

  const handleSelectOption = (e, option) => {
    let updatedSelectedOptions;
    if (selectedOptions.includes(option)) {
      updatedSelectedOptions = selectedOptions.filter(
        (item) => item !== option
      );
    } else {
      updatedSelectedOptions = [...selectedOptions, option];
    }

    if (onChange) {
      onChange(name, { value: updatedSelectedOptions });
    }
  };

  const filteredOptions = options?.filter((option) =>
    option?.toLowerCase().includes(searchTerm?.toLowerCase())
  );

  const handleShowMoreToggle = () => {
    setShowMore(!showMore);
  };

  return (
    <div className="border p-2 m-1 rounded">
      <button
        onClick={onToggle}
        className="w-full text-left font-bold flex justify-between"
      >
        {title}
        <span>
          {!isOpen ? (
            <IoIosArrowDropdown className="text-xl" />
          ) : (
            <IoIosArrowDropup className="text-xl" />
          )}
        </span>
      </button>
      {isOpen && (
        <div className="p-2">
          <input
            type="text"
            placeholder="Search..."
            className="border p-1 w-full mb-2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {filteredOptions
            ?.slice(0, showMore ? filteredOptions?.length : 5)
            .map((option, index) => (
              <div key={index} className="flex items-center p-1">
                <input
                  type="checkbox"
                  checked={selectedOptions.includes(option)}
                  onChange={(e) => handleSelectOption(e, option)}
                />
                <span className="ml-2">{option}</span>
              </div>
            ))}
          {filteredOptions?.length > 5 && (
            <button
              onClick={handleShowMoreToggle}
              className="text-blue-500 mt-2 underline"
            >
              {showMore ? "Show Less" : "Show More"}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Accordion;
