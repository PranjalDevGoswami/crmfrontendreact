import React, { useEffect, useState } from "react";
import Button from "../components/Button.js";

import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";
import { BiShow } from "react-icons/bi";
import object7 from "../assets/object7.png";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { PostLoginData } from "../fetchApis/login/PostLoginData";
import { login } from "../features/login/loginSlice.js";
import Input from "../components/InputField.js";
import Label from "../components/Label.js";
import { USERLIST } from "../../utils/urls.js";
import { useAuth } from "../provider/authProvider.js";
import { userDetails } from "./userProfile";

const Login = () => {
  const { token, setToken } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordIcon, setShowPasswordIcon] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

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

  const RedirectUser = async () => {
    try {
      const userList = await fetch(USERLIST);
      const userListJson = await userList.json();

      let email = localStorage.getItem("user");
      const userData = userListJson.users;
      function getUserByEmail(email) {
        return userData.filter((user) => user.email === email);
      }

      const userDetails = getUserByEmail(email);

      if (userDetails.length > 0) {
        const department = userDetails[0].user_department;
        localStorage.setItem("department", department);
        if (department == 1) {
          navigate("/sales-dashboard");
        } else if (department == 2) {
          navigate("/operation-dashboard");
        } else {
          navigate("/");
        }
      } else {
        console.error("User details not found");
      }
    } catch (error) {
      console.error("Error redirecting user:", error);
    }
  };
  useEffect(() => {
    if (token !== null) {
      RedirectUser();
    }
  }, [token]);
  const handleLogin = async () => {
    try {
      const response = await PostLoginData(loginData);
      if (response && response.success) {
        setToken(response.access);
        localStorage.setItem("refreshToken", response.refresh);
        localStorage.setItem("user", loginData.email);
      } else {
        console.error("Login failed:", response.error);
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <div className="bg-[url('./assets/HS-blog-post-20-2048x1075.png')] opacity-80 w-full h-screen bg-contain">
      <div className="flex h-full">
        <div className="w-2/3 h-2/3 flex flex-col items-center justify-center p-8 pl-8"></div>
        <div className="w-1/3">
          <div className="h-screen shadow-gray-600 shadow-lg bg-white flex justify-center items-center w-full relative">
            <div className="flex flex-col gap-4 p-4 w-9/12">
              <h1 className="text-5xl text-center p-8 text-[#e7251e]">Login</h1>
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
