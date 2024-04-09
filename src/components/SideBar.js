import React, { useState } from "react";

// import { PiCaretDoubleLeftLight, PiCaretDoubleRightLight } from "react-icons/fa";
import {
  PiCaretDoubleLeftLight,
  PiCaretDoubleRightLight,
} from "react-icons/pi";
import { GoProjectRoadmap } from "react-icons/go";
import { TbReport } from "react-icons/tb";
import { FaChartLine } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { userDetails } from "../user/userProfile";

const SideBar = () => {
  const userRole = userDetails();
  const [sideBarOpen, SetSideBarOpen] = useState(true);
  return (
    <div className="shadow-slate-400 flex">
      <div className="bg-white">
        {/* <img src={logo} alt="logo" className="w-[210px] h-[110px]" /> */}
      </div>
      <div
        className={`${
          sideBarOpen ? "w-52" : "w-16"
        }  bg-[#bd1d1d] text-white h-screen min-h-dvh duration-300 relative flex flex-col gap-4`}
      >
        <div className="flex justify-start overflow-hidden mt-4 pl-4">
          <MdDashboard className="text-2xl group" />
          <div
            className={`${
              sideBarOpen ? "block" : "hidden"
            } overflow-hidden duration-300 ml-4 float-right`}
          >
            {userRole.role === "OperationTeamLead" ? (
              <Link to="/operation-dashboard">Dashboard</Link>
            ) : (
              <Link to="/sales-dashboard">Dashboard</Link>
            )}
          </div>
        </div>
        <div className="flex justify-start overflow-hidden pl-4">
          <GoProjectRoadmap className="text-2xl group" />
          <div
            className={`${
              sideBarOpen ? "block" : "hidden"
            } overflow-hidden duration-300 ml-4`}
          >
            {userRole.role === "OperationTeamLead" ? (
              <Link to="/operation-dashboard">Project</Link>
            ) : (
              <Link to="/sales-dashboard">Project</Link>
            )}
          </div>
        </div>
        <div className="flex justify-start overflow-hidden pl-4">
          <TbReport className="text-2xl group" />
          <div
            className={`${
              sideBarOpen ? "block" : "hidden"
            } overflow-hidden duration-300 ml-4`}
          >
            {userRole.role === "OperationTeamLead" ? (
              <Link to="/operation-dashboard">Report</Link>
            ) : (
              <Link to="/sales-dashboard">Report</Link>
            )}
          </div>
        </div>
        <div className="flex justify-start overflow-hidden pl-4">
          <FaChartLine className="text-2xl group" />
          <div
            className={`${
              sideBarOpen ? "block" : "hidden"
            } overflow-hidden duration-300 ml-4`}
          >
            {userRole.role === "OperationTeamLead" ? (
              <Link to="/operation-dashboard">Chart</Link>
            ) : (
              <Link to="/sales-dashboard">Chart</Link>
            )}
          </div>
        </div>
      </div>
      <div className="">
        {sideBarOpen ? (
          <PiCaretDoubleLeftLight
            className={`${
              sideBarOpen ? "top-0 left-52" : "left-16 top-0"
            } text-2xl text-black mr-4 mt-4 cursor-pointer absolute duration-300 font-extralight z-40`}
            onClick={() => {
              SetSideBarOpen(!sideBarOpen);
            }}
          />
        ) : (
          <PiCaretDoubleRightLight
            className={`${
              sideBarOpen ? "top-0 left-52" : "left-16 top-0"
            } text-2xl text-black mr-4 mt-4 cursor-pointer absolute duration-300 font-extralight z-40`}
            onClick={() => {
              SetSideBarOpen(!sideBarOpen);
            }}
          />
        )}
      </div>
    </div>
  );
};
export default SideBar;
