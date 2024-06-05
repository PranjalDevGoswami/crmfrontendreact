import React, { useState } from "react";
import {
  PiCaretDoubleLeftLight,
  PiCaretDoubleRightLight,
} from "react-icons/pi";
import { GoProjectRoadmap } from "react-icons/go";
import { TbReport } from "react-icons/tb";
import { FaChartLine } from "react-icons/fa6";
import { GrUserManager } from "react-icons/gr";
import { MdManageAccounts, MdDashboard } from "react-icons/md";
import { userDetails } from "../user/userProfile";
import SidebarItem from "./SideBarItems";

const SideBar = () => {
  const userRole = userDetails();
  const userEmail = localStorage.getItem("user");
  const department = localStorage.getItem("department");
  const [sideBarOpen, setSideBarOpen] = useState(true);

  const getDashboardLink = () => {
    if (userEmail === "admin@unimrkt.com") return "/Admin-dashboard";
    switch (department) {
      case "1":
        return "/sales-dashboard";
      case "2":
        return "/operation-dashboard";
      case "3":
        return "/finance-dashboard";
      default:
        return "/default-dashboard";
    }
  };

  const dashboardLink = getDashboardLink();

  const adminItems = [
    { icon: GrUserManager, label: "User Management", link: "/Admin-dashboard" },
    {
      icon: MdManageAccounts,
      label: "Role Management",
      link: "/Management-Role",
    },
  ];

  const commonItems = [
    { icon: GoProjectRoadmap, label: "Project", link: dashboardLink },
    // { icon: TbReport, label: "Report", link: "/report" },
    // { icon: FaChartLine, label: "Chart", link: dashboardLink },
  ];

  return (
    <div className="shadow-slate-400 flex">
      <div className="bg-white"></div>
      <div
        className={`${
          sideBarOpen ? "lg:w-52 w-16" : "lg:w-16 w-16"
        } bg-[#bd1d1d] text-white h-screen min-h-dvh duration-300 relative flex flex-col gap-2`}
      >
        <SidebarItem
          icon={MdDashboard}
          label="Dashboard"
          link={dashboardLink}
          sideBarOpen={sideBarOpen}
        />
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
        <div>
          {sideBarOpen ? (
            <PiCaretDoubleLeftLight
              className={`top-4 ${
                sideBarOpen ? "left-52 lg:block hidden" : "left-16"
              } text-2xl text-black cursor-pointer absolute duration-300 font-extralight bg-white`}
              onClick={() => setSideBarOpen(!sideBarOpen)}
            />
          ) : (
            <PiCaretDoubleRightLight
              className={`top-4 ${
                sideBarOpen ? "left-52 lg:block hidden" : "left-16"
              } text-2xl text-black cursor-pointer absolute duration-300 font-extralight bg-white`}
              onClick={() => setSideBarOpen(!sideBarOpen)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
