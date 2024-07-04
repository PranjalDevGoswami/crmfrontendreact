import React, { useContext } from "react";
import DataTable from "react-data-table-component";
import {
  conditionalRowStyles,
  customStylesFormanDaysDetails,
  customStylesFormanDaysDetailsDarkMode,
} from "../../../utils/DataTablesData";
import { ThemeContext } from "../../ContextApi/ThemeContext";

const ManDaysDetails = ({ perDayDetailsData }) => {
  if (!Array.isArray(perDayDetailsData)) {
    return <p className="p-4">No man days data available</p>;
  }
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // Adjust locale and formatting options as needed
  };
  const { darkMode } = useContext(ThemeContext);

  const columns = [
    {
      name: "Date",
      selector: (row) => row?.date,
      sortable: true,
    },
    {
      name: "Achieved Target",
      selector: (row) => row?.total_achievement,
      sortable: true,
    },
    {
      name: "Total Man",
      selector: (row) => row.man_days,
      sortable: true,
    },
    {
      name: "Remaining Till Date",
      selector: (row) => row.remaining_interview,
      sortable: true,
    },
  ];
  const data = perDayDetailsData.map((item, index) => ({
    date: formatDate(item?.date),
    total_achievement: item?.total_achievement,
    man_days: item?.man_days,
    remaining_interview: item?.remaining_interview,
  }));

  return (
    <div
      className={`${
        darkMode ? "w-full bg-black text-white" : "bg-white"
      } w-full p-2 mt-2 `}
    >
      <DataTable
        columns={columns}
        data={data}
        customStyles={
          darkMode
            ? customStylesFormanDaysDetailsDarkMode
            : customStylesFormanDaysDetails
        }
        conditionalRowStyles={conditionalRowStyles}
        pagination
      />
    </div>
  );
};

export default ManDaysDetails;
