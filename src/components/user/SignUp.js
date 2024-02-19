import React, { useState, useEffect } from "react";
import Input from "../InputField";
import Dropdown from "../DropDown";
import Button from "../Button";
import { Link} from "react-router-dom";
import { useNavigate } from "react-router-dom";


const SignUp = () => {
  const [departmentId, setDepartmentId] = useState([]);
  const [departmentName, setDepartmentName] = useState([]);


  // const [departmentList, setDepartmentList] = useState([]);
 
  // const isDepartmentLoaded = departmentId.length > 0;
  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
    phone: null,
    gender: '',
    user_department: 2,
  });
  const navigate = useNavigate();

  useEffect(() => {
    getDepartments();
  },[]);

  const getDepartments = async () => {
    const department = await fetch(
      "http://65.1.93.34:8000/api/user/department/"
    );
    const departmentJson = await department.json();
    const depName = await departmentJson.map((dep) => String(dep.name));
    const departmentDetails = await departmentJson.map((dep) => (dep));
    setDepartmentName(depName);
    setDepartmentId(departmentDetails)    
  };

  const handleregisterDataSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://65.1.93.34:8000/api/user/register/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(registerData),
          
        }
      );
      navigate("/login");

      if (!response.ok) {
        const errorData = await response.json();
        // console.error("Registration error:", errorData);
        // Handle and display validation errors to the user
      } else {
        // Handle success
        // console.log("User registered successfully");
      }
    } catch (error) {
      // console.error("Registration error:", error.message);
    }
  };

  // console.log("registerDataregisterData",registerData);

  const handleDropdownChange = (e, dropdownType,value) => {
      if (dropdownType === "gender") {
        setRegisterData((prevData) => ({
          ...prevData,
          gender: value,
        }));
      } else if (dropdownType === "user_department") {
        const selectedDepartment = departmentId.find(dep => dep.name === value);
        if (selectedDepartment) {
          setRegisterData((prevData) => ({
            ...prevData,
            user_department: selectedDepartment.id,
          }));
        }
      }
    }


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRegisterData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div className="bg-[url('./assets/HS-blog-post-20-2048x1075.png')] opacity-80 w-full h-screen bg-contain">
      <div className="flex h-full">
        <div className="w-2/3 h-2/3 flex flex-col items-center justify-center p-8 pl-8">
          {/* <h2 className="text-4xl text-white ">Welcome To UNIMRKT</h2> */}
          {/* <p className="text-xl text-white  py-4">
            {" "}
            Lorem IspumLorem IspumLorem IspumLorem IspumLorem IspumLorem
            IspumLorem IspumLorem IspumLorem Ispum
          </p> */}
        </div>
        <div className="w-1/3">
          <div className="h-screen shadow-gray-600 shadow-lg bg-white flex justify-center items-center w-full relative">
            <div className="flex flex-col gap-4 p-4 w-9/12">
              <Input
                type={"text"}
                className={
                  "outline-none p-2 pl-4 border bg-[#f3eded] rounded-full focus:border-cyan-600 relative w-full"
                }
                placeholder={"Username"}
                max_lenght={"50"}
                required={"required"}
                name={"username"}
                onchange={handleInputChange}
                value={registerData.username}
              />
              <Input
                type={"email"}
                className={
                  "outline-none p-2 pl-4 border bg-[#f3eded] rounded-full focus:border-cyan-600 relative w-full"
                }
                required={"required"}
                placeholder={"userId or email address"}
                name={"email"}
                onchange={handleInputChange}
              />
              <Input
                type={"password"}
                className={
                  "outline-none p-2 pl-4 border bg-[#f3eded] rounded-full focus:border-cyan-600 relative w-full"
                }
                required={"required"}
                placeholder={"password"}
                name={"password"}
                onchange={handleInputChange}
              />
              <Input
                type={"number"}
                className={
                  "outline-none p-2 pl-4 border bg-[#f3eded] rounded-full focus:border-cyan-600 relative w-full"
                }
                placeholder={"Phone"}
                max_lenght={"20"}
                required={"required"}
                name={"phone"}
                onchange={handleInputChange}
              />
              <Dropdown
                className={
                  "outline-none p-2 pl-4 border bg-[#f3eded] rounded-full focus:border-cyan-600 relative w-full pr-4"
                }
                Option_Name={["select gender", "Male", "Female", "Other"]}
                RequireAddButton={false}
                onChange={(e,value) => handleDropdownChange(e, "gender",value)}
              />
             {departmentName.length > 0 && (
                <Dropdown
                  className={
                    "outline-none p-2 pl-4 border bg-[#f3eded] rounded-full focus:border-cyan-600 relative w-full pr-4"
                  }
                  Option_Name={['Select department',...departmentName]}
                  RequireAddButton={false}
                  onChange={(e,value) => handleDropdownChange(e, "user_department",value)}
                />
              )}
              <div className="flex justify-center">
                <Button
                  className={"p-4 bg-[#e7251e] rounded-full text-white w-1/2"}
                  name={"Register Now"}
                  onClick={handleregisterDataSubmit}
                />
              </div>
              <div className="flex justify-center">
                <Link to="/login">
                  <Button
                    className={"p-4 underline"}
                    name={"Have a account? Login"}
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

export default SignUp;
