import React from "react";

const FilterOptionSelected = ({
  selectedItems,
  handleClearAllSelection,
  setSelectedItems,
}) => {
  const handleSingleCrossOption = (option) => {
    const updatedSelectedItems = selectedItems.filter(
      (item) => item !== option
    );
    setSelectedItems(updatedSelectedItems);
  };

  return (
    <div>
      <ul className="flex items-center flex-wrap pb-2">
        {selectedItems?.map((value, index) => (
          <li
            className="p-1 px-2 m-1 bg-[#e0e0e0] rounded-sm text-sm cursor-pointer"
            key={index}
          >
            <span
              className="mr-2 cursor-pointer"
              onClick={() => handleSingleCrossOption(value)}
            >
              X
            </span>
            {value}
          </li>
        ))}

        {selectedItems?.length > 1 && (
          <button
            className="p-1 px-2 m-1 bg-[#e0e0e0] rounded-sm text-sm cursor-pointer"
            onClick={handleClearAllSelection}
          >
            <span className="mr-2">X</span> Clear All
          </button>
        )}
      </ul>
    </div>
  );
};

export default FilterOptionSelected;
