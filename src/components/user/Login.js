import React from "react";
import Input from "../InputField";
import Button from "../Button";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Reset from "./Reset.js";

const Login = () => {
  // const []

  return (
    <div className="bg-[url('./assets/rm314-adj-02.jpg')] w-full h-screen bg-cover">
      <div className="flex items-center h-full">
        <div className="w-1/2 p-8 pl-8">
          <h2 className="text-4xl text-white ">Welcome To UNIMRKT</h2>
          <p className="text-xl text-white  py-4"> Lorem IspumLorem IspumLorem IspumLorem IspumLorem IspumLorem IspumLorem IspumLorem IspumLorem Ispum</p>
        </div>
        <div className="w-1/2 ">
          <div className="w-2/3 h-1/3 border-black border rounded-lg shadow-gray-600 shadow-lg bg-white">
            <div className="flex flex-col gap-2 p-4">
              <h1 className="text-5xl underline p-8 ">Login</h1>
              <Input
                type={"email"}
                className={"p-4 border outline-none rounded-md focus:border-cyan-600"}
                required={"required"}
                placeholder={"userId or email address"}
              />
              <Input
                type={"password"}
                className={"p-4 border outline-none rounded-md focus:border-cyan-600"}
                required={"required"}
                placeholder={"password"}
              />
              <Button className={"p-4 bg-[#e7251e] w-full"} name={"Login"} />
              <div className="flex justify-center">
              <Link to='/reset'>
                <Button className={"p-4 underline"} name={"Forgot password?"} /></Link>
                <Link to='/register'>
                <Button className={"underline p-4"} name={"Create Account"} />
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
