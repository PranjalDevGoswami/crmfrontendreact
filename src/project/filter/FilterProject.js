import React, { useEffect, useState } from "react";
import Input from "../../Atom/InputField.js";
import DateRangeFilter from "../../components/DateRangeFilter.js";
import { IoFilter } from "react-icons/io5";
import FilterDrawer from "./FilterDrawer.js";
import useClientList from "../../../utils/hooks/useClientList.js";
import { useDispatch, useSelector } from "react-redux";
import {
  addSearchText,
  toggleIsOpenFilterDrawer,
} from "../../../utils/slices/filterSlice.js";
import { setProjects } from "../../../utils/slices/projectSlice.js";

const FilterProject = () => {
  const darkMode = useSelector((store) => store.themeSetting.isDarkMode);
  const {
    projects,
    projectsWithoutAnyFilter,
    page_number,
    page_size,
    activeTab,
  } = useSelector((store) => store.projectData);

  const { selectedOptions, openFilterDrawer, filterOption } = useSelector(
    (store) => store.filterSlice
  );
  const dispatch = useDispatch();
  useClientList();

  const [dateRange, setDateRange] = useState({
    startDate: "",
    endDate: "",
  });
  const [originalProjects, setOriginalProjects] = useState([]);

  useEffect(() => {
    if (projects?.length > 0 && originalProjects.length === 0) {
      setOriginalProjects([...projects]);
    }
  }, [projects]);

  useEffect(() => {
    const searchText = filterOption?.searchText?.toLowerCase()?.trim() || "";
    const selectedOptions = filterOption?.selectedOption || [];
    const { startDate, endDate } = filterOption?.dateRange || {};

    const hasActiveFilters =
      searchText ||
      (Array.isArray(selectedOptions) && selectedOptions.length > 0) ||
      (startDate && endDate);

    if (!hasActiveFilters) {
      dispatch(setProjects({ data: originalProjects, reset: true }));
      return;
    }

    let filteredData =
      projectsWithoutAnyFilter?.length > 0 ? [...projectsWithoutAnyFilter] : [];

    const searchInObject = (obj, searchText) => {
      if (!obj || typeof obj !== "object") return false;

      return Object.values(obj).some((value) => {
        if (typeof value === "object" && value !== null) {
          return searchInObject(value, searchText);
        }
        return value?.toString()?.toLowerCase().includes(searchText);
      });
    };

    const matchesSelectedOption = (item) => {
      if (!selectedOptions.length) return true;

      return selectedOptions.some((option) => {
        const opt = option.toLowerCase();
        return (
          item?.clients?.name?.toLowerCase().includes(opt) ||
          item?.assigned_to?.name?.toLowerCase().includes(opt) ||
          item?.project_assigned_to_teamlead?.some((user) =>
            user.name?.toLowerCase().includes(opt)
          )
        );
      });
    };

    const isInDateRange = (item) => {
      if (!startDate || !endDate) return true;

      const projectStart = new Date(item?.tentative_start_date);
      const projectEnd = new Date(item?.tentative_end_date);
      const start = new Date(startDate);
      const end = new Date(endDate);

      return (
        (projectStart >= start && projectStart <= end) ||
        (projectEnd >= start && projectEnd <= end) ||
        (projectStart <= start && projectEnd >= end)
      );
    };

    filteredData = filteredData.filter(
      (item) =>
        (!searchText || searchInObject(item, searchText)) &&
        matchesSelectedOption(item) &&
        isInDateRange(item)
    );

    dispatch(setProjects({ data: filteredData, reset: true }));
  }, [
    projectsWithoutAnyFilter,
    originalProjects,
    filterOption?.searchText,
    filterOption?.selectedOption,
    filterOption?.dateRange?.startDate,
    filterOption?.dateRange?.endDate,
    page_number,
    page_size,
    activeTab,
  ]);

  return (
    <div className="flex items-center">
      <div className="flex items-center justify-center">
        <div className="text-right mr-2">
          <Input
            type="text"
            placeholder="Search..."
            value={filterOption.searchText}
            onChange={(e) => dispatch(addSearchText(e.target.value))}
            className={`${
              darkMode && "bg-black border-white"
            } p-1 border-b border-blue-400 !rounded-none w-8/12 focus:outline-none text-blue-400 text-sm"`}
            id={"search"}
          />
          {filterOption.searchText !== "" && (
            <button
              onClick={() => {
                dispatch(addSearchText(""));
              }}
              className="p-1 text-xs text-red-300 rounded-md"
            >
              X
            </button>
          )}
        </div>
      </div>
      <div className="flex items-center">
        <DateRangeFilter dateRange={dateRange} setDateRange={setDateRange} />
      </div>
      {/* <div className="flex items-center">
        <button
          className="p-2 border border-gray-200 bg-gray-100 rounded-sm text-sm flex items-center text-blue-400"
          onClick={() => {
            dispatch(toggleIsOpenFilterDrawer());
          }}
        >
          <IoFilter className="mr-2" />
          Filter
        </button>
      </div> */}
      <div className="flex items-center">
        <button
          className="p-1 border border-gray-200 bg-gray-100 rounded-sm 
               text-[clamp(0.5rem, 0.9vw, 0.625rem)] flex items-center 
               text-blue-400 cursor-pointer gap-1"
          onClick={() => {
            dispatch(toggleIsOpenFilterDrawer());
          }}
        >
          {/* Icon scales with text */}
          <IoFilter className="w-[clamp(0.5rem, 1.2vw, 0.8rem)] h-[clamp(0.75rem, 1.2vw, 1rem)]" />
          Filter
        </button>
      </div>

      {openFilterDrawer && <FilterDrawer />}
    </div>
  );
};

export default FilterProject;
