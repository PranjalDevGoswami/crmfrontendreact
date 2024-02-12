import React,{useState} from "react";

// import { PiCaretDoubleLeftLight, PiCaretDoubleRightLight } from "react-icons/fa";
import { PiCaretDoubleLeftLight,PiCaretDoubleRightLight } from "react-icons/pi";
import { GoProjectRoadmap } from "react-icons/go";
import { TbReport } from "react-icons/tb";
import { FaChartLine } from "react-icons/fa6";




import { MdDashboard } from "react-icons/md";

const SideBar = () =>{
    const [sideBarOpen, SetSideBarOpen] = useState(true);
    return(
        <div className="shadow-slate-400 sticky top-0">
          <div className="logo ">
          </div>
            <div
        className={`${
          sideBarOpen ? "w-52" : "w-16"
        }  bg-[#bd1d1d] text-white h-screen min-h-dvh duration-300 relative flex flex-col gap-4 pl-4`}
      >
        <div className="flex justify-start overflow-hidden mt-4">
          <MdDashboard className="text-2xl group" />
          <div
            className={`${
              sideBarOpen ? "block" : "hidden"
            } overflow-hidden duration-300 ml-4 float-right`}
          >
            Dashboard
          </div>
        </div>
        <div className="flex justify-start overflow-hidden">
          <GoProjectRoadmap className="text-2xl group" />
          <div
            className={`${
              sideBarOpen ? "block" : "hidden"
            } overflow-hidden duration-300 ml-4`}
          >
            Project
          </div>
        </div>
        <div className="flex justify-start overflow-hidden">
          <TbReport className="text-2xl group" />
          <div
            className={`${
              sideBarOpen ? "block" : "hidden"
            } overflow-hidden duration-300 ml-4`}
          >
            Report
          </div>
        </div>
        <div className="flex justify-start overflow-hidden">
          <FaChartLine className="text-2xl group" />
          <div
            className={`${
              sideBarOpen ? "block" : "hidden"
            } overflow-hidden duration-300 ml-4`}
          >
            Chart
          </div>
        </div>
      </div>
      <div className="">
        {sideBarOpen ? (
          <PiCaretDoubleLeftLight
            className={`${
              sideBarOpen ? "top-2 left-56" : "left-20 top-2"
            } text-2xl text-black mr-4 mt-4 cursor-pointer absolute duration-300 font-extralight`}
            onClick={() => {
              SetSideBarOpen(!sideBarOpen);
            }}
          />
        ) : (
          <PiCaretDoubleRightLight
            className={`${
              sideBarOpen ? "top-2 left-56" : "left-20 top-2"
            } text-2xl text-black mr-4 mt-4 cursor-pointer absolute duration-300 font-extralight`}
            onClick={() => {
              SetSideBarOpen(!sideBarOpen);
            }}
          />
        )}
      </div>
        </div>
    )
}
export default SideBar