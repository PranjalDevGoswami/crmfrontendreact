import React, { useEffect, useState } from "react";
import Input from "../components/InputField";
import Button from "../components/Button";
import { postWithAuth } from "../provider/helper/axios";
import { CHANGE_PASSWORD } from "../../utils/urls";
import { useNavigate } from "react-router-dom";

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
        alert("Password Change Successfully");
        localStorage.clear();
        navigate("/login");
      } else {
        alert(response?.ex?.response?.data?.non_field_errors[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const validatePasswords = () => {
    if (
      changePasswordData.new_password !== changePasswordData.confirm_password
    ) {
      alert("Passwords do not match");
      return false;
    }
    return true;
  };
  return (
    <div className="">
      <div className="m-8 mb-8">
        <div className=" flex justify-center">
          <div className="flex flex-col gap-4 p-4 w-6/12">
            <h1 className="text-3xl p-8 ">Change Password</h1>
            <Input
              type={"password"}
              name={"old_password"}
              className={
                "outline-none p-2 pl-4 border bg-[#f3eded] rounded-full focus:border-cyan-600 relative w-full"
              }
              required={"required"}
              placeholder={"Old Password"}
              onchange={handleChangePasswordInput}
            />
            <Input
              type={"password"}
              name={"new_password"}
              className={
                "outline-none p-2 pl-4 border bg-[#f3eded] rounded-full focus:border-cyan-600 relative w-full"
              }
              required={"required"}
              placeholder={"New Password"}
              onchange={handleChangePasswordInput}
            />
            <Input
              type={"password"}
              name={"confirm_password"}
              className={
                "outline-none p-2 pl-4 border bg-[#f3eded] rounded-full focus:border-cyan-600 relative w-full"
              }
              required={"required"}
              placeholder={"Confirm New Password"}
              onchange={handleChangePasswordInput}
            />

            <div className="flex justify-center pt-4">
              <Button
                className={"p-4 bg-[#e7251e] w-1/2 rounded-full text-white "}
                name={"Change Password"}
                onClick={handleChangePassword}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
