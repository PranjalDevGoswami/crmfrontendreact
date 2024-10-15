import { Drawer } from "@mui/material";
import React, { useContext, useState } from "react";
import Accordion from "./Accordian";
import FilterOptionSelected from "./FilterOptionSelected";
import { FilterContext } from "../ContextApi/FilterContext";
import { useSelector } from "react-redux";
import useUserData from "../../utils/hooks/useUserData";
import { isHod, userRole } from "../config/Role";

const FilterDrawer = ({
  setOpenFilter,
  role,
  selectedOptions,
  setSelectedOptions,
}) => {
  const [openAccordionIndex, setOpenAccordionIndex] = useState(null);
  const [selectedManager, setSelectedManager] = useState(null);
  const [selectedTl, setSelectedTl] = useState(null);
  const [selectedHod, setSelectedHod] = useState(null);

  const handleOptionChange = (name, updatedOptions) => {
    setSelectedOptions(updatedOptions.value);

    if (name === "HOD") {
      if (updatedOptions.value) {
        setSelectedHod(updatedOptions.value);
        setSelectedManager(null);
      } else {
        setSelectedHod(null);
        setSelectedManager(null);
      }
    }

    if (name === "Manager") {
      if (updatedOptions.value) {
        setSelectedManager(updatedOptions.value);
      } else {
        setSelectedManager(null);
        setSelectedTl(null);
      }
    }
  };

  const darkMode = useSelector((store) => store.darkMode.isDarkMode);

  const { clientsList, managerListArray, tlListArray } =
    useContext(FilterContext);
  const userData = useUserData();

  const filteredHodsList = userData.filter(
    (item) => item?.role?.name === "HOD"
  );

  const filteredManagerList =
    isHod || selectedHod
      ? userData.filter(
          (user) =>
            (isHod && user.reports_to?.id == userRole) ||
            (selectedHod && user.reports_to?.name == selectedHod)
        )
      : managerListArray;

  const filteredTeamLeadList = selectedManager
    ? userData.filter((tl) => tl.reports_to?.name == selectedManager)
    : tlListArray;

  const accordionData = [
    {
      title: "Client",
      options: clientsList?.map((item) => item.name),
      name: "Client",
    },
    {
      title: "HOD",
      options: filteredHodsList?.map((item) => item?.user_role?.name),
      name: "HOD",
    },
    {
      title: "MANAGER",
      options: filteredManagerList?.map((item) => item?.user_role?.name),
      name: "Manager",
    },
    {
      title: "Team Lead",
      options: filteredTeamLeadList?.map((item) => item?.user_role?.name),
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
    setSelectedOptions([]);
    setSelectedHod(null);
    setSelectedManager(null);
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
