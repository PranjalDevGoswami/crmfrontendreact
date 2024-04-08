import React, { useState } from "react";

const DateFilter = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Function to handle changes in the date range filter
  const handleDateRangeChange = (event, type) => {
    const date = event.target.value;
    if (type === "start") {
      setStartDate(date);
    } else if (type === "end") {
      setEndDate(date);
    }
  };

  const filteredData = getFormDataApi.filter((item) => {
    const startDateValid = startDate
      ? new Date(item.tentative_start_date) >= new Date(startDate)
      : true;
    const endDateValid = endDate
      ? new Date(item.tentative_end_date) <= new Date(endDate)
      : true;
    return startDateValid && endDateValid;
  });
  return (
    <div>
      <div className="flex justify-end mb-4 w-9/12">
        <Input
          type="date"
          placeholder="Start Date"
          value={startDate}
          onChange={(e) => handleDateRangeChange(e, "start")}
          className="p-2 m-1 border border-black rounded focus:outline-none"
        />
        <Input
          type="date"
          placeholder="End Date"
          value={endDate}
          onChange={(e) => handleDateRangeChange(e, "end")}
          className="p-2 m-1 border border-black rounded focus:outline-none"
        />
      </div>
    </div>
  );
};

export default DateFilter;
