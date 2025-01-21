import React, { useEffect, useState, useMemo } from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import CanvasJSReact from "@canvasjs/react-charts";
import { LuDownload } from "react-icons/lu";
import ExportCSV from "../project/ExportExcel";
import { TiFilter } from "react-icons/ti";

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const ClientWiseRPE = ({
  projectData,
  setProjectType,
  projectType,
  filteredData,
  setFilteredData,
  setClientInduvisualShow,
  setClientName,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showChart, setShowChart] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  const [sortedClients, setSortedClients] = useState([]);
  const [filterOptions, setFilterOptions] = useState([]);

  useEffect(() => {
    if (projectType.length > 0) {
      const filtered = projectData.filter((item) => {
        item.project_type?.name.toLowerCase() ===
          projectType[0]?.label.toLowerCase();
      });
      setFilteredData(filtered);
    } else {
      setFilteredData(projectData);
    }
  }, [projectType, projectData, setFilteredData]);

  // Memoize the calculation of clientRPEList to avoid recalculating on every render
  const clientRPEList = useMemo(() => {
    let catiProject = "CATI";
    const calculateOnlyForCati = filteredData.filter(
      (item) => item?.project_type?.name.toLowerCase() === catiProject.toLowerCase()
    );
    const clientData = calculateOnlyForCati.reduce((acc, item) => {
      const clientName = item?.clients?.name;
      const achieveTarget = parseFloat(item.total_achievement);
      const cpi = parseFloat(item.cpi);
      const manDays = parseFloat(item.man_days);
      if (!acc[clientName]) {
        acc[clientName] = {
          totalRevenue: 0,
          totalManDays: 0,
        };
      }
      const revenue = achieveTarget * cpi;
      if (!isNaN(revenue) && revenue > 0) {
        acc[clientName].totalRevenue += revenue;
        if (!isNaN(manDays) && manDays > 0) {
          acc[clientName].totalManDays += manDays;
        }
      }
      return acc;
    }, {});

    return Object.keys(clientData).map((clientName) => {
      const client = clientData[clientName];
      const perEmployeeRevenue = client.totalManDays
        ? client.totalRevenue / client.totalManDays
        : 0;
      return {
        clientName,
        totalRevenue: client.totalRevenue.toFixed(2),
        perEmployeeRevenue: perEmployeeRevenue.toFixed(2),
      };
    });
  }, [filteredData]);
  // const clientRPEList = useMemo(() => {
  //   const clientData = filteredData.reduce((acc, item) => {
  //     const clientName = item?.clients?.name?.trim() || "Unknown Client";

  //     // Debugging: Check each item's data
  //     if (clientName === "Harmon Research") {
  //       console.log("Item for Harmon Research:", item);
  //     }

  //     const achieveTarget = parseFloat(item?.total_achievement) || 0;
  //     const cpi = parseFloat(item?.cpi) || 0;
  //     const manDays = parseFloat(item?.man_days) || 0;

  //     if (!acc[clientName]) {
  //       acc[clientName] = { totalRevenue: 0, totalManDays: 0 };
  //     }

  //     // Calculate revenue
  //     const revenue = achieveTarget * cpi;

  //     // Update totals if valid
  //     if (!isNaN(revenue) && revenue > 0) {
  //       acc[clientName].totalRevenue += revenue;
  //     }

  //     if (!isNaN(manDays) && manDays > 0) {
  //       acc[clientName].totalManDays += manDays;
  //     }

  //     return acc;
  //   }, {});

  //   // Transform aggregated data into the final format
  //   return Object.keys(clientData).map((clientName) => {
  //     const client = clientData[clientName];

  //     const perEmployeeRevenue =
  //       client.totalManDays > 0
  //         ? client.totalRevenue / client.totalManDays
  //         : 0;

  //     // Debugging: Check final values for each client
  //     if (clientName === "Harmon Research") {
  //       console.log("Aggregated Data for Harmon Research:", client);
  //     }

  //     return {
  //       clientName,
  //       totalRevenue: client.totalRevenue.toFixed(2),
  //       perEmployeeRevenue: perEmployeeRevenue.toFixed(2),
  //     };
  //   });
  // }, [filteredData]);

  // Apply sorting based on selected filter
  useEffect(() => {
    let sortedList = [...clientRPEList];

    if (selectedItem?.value === "A-Z") {
      sortedList.sort((a, b) => a.clientName.localeCompare(b.clientName));
    } else if (selectedItem?.value === "Z-A") {
      sortedList.sort((a, b) => b.clientName.localeCompare(a.clientName));
    } else if (selectedItem?.value === "High-Low") {
      sortedList.sort(
        (a, b) =>
          parseFloat(b.perEmployeeRevenue) - parseFloat(a.perEmployeeRevenue)
      );
    } else if (selectedItem?.value === "Low-High") {
      sortedList.sort(
        (a, b) =>
          parseFloat(a.perEmployeeRevenue) - parseFloat(b.perEmployeeRevenue)
      );
    } else if (selectedItem?.value === "T High-Low") {
      sortedList.sort(
        (a, b) => parseFloat(b.totalRevenue) - parseFloat(a.totalRevenue)
      );
    } else if (selectedItem?.value === "T Low-High") {
      sortedList.sort(
        (a, b) => parseFloat(a.totalRevenue) - parseFloat(b.totalRevenue)
      );
    }

    setSortedClients(sortedList);
  }, [selectedItem, clientRPEList]);

  // Filter the clients based on the search query
  const filteredClients = sortedClients.filter((client) =>
    client.clientName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Bar Chart options
  const chartOptions = {
    data: [
      {
        type: "column",
        dataPoints: filteredClients.map((client) => ({
          label: client.clientName,
          y: parseFloat(client?.perEmployeeRevenue),
        })),
      },
    ],
  };

  useEffect(() => {
    if (showChart) {
      const filterOptionsValue = [
        { value: "A-Z", label: "Name A-Z" },
        { value: "Z-A", label: "Name Z-A" },
        { value: "High-Low", label: "RPE High-Low" },
        { value: "Low-High", label: "RPE Low-High" },
        { value: "T High-Low", label: "Total High-Low" },
        { value: "T Low-High", label: "Total Low-High" },
      ];
      setFilterOptions(filterOptionsValue);
    } else {
      const filterOptionsValue = [
        { value: "High-Low", label: "RPE High-Low" },
        { value: "Low-High", label: "RPE Low-High" },
      ];
      setFilterOptions(filterOptionsValue);
    }
  }, [showChart]);

  const HandleFilter = () => {
    setShowFilter(!showFilter);
  };

  const handleSelectOption = (selectedOption) => {
    setSelectedItem(selectedOption);
  };

  const handleClientInduvisualReport = (client) => {
    setClientInduvisualShow(true);
    setClientName(client?.clientName);
  };

  return (
    <div className="relative w-full">
      <div className="relative w-full">
        <div className="flex justify-between items-center mb-2 w-full">
          <div className="w-2/5">
            <h3 className="text-base">Client Wise RPE Report</h3>
          </div>
          <div className="w-1/5">
            <input
              type="text"
              placeholder="Search Client"
              className="border p-1 rounded-md text-xs w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="w-2/5 flex justify-end items-center relative">
            <FormGroup>
              <FormControlLabel
                className="text-xs"
                control={
                  <Switch
                    onChange={() => setShowChart(!showChart)}
                    defaultChecked
                    size="small"
                  />
                }
                label={
                  <span className="text-xs w-full inline-block">
                    Chart On/Off
                  </span>
                }
              />
            </FormGroup>
            <div className="relative w-1/12 h-4">
              <TiFilter
                className="cursor-pointer text-base"
                onClick={HandleFilter}
              />
              {showFilter && (
                <div className="absolute -right-8 z-40 bg-gray-300 shadow-xl w-32 top-6">
                  {filterOptions.map((option) => (
                    <div
                      key={option.value}
                      onClick={() => handleSelectOption(option)} // Handle option select
                      className="cursor-pointer p-2 hover:bg-gray-100 border-b last:border-b-0 text-sm"
                    >
                      {option.label}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="float-right text-right w-1/6">
              <ExportCSV
                data={filteredClients}
                name={<LuDownload />}
                downloadName={"Client_RPE.csv"}
              />
            </div>
          </div>
        </div>
      </div>

      {!showChart ? (
        <CanvasJSChart options={chartOptions} />
      ) : (
        <table className="min-w-full bg-white border border-gray-200 divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50 p-2">
            <tr>
              <th>Client Name</th>
              <th>Total Revenue</th>
              <th>Revenue Per Employee</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-center">
            {filteredClients.map((client, ind) => (
              <tr
                className="bg-white text-sm cursor-pointer"
                key={ind}
                onClick={() => handleClientInduvisualReport(client)}
              >
                <td className="px-4 py-2 whitespace-nowrap text-sm text-black text-left">
                  {client.clientName}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-black text-right">
                  ${client.totalRevenue}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-black text-right">
                  ${client.perEmployeeRevenue}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ClientWiseRPE;
