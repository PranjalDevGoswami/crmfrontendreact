import { Drawer } from "@mui/material";
import React from "react";

import Accordion from "./Accordian";

const FilterDrawer = ({
  setOpenFilter,
  handleFilterOption,
  role,
  clientsList,
  tlListArray,
  hodListArray,
  managerListArray,
}) => {
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
  };

  const visibleAccordions = visibleAccordionsByRole[role] || [];

  return (
    <div>
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
        <div className="no-scrollbar">
          <h1 className="text-blue-500 pb-4 font-bold text-xl">
            Filter Project
          </h1>

          {accordionData
            .filter((accordion) => visibleAccordions.includes(accordion.title))
            .map((accordion, index) => (
              <Accordion
                key={index}
                title={accordion.title}
                options={accordion.options}
                onChange={handleFilterOption}
                name={accordion.name}
              />
            ))}
        </div>
      </Drawer>
    </div>
  );
};

export default FilterDrawer;
