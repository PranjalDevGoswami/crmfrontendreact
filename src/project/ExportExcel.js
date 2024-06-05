import React from "react";
import Button from "../components/Button";
import { IoMdDownload } from "react-icons/io";

const convertArrayOfObjectsToCSV = (array) => {
  if (!array || !array.length) {
    return null;
  }

  const columnDelimiter = ",";
  const lineDelimiter = "\n";
  const keys = Object.keys(array[0]);

  let result = keys.join(columnDelimiter) + lineDelimiter;

  array.forEach((item) => {
    let ctr = 0;
    keys.forEach((key) => {
      if (ctr > 0) result += columnDelimiter;
      result += item[key];
      ctr++;
    });
    result += lineDelimiter;
  });

  return result;
};

const downloadCSV = (array) => {
  let csv = convertArrayOfObjectsToCSV(array);
  if (!csv) return;

  const filename = "Project_List.csv";

  if (!csv.match(/^data:text\/csv/i)) {
    csv = `data:text/csv;charset=utf-8,${csv}`;
  }

  const link = document.createElement("a");
  link.setAttribute("href", encodeURI(csv));
  link.setAttribute("download", filename);
  link.click();
};

const Export = ({ onExport }) => (
  <div className="rounded-full bg-white p-2 pl-4 pr-4 flex items-center border hover:bg-gray-50">
    <Button
      className={"text-lg mr-2 text-blue-500 hover:underline"}
      onClick={onExport}
      name="Export as CSV"
    />
    <IoMdDownload className="text-lg text-blue-500" />
  </div>
);

const ExportCSV = ({ data }) => {
  const handleExport = () => {
    downloadCSV(data);
  };

  return <Export onExport={handleExport} />;
};

export default ExportCSV;
