import React, { useContext, useEffect, useRef, useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { useNavigate, useLocation, Link } from "react-router-dom";
import logo from "../assets/mainlogo.png";
import { useAuth } from "../provider/authProvider";
import { userDetails } from "../user/userProfile";
import { UPDATE_PROFILE } from "../../utils/urls";
import { getWithAuth } from "../provider/helper/axios.js";
import Notifications from "../notification/Notification.js";
import { ThemeContext } from "../ContextApi/ThemeContext.js";
import { FaUser, FaLock } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";

const Header = () => {
  const { token, setToken } = useAuth();
  const [isProfileSetting, setIsProfileSetting] = useState(false);
  const navigate = useNavigate();
  const headerBtn = useRef();

  const { darkMode } = useContext(ThemeContext);

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

  useEffect(() => {
    document.body.addEventListener("mousedown", (e) => {
      if (!headerBtn?.current?.contains(e?.target)) {
        setIsProfileSetting(false);
      }
    });
  }, []);

  const handleProfileSetting = () => {
    navigate("/profile");
  };

  return (
    <div className="h-28 border-b-2 border-[#F66A3E] bg-white">
      {/* <div className=""> */}
      <div className="flex justify-between p-4">
        <div className="w-2/12">
          <img
            src={logo}
            alt="logo"
            className="w-full sm:max-h-[90px] sm:max-w-[210px] min-[320px]:max-h-full min-[320px]:max-w-full"
          />
        </div>
        <div className="w-5/12 sm:w-6/12 min-[320px]:w-full text-right justify-end flex flex-wrap items-center">
          {token ? (
            <div className="flex flex-wrap items-center">
              <div className="relative">
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
                {isProfileSetting ? (
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
                ) : (
                  ""
                )}
              </div>
            </div>
          ) : (
            <span className="m-2 text-black">Guest</span>
          )}
        </div>
      </div>
      {/* </div> */}
    </div>
  );
};

export default Header;
