import { Drawer } from "@mui/material";
import React, { useContext, useState, useEffect } from "react";
import Accordion from "./Accordian";
import FilterOptionSelected from "./FilterOptionSelected";
import { FilterContext } from "../ContextApi/FilterContext";
import { useSelector, useDispatch } from "react-redux";
import useUserData from "../../utils/hooks/useUserData";
import { addSelectedHod } from "../../utils/slices/SelectedHodSlice";
import {
  addSelectedSrManager,
  addSelectedManager,
  addSelectedAssManager,
  addSelectedManagerListArray,
  addSelectedTeamLead,
} from "../../utils/slices/SelectedManagerSlice";

const FilterDrawer = ({
  setOpenFilter,
  selectedOptions,
  setSelectedOptions,
  openFilter,
}) => {
  const { clientsList, setSelectedClient } = useContext(FilterContext);
  const darkMode = useSelector((store) => store.darkMode.isDarkMode);
  const dispatch = useDispatch();
  const userData = useUserData();

  const role = localStorage.getItem("role");
  const username = localStorage.getItem("username");
  const [openAccordionIndex, setOpenAccordionIndex] = useState(null);
  const [selectedHod, setSelectedHod] = useState(null);
  const [selectedSrManager, setSelectedSrManager] = useState(null);
  const [selectedManager, setSelectedManager] = useState(null);
  const [selectedAssManager, setSelectedAssManager] = useState(null);
  const [selectedTl, setSelectedTl] = useState(null);
  const [filteredHods, setFilteredHods] = useState([]);
  const [filteredSrManager, setFilteredSrManager] = useState([]);
  const [filteredManager, setFilteredManager] = useState([]);
  const [filteredAssManager, setFilteredAssManager] = useState([]);
  const [filteredTeamLeads, setFilteredTeamLeads] = useState([]);

  useEffect(() => {
    // Initialize filtered lists
    let filteredHodsList = [];
    let filteredSrManagerList = [];
    let filteredManagerList = [];
    let filteredAssManagerList = [];
    let filteredTeamLeadList = [];

    // Filter logic based on role
    if (role === "Director") {
      // If Director, include all users in the hierarchy
      filteredHodsList = userData.filter((item) => item?.role?.name === "HOD");
      filteredSrManagerList = userData.filter((item) => item?.role?.name === "Sr.Manager");
      filteredManagerList = userData.filter((item) => item?.role?.name === "Manager");
      filteredAssManagerList = userData.filter((item) => item?.role?.name === "Ass.Manager");
      filteredTeamLeadList = userData.filter((item) => item?.role?.name === "Team Lead");
    } else {
      // For non-Director roles, filter based on immediate reports
      filteredHodsList = userData.filter(
        (item) => item?.role?.name === "HOD" && item?.reports_to?.name == username
      );

        filteredSrManagerList = userData.filter(
          (item) => item?.role?.name === "Sr.Manager" && item?.reports_to?.name == username
        );

        filteredManagerList = userData.filter(
          (item) => item?.role?.name === "Manager" && item?.reports_to?.name == username
        );

        filteredAssManagerList = userData.filter(
          (item) => item?.role?.name === "Ass.Manager" && item?.reports_to?.name == username
        );
        filteredTeamLeadList = userData.filter(
          (item) => item?.role?.name === "Team Lead" && item?.reports_to?.name == username
        );

    }

    // Dynamically update the hierarchy based on selections
    if (selectedHod) {
      filteredSrManagerList = userData.filter(
        (item) =>
          item?.role?.name === "Sr.Manager" &&
          selectedHod.includes(item?.reports_to?.name)
      );
      // Reset lower hierarchy if selected HOD changes
      setSelectedSrManager(null);
      setSelectedManager(null);
      setSelectedAssManager(null);
      setSelectedTl(null);
    }

    if (selectedSrManager) {
      filteredManagerList = userData.filter(
        (item) =>
          item?.role?.name === "Manager" &&
          selectedSrManager.includes(item?.reports_to?.name)
      );
      // Reset lower hierarchy if selected Sr. Manager changes
      setSelectedManager(null);
      setSelectedAssManager(null);
      setSelectedTl(null);
    }

    if (selectedManager) {
      filteredAssManagerList = userData.filter(
        (item) =>
          item?.role?.name === "Ass.Manager" &&
          selectedManager.includes(item?.reports_to?.name)
      );
      // Reset lower hierarchy if selected Manager changes
      setSelectedAssManager(null);
      setSelectedTl(null);
    }

    if (selectedAssManager) {
      filteredTeamLeadList = userData.filter(
        (item) =>
          item?.role?.name === "Team Lead" &&
          selectedAssManager?.includes(item?.reports_to?.name)
      );
      // console.log("🚀 ~ useEffect ~ filteredTeamLeadList first:", filteredTeamLeadList)
      // Reset lower hierarchy if selected Ass. Manager changes
      setSelectedTl(null);
    }

    // Update state with filtered lists
    setFilteredHods(filteredHodsList);
    setFilteredSrManager(filteredSrManagerList);
    setFilteredManager(filteredManagerList);
    setFilteredAssManager(filteredAssManagerList);
    // console.log("🚀 ~ useEffect ~ filteredTeamLeadList before:", filteredTeamLeadList,filteredTeamLeads)

    setFilteredTeamLeads(filteredTeamLeadList);
    // console.log("🚀 ~ useEffect ~ filteredTeamLeadList after:", filteredTeamLeadList,filteredTeamLeads)

  }, [
    role,
    username,
    userData,
    selectedHod,
    selectedSrManager,
    selectedManager,
    selectedAssManager,
  ]);
  // console.log("🚀 ~ useEffect ~ filteredTeamLeadList after loop:",filteredTeamLeads)


  const handleOptionChange = (name, updatedOptions) => {
    console.log(name, updatedOptions);

    const value = updatedOptions.value || null;
    switch (name) {
      case "Client":
        setSelectedOptions(value);
        setSelectedHod(null);
        setSelectedSrManager(null);
        setSelectedManager(null);
        setSelectedAssManager(null);
        setSelectedClient(value);
        // dispatch(addselectedClient(value));
        break;

      case "HOD":
        setSelectedOptions(value);
        setSelectedHod(value);
        setSelectedSrManager(null);
        setSelectedManager(null);
        setSelectedAssManager(null);
        dispatch(addSelectedHod(value));
        break;

      case "Sr.Manager":
        setSelectedOptions(value);
        setSelectedSrManager(value);
        setSelectedManager(null);
        setSelectedAssManager(null);
        setSelectedTl(null);
        dispatch(addSelectedSrManager(value));
        break;

      case "Manager":
        setSelectedOptions(value);
        setSelectedManager(value);
        setSelectedAssManager(null);
        setSelectedTl(null);
        dispatch(addSelectedManager(value));
        break;

      case "Ass.Manager":
        setSelectedOptions(value);
        setSelectedAssManager(value);
        setSelectedTl(null);
        dispatch(addSelectedAssManager(value));
        break;

      case "Team Lead":
        setSelectedOptions(value);
        setSelectedAssManager(null);
        setSelectedTl(value);
        dispatch(addSelectedTeamLead(value));
        break;

      default:
        break;
    }
  };

  const handleAccordionToggle = (index) => {
    setOpenAccordionIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const handleClearAllSelection = () => {
    setSelectedOptions([]);
    setSelectedHod(null);
    setSelectedManager(null);
  };

  const accordionData = [
    {
      title: "Client",
      options: clientsList?.map((item) => item.name),
      name: "Client",
    },
    {
      title: "HOD",
      options: filteredHods?.map((item) => item?.user_role?.name),
      name: "HOD",
    },
    {
      title: "Sr.Manager",
      options: filteredSrManager?.map((item) => item?.user_role?.name),
      name: "Sr.Manager",
    },
    {
      title: "Manager",
      options: filteredManager?.map((item) => item?.user_role?.name),
      name: "Manager",
    },
    {
      title: "Ass.Manager",
      options: filteredAssManager?.map((item) => item?.user_role?.name),
      name: "Ass.Manager",
    },
    {
      title: "Team Lead",
      options: filteredTeamLeads?.map((item) => item?.user_role?.name),
      name: "Team Lead",
    },
  ];

  const visibleAccordionsByRole = {
    Director: ["Client", "HOD", , "Sr.Manager", "Manager", "Ass.Manager"],
    HOD: ["Client", "Sr.Manager", "Manager", "Ass.Manager", "Team Lead"],
    "Sr.Manager": ["Client", "Manager", "Ass.Manager", "Team Lead"],
    Manager: ["Client", "Ass.Manager", "Team Lead"],
    "Ass.Manager": ["Client", "Team Lead"],
    "Team Lead": ["Client"],
  };

  const visibleAccordions = visibleAccordionsByRole[role] || [];

  return (
    <div
      className={`${darkMode ? "bg-black text-white" : "bg-white text-black"}`}
    >
      <Drawer
        anchor={"right"}
        open={openFilter}
        onClose={() => {
          setOpenFilter(false);
        }}
        PaperProps={{ sx: { width: 400, padding: 2 } }}
      >
        <div
          className={`no-scrollbar ${
            darkMode ? "bg-black text-white" : "bg-white text-black"
          }`}
        >
          <h1 className="text-blue-500 pb-4 font-bold text-xl">
            Filter Project
          </h1>
          <FilterOptionSelected
            selectedItems={selectedOptions}
            setSelectedItems={setSelectedOptions}
            handleClearAllSelection={handleClearAllSelection}
          />

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
