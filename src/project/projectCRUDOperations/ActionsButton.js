import React, { useContext } from "react";
import { DataTableContext } from "../../ContextApi/DataTableContext";
import { MdOutlineMoreVert } from "react-icons/md";
import OpereationButton from "../../project/projectCRUDOperations/OpereationButton";

const ActionsButton = ({ record, index, buttonRef }) => {
  const {
    openDropdownIndex,
    setOpenDropdownIndex,
    setIsViewOptionIndex,
    isViewOptionOpen,
    setIsViewOptionOpen,
    setSelectedIndex,
    setSelectedRecord,
  } = useContext(DataTableContext);

  const handleAddEditOperation = (record, index) => {
    setOpenDropdownIndex(openDropdownIndex == index ? -1 : index);
    setIsViewOptionIndex(index);
    setIsViewOptionOpen(!isViewOptionOpen);
    setSelectedRecord(record);
    setSelectedIndex(index);
  };

  return (
    <div className="relative w-full overflow-y-visible">
      <div className="flex items-center overflow-visible relative">
        <button
          onClick={() => handleAddEditOperation(record, index)}
          className="border p-2 rounded-md mr-2 cursor-pointer"
        >
          <MdOutlineMoreVert />
        </button>
        {openDropdownIndex == index && (
          <div
            ref={buttonRef}
            onClick={(e) => e.stopPropagation()}
            className={`absolute z-50 ${
              index <= 5 ? "opration_btn" : "opration_btn_bottom"
            }`}
          >
            <OpereationButton />
          </div>
        )}
      </div>
    </div>
  );
};

export default ActionsButton;
