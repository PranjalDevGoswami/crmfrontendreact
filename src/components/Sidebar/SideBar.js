import React from "react";
import {
  PiCaretDoubleLeftLight,
  PiCaretDoubleRightLight,
} from "react-icons/pi";
import { GoProjectRoadmap } from "react-icons/go";
import { GrUserManager } from "react-icons/gr";
import { MdManageAccounts, MdDashboard } from "react-icons/md";
import SidebarItem from "./SideBarItems";
import { useDispatch, useSelector } from "react-redux";
import { toggleSideBar } from "../../../utils/slices/themeSettingSlice";
import { TbReportAnalytics } from "react-icons/tb";
import { VERSION_NUMBER } from "../../../utils/constants/urls";

const SideBar = () => {
  const themeSetting = useSelector((store) => store.themeSetting);
  const dispatch = useDispatch();

  const userEmail = localStorage.getItem("user");
  const role = localStorage.getItem("role");
  const department = localStorage.getItem("department");
  const isAssManagerRole = role === "Ass.Manager";
  const isDirectorRole = role === "Director";
  const isHodRole = role === "HOD";
  const isManagerRole = role === "Manager";
  const isSrManagerRole = role === "Sr.Manager";
  const isSuperUserRole = role === "superuser";
  const isSalesDept = "1";
  const isOperationDept = "2";
  const isFinanceDept = "3";

  const getDashboardLink = () => {
    if (
      isDirectorRole ||
      isSuperUserRole ||
      isHodRole ||
      isSrManagerRole ||
      isManagerRole ||
      isAssManagerRole
    ) {
      return "/project-dashboard";
    }

    if (userEmail === "admin@unimrkt.com") return "/admin-panel";

    switch (department) {
      case isSalesDept:
        return "/sales-projects";
      case isOperationDept:
        return "/operation-projects";
      case isFinanceDept:
        return "/project-report";
      default:
        return "/default-projects";
    }
  };

  const dashboardLink = getDashboardLink();

  const getCommonItemLink = (label) => {
    if (userEmail === "admin@unimrkt.com") return "/admin-panel";
    if (department === isSalesDept) {
      if (label === "Project") return "/sales-projects";
    } else if (department === isOperationDept) {
      if (label === "Project") return "/operation-projects";
    } else if (department === isFinanceDept) {
      if (label === "CBR Project") {
        return "/finance-projects/cbr";
      } else {
        if (label === "ABR Project") return "/finance-projects/abr";
      }
    }

    // Handle "Report" label
    if (
      (department === isFinanceDept ||
        department === isOperationDept ||
        department === isSalesDept) &&
      (isDirectorRole || isHodRole || (isAssManagerRole && label === "Report"))
    ) {
      return "/project-report";
    }

    return "/default-panel";
  };

  const adminItems = [
    { icon: GrUserManager, label: "User Management", link: "/Admin-panel" },
    {
      icon: MdManageAccounts,
      label: "Role Management",
      link: "/management-Role",
    },
  ];

  const commonItems = [
    {
      icon: GoProjectRoadmap,
      label: "Project",
      link: getCommonItemLink("Project"),
    },
    {
      icon: TbReportAnalytics,
      label: "Report",
      link: getCommonItemLink("Report"),
    },
  ];
  const financeItem = [
    {
      icon: GoProjectRoadmap,
      label: "CBR Project",
      link: getCommonItemLink("CBR Project"),
    },
    {
      icon: GoProjectRoadmap,
      label: "ABR Project",
      link: getCommonItemLink("ABR Project"),
    },
    {
      icon: TbReportAnalytics,
      label: "Report",
      link: getCommonItemLink("Report"),
    },
  ];

  return (
    <div className="shadow-slate-400 flex justify-between w-full">
      <div
        className={
          "bg-[#bd1d1d] text-white h-screen min-h-dvh duration-300 relative flex items-start pl-2 pr-2 flex-col gap-2 w-10/12"
        }
      >
        {/* {!isFinanceDept &&
          (isDirectorRole ||
            isSuperUserRole ||
            isHodRole ||
            isSrManagerRole ||
            isManagerRole ||
            isAssManagerRole) && (
            <SidebarItem
              icon={MdDashboard}
              label="Dashboard"
              link={dashboardLink}
            />
          )}
        {!isFinanceDept &&
          userEmail === "admin@unimrkt.com" &&
          adminItems.map((item, index) => (
            <SidebarItem
              key={index}
              icon={item.icon}
              label={item.label}
              link={item.link}
            />
          ))}
        {!isFinanceDept
          ? commonItems.map((item, index) => (
              <SidebarItem
                key={index}
                icon={item.icon}
                label={item.label}
                link={item.link}
              />
            ))
          : financeItem.map((item, index) => (
              <SidebarItem
                key={index}
                icon={item.icon}
                label={item.label}
                link={item.link}
              />
            ))} */}
        {department !== isFinanceDept &&
          (isDirectorRole ||
            isSuperUserRole ||
            isHodRole ||
            isSrManagerRole ||
            isManagerRole ||
            isAssManagerRole) && (
            <SidebarItem
              icon={MdDashboard}
              label="Dashboard"
              link={dashboardLink}
            />
          )}

        {userEmail === "admin@unimrkt.com" &&
          department !== isFinanceDept &&
          adminItems.map((item, index) => (
            <SidebarItem
              key={index}
              icon={item.icon}
              label={item.label}
              link={item.link}
            />
          ))}

        {department === isFinanceDept
          ? financeItem.map((item, index) => (
              <SidebarItem
                key={index}
                icon={item.icon}
                label={item.label}
                link={item.link}
              />
            ))
          : commonItems.map((item, index) => (
              <SidebarItem
                key={index}
                icon={item.icon}
                label={item.label}
                link={item.link}
              />
            ))}
        <div className="fixed bottom-0 text-xs"> {VERSION_NUMBER}</div>
      </div>
      <div className="w-2/12">
        {themeSetting.isSidebarOpen ? (
          <PiCaretDoubleLeftLight
            className={`top-2 text-base text-black cursor-pointer absolute duration-300 font-extralight ${
              themeSetting.isDarkMode ? "text-white" : "text-black"
            }`}
            onClick={() => dispatch(toggleSideBar())}
          />
        ) : (
          <PiCaretDoubleRightLight
            className={`top-2 text-base text-black cursor-pointer absolute duration-300 font-extralight ${
              themeSetting.isDarkMode ? "text-white" : "text-black"
            }`}
            onClick={() => dispatch(toggleSideBar())}
          />
        )}
      </div>
    </div>
  );
};

export default SideBar;
