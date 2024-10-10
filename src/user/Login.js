import React, { useContext, useEffect, useState } from "react";
import Button from "../components/Button.js";
import { Link, useNavigate } from "react-router-dom";
import { BiShow } from "react-icons/bi";
import object7 from "../assets/object7.png";
import Input from "../components/InputField.js";
import Label from "../components/Label.js";
import { useAuth } from "../provider/authProvider.js";
import { useRedirectUser } from "../../utils/hooks/useRedirectUser.js";
import { useHandleLogin } from "../../utils/hooks/useHAndleLogin.js";
import { useSelector } from "react-redux";

const Login = () => {
  const { token, setToken } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordIcon, setShowPasswordIcon] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const darkMode = useSelector((store) => store?.darkMode?.isDarkMode);

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

  useEffect(() => {
    useRedirectUser(navigate);
  }, [token]);

  const handleLogin = async (e) => {
    e.preventDefault();
    localStorage.setItem("darkmode", true);
    useHandleLogin(loginData, setToken);
  };

  return (
    <form onSubmit={handleLogin} id="234">
      <div className="bg-[url('./assets/HS-blog-post-20-2048x1075.png')] opacity-80 md:w-full md:h-screen xl:bg-contain bg-cover">
        <div className="md:flex lg:flex xl:flex 2xl:flex md:h-full block h-auto">
          <div className="md:w-2/3 md:h-2/3 hidden md:flex flex-col items-center justify-center p-8 pl-8"></div>
          <div className="md:w-1/2 w-full lg:w-5/12 xl:w-4/12 2xl:w-4/12">
            <div className="h-screen shadow-gray-600 shadow-lg bg-white flex justify-center items-center w-full relative">
              <div className="flex flex-col gap-4 md:p-4 p-1 w-9/12">
                <h1 className="text-5xl text-center p-8 text-[#e7251e]">
                  Login
                </h1>
                <Input
                  type={"email"}
                  className={
                    "outline-none p-2 pl-4 border bg-[#f3eded] rounded-full focus:border-cyan-600 relative w-full"
                  }
                  required={"required"}
                  placeholder={"email/userId"}
                  name={"email"}
                  onchange={(e) => handleOnchange(e)}
                />
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
                  {showPasswordIcon && (
                    <BiShow
                      className={` ${
                        darkMode ? "text-white" : "text-black"
                      } absolute top-1/2 right-4 translate-y-[-50%] cursor-pointer`}
                      onClick={() => {
                        setShowPassword(!showPassword);
                      }}
                    />
                  )}
                </div>
                <img src={object7} alt="fgg" className="absolute top-8" />
                <div className="flex lg:flex-row flex-col justify-between">
                  <div className="lg:flex items-center inline-block">
                    <Input type={"checkbox"} className="inline-block" />
                    <Label labelName={"Keep me Login"} className={"pl-2"} />
                  </div>
                  <Link to="/reset">
                    <Button
                      type={"button"}
                      className={"p-4 lg:text-right lg:float-right"}
                      name={"Forgot password?"}
                    />
                  </Link>
                </div>
                <div className="flex justify-center">
                  <Button
                    type={"submit"}
                    className={
                      "p-4 bg-[#e7251e] w-1/2 rounded-full text-white "
                    }
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
                      type={"button"}
                      className={" p-4"}
                      name={"Don't have account? Signup Now"}
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Login;
