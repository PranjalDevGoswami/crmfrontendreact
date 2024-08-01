import React, { useContext, useEffect, useState } from "react";
import Button from "../components/Button.js";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { BiShow } from "react-icons/bi";
import object7 from "../assets/object7.png";
import { PostLoginData } from "../fetchApis/login/PostLoginData";
import Input from "../components/InputField.js";
import Label from "../components/Label.js";
import { USERLIST } from "../../utils/urls.js";
import { useAuth } from "../provider/authProvider.js";
import { ThemeContext } from "../ContextApi/ThemeContext.js";
import SweetAlert from "../components/SweetAlert.js";

const Login = () => {
  const { token, setToken } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordIcon, setShowPasswordIcon] = useState(false);
  // const [userRole, setUserRole] = useState("");
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const { darkMode } = useContext(ThemeContext);

  // const token = localStorage.getItem("token");
  // const auth = token ? useAuth() : {};
  // const { setToken } = auth || {};

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
      const role = localStorage.getItem("role");
      let email = localStorage.getItem("user");
      const userData = userListJson.users;
      function getUserByEmail(email) {
        return userData.filter((user) => user.email === email);
      }

      const userDetails = getUserByEmail(email);

      if (userDetails.length > 0) {
        const department = userDetails[0].user_department?.id;
        localStorage.setItem("department", department);
        if (role === "Director" || role === "superuser") {
          navigate("/report");
        } else if (department == 1) {
          navigate("/sales-dashboard");
        } else if (department == 2) {
          navigate("/operation-dashboard");
        } else if (department == 3) {
          navigate("/finance-dashboard");
        } else if (userDetails[0]?.email === "admin@unimrkt.com") {
          navigate("/Admin-dashboard");
        } else {
          navigate("/default-dashboard");
        }
      }
    } catch (error) {
      console.error("Error redirecting user:", error);
    }
  };

  useEffect(() => {
    RedirectUser();
  }, [token]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await PostLoginData(loginData);
      if (response && response.success) {
        setToken(response.access);
        localStorage.setItem("refreshToken", response.refresh);
        localStorage.setItem("user", loginData.email);
      }
      const showAlert = (title, text) => {
        SweetAlert({
          title: title,
          text: text,
          icon: "error",
        });
      };

      if (!response.ok) {
        if (loginData.password.length < 8) {
          showAlert(
            "Error",
            "Password must be greater than or equal to 8 characters"
          );
        } else if (!loginData.email) {
          showAlert("Error", "UserId/email cannot be blank!!");
        } else if (!loginData.password) {
          showAlert("Error", "Password cannot be blank!!");
        } else if (response.non_field_errors) {
          showAlert("Error", response.non_field_errors);
        } else if (response.status === 400) {
          showAlert("Error", response.message);
        }
      }
    } catch (error) {
      SweetAlert({
        title: "Error",
        text: "Error logging in:",
        error,
        icon: "error",
      });
    }
  };

  return (
    <form onSubmit={handleLogin}>
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
                      onClick={handleShowPassword}
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
