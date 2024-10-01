// DateRangeFilterComponent.jsx
import React from "react";
import DateRangeFilter from "../../components/DateRangeFilter";

const DateRangeFilterComponent = ({ dateRange, setDateRange }) => {
  return <DateRangeFilter dateRange={dateRange} setDateRange={setDateRange} />;
};

export default DateRangeFilterComponent;
