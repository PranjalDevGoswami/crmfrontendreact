import React, { useContext } from "react";
import DataTable from "react-data-table-component";
import {
  conditionalRowStyles,
  customStylesFormanDaysDetails,
  customStylesFormanDaysDetailsDarkMode,
} from "../../../utils/tableData/DataTablesData";
import { useSelector } from "react-redux";

const ManDaysDetails = ({ perDayDetailsData }) => {
  if (!Array.isArray(perDayDetailsData)) {
    return <p className="p-4">No man days data available</p>;
  }
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };
  const darkMode = useSelector((store) => store.darkMode.isDarkMode);

  const columns = [
    {
      name: "Date",
      selector: (row) => row?.update_date,
      sortable: true,
    },
    {
      name: "Achieved Target",
      selector: (row) => row?.total_achievement,
      sortable: true,
    },
    {
      name: "Total Man",
      selector: (row) => row.total_man_days,
      sortable: true,
    },
    {
      name: "Remaining Till Date",
      selector: (row) => row.remaining_interview,
      sortable: true,
    },
    {
      name: "Updated By",
      selector: (row) => row.updated_by?.name,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
    },
  ];
  const data = perDayDetailsData.map((item, index) => ({
    update_date: formatDate(item?.update_date),
    total_achievement: item?.total_achievement,
    total_man_days: item?.total_man_days,
    remaining_interview: item?.remaining_interview,
    updated_by: item?.updated_by,
    status: item?.status,
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
