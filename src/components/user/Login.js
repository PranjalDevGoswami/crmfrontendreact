import React, { useState } from "react";
import React from "react";
import Input from "../InputField";
import Button from "../Button";
import { BrowserRouter as Router, Route, Navigate, Switch, Link } from "react-router-dom";
// import { FaUserAlt } from "react-icons/fa";
// import { RiLockPasswordFill } from "react-icons/ri";
import object7 from "../../assets/object7.png";
import mrktIMg from "../../assets/HS-blog-post-20-2048x1075.png";
import Reset from "./Reset.js";
import { authenticate, isAuthenticated, signin } from "../auth/helper/index.js";

const Login = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
    error: '',
    success: false,
    didRedirect:false,
  });

  const { email, password , success, error, didRedirect} = values;

  const handleChange = (email) => (event) => {
    setValues({ ...values, error: false, [email]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });

    signin({ email, password })
      .then((data) => {
        console.log("DATA", data);
        if (data.token){
          let sessionToken = data.token;
          authenticate(sessionToken, () =>{
            console.log("TOKEN ADDED");
            setValues({
              ...values,
              didRedirect:true,
            });
          });
        }
      })
      .catch((e) => console.log(e));
  };

  const performRedirect = () => {
    if(isAuthenticated) {
      return <Navigate to="/operation-dashboard" />;
    }
  };
  
  return (
    <div className="bg-[url('./assets/HS-blog-post-20-2048x1075.png')] opacity-80 w-full h-screen bg-contain">
      <div className="flex h-full">
        <div className="w-2/3 h-2/3 flex flex-col items-center justify-center p-8 pl-8">
          <h2 className="text-4xl text-white ">Welcome To UNIMRKT</h2>
          <p className="text-xl text-white w-2/3 pt-8">
            {" "}
            Lorem IspumLorem IspumLorem IspumLorem IspumLorem IspumLorem
            IspumLorem IspumLorem IspumLorem Ispum
          </p>
        </div>
        <div className="w-1/3">
        <form action="">
          <div className="h-screen shadow-gray-600 shadow-lg bg-white flex justify-center items-center w-full relative">
            <div className="flex flex-col gap-4 p-4 w-9/12">
              <h1 className="text-5xl text-center p-8 text-[#e7251e]">Login</h1>
              {/* <div className="relative"> */}
              <Input
                type={"email"}
                value={email}
                onChange={handleChange("email")}
                className={
                  "outline-none p-2 pl-4 border bg-[#f3eded] rounded-full focus:border-cyan-600 relative w-full"
                }
                required={"required"}
                placeholder={"email"}
              />
              {/* <FaUserAlt className="absolute top-1/2"/> */}
              {/* </div> */}
              <Input
                type={"password"}
                value={password}
                onChange={handleChange("password")}
                className={
                  "p-2 pl-4 border bg-[#f3eded] outline-none rounded-full focus:border-cyan-600"
                }
                required={"required"}
                placeholder={"password"}
              />
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
                  onClick={onSubmit}
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
          </form>
          {performRedirect()}
        </div>
      </div>
    </div>
  );
};

export default Login;
