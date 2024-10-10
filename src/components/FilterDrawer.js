import { Drawer } from "@mui/material";
import React, { useContext, useState } from "react";
import Accordion from "./Accordian";
import FilterOptionSelected from "./FilterOptionSelected";
import { FilterContext } from "../ContextApi/FilterContext";
import { useSelector } from "react-redux";

const FilterDrawer = ({
  setOpenFilter,
  role,
  selectedOptions,
  setSelectedOptions,
}) => {
  const handleOptionChange = (name, updatedOptions) => {
    setSelectedOptions(updatedOptions.value);
  };
  const darkMode = useSelector((store) => store.darkMode.isDarkMode);

  const { clientsList, hodListArray, managerListArray, tlListArray } =
    useContext(FilterContext);

  const [openAccordionIndex, setOpenAccordionIndex] = useState(null);

  const accordionData = [
    {
      title: "Client",
      options: clientsList?.map((item) => item.name),
      name: "Client",
    },
    {
      title: "HOD",
      options: hodListArray?.map((item) => item.name),
      name: "HOD",
    },
    {
      title: "MANAGER",
      options: managerListArray?.map((item) => item.name),
      name: "Manager",
    },
    {
      title: "Team Lead",
      options: tlListArray?.map((item) => item.name),
      name: "Team Lead",
    },
  ];

  const visibleAccordionsByRole = {
    Director: ["Client", "HOD", "MANAGER"],
    HOD: ["Client", "MANAGER", "Team Lead"],
    Manager: ["Client", "Team Lead"],
    "Team Lead": ["Client"],
  };

  const visibleAccordions = visibleAccordionsByRole[role] || [];

  const handleAccordionToggle = (index) => {
    setOpenAccordionIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const handleClearAllSelection = () => {
    setSelectedOptions([]); // Reset all selected options
  };

  return (
    <div
      className={`${darkMode ? "bg-black text-white" : "bg-white text-black"}`}
    >
      <Drawer
        anchor={"right"}
        open={true}
        onClose={() => {
          setOpenFilter(false);
        }}
        PaperProps={{
          sx: {
            width: 400,
            padding: 2,
          },
        }}
      >
        <div
          className={`${
            darkMode ? "bg-black text-white" : "bg-white text-black"
          } no-scrollbar`}
        >
          <h1 className="text-blue-500 pb-4 font-bold text-xl">
            Filter Project
          </h1>
          <div>
            <FilterOptionSelected
              selectedItems={selectedOptions}
              setSelectedItems={setSelectedOptions}
              handleClearAllSelection={handleClearAllSelection}
            />
          </div>

          {accordionData
            .filter((accordion) => visibleAccordions.includes(accordion.title))
            .map((accordion, index) => (
              <Accordion
                key={index}
                title={accordion.title}
                options={accordion.options}
                onChange={handleOptionChange}
                name={accordion.name}
                isOpen={openAccordionIndex === index}
                onToggle={() => handleAccordionToggle(index)}
                selectedOptions={selectedOptions}
              />
            ))}
        </div>
      </Drawer>
    </div>
  );
};

export default FilterDrawer;
