import React, { useContext, useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import { IoNotifications } from "react-icons/io5";
import { BASEURL, UPDATEDPROJECTLIST } from "../../utils/urls";
import OpenNotification from "./OpenNotificationDetails";
import { ThemeContext } from "../ContextApi/ThemeContext";
import { MdDarkMode, MdOutlineDarkMode } from "react-icons/md";
import { NotifiactionContext } from "../ContextApi/NotificationContext";
import {
  GetProjectData,
  ProjectDetails,
} from "../fetchApis/projects/getProjectData/GetProjectData";
import { getWithAuth } from "../provider/helper/axios";
import { FetchProject } from "../ContextApi/FetchProjectContext";

// const socket = io(BASEURL); // Connect to the server

const Notification = () => {
  const [isNotificationActive, setIsNotificationActive] = useState(false);
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  const {
    notificationList,
    setNotificationList,
    notificationProjectList,
    setNotificationProjectList,
    setIsViewNotification,
    isViewNotification,
  } = useContext(NotifiactionContext);
  const { projectList, setProjectList } = useContext(FetchProject);
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
      const response = await ProjectDetails();
      setProjectList(response);
      let activeEditProject = response.filter((item) => {
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
        className="mr-4 cursor-pointer text-3xl color-black"
        onClick={() => setDarkMode(true)}
      />
      {darkMode ? (
        <MdOutlineDarkMode
          className="mr-4 cursor-pointer text-3xl text-black"
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
        <IoNotifications className="mr-4 cursor-pointer text-3xl text-black" />
        <span className="bg-red-600 text-white p-3 rounded-full w-3 h-3 absolute -top-3 left-4 text-sm flex justify-center items-center">
          {role === "AM/Manager" && notificationList?.length > 0
            ? notificationList.length
            : 0}
        </span>
      </div>
      {isNotificationActive && (
        <div
          className="border bg-[#bd1d1d] text-white cursor-pointer text-left absolute top-10 -left-1/2 w-72 p-4 rounded-md"
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
