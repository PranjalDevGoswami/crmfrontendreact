import React, { useContext, useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import { IoNotifications } from "react-icons/io5";
import { BASEURL, UPDATEDPROJECTLIST } from "../../utils/urls";
import OpenNotification from "./OpenNotificationDetails";
import { ThemeContext } from "../ContextApi/ThemeContext";
import { MdDarkMode, MdOutlineDarkMode } from "react-icons/md";
import { NotifiactionContext } from "../ContextApi/NotificationContext";
import { GetProjectData } from "../fetchApis/projects/getProjectData/GetProjectData";
import { getWithAuth } from "../provider/helper/axios";

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
  const username = localStorage.getItem("username");
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
      try {
        const fetchDataFromApi2 = await GetProjectData();
        const projectDataObject = fetchDataFromApi2?.data?.map((val) => {
          return val;
        });
        let activeEditProject = projectDataObject.filter((item) => {
          return (
            item?.send_email_manager == true &&
            item?.project_manager?.name == username
          );
        });
        setNotificationList(activeEditProject);
      } catch (error) {
        console.error("Error fetching project data:", error);
      }
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
          {notificationList?.length > 0 ? notificationList.length : 0}
        </span>
      </div>
      {isNotificationActive && (
        <div
          className="border bg-gray-200 cursor-pointer text-left absolute top-10 -left-1/2 w-72 p-4 rounded-md"
          ref={notification_btn_ref}
        >
          <ul>
            {notificationList.map((item, ind) => {
              return (
                <li
                  key={ind}
                  className="border-b-black border p-4"
                  onClick={() => handleViewNotification(item.project_code)}
                >
                  <span>Project Code: {item.project_code}</span>
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
        </div>
      )}
    </div>
  );
};

export default Notification;
