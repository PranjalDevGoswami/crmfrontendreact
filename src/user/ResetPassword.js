import React, { useEffect, useState } from "react";
import Input from "../Atom/InputField";
import Button from "../Atom/Button";
import { useNavigate, useLocation } from "react-router-dom";
import SweetAlert from "../components/SweetAlert";
import { CONFIRM_PASSWORD } from "../../utils/constants/urls";

const ResetPassword = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const uid = queryParams.get("uid");
  const token = queryParams.get("token");
  const navigate = useNavigate();

  const [password, setPassword] = useState({
    uid: uid,
    token: token,
    password: "",
    password2: "",
  });

  const forgotPassword = async () => {
    if (!validatePasswords()) {
      return;
    }
    const response = await fetch(CONFIRM_PASSWORD + `${uid}/${token}/`, {
      method: "POST",
      headers: {
        "Content-Type": "Application/Json",
        Accept: "Application/Json",
      },
      body: JSON.stringify(password),
    });
    let message = await response.json();
    if (message?.msg) {
      SweetAlert({
        title: message?.msg,
        text: "",
        icon: "success",
      });
      navigate("/login");
    } else if (
      message?.non_field_errors[0] === "Token is not valid or expired"
    ) {
      SweetAlert({
        title: "Info",
        text:
          "The password reset link you used has expired.\n" +
          "Please request a new password reset link.",
        icon: "info",
      });
    } else if (
      message?.non_field_errors[0] === "Password length must be 8 characters."
    ) {
      SweetAlert({
        title: "info",
        text: "Password length must be 8 characters.",
        icon: "info",
      });
    }
  };

  const handleResetPassword = (e) => {
    const { name, value } = e.target;
    setPassword((prevData) => ({ ...prevData, [name]: value }));
  };

  const validatePasswords = () => {
    if (password.password !== password.password2) {
      SweetAlert({
        title: "error",
        text: "Passwords do not match",
        icon: "error",
      });
      return false;
    }
    return true;
  };

  const handleReset = () => {
    forgotPassword();
  };
  return (
    <div className="bg-[url('./assets/HS-blog-post-20-2048x1075.png')] opacity-80 w-full h-screen bg-contain">
      <div className="flex h-full">
        <div className="w-2/3 h-2/3 flex flex-col items-center justify-center p-8 pl-8"></div>
        <div className="w-1/3">
          <div className="h-screen shadow-gray-600 shadow-lg bg-white flex justify-center items-center w-full relative">
            <div className="flex flex-col gap-4 p-4 w-9/12">
              <h1 className="text-5xl p-8 ">Reset Password</h1>
              <Input
                type={"password"}
                name={"password"}
                className={
                  "outline-none p-2 pl-4 border bg-[#f3eded] rounded-full focus:border-cyan-600 relative w-full"
                }
                required={"required"}
                placeholder={"password"}
                onchange={handleResetPassword}
              />
              <Input
                type={"password"}
                name={"password2"}
                className={
                  "outline-none p-2 pl-4 border bg-[#f3eded] rounded-full focus:border-cyan-600 relative w-full"
                }
                required={"required"}
                placeholder={"confirm password"}
                onchange={handleResetPassword}
              />

              <div className="flex justify-center pt-4">
                <Button
                  className={"p-4 bg-[#e7251e] w-1/2 rounded-full text-white "}
                  name={"Reset"}
                  onClick={handleReset}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
