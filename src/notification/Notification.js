import React, { useContext, useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import { IoNotifications } from "react-icons/io5";
import { BASEURL, UPDATEDPROJECTLIST } from "../../utils/urls";
import OpenNotification from "./OpenNotificationDetails";
import { ThemeContext } from "../ContextApi/ThemeContext";
import { MdDarkMode, MdOutlineDarkMode } from "react-icons/md";
import { NotifiactionContext } from "../ContextApi/NotificationContext";
// import {
//   // GetProjectData,
//   ProjectDetails,
// } from "../fetchApis/projects/getProjectData/GetProjectData";
import { getWithAuth } from "../provider/helper/axios";
// import { FetchProject } from "../ContextApi/FetchProjectContext";
import { FilterContext } from "../ContextApi/FilterContext";

// const socket = io(BASEURL); // Connect to the server

const Notification = () => {
  const [isNotificationActive, setIsNotificationActive] = useState(false);
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  const { projectData } = useContext(FilterContext);

  const {
    notificationList,
    setNotificationList,
    notificationProjectList,
    setNotificationProjectList,
    setIsViewNotification,
    isViewNotification,
  } = useContext(NotifiactionContext);

  const username = localStorage.getItem("username");
  const role = localStorage.getItem("role");
  useEffect(() => {
    if (darkMode) {
      document.body.style.backgroundColor = "black";
      document.body.style.color = "white";
    } else {
      document.body.style.backgroundColor = "white";
      document.body.style.color = "black";
    }
  }, [darkMode]);

  useEffect(() => {
    const fetchProjectData = async () => {
      // const response = await ProjectDetails();
      let activeEditProject = projectData?.filter((item) => {
        return (
          item?.send_email_manager == true &&
          item?.project_manager?.name == username
        );
      });
      setNotificationList(activeEditProject);
    };
    fetchProjectData();
  }, []);

  const notification_btn_ref = useRef(null);

  const handleClickOutside = (event) => {
    if (
      notification_btn_ref.current &&
      !notification_btn_ref.current.contains(event.target)
    ) {
      setIsNotificationActive(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const handleViewNotification = async (project_code) => {
    const response = await getWithAuth(UPDATEDPROJECTLIST + `${project_code}/`);
    setNotificationProjectList(response?.data);
    setIsViewNotification(true);
  };

  return (
    <div className="relative flex items-center">
      <MdDarkMode
        className="mr-4 cursor-pointer color-black min-[320px]:text-md sm:text-xl"
        onClick={() => setDarkMode(true)}
      />
      {darkMode ? (
        <MdOutlineDarkMode
          className="mr-4 cursor-pointer text-black min-[320px]:text-md sm:text-xl"
          onClick={() => setDarkMode(false)}
        />
      ) : (
        ""
      )}

      <div
        className="relative"
        onClick={() => {
          setIsNotificationActive(!isNotificationActive);
        }}
      >
        <IoNotifications className="mr-4 cursor-pointer min-[320px]:text-md sm:text-xl text-black" />
        <span className="bg-red-600 text-white rounded-full sm:w-3 sm:h-3 sm:p-3 min-[320px]:w-1 min-[320px]:h-1 min-[320px]:p-2 absolute sm:-top-3 sm:left-2 min-[320px]:-top-2 min-[320px]:left-2 min-[320px]:text-sm sm:text-sm flex justify-center items-center">
          {role === "AM/Manager" && notificationList?.length > 0
            ? notificationList.length
            : 0}
        </span>
      </div>
      {isNotificationActive && (
        <div
          className="border bg-[#bd1d1d] text-white cursor-pointer text-left absolute sm:top-10 sm:-left-1/2 min-[320px]:left-1/3 min-[320px]:top-5 min-[320px]:w-44 sm:w-72 p-4 rounded-md min-[320px]:text-md sm:text-2xl"
          ref={notification_btn_ref}
        >
          {role === "AM/Manager" && notificationList.length > 0 ? (
            <ul>
              {notificationList.map((item, ind) => {
                return (
                  <li
                    key={ind}
                    className="border-b-black border-b p-4"
                    onClick={() => handleViewNotification(item.project_code)}
                  >
                    <span>Project Code: {item.project_code.toUpperCase()}</span>
                    {/* <Button className={""} onClick={""} name={"Accept"} /> */}
                    {/* <br />
              <span>Sample Revised: {item.sample}</span>
              <br />
              <span>Date Required: {item.tentative_end_date}</span>
              <br />
              <span>Reason: {item.reason_for_adjustment}</span> */}
                  </li>
                );
              })}
            </ul>
          ) : (
            <ul>
              <li className="border-b-black border-b p-2">
                No Notification found
              </li>
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default Notification;
