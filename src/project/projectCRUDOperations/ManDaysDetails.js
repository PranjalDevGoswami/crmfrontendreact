import React from "react";

const ManDaysDetails = () => {
  return (
    <div>
      <table className="border ">
        <thead>
          <tr className="border">
            <th className="border">Date</th>
            <th className="border">Work Description</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border">
            <td className="border">2024-04-09</td>
            <td className="border">Meeting with client</td>
          </tr>
          <tr className="border">
            <td className="border">2024-04-10</td>
            <td className="border">Designing UI mockups</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ManDaysDetails;
