import React, { useEffect, useState } from "react";
import Input from "../InputField";
import Button from "../Button";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { BiShow } from "react-icons/bi";
import object7 from "../../assets/object7.png";
import Reset from "./Reset.js";
import { useNavigate } from "react-router-dom";


const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async () => {
    try {
      const response = await fetch("http://65.1.93.34:8000/api/user/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(loginData),
      });
  
      console.log("Response status:", response.status);
  
      if (response.ok) {
        const userData = await response.json();
        alert("Login successful!"); // Display an alert for successful login
        // You can also redirect the user to another page here if needed
        if (userData.user_department === "1") {
          // Navigate to the sales dashboard
          navigate("/sales-dashboard");
        } else {
          // Navigate to the default dashboard
          navigate("/operation-dashboard");
        }
      } else {
        const errorData = await response.json();
        console.error("Login failed:", errorData); // Log the error data for failed login
        alert("Login failed. Please check your credentials."); // Display an alert for failed login
      }
    } catch (error) {
      console.error("Login error:", error.message); // Log the error message for login error
      alert("An error occurred. Please try again."); // Display an alert for login error
    }
  };
  

  return (
    <div className="bg-[url('./assets/HS-blog-post-20-2048x1075.png')] opacity-80 w-full h-screen bg-contain">
      <div className="flex h-full">
        <div className="w-2/3 h-2/3 flex flex-col items-center justify-center p-8 pl-8">
          {/* <h2 className="text-4xl text-white ">Welcome To UNIMRKT</h2>
          <p className="text-xl text-white w-2/3 pt-8">
            {" "}
            Lorem IspumLorem IspumLorem IspumLorem IspumLorem IspumLorem
            IspumLorem IspumLorem IspumLorem Ispum
          </p> */}
        </div>
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
                <BiShow
                  className="absolute top-1/2 right-4 translate-y-[-50%] cursor-pointer"
                  onClick={handleShowPassword}
                />
              </div>
              <img src={object7} alt="fgg" className="absolute top-8" />
              <Link to="/reset">
                <Button
                  className={"p-4 text-right float-right"}
                  name={"Forgot password?"}
                />
              </Link>
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
