import React, { useEffect, useState } from "react";
import Button from "../Button";

import { Link } from "react-router-dom";
import { BiShow } from "react-icons/bi";
import object7 from "../../assets/object7.png";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { PostLoginData } from "../fetchApis/login/PostLoginData";
import { login } from "../features/login/loginSlice";
import Input from "../InputField";
import Label from "../Label.js";
import { USERLIST } from "../../../utils/Apis";

const Login = () => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordIcon, setShowPasswordIcon] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const location = useLocation();

  const handleOnchange = (e) => {
    const { name, value } = e.target;
    if (name === "password") {
      if (value !== "") {
        setShowPasswordIcon(true);
      } else {
        setShowPasswordIcon(false);
      }
    }
    setLoginData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const PostLoginData1 = async (loginData) => {
    try {
      await PostLoginData(loginData);
      // alert('login!!')
    } catch (error) {
      console.error("Error fetching project data:", error);
    }
  };

  const RedirectUser = async () => {
    const userList = await fetch(USERLIST
    );
    const userListJson = await userList.json();

    let loginUser = localStorage.getItem("user");

    const userData = [userListJson.users];
    console.log('userData',userData);

    function getUserByEmail(email) {
      return userData[0].filter((user) => user.email === email);
    }

    const email = loginUser;
    const userDetails = getUserByEmail(email);

    if (userDetails[0].user_department === 1) {
      // Redirect to sales dashboard
      navigate("/sales-dashboard");
    } else if (userDetails[0].user_department === 2) {
      // Redirect to operation dashboard
      navigate("/operation-dashboard");
    } else {
      navigate("/login");
    }
  };

  const handleLogin = async () => {
    dispatch(login(loginData));
    
    localStorage.setItem("user", loginData.email);
    // localStorage.setItem('userData',loginData);
    await PostLoginData1(loginData);
    RedirectUser();
  };

  return (
    <div className="bg-[url('./assets/HS-blog-post-20-2048x1075.png')] opacity-80 w-full h-screen bg-contain">
      <div className="flex h-full">
        <div className="w-2/3 h-2/3 flex flex-col items-center justify-center p-8 pl-8"></div>
        <div className="w-1/3">
          <div className="h-screen shadow-gray-600 shadow-lg bg-white flex justify-center items-center w-full relative">
            <div className="flex flex-col gap-4 p-4 w-9/12">
              <h1 className="text-5xl text-center p-8 text-[#e7251e]">Login</h1>
              {/* <div className="relative"> */}
              <Input
                type={"email"}
                className={
                  "outline-none p-2 pl-4 border bg-[#f3eded] rounded-full focus:border-cyan-600 relative w-full"
                }
                required={"required"}
                placeholder={"email"}
                name={"email"}
                onchange={(e) => handleOnchange(e)}
              />
              {/* <FaUserAlt c="absolute top-1/2"/> */}
              {/* </div> */}
              <div className="relative w-full">
                <Input
                  type={showPassword ? "text" : "password"}
                  className={
                    "p-2 pl-4 border bg-[#f3eded] outline-none rounded-full focus:border-cyan-600 w-full"
                  }
                  required={"required"}
                  placeholder={"password"}
                  name={"password"}
                  onchange={(e) => handleOnchange(e)}
                />
                {showPasswordIcon ? (
                  <BiShow
                    className="absolute top-1/2 right-4 translate-y-[-50%] cursor-pointer"
                    onClick={handleShowPassword}
                  />
                ) : (
                  ""
                )}
              </div>
              <img src={object7} alt="fgg" className="absolute top-8" />
              <div className="flex justify-between">
                <div className="flex items-center">
                  <Input type={"checkbox"} className="inline-block" />
                  <Label labelName={"Keep me Login"} className={"pl-2"} />
                </div>
                <Link to="/reset">
                  <Button
                    className={"p-4 text-right float-right"}
                    name={"Forgot password?"}
                  />
                </Link>
              </div>
              {/* <RiLockPasswordFill /> */}
              <div className="flex justify-center">
                <Button
                  className={"p-4 bg-[#e7251e] w-1/2 rounded-full text-white "}
                  name={"Login"}
                  onClick={handleLogin}
                />
              </div>
              <img
                src={object7}
                alt="fgg"
                className="absolute top-56 right-8"
              />

              <div className="flex justify-center">
                <Link to="/register">
                  <Button
                    className={" p-4"}
                    name={"don't have account? Signup Now"}
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
