import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaRegUserCircle } from "react-icons/fa";
import { MdDarkMode } from "react-icons/md";
import { useNavigate, useLocation, Link } from "react-router-dom";
import logo from "../../assets/mainlogo.png";
import { logout } from "../features/login/loginSlice";
import { toggleDarkMode } from "../features/darkmode/DarkmodeSlice";

const Header = () => {
  const isDarkMode = useSelector((state) => state.darkmode);
  const loginData = localStorage.getItem('user')
  const [isProfileSetting, setIsProfileSetting] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    localStorage.setItem("isLoggedIn", false);
    dispatch(logout());
    localStorage.removeItem("token");
    navigate("/login");
  };
  // const storedUserDataString = localStorage.getItem("userData");
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  const HandleThemeColor = () =>{
    dispatch(toggleDarkMode());
  {console.log('darkMode',isDarkMode)}

  }


  return (
    <div className="flex justify-between w-full h-28 p-4 border-b-2 border-[#F66A3E] bg-white">
      <div className="w-2/12">
        <img src={logo} alt="logo" className="w-[210px] h-[90px]" />
       

      </div>
      <div className="w-2/12 text-right flex flex-wrap items-center">
      <MdDarkMode onClick={HandleThemeColor} className="cursor-pointer font-xl"/>
        {isLoggedIn ? (
          <div className="flex flex-wrap">
            <span className="m-2">{loginData ? loginData : "User"}</span>
            <div className="relative">
              <FaRegUserCircle
                className="text-4xl cursor-pointer"
                onClick={() => {
                  setIsProfileSetting(!isProfileSetting);
                }}
              />
              {isProfileSetting ? (
                <ul className="absolute top-10 right-0 bg-[#bd1d1d] text-white z-10 p-4 cursor-pointer">
                  <li>Profile</li>
                  <li>Setting</li>
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
  );
};

export default Header;