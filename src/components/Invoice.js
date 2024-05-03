import React from "react";
import logo from "../assets/mainlogo.png";
import { Link } from "react-router-dom";
const Invoice = (record) => {
  console.log("🚀 ~ Invoice ~ record:", record);

  return (
    <div className="container mx-auto border my-8">
      <div className="bg-[#bd1d1d] text-white p-2 pl-4">
        <h1 className="text-2xl font-bold mb-4">Unimrkt/PR/CBR/1.1</h1>
        <h2 className="text-lg font-bold mb-4">Client Billing Requisition</h2>
      </div>
      <div className="overflow-x-auto p-4">
        <table className="table-auto w-full border-collapse">
          <tbody>
            <tr>
              <td className="border px-4 py-2 font-bold">Name of Client</td>
              <td className="border px-4 py-2">John Doe</td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-bold">Project Name</td>
              <td className="border px-4 py-2">Project XYZ</td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-bold">
                Client Purchase order no. (if any)
              </td>
              <td className="border px-4 py-2">PO123456</td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-bold">Project Code</td>
              <td className="border px-4 py-2">PRJ123</td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-bold">
                Client : Contact Person
              </td>
              <td className="border px-4 py-2">John Doe</td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-bold">Email Address</td>
              <td className="border px-4 py-2">john.doe@example.com</td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-bold">
                Cc : Email IDs (if any)
              </td>
              <td className="border px-4 py-2">
                cc1@example.com, cc2@example.com
              </td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-bold">
                # of Surveys as per Intial SOW
              </td>
              <td className="border px-4 py-2">10</td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-bold">
                # Addnl Surveys as per client confirmation (if any)
              </td>
              <td className="border px-4 py-2">5</td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-bold">
                # of Total Surveys to be billed to client
              </td>
              <td className="border px-4 py-2">15</td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-bold">
                Other Specific billing instructions (if any)
              </td>
              <td className="border px-4 py-2">N/A</td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-bold">Sales Owner</td>
              <td className="border px-4 py-2">Jane Smith</td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-bold">
                Name of Project Manager
              </td>
              <td className="border px-4 py-2">Michael Johnson</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Invoice;
