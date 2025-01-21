import React, { useEffect, useState } from "react";
import CanvasJSReact from "@canvasjs/react-charts";
import { USERROLE } from "../../utils/urls";
import { getWithAuth } from "../provider/helper/axios";
import { ManWorkPerDays } from "../fetchApis/projects/perDayManWork/GetDaysManWork";
// import { isTeamLead } from "../config/Role";
import { useSelector } from "react-redux";

const CanvasJSChart = CanvasJSReact.CanvasJSChart;
const RPEWeek = ({ projectData }) => {
  const role = localStorage.getItem("role");
  const isViewerUserRole = role !== "viewer";
  const isSuperUserRole = role === "superUser";
  const isDirectorRole = role === "Director";
  const isHodRole = role === "HOD";
  const isTeamLeadRole = role === "Team Lead";
  const allManagerRolesRole = ["Sr.Manager", "Ass.Manager", "Manager"].includes(
    role
  );
  const department = localStorage.getItem("department");
  const isSuperUserDepartment = [1, 2, 3, 4];
  const isSalesDept = "1";
  const isOperationDept = "2";
  const isFinanceDept = "3";
  const isPreSalesDept = "4";
  const [allUserList, setAllUserList] = useState([]);
  const [tlListArray, setTlListArray] = useState([]);
  const [manWorkPerDaysData, setManWorkPerDaysData] = useState([]);

  const userData = useSelector((store) => store.userData.users);
  useEffect(() => {
    const fetchUserRole = async () => {
      // const userRole = await getWithAuth(USERROLE);
      setAllUserList(userData);
      const tlList = userData.filter((item) => item.role.name === isTeamLeadRole);
      setTlListArray(tlList.map((item) => item.user_role));
    };
    fetchUserRole();
  }, []);

  useEffect(() => {
    const fetchManWorkPerDays = async () => {
      const processedData = await Promise.all(
        tlListArray.map(async (user) => {
          let totalWork = 0;
          let totalCPI = 0;

          for (const project of projectData) {
            const response = await ManWorkPerDays({
              project_id: project.id,
            });

            if (response?.status) {
              const userEntries = response.data
                .filter((entry) => entry.updated_by.id === user.id)
                .sort(
                  (a, b) => new Date(b.update_date) - new Date(a.update_date)
                )
                .slice(0, 5);

              const userTotalWork = userEntries.reduce(
                (acc, entry) => acc + entry.total_man_days,
                0
              );

              const projectCPI =
                projectData.find((proj) => proj.id === project.id)?.cpi || 0;

              if (projectCPI) {
                totalWork += userTotalWork;
                totalCPI += userTotalWork * projectCPI;
              }
            }
          }

          return {
            userName: user || "Unknown",
            totalCPI: totalCPI || 0,
          };
        })
      );

      setManWorkPerDaysData(processedData);
    };

    if (projectData.length > 0 && tlListArray.length > 0) {
      fetchManWorkPerDays();
    }
  }, [projectData, tlListArray]);

  // Prepare CanvasJS data
  const chartData = manWorkPerDaysData.map((data) => ({
    label: data.userName.name,
    y: data.totalCPI,
  }));

  const options = {
    title: {
      text: "Total Work * CPI per User",
    },
    axisX: {
      title: "User",
      interval: 1,
    },
    axisY: {
      title: "Total Work * CPI",
    },
    data: [
      {
        type: "line",
        dataPoints: chartData,
      },
    ],
  };

  return (
    <div className="w-full">
      {manWorkPerDaysData.length > 0 ? (
        <CanvasJSChart options={options} height={300} />
      ) : (
        <p>No valid data available for the selected projects and users.</p>
      )}
    </div>
  );
};

export default RPEWeek;
