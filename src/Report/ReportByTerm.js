import React, { useEffect } from "react";
import { getWithAuth } from "../provider/helper/axios";
import { MANDAYSLIST } from "../../utils/urls";

const ReportByTerm = ({ setSelectedTerm }) => {
  useEffect(() => {
    const getManDays = async () => {
      const response = await getWithAuth(MANDAYSLIST);
      console.log("🚀 ~ getManDays ~ response:", response?.data);
    };
    getManDays();
  }, []);
  const Options = [
    "--Select Duration--",
    "1st Quarter",
    "2nd Quarter",
    "3rd Quarter",
    "4th Quarter",
  ];
  const handleTermSelection = (e) => {
    setSelectedTerm(e.target.value);
  };
  return (
    <div>
      <select onChange={handleTermSelection} className="p-2">
        {Options.map((item, index) => {
          return <option key={index}>{item}</option>;
        })}
      </select>
    </div>
  );
};

export default ReportByTerm;
