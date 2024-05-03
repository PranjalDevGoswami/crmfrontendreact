import React from "react";
import DataTable from "react-data-table-component";
import {
  conditionalRowStyles,
  customStylesFormanDaysDetails,
} from "../../../utils/DataTablesData";

const ManDaysDetails = ({ perDayDetailsData }) => {
  if (!Array.isArray(perDayDetailsData)) {
    return <p>No man days data available</p>;
  }
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // Adjust locale and formatting options as needed
  };

  const columns = [
    {
      name: "Date",
      selector: (row) => row?.date,
      sortable: true,
    },
    {
      name: "Total Man",
      selector: (row) => row.man_days,
      sortable: true,
    },
  ];
  const data = perDayDetailsData.map((item, index) => ({
    date: formatDate(item?.date),
    man_days: item?.man_days,
  }));

  return (
    <div>
      <DataTable
        columns={columns}
        data={data}
        customStyles={customStylesFormanDaysDetails}
        conditionalRowStyles={conditionalRowStyles}
      />
    </div>
  );
};

export default ManDaysDetails;
