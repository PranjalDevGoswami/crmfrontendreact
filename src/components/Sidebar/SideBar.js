import React, { useContext, useState } from "react";
import {
  PiCaretDoubleLeftLight,
  PiCaretDoubleRightLight,
} from "react-icons/pi";
import { GoProjectRoadmap } from "react-icons/go";
import { GrUserManager } from "react-icons/gr";
import { MdManageAccounts, MdDashboard } from "react-icons/md";
import SidebarItem from "./SideBarItems";
import { ThemeContext } from "../../ContextApi/ThemeContext";
import {
  isAssManager,
  isDirector,
  isHod,
  isManager,
  isSrManager,
  isSuperUser,
} from "../../config/Role";
import {
  isFinanceDept,
  isOperationDept,
  isSalesDept,
} from "../../config/Departments";
import { useSelector } from "react-redux";

const SideBar = () => {
  const userEmail = localStorage.getItem("user");
  const { sideBarOpen, setSideBarOpen } = useContext(ThemeContext);
  const department = localStorage.getItem("department");
  const role = localStorage.getItem("role");
  const darkMode = useSelector((store) => store.darkMode.isDarkMode);

  const getDashboardLink = () => {
    if (
      role === isDirector ||
      role === isSuperUser ||
      role === isHod ||
      role === isSrManager ||
      role === isManager ||
      role === isAssManager
    ) {
      return "/report";
    }

    if (userEmail === "admin@unimrkt.com") return "/Admin-dashboard";

    switch (department) {
      case isSalesDept:
        return "/sales-dashboard";
      case isOperationDept:
        return "/operation-dashboard";
      case isFinanceDept:
        return "/finance-dashboard";
      default:
        return "/default-dashboard";
    }
  };

  const dashboardLink = getDashboardLink();

  const getCommonItemLink = (label) => {
    if (userEmail === "admin@unimrkt.com") return "/Admin-dashboard";

    switch (department) {
      case isSalesDept:
        return label === "Project" ? "/sales-dashboard" : "/sales-dashboard";
      case isOperationDept:
        return label === "Project"
          ? "/operation-dashboard"
          : "/operation-dashboard";
      case isFinanceDept:
        return label === "Project"
          ? "/finance-dashboard"
          : "/finance-dashboard";
      default:
        return "/default-dashboard";
    }
  };

  const adminItems = [
    { icon: GrUserManager, label: "User Management", link: "/Admin-dashboard" },
    {
      icon: MdManageAccounts,
      label: "Role Management",
      link: "/Management-Role",
    },
  ];

  const commonItems = [
    {
      icon: GoProjectRoadmap,
      label: "Project",
      link: getCommonItemLink("Project"),
    },
  ];

  return (
    <div className="shadow-slate-400 flex justify-between w-full">
      <div
        className={
          "bg-[#bd1d1d] text-white h-screen min-h-dvh duration-300 relative flex items-start pl-2 pr-2 flex-col gap-2 w-10/12"
        }
      >
        {(role === isDirector ||
          role === isSuperUser ||
          role === isHod ||
          role === isSrManager ||
          role === isManager ||
          role === isAssManager) && (
          <SidebarItem
            icon={MdDashboard}
            label="Dashboard"
            link={dashboardLink}
            sideBarOpen={sideBarOpen}
          />
        )}
        {userEmail === "admin@unimrkt.com" &&
          adminItems.map((item, index) => (
            <SidebarItem
              key={index}
              icon={item.icon}
              label={item.label}
              link={item.link}
              sideBarOpen={sideBarOpen}
            />
          ))}
        {commonItems.map((item, index) => (
          <SidebarItem
            key={index}
            icon={item.icon}
            label={item.label}
            link={item.link}
            sideBarOpen={sideBarOpen}
          />
        ))}
      </div>
      <div className="w-2/12">
        {sideBarOpen ? (
          <PiCaretDoubleLeftLight
            className={`top-4 text-base text-black cursor-pointer absolute duration-300 font-extralight ${
              darkMode ? "text-white" : "text-black"
            }`}
            onClick={() => setSideBarOpen(!sideBarOpen)}
          />
        ) : (
          <PiCaretDoubleRightLight
            className={`top-4 text-base text-black cursor-pointer absolute duration-300 font-extralight ${
              darkMode ? "text-white" : "text-black"
            }`}
            onClick={() => setSideBarOpen(!sideBarOpen)}
          />
        )}
      </div>
      {/* </div> */}
    </div>
  );
};

export default SideBar;
