import React, { useContext, useEffect, useRef, useState } from "react";
import { IoNotifications } from "react-icons/io5";
import { NotifiactionContext } from "../ContextApi/NotificationContext";
import { getWithAuth } from "../provider/helper/axios";
import { allManagerRoles } from "../config/Role";
import { UPDATEDPROJECTLIST } from "../../utils/constants/urls";
import { useSelector } from "react-redux";
import { useHandleOutsideClick } from "../../utils/hooks/useHandleOutSideClick";
import useProjectData from "../../utils/hooks/useProjectData";
import { useDispatch } from "react-redux";
import { addReRender } from "../../utils/slices/ReRenderSlice";

const Notification = () => {
  const [isNotificationActive, setIsNotificationActive] = useState(false);
  const role = localStorage.getItem("role");
  const userRole = localStorage.getItem("userrole");
  const darkMode = useSelector((store) => store.darkMode.isDarkMode);
  const {
    notificationList,
    setNotificationList,
    notificationProjectList,
    setNotificationProjectList,
    setIsViewNotification,
    isViewNotification,
  } = useContext(NotifiactionContext);

  useEffect(() => {
    if (darkMode) {
      document.body.style.backgroundColor = "black";
      document.body.style.color = "white";
    } else {
      document.body.style.backgroundColor = "white";
      document.body.style.color = "black";
    }
  }, [darkMode]);
  const projectDataResponse = useSelector(
    (store) => store.projectData.projects
  );
  const projectDataReRenderResponse = useSelector(
    (store) => store.ReRender.count
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addReRender(1));
  }, [dispatch]);

  useEffect(() => {
    const fetchProjectData = async () => {
      let activeEditProject = projectDataResponse?.filter((item) => {
        return (
          item?.send_email_manager == true &&
          (item?.assigned_to?.id == userRole ||
            item?.project_assigned_by_manager?.id == userRole)
        );
      });
      setNotificationList(activeEditProject);
    };
    fetchProjectData();
  }, [projectDataResponse, projectDataReRenderResponse]);

  const notification_btn_ref = useRef(null);

  const handleClose = () => {
    setIsNotificationActive(false);
  };

  useHandleOutsideClick(notification_btn_ref, handleClose);

  const handleViewNotification = async (id) => {
    const response = await getWithAuth(UPDATEDPROJECTLIST + `${id}/`);
    setNotificationProjectList(response?.data);
    setIsViewNotification(true);
    // useProjectData();
  };

  return (
    <div className="relative flex items-center">
      <div
        className="relative"
        onClick={() => {
          setIsNotificationActive(!isNotificationActive);
        }}
      >
        <IoNotifications className="mr-4 cursor-pointer min-[320px]:text-base sm:text-base text-black" />
        <span className="bg-red-600 text-white rounded-full sm:w-3 sm:h-3 sm:p-3 min-[320px]:w-1 min-[320px]:h-1 min-[320px]:p-2 absolute sm:-top-3 sm:left-2 min-[320px]:-top-2 min-[320px]:left-2 min-[320px]:text-sm sm:text-sm flex justify-center items-center">
          {allManagerRoles.includes(role) && notificationList?.length > 0
            ? notificationList?.length
            : 0}
        </span>
      </div>
      {isNotificationActive && (
        <div
          className="border bg-[#bd1d1d] text-white cursor-pointer text-left absolute sm:top-10 sm:-left-1/2 min-[320px]:left-1/3 min-[320px]:top-5 min-[320px]:w-44 sm:w-72 p-2 rounded-md min-[320px]:text-base sm:text-base"
          ref={notification_btn_ref}
        >
          {allManagerRoles.includes(role) && notificationList.length > 0 ? (
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
