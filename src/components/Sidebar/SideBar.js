import React, { useContext } from "react";
import {
  PiCaretDoubleLeftLight,
  PiCaretDoubleRightLight,
  PiContactlessPayment,
} from "react-icons/pi";
import { GoProjectRoadmap } from "react-icons/go";
import { GrUserManager } from "react-icons/gr";
import { MdManageAccounts, MdDashboard } from "react-icons/md";
import SidebarItem from "./SideBarItems";
import { ThemeContext } from "../../ContextApi/ThemeContext";
import { useSelector } from "react-redux";

const SideBar = () => {
  const userEmail = localStorage.getItem("user");
  const role = localStorage.getItem("role");
  const department = localStorage.getItem("department");
  const { sideBarOpen, setSideBarOpen } = useContext(ThemeContext);
  const darkMode = useSelector((store) => store.darkMode.isDarkMode);

  const isSalesDept = department == "1";
  const isOperationDept = department == "2";
  const isFinanceDept = department == "3";

  const isAssManagerRole = role === "Ass.Manager";
  const isDirectorRole = role === "Director";
  const isHodRole = role === "HOD";
  const isManagerRole = role === "Manager";
  const isSrManagerRole = role === "Sr.Manager";
  const isSuperUserRole = role === "superuser";

  const getDashboardLink = () => {
    if (
      isDirectorRole ||
      isSuperUserRole ||
      isHodRole ||
      isSrManagerRole ||
      isManagerRole ||
      isAssManagerRole
    ) {
      return "/dashboard";
    }
    if (userEmail === "admin@unimrkt.com") return "/Admin-dashboard";

    switch (department) {
      case "1":
        return "/sales-projects";
      case "2":
        return "/operation-projects";
      // case "3":
      //   return "/finance-projects";
      default:
        return "/default-projects";
    }
  };

  const dashboardLink = getDashboardLink();

  const financeItems = [
    { icon: PiContactlessPayment, label: "CBR", link: "/cbr" },
    { icon: PiContactlessPayment, label: "ABR", link: "/abr" },
    { icon: GoProjectRoadmap, label: "Report", link: "/report" },
  ];

  const adminItems = [
    { icon: GrUserManager, label: "User Management", link: "/Admin-dashboard" },
    { icon: MdManageAccounts, label: "Role Management", link: "/Management-Role" },
  ];

  const commonItems = [
    !isFinanceDept && isOperationDept ? { icon: GoProjectRoadmap, label: "Project", link: "/operation-projects" } : { icon: GoProjectRoadmap, label: "Project", link: "/sales-projects" },
  ].filter(Boolean); // Removes undefined values

  return (
    <div className="shadow-slate-400 flex justify-between w-full">
      <div className="bg-[#bd1d1d] text-white h-screen min-h-dvh duration-300 relative flex flex-col gap-2 w-10/12 pl-2 pr-2">
        {((isDirectorRole || isSuperUserRole || isHodRole || isSrManagerRole || isManagerRole || isAssManagerRole) && !isFinanceDept) && (
          <SidebarItem icon={MdDashboard} label="Dashboard" link={dashboardLink} sideBarOpen={sideBarOpen} />
        )}

        {userEmail === "admin@unimrkt.com" &&
          adminItems.map((item, index) => (
            <SidebarItem key={index} icon={item.icon} label={item.label} link={item.link} sideBarOpen={sideBarOpen} />
          ))}

        {isFinanceDept
          ? financeItems.map((item, index) => (
              <SidebarItem key={index} icon={item.icon} label={item.label} link={item.link} sideBarOpen={sideBarOpen} />
            ))
          : commonItems.map((item, index) => (
              <SidebarItem key={index} icon={item.icon} label={item.label} link={item.link} sideBarOpen={sideBarOpen} />
            ))}
      </div>

      <div className="w-2/12">
        {sideBarOpen ? (
          <PiCaretDoubleLeftLight
            className={`top-4 text-base cursor-pointer absolute duration-300 font-extralight ${darkMode ? "text-white" : "text-black"}`}
            onClick={() => setSideBarOpen(!sideBarOpen)}
          />
        ) : (
          <PiCaretDoubleRightLight
            className={`top-4 text-base cursor-pointer absolute duration-300 font-extralight ${darkMode ? "text-white" : "text-black"}`}
            onClick={() => setSideBarOpen(!sideBarOpen)}
          />
        )}
      </div>
    </div>
  );
};

export default SideBar;
