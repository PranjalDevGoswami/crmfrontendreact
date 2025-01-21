import React from "react";
import Button from "../Atom/Button";
import { saveAs } from "file-saver";

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
      let value = item[key];

      // Check if the field is an array, if so, return the length
      if (Array.isArray(value)) {
        value = value.length;
      }

      // Wrap value in quotes if it's a string and contains the columnDelimiter (comma)
      if (typeof value === "string" && value.includes(columnDelimiter)) {
        value = `"${value}"`;
      }

      result += value;
      ctr++;
    });
    result += lineDelimiter;
  });
  return result;
};

const downloadCSV = (array, downloadName) => {
  const csv = convertArrayOfObjectsToCSV(array);
  if (!csv) return;

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  saveAs(blob, downloadName);
};

const Export = ({ onExport, name, className }) => (
  <Button className={className} onClick={onExport} name={name} />
);

const ExportCSV = ({ data, name, className, downloadName }) => {
  const handleExport = () => {
    downloadCSV(data, downloadName);
  };

  return (
    <Export
      onExport={handleExport}
      name={name}
      className={className}
      downloadName={downloadName}
    />
  );
};

export default ExportCSV;
