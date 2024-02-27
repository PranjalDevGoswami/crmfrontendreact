import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaRegUserCircle } from "react-icons/fa";
import { useNavigate, useLocation, Link } from "react-router-dom";
import logo from "../../assets/mainlogo.png";
import { logout } from "../features/login/loginSlice";

const Header = () => {
  const loginData = localStorage.getItem('user')
  console.log('loginData',loginData);
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

  return (
    <div className="flex justify-between w-full h-32 p-4 border-b-2 border-[#F66A3E] bg-white">
      <div className="w-10/12">
        <img src={logo} alt="logo" className="w-[210px] h-[110px]" />
      </div>
      <div className="w-2/12 text-right flex items-center">
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
