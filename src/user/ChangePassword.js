import React, { useEffect, useState } from "react";
import Input from "../Atom/InputField";
import Button from "../Atom/Button";
import { postWithAuth } from "../provider/helper/axios";
import { useNavigate } from "react-router-dom";
import { FaLock } from "react-icons/fa";

import SweetAlert from "../components/SweetAlert";
import { CHANGE_PASSWORD } from "../../utils/constants/urls";

const ChangePassword = () => {
  const [changePasswordData, setChangePasswordData] = useState({
    email: localStorage.getItem("user"),
    old_password: "",
    new_password: "",
    confirm_password: "",
  });
  const navigate = useNavigate();

  const handleChangePasswordInput = (e) => {
    const { name, value } = e.target;
    setChangePasswordData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleChangePassword = async () => {
    if (!validatePasswords()) {
      return;
    }
    try {
      const response = await postWithAuth(CHANGE_PASSWORD, changePasswordData);
      if (response.status == true) {
        SweetAlert({
          title: "Password Change Successfully",
          text: "",
          icon: "success",
        });
        localStorage.clear();
        navigate("/login");
      } else {
        SweetAlert({
          title: "Error",
          text: response?.ex?.response?.data?.non_field_errors[0],
          icon: "error",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const validatePasswords = () => {
    if (
      changePasswordData.new_password !== changePasswordData.confirm_password
    ) {
      SweetAlert({
        title: "Error",
        text: "Passwords do not match",
        icon: "error",
      });
      return false;
    }
    return true;
  };

  const handleClearPassword = () => {
    setChangePasswordData({
      email: "",
      old_password: "",
      new_password: "",
      confirm_password: "",
    });
  };

  return (
    <div className="mt-16">
      <div className="m-8 mb-8">
        <div className=" flex justify-center">
          <div className="p-4 w-full bg-white rounded-md flex flex-col gap-4">
            <div className="flex flex-col gap-4">
              <h1 className="text-3xl p-8 flex items-center">
                <FaLock className=" mr-4" />
                Change Password
              </h1>
              <Input
                type={"password"}
                name={"old_password"}
                className={
                  "outline-none p-2 pl-4 border bg-[#f3eded] rounded-md focus:border-cyan-600 relative w-1/2"
                }
                required={"required"}
                placeholder={"Old Password"}
                onchange={handleChangePasswordInput}
                value={changePasswordData.old_password}
              />
            </div>
            <div className="flex">
              <Input
                type={"password"}
                name={"new_password"}
                className={
                  "outline-none p-2 pl-4 border bg-[#f3eded] rounded-md focus:border-cyan-600 relative w-1/2 mr-2"
                }
                required={"required"}
                placeholder={"New Password"}
                onchange={handleChangePasswordInput}
                value={changePasswordData.new_password}
              />
              <Input
                type={"password"}
                name={"confirm_password"}
                className={
                  "outline-none p-2 pl-4 border bg-[#f3eded] rounded-md focus:border-cyan-600 relative w-1/2"
                }
                required={"required"}
                placeholder={"Confirm New Password"}
                onchange={handleChangePasswordInput}
                value={changePasswordData.confirm_password}
              />
            </div>
            <div className="flex justify-end pt-4">
              <Button
                className={
                  "p-4 bg-green-300 w-1/6 rounded-md text-white hover:bg-green-600 mr-2"
                }
                // className={"p-4 bg-[#e7251e] w-1/6 rounded-md text-white mr-2"}
                name={"Change Password"}
                onClick={handleChangePassword}
              />
              <Button
                className={"p-4 bg-[#e7251e] w-1/6 rounded-md text-white"}
                // className={"p-4 w-1/6 bg-white border rounded-md text-black "}
                name={"Clear"}
                onClick={handleClearPassword}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
