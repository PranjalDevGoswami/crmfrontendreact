import React, { useEffect, useRef, useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import logo from "../assets/mainlogo.png";
import { useAuth } from "../provider/authProvider";
import { userDetails } from "../user/userProfile";
import { getWithAuth } from "../provider/helper/axios.js";
import Notifications from "../notification/Notification.js";
import { FaUser, FaLock } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import { UPDATE_PROFILE } from "../../utils/constants/urls.js";
import { useHandleOutsideClick } from "../../utils/hooks/useHandleOutSideClick.js";
import useUserData from "../../utils/hooks/useUserData.js";
import useProjectDataWIthRoleWiseFilter from "../../utils/hooks/useProjectDataWIthRoleWiseFilter.js";
import DarkMode from "../components/DarkMode.js";
import { useSelector } from "react-redux";
import useManagerList from "../../utils/hooks/useProjectManager.js";
import { useDispatch } from "react-redux";
import { setProjects } from "../../utils/slices/ProjectSlice.js";
import useProjectData from "../../utils/hooks/useProjectData.js";
import useNotificationCount from "../../utils/hooks/useNotificationCount.js";
import useAssignedProject from "../../utils/hooks/useAssignedProject.js";

const Header = () => {
  const { token, setToken } = useAuth();
  const [isProfileSetting, setIsProfileSetting] = useState(false);
  const navigate = useNavigate();
  const headerBtn = useRef();
  const darkMode = useSelector((store) => store.darkMode.isDarkMode);
  const dispatch = useDispatch();

  useProjectData();
  useUserData();
  useProjectDataWIthRoleWiseFilter();
  useManagerList();
  useNotificationCount();
  useAssignedProject()

  const handleLogout = () => {
    setToken();
    localStorage.clear();
    navigate("/", { replace: true });
  };
  const [profileDetails, setProfileDetails] = useState({
    gender: "",
    email: "",
    phone: "",
    profile_picture: "",
  });

  useEffect(() => {
    const GetProfileDetails = async () => {
      const response = await getWithAuth(UPDATE_PROFILE);
      if (response?.status == true) {
        setProfileDetails(response?.data);
      }
    };
    GetProfileDetails();
  }, []);
  const username = userDetails();

  const handleClose = () => {
    setIsProfileSetting(false);
  };
  useHandleOutsideClick(headerBtn, handleClose);

  const handleProfileSetting = () => {
    navigate("/profile");
  };

  return (
    <div className="h-20 bg-white border-b-gray-700 bg-gradient-to-t from-gray-300">
      <div className="flex justify-between px-2">
        <div className="w-2/12">
          <img
            src={logo}
            alt="logo"
            className="w-1/2 sm:max-h-[100px] sm:max-w-[178px] min-[320px]:max-h-full min-[320px]:max-w-full"
          />
        </div>
        <div className="w-5/12 sm:w-6/12 min-[320px]:w-full text-right justify-end flex flex-wrap items-center">
          {token ? (
            <div className="flex flex-wrap items-center">
              <div className="relative flex">
                <DarkMode />
                <Notifications className="relative" />
              </div>
              <span className="m-2 text-black min-[320px]:text-sm sm:text-xl">
                {username?.username ? username?.username : "User"}
              </span>

              <div className="relative cursor-pointer" ref={headerBtn}>
                {profileDetails?.profile_picture !== null ? (
                  <div className="border rounded-full">
                    <img
                      src={profileDetails?.profile_picture}
                      alt="user-profile-pic"
                      className="sm:w-9 sm:h-9 rounded-full bg-cover min-[320px]:w-4 min-[320px]:h-4"
                      onClick={() => {
                        setIsProfileSetting(!isProfileSetting);
                      }}
                    />
                  </div>
                ) : (
                  <FaRegUserCircle
                    className={`${
                      darkMode && "text-black"
                    } sm:w-9 sm:h-9 rounded-full bg-cover min-[320px]:w-4 min-[320px]:h-4 cursor-pointer border "`}
                    onClick={() => {
                      setIsProfileSetting(!isProfileSetting);
                    }}
                  />
                )}
                {isProfileSetting && (
                  <ul className="absolute top-10 right-0 w-48 h-auto rounded-md text-left bg-[#bd1d1d] text-white z-10 p-4 cursor-pointer">
                    <li
                      onClick={handleProfileSetting}
                      className="flex justify-start items-center mb-4"
                    >
                      <FaUser className="mr-2 text-white text-2xl" />
                      Profile
                    </li>
                    <Link to="/change-password">
                      <li className="flex justify-start items-center mb-4">
                        <FaLock className="mr-2 text-white text-2xl" />
                        Change Password
                      </li>
                    </Link>
                    <Link to="/login">
                      <li
                        onClick={handleLogout}
                        className="flex justify-start items-center mb-4"
                      >
                        <IoLogOut className="mr-2 text-white text-3xl" />
                        Logout
                      </li>
                    </Link>
                  </ul>
                )}
              </div>
            </div>
          ) : (
            <span className="m-2 text-black">Guest</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
