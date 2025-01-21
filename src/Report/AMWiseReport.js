import React, { useEffect, useState, useMemo } from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import CanvasJSReact from "@canvasjs/react-charts";
import ExportCSV from "../project/ExportExcel";
import { TiFilter } from "react-icons/ti";
import { LuDownload } from "react-icons/lu";

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const AMWiseReport = ({
  projectData,
  userList,
  projectType,
  setFilteredData,
}) => {
  const role = localStorage.getItem("role");
  const isDirectorRole = role === "Director";
  const allManagerRoles = ["Sr.Manager", "Ass.Manager", "Manager"];
  const isOperationDept = "2";
  const [amList, setAmList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showChart, setShowChart] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  const [filteredAm, setFilteredAm] = useState([]);
  const [filterOptions, setFilterOptions] = useState([]);
  const userRole = localStorage.getItem("userrole");

  useEffect(() => {
    if (projectType.length > 0) {
      let filtered = projectData.filter(
        (item) =>
          item?.project_type?.name.toLowerCase() ===
          projectType[0].label.toLowerCase()
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
          (item) => item?.department?.id == isOperationDept
        );
        
        const AMList = userListOperationDepartment?.filter((item) =>
          allManagerRoles.includes(item?.role?.name)
      );
      if (isDirectorRole) {        
        setAmList(AMList);
      } else {
        let AmReportToCurrentUser = AMList?.filter(
          (am) =>
            am?.reports_to?.id == userRole || am?.user_role?.id == userRole
        );

          let additionalUsers = userList?.filter((user) =>
            AmReportToCurrentUser.some(
              (am) =>
                user?.reports_to?.id == am?.user_role?.id &&
              allManagerRoles.includes(user?.role.name)
            )
          );
          let combinedList = [...AmReportToCurrentUser, ...additionalUsers];
          setAmList(combinedList);
        }
      } catch (error) {
        console.error("Error fetching user roles:", error);
      }
    };
    fetchUserRole();
  }, [userList]);

  // Memoize segregated projects to avoid recalculating on every render
  const segregatedProjects = useMemo(() => {
    return amList.map((am) => {
      const projectsForAm = projectData.filter((project) => 
        project?.assigned_to?.id === am?.user_role?.id ||
        project?.project_assigned_to_teamlead?.some((tl) => tl?.id === am?.user_role?.id)
      );
      
      if (projectsForAm.length == 0) {
        // If no projects for AM, mark RPE values as 0
        return {
          amName: am.user.name,
          amId: am.user_role.id,
          projects: [],
          TOTALRPE: 0,
          CURRENTRPE: 0,
        };
      } else {
        const totalRpeData = projectsForAm.reduce(
          (acc, project) => {
            const sample = parseFloat(project.sample || project?.project_samples?.map((item)=>item.sample) || 0);
            const cpi = parseFloat(project.cpi || 0);
            const manDays = parseFloat(project.man_days || project?.project_samples?.map((item)=>item.cpi) || 0);
            if (sample > 0 && cpi > 0 && manDays > 0) {
              acc.totalRevenue += sample * cpi;
              acc.totalManDays += manDays;
              acc.totalSample += sample;
            }
            return acc;
          },
          { totalRevenue: 0, totalManDays: 0, totalSample: 0 }
        );

        return {
          amName: am.user.name,
          amId: am.user_role.id,
          projects: projectsForAm,
          TOTALRPE:
            totalRpeData.totalManDays > 0
              ? totalRpeData.totalRevenue / totalRpeData.totalManDays
              : 0,
          CURRENTRPE:
            totalRpeData.totalManDays > 0
              ? totalRpeData.totalSample / totalRpeData.totalManDays
              : 0,
        };
      }
    });
  }, [amList, projectData]);

  useEffect(() => {
    let filtered = segregatedProjects.filter((am) =>
      am?.amName?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (selectedItem?.value === "A-Z") {
      filtered = filtered.sort((a, b) => a.amName.localeCompare(b.amName));
    } else if (selectedItem?.value === "Z-A") {
      filtered = filtered.sort((a, b) => b.amName.localeCompare(a.amName));
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

    setFilteredAm(filtered);
  }, [searchQuery, selectedItem, segregatedProjects]);

  const chartOptions = {
    data: [
      {
        type: "column",
        dataPoints: filteredAm.map((am) => ({
          label: am.amName,
          y: parseFloat(am.CURRENTRPE?.toFixed(2)),
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
    <div className="">
      <div className="relative w-full">
        <div className="flex justify-between items-center mb-2 w-full">
          <div className="w-2/5">
            <h3 className="text-base">AM Wise RPE Report</h3>
          </div>
          <div className="w-1/5">
            <input
              type="text"
              placeholder="Search AM"
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
                data={filteredAm}
                name={<LuDownload />}
                downloadName={"AM_RPE.csv"}
              />
            </div>
          </div>
        </div>
      </div>

      {!showChart ? (
        <div>
          <CanvasJSChart options={chartOptions} />
        </div>
      ) : (
        <table className="min-w-full bg-white border border-gray-200 divide-y divide-gray-200 text-xs">
          <thead className="bg-gray-50 text-sm">
            <tr>
              <th>AM Name</th>
              <th>Total RPE</th>
              <th>Project in field</th>
              {/* <th>Current RPE</th> */}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-center text-xs">
            {filteredAm.map((am, ind) => (
              <tr className="bg-white" key={ind}>
                <td className="px-4 py-2 whitespace-nowrap text-left text-sm text-black">
                  {am.amName}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-black">
                  {am.TOTALRPE.toFixed(2)}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-black">
                  {am.projects.length}
                </td>

                {/* <td className="px-4 py-2 whitespace-nowrap text-sm text-black">
                  {am.CURRENTRPE.toFixed(2)}
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AMWiseReport;
