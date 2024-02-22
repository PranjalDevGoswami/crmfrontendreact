import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaRegUserCircle } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";


const Header = () => {
    const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.login.isLoggedIn);
  const user = useSelector(state => state.login.user);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('user'); 
    localStorage.removeItem('accessToken'); 
    navigate('/login');
  };
  console.log("isLogin",isLoggedIn);

  return (
    <div className="flex justify-between w-full h-32 p-4 border-b-2 border-[#F66A3E] bg-white">
      <div className="w-11/12"></div>
      <div className="w-1/12 text-right flex items-center">
        {isLoggedIn ? (
          <>
            <span className="m-2">{user ? user.username : "User"}</span>
            <FaRegUserCircle className="text-4xl cursor-pointer bg-red-300" onClick={handleLogout} />
          </>
        ) : (
          <span className="m-2">Guest</span>
        )}
      </div>
    </div>
  );
};

export default Header;
