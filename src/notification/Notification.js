import React, { useContext, useEffect, useRef, useState } from "react";
import { IoNotifications } from "react-icons/io5";
import { UPDATEDPROJECTLIST } from "../../utils/urls";
import { ThemeContext } from "../ContextApi/ThemeContext";
import { MdDarkMode, MdOutlineDarkMode } from "react-icons/md";
import { NotifiactionContext } from "../ContextApi/NotificationContext";
import { getWithAuth } from "../provider/helper/axios";
import { FilterContext } from "../ContextApi/FilterContext";
import { GetProjectData } from "../fetchApis/projects/getProjectData/GetProjectData";

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

  const userrole = localStorage.getItem("userrole");
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");
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
      const response = await GetProjectData();
      let activeEditProject = response?.data?.filter((item) => {
        return (
          item?.send_email_manager == true && item?.assigned_to == userrole
        );
      });
      setNotificationList(activeEditProject);
    };
    fetchProjectData();
  }, [isViewNotification]);

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
  const handleViewNotification = async (id) => {
    const response = await getWithAuth(UPDATEDPROJECTLIST + `${id}/`);
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
        <IoNotifications className="mr-4 cursor-pointer min-[320px]:text-base sm:text-base text-black" />
        <span className="bg-red-600 text-white rounded-full sm:w-3 sm:h-3 sm:p-3 min-[320px]:w-1 min-[320px]:h-1 min-[320px]:p-2 absolute sm:-top-3 sm:left-2 min-[320px]:-top-2 min-[320px]:left-2 min-[320px]:text-sm sm:text-sm flex justify-center items-center">
          {(role === "Manager" ||
            role === "Sr.Manager" ||
            role === "Ass.Manager") &&
          notificationList?.length > 0
            ? notificationList?.length
            : 0}
        </span>
      </div>
      {isNotificationActive && (
        <div
          className="border bg-[#bd1d1d] text-white cursor-pointer text-left absolute sm:top-10 sm:-left-1/2 min-[320px]:left-1/3 min-[320px]:top-5 min-[320px]:w-44 sm:w-72 p-2 rounded-md min-[320px]:text-base sm:text-base"
          ref={notification_btn_ref}
        >
          {(role === "Manager" ||
            role === "Sr.Manager" ||
            role === "Ass.Manager") &&
          notificationList.length > 0 ? (
            <ul>
              {notificationList?.map((item, ind) => {
                return (
                  <li
                    key={ind}
                    className="border-b-black border-b p-1"
                    onClick={() => handleViewNotification(item?.id)}
                  >
                    <span>
                      Project Code: {item?.project_code?.toUpperCase()}
                    </span>
                  </li>
                );
              })}
              {/* <li>height</li> */}
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
