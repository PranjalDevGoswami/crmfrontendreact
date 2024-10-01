import React, { useState } from "react";

const CheckboxList = ({ InputItems, onCheckboxChange }) => {
  const [checkedItems, setCheckedItems] = useState({});

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setCheckedItems({ ...checkedItems, [name]: checked });
    onCheckboxChange(name, checked);
  };

  return (
    <div>
      {InputItems?.map((item, index) => (
        <div key={index}>
          <input
            type="checkbox"
            name={item}
            checked={checkedItems[item] || false}
            onChange={handleCheckboxChange}
            className="mr-4"
          />
          <label>{item}</label>
        </div>
      ))}
    </div>
  );
};

export default CheckboxList;
