import React, { useEffect, useState, useMemo } from "react";
import { getWithAuth } from "../provider/helper/axios";
import { ALLWORKANDMENDAYS } from "../../utils/constants/urls";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import CanvasJSReact from "@canvasjs/react-charts";
import ExportCSV from "../project/ExportExcel";
import { TiFilter } from "react-icons/ti";
import { LuDownload } from "react-icons/lu";
import { isDirectorRole, isTeamLead } from "../config/Role";
import { isOperationDept } from "../config/Departments";

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const TLWiseReport = ({
  projectData,
  userList,
  projectType,
  filteredData,
  setFilteredData,
}) => {
  const [tLList, setTLList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [totalWork, setTotalWork] = useState([]);
  const [showChart, setShowChart] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showFilter, setShowFilter] = useState(false);
  const [filterOptions, setFilterOptions] = useState([]);

  useEffect(() => {
    if (projectType.length > 0) {
      let filtered = projectData.filter(
        (item) =>
          item?.project_type?.name.toLowerCase() ===
          projectType[0]?.label.toLowerCase()
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(projectData);
    }
  }, [projectType, projectData, setFilteredData]);

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const userListOperationDepartment = userList.filter(
          (user) => user?.department?.id == isOperationDept
          // && user?.reports_to?.id == userRole
        );
        
        if (isDirectorRole) {
          const userListOperationDepartment = userList.filter(
            (user) =>
              user?.department?.id == isOperationDept &&
            user.role.name === isTeamLead
          );
          setTLList(userListOperationDepartment);
        } else {
          let additionalUsers = userList.filter((user) =>
            userListOperationDepartment.some(
              (am) =>
                user.reports_to?.id == am.user_role.id &&
                user.role.name === isTeamLead
            )
          );
          let combinedList = additionalUsers;
          setTLList(combinedList);
        }
      } catch (error) {
        console.error("Error fetching user roles:", error);
      }
    };
    fetchUserRole();
  }, [userList]);

  useEffect(() => {
    const TotalMenDays = async () => {
      const response = await getWithAuth(ALLWORKANDMENDAYS);
      const data = response?.data;
      setTotalWork(data);
    };
    TotalMenDays();
  }, []);

  // Memoize segregatedProjects to avoid recalculating on every render
  const segregatedProjects = useMemo(() => {
    const projectInField = filteredData.filter(
      (item) => item.status === "In Progress" || item.status === "To Be Started"
    );

    const TOTALRPE = filteredData.filter((item) => item.status === "Completed");

    return tLList.map((tl) => {
      const projectsForTl = projectInField.filter(
        (project) => project.project_assigned_to_teamlead?.some((item)=>item.id == tl.id)
      );

      const projectsForTOTALRPE = TOTALRPE.filter(
        (project) => project.project_assigned_to_teamlead?.some((item)=>item.id == tl.id)
      );

      const totalRpeData = projectsForTOTALRPE.reduce(
        (acc, project) => {
          const achievement = parseFloat(project.total_achievement || 0);
          const cpi = parseFloat(project.cpi || 0);
          const manDays = parseFloat(project.man_days || 0);

          if (achievement > 0 && cpi > 0 && manDays > 0) {
            acc.totalRevenue += achievement * cpi;
            acc.totalManDays += manDays;
          }

          return acc;
        },
        { totalRevenue: 0, totalManDays: 0 }
      );

      const totalRpeSum =
        totalRpeData.totalManDays > 0
          ? totalRpeData.totalRevenue / totalRpeData.totalManDays
          : 0;

      const currentRpeData = projectsForTl.reduce(
        (acc, project) => {
          const achievement = parseFloat(project.total_achievement || 0);
          const cpi = parseFloat(project.cpi || 0);
          const manDays = parseFloat(project.man_days || 0);

          if (achievement > 0 && cpi > 0 && manDays > 0) {
            acc.totalRevenue += achievement * cpi;
            acc.totalManDays += manDays;
          }

          return acc;
        },
        { totalRevenue: 0, totalManDays: 0 }
      );

      const CurrentRpeSum =
        currentRpeData.totalManDays > 0
          ? currentRpeData.totalRevenue / currentRpeData.totalManDays
          : 0;

      return {
        TLName: tl.user.name,
        tlId: tl.id,
        projects: projectsForTl,
        TOTALRPE: totalRpeSum,
        CURRENTRPE: CurrentRpeSum,
      };
    });
  }, [tLList, filteredData]);

  // Filter and sort TL list
  const filteredTl = useMemo(() => {
    let filtered = segregatedProjects.filter((tl) =>
      tl?.TLName?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (selectedItem?.value === "A-Z") {
      filtered = filtered.sort((a, b) => a.TLName.localeCompare(b.TLName));
    } else if (selectedItem?.value === "Z-A") {
      filtered = filtered.sort((a, b) => b.TLName.localeCompare(a.TLName));
    } else if (selectedItem?.value === "High-Low") {
      filtered = filtered.sort((a, b) => b.CURRENTRPE - a.CURRENTRPE);
    } else if (selectedItem?.value === "Low-High") {
      filtered = filtered.sort((a, b) => a.CURRENTRPE - b.CURRENTRPE);
    } else if (selectedItem?.value === "T High-Low") {
      filtered = filtered.sort(
        (a, b) => parseFloat(b.TOTALRPE) - parseFloat(a.TOTALRPE)
      );
    } else if (selectedItem?.value === "T Low-High") {
      filtered = filtered.sort(
        (a, b) => parseFloat(a.TOTALRPE) - parseFloat(b.TOTALRPE)
      );
    }

    return filtered;
  }, [searchQuery, selectedItem, segregatedProjects]);

  const chartOptions = {
    data: [
      {
        type: "column",
        dataPoints: filteredTl.map((tl) => ({
          label: tl.TLName,
          y: parseFloat(tl.CURRENTRPE?.toFixed(2)),
        })),
      },
    ],
  };

  const handleFilter = () => {
    setShowFilter(!showFilter);
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

  const handleSelectOption = (selectedOption) => {
    setSelectedItem(selectedOption);
  };

  return (
    <div className="overflow-x-auto no-scrollbar">
      <div className="relative w-full">
        <div className="flex justify-between items-center mb-2 w-full">
          <div className="w-2/5">
            <h3 className="text-base">TL Wise RPE Report</h3>
          </div>
          <div className="w-1/5">
            <input
              type="text"
              placeholder="Search TL"
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
                onClick={handleFilter}
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
                data={filteredTl}
                name={<LuDownload />}
                downloadName={"TL_RPE.csv"}
              />
            </div>
          </div>
        </div>
      </div>
      {!showChart ? (
        <div className="no-scrollbar">
          <CanvasJSChart options={chartOptions} />
        </div>
      ) : (
        <table className="min-w-full bg-white border border-gray-200 divide-y divide-gray-200 text-xs">
          <thead className="bg-gray-50 text-sm">
            <tr>
              <th>TL Name</th>
              <th>Total RPE</th>
              <th>Project in field</th>
              {/* <th>Current RPE</th> */}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-center text-xs">
            {filteredTl.map((tl, ind) => (
              <tr className="bg-white" key={ind}>
                <td className="px-4 py-2 whitespace-nowrap text-left text-sm text-black">
                  {tl.TLName}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-black text-right">
                  ${tl.TOTALRPE.toFixed(2)}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-black">
                  {tl.projects.length}
                </td>

                {/* <td className="px-4 py-2 whitespace-nowrap text-sm text-black text-right">
                  ${tl.CURRENTRPE.toFixed(2)}
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TLWiseReport;
