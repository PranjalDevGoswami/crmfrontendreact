import React, { useState } from "react";

const Tooltip = ({ text, children, position = "top", className }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  // Tooltip position classes
  const positionClasses = {
    top: "bottom-full left-1/2 transform -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 transform -translate-x-1/2 mt-2",
    left: "right-full top-1/2 transform -translate-y-1/2 mr-2",
    right: "left-full top-1/2 transform -translate-y-1/2 ml-2",
  };

  return (
    <div
      className="relative flex items-center"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {showTooltip && (
        <div
          className={`absolute z-10 px-3 py-2 text-sm text-white bg-gray-800 rounded-md whitespace-nowrap ${positionClasses[position]} ${className}`}
        >
          {text}
          <div
            className={`absolute w-2 h-2 bg-gray-800 transform rotate-45 ${
              position === "top"
                ? "bottom-0 left-1/2 -translate-x-1/2"
                : position === "bottom"
                ? "top-0 left-1/2 -translate-x-1/2"
                : position === "left"
                ? "right-0 top-1/2 -translate-y-1/2"
                : "left-0 top-1/2 -translate-y-1/2"
            }`}
          />
        </div>
      )}
      {children}
    </div>
  );
};

export default Tooltip;
