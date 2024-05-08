import React, { useEffect, useRef, useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { useNavigate, useLocation, Link } from "react-router-dom";
import logo from "../assets/mainlogo.png";
import { useAuth } from "../provider/authProvider";
import { userDetails } from "../user/userProfile";
import { UPDATE_PROFILE } from "../../utils/urls";
import { getWithAuth } from "../provider/helper/axios.js";

const Header = () => {
  const { token, setToken } = useAuth();
  const [isProfileSetting, setIsProfileSetting] = useState(false);
  const navigate = useNavigate();
  const headerBtn = useRef();

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
  const HandleThemeColor = () => {};

  useEffect(() => {
    document.body.addEventListener("mousedown", (e) => {
      if (!headerBtn?.current?.contains(e?.target)) {
        setIsProfileSetting(false);
      }
    });
  }, []);

  const handleProfileSetting = () => {
    navigate("/profile");
    console.log("Profile btn");
  };

  return (
    <div className="w-full h-28 border-b-2 border-[#F66A3E] bg-white">
      <div className="container mx-auto">
        <div className="flex justify-between p-4">
          <div className="max-w-2/12">
            <img
              src={logo}
              alt="logo"
              className="w-full max-h-[90px] max-w-[210px]"
            />
          </div>
          <div className="max-w-2/12 text-right justify-end mr-8 flex flex-wrap items-center">
            {token ? (
              <div className="flex flex-wrap">
                <span className="m-2">
                  {username?.username ? username?.username : "User"}
                </span>

                <div className="relative cursor-pointer" ref={headerBtn}>
                  {profileDetails?.profile_picture !== null ? (
                    <div>
                      <img
                        src={profileDetails?.profile_picture}
                        alt="user-profile-pic"
                        className="w-9 h-9 rounded-full bg-cover"
                        onClick={() => {
                          setIsProfileSetting(!isProfileSetting);
                        }}
                      />
                    </div>
                  ) : (
                    <FaRegUserCircle
                      className="w-9 h-9 rounded-full bg-cover cursor-pointer"
                      onClick={() => {
                        setIsProfileSetting(!isProfileSetting);
                      }}
                    />
                  )}
                  {isProfileSetting ? (
                    <ul className="absolute top-10 right-0 w-40 text-left bg-[#bd1d1d] text-white z-10 p-4 cursor-pointer">
                      <li onClick={handleProfileSetting}>Profile</li>
                      <Link to="/change-password">
                        <li>Change Password</li>
                      </Link>
                      <Link to="/login">
                        <li onClick={handleLogout}>Logout</li>
                      </Link>
                    </ul>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            ) : (
              <span className="m-2">Guest</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
