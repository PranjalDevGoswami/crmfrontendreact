// import React, { useState, useEffect } from "react";
// import Input from "../components/InputField";
// import Dropdown from "../components/DropDown";
// import Button from "../components/Button";
// import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import SweetAlert from "../components/SweetAlert";
// import { REGISTER } from "../../utils/constants/urls";

// const SignUp = () => {
//   const [departmentId, setDepartmentId] = useState([]);
//   const [departmentName, setDepartmentName] = useState(["it"]);
//   const [registerData, setRegisterData] = useState({
//     username: "",
//     email: "",
//     password: "",
//     phone: "",
//     // user_department: "",
//     confirm_password: "",
//   });
//   const navigate = useNavigate();

//   // useEffect(() => {
//   //   getDepartments();
//   // }, []);

//   // const getDepartments = async () => {
//   //   const department = await fetch(DEPARTMENTSAPIS);
//   //   const departmentJson = await department.json();
//   //   const depName = await departmentJson.map((dep) => String(dep.name));
//   //   const departmentDetails = await departmentJson.map((dep) => dep);
//   //   setDepartmentName(depName);
//   //   setDepartmentId(departmentDetails);
//   // };

//   const handleregisterDataSubmit = async (e) => {
//     e.preventDefault();
//     if (!registerData.username.trim()) {
//       SweetAlert({
//         title: "Username cannot be empty",
//         text: "",
//         icon: "info",
//       });
//       return;
//     }

//     try {
//       const response = await fetch(REGISTER, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Accept: "application/json",
//         },
//         body: JSON.stringify(registerData),
//       });
//       if (response.ok) {
//         SweetAlert({
//           title: "Success",
//           text: "Registration Successful !!",
//           icon: "success",
//         });
//         navigate("/login");
//       } else {
//         const errorData = await response.json();
//         console.error("Registration failed:", errorData);
//         if (errorData.email) {
//           SweetAlert({
//             title: "Error",
//             text: errorData.email,
//             icon: "error",
//           });
//         } else if (errorData.password) {
//           SweetAlert({
//             title: "Error",
//             text: "password :" + errorData.password,
//             icon: "error",
//           });
//         } else if (errorData.confirm_password) {
//           SweetAlert({
//             title: "Error",
//             text: "confirm password :" + errorData.confirm_password,
//             icon: "error",
//           });
//         } else if (errorData.non_field_errors) {
//           SweetAlert({
//             title: "Error",
//             text: errorData.non_field_errors[0],
//             icon: "error",
//           });
//         }
//       }
//     } catch (error) {}
//   };

//   const handleDropdownChange = (e, dropdownType, value) => {
//     if (dropdownType === "gender") {
//       setRegisterData((prevData) => ({
//         ...prevData,
//         gender: value,
//       }));
//     } else if (dropdownType === "user_department") {
//       console.log(value);
//       const selectedDepartment = departmentId.find((dep) => dep.name === value);
//       if (selectedDepartment) {
//         setRegisterData((prevData) => ({
//           ...prevData,
//           user_department: selectedDepartment.id,
//         }));
//       }
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     if (registerData.password && registerData.confirm_password) {
//       if (name === "phone") {
//         if (registerData.password !== registerData.confirm_password) {
//           // Password and confirm password do not match
//           SweetAlert({
//             title: "Error",
//             text: "Password and confirm password do not match",
//             icon: "error",
//           });
//           return;
//         }
//       }
//     }
//     setRegisterData((prevData) => ({ ...prevData, [name]: value }));
//   };

//   return (
//     <div className="bg-[url('./assets/HS-blog-post-20-2048x1075.png')] opacity-80 w-full h-screen bg-contain">
//       <div className="flex h-full">
//         <div className="w-2/3 h-2/3 flex flex-col items-center justify-center p-8 pl-8">
//           {/* <h2 className="text-4xl text-white ">Welcome To UNIMRKT</h2> */}
//           {/* <p className="text-xl text-white  py-4">
//             {" "}
//             Lorem IspumLorem IspumLorem IspumLorem IspumLorem IspumLorem
//             IspumLorem IspumLorem IspumLorem Ispum
//           </p> */}
//         </div>
//         <div className="w-1/3">
//           <div className="h-screen shadow-gray-600 shadow-lg bg-white flex justify-center items-center w-full relative">
//             <div className="flex flex-col gap-4 p-4 w-9/12">
//               <Input
//                 type={"text"}
//                 className={
//                   "outline-none p-2 pl-4 border bg-[#f3eded] rounded-full focus:border-cyan-600 relative w-full"
//                 }
//                 placeholder={"Username"}
//                 max_lenght={"50"}
//                 required={"required"}
//                 name={"username"}
//                 onchange={handleInputChange}
//                 value={registerData.username}
//               />
//               <Input
//                 type={"email"}
//                 className={
//                   "outline-none p-2 pl-4 border bg-[#f3eded] rounded-full focus:border-cyan-600 relative w-full"
//                 }
//                 required={"required"}
//                 placeholder={"email address"}
//                 name={"email"}
//                 onchange={handleInputChange}
//               />
//               <Input
//                 type={"password"}
//                 className={
//                   "outline-none p-2 pl-4 border bg-[#f3eded] rounded-full focus:border-cyan-600 relative w-full"
//                 }
//                 required={"required"}
//                 placeholder={"password"}
//                 name={"password"}
//                 onchange={handleInputChange}
//               />
//               <Input
//                 type={"password"}
//                 className={
//                   "outline-none p-2 pl-4 border bg-[#f3eded] rounded-full focus:border-cyan-600 relative w-full"
//                 }
//                 required={"required"}
//                 placeholder={"confirm password"}
//                 name={"confirm_password"}
//                 onchange={handleInputChange}
//               />
//               <Input
//                 type={"number"}
//                 className={
//                   "outline-none p-2 pl-4 border bg-[#f3eded] rounded-full focus:border-cyan-600 relative w-full"
//                 }
//                 placeholder={"Phone"}
//                 max_lenght={"20"}
//                 required={"required"}
//                 name={"phone"}
//                 onchange={handleInputChange}
//               />
//               {/* <Dropdown
//                 className={
//                   "outline-none p-2 pl-4 border bg-[#f3eded] rounded-full focus:border-cyan-600 relative w-full pr-4"
//                 }
//                 Option_Name={["select gender", "Male", "Female", "Other"]}
//                 RequireAddButton={false}
//                 onChange={(e, value) =>
//                   handleDropdownChange(e, "gender", value)
//                 }
//               /> */}
//               {/* {departmentName.length > 0 && (
//                 <Dropdown
//                   className={
//                     "outline-none p-2 pl-4 border bg-[#f3eded] rounded-full focus:border-cyan-600 relative w-full pr-4"
//                   }
//                   Option_Name={["Select department", ...departmentName]}
//                   RequireAddButton={false}
//                   onChange={(e, value) =>
//                     handleDropdownChange(e, "user_department", value)
//                   }
//                 />
//               )} */}
//               <div className="flex justify-center">
//                 <Button
//                   className={"p-4 bg-[#e7251e] rounded-full text-white w-1/2"}
//                   name={"Register Now"}
//                   onClick={handleregisterDataSubmit}
//                 />
//               </div>
//               <div className="flex justify-center">
//                 <Link to="/login">
//                   <Button
//                     className={"p-4 underline"}
//                     name={"Already Have account? Login"}
//                   />
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignUp;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { REGISTER } from "../../utils/constants/urls";
import SweetAlert from "../components/SweetAlert";

const SignUp = () => {
  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
    phone: "",
  });
  const navigate = useNavigate();

  const handleregisterDataSubmit = async (e) => {
    e.preventDefault();
    if (!registerData.username.trim()) {
      SweetAlert({
        title: "Username cannot be empty",
        text: "",
        icon: "info",
      });
      return;
    }

    try {
      const response = await fetch(REGISTER, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(registerData),
      });
      if (response.ok) {
        SweetAlert({
          title: "Success",
          text: "Registration Successful !!",
          icon: "success",
        });
        navigate("/login");
      } else {
        const errorData = await response.json();
        if (errorData.email) {
          SweetAlert({
            title: "Error",
            text: errorData.email,
            icon: "error",
          });
        } else if (errorData.password) {
          SweetAlert({
            title: "Error",
            text: "password :" + errorData.password,
            icon: "error",
          });
        } else if (errorData.confirm_password) {
          SweetAlert({
            title: "Error",
            text: "confirm password :" + errorData.confirm_password,
            icon: "error",
          });
        } else if (errorData.non_field_errors) {
          SweetAlert({
            title: "Error",
            text: errorData.non_field_errors[0],
            icon: "error",
          });
        }
      }
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRegisterData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <form id="RegForm" className="h-screen relative overflow-hidden">
      <div className="flex justify-center items-center h-full">
        {/* Background Gradient */}
        <div className="absolute top-0 left-0 w-3/5 h-full bg-gradient-to-r rounded-tr-full rounded-br-full from-red-500 to-orange-300 -z-10">
          <div className="flex flex-col justify-center h-full pl-20">
            <h1 className="text-white text-5xl font-bold mb-4">
              Create Your Account
            </h1>
            <p className="text-white text-xl">Join us and get started today!</p>
          </div>
        </div>

        {/* Form Container */}
        <div className="absolute right-0 w-20 h-20 bg-red-600 rounded-full -mr-10 -mb-10"></div>

        {/* Form content */}
        <div className="relative w-full max-w-md p-8 bg-white shadow-lg rounded-lg z-10 ml-auto mr-8 sm:mr-16 lg:mr-24">
          <h1 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-transparent bg-clip-text">
            Sign Up
          </h1>

          {/* Form Fields */}
          <div className="flex flex-col gap-4">
            <input
              type="text"
              className="outline-none p-3 border bg-gray-200 shadow-lg focus:border-cyan-600 rounded-md"
              placeholder="Username"
              required
              name="username"
              onChange={handleInputChange}
              value={registerData.username}
            />

            <input
              type="email"
              className="outline-none p-3 border bg-gray-200 shadow-lg focus:border-cyan-600 rounded-md"
              placeholder="Email ID"
              required
              name="email"
              onChange={handleInputChange}
              value={registerData.email}
            />

            <input
              type="password"
              className="outline-none p-3 border bg-gray-200 shadow-lg focus:border-cyan-600 rounded-md"
              placeholder="Password"
              required
              name="password"
              onChange={handleInputChange}
              value={registerData.password}
            />

            <input
              type="password"
              className="outline-none p-3 border bg-gray-200 shadow-lg focus:border-cyan-600 rounded-md"
              placeholder="Confirm Password"
              required
              name="confirm_password"
              onChange={handleInputChange}
              value={registerData.confirm_password}
            />

            <input
              type="number"
              className="outline-none p-3 border bg-gray-200 shadow-lg focus:border-cyan-600 rounded-md"
              placeholder="Phone Number"
              required
              name="phone"
              onChange={handleInputChange}
              value={registerData.phone}
            />

            <button
              className="p-3 bg-red-600 text-white shadow-lg hover:bg-blue-700 w-full"
              onClick={handleregisterDataSubmit}
            >
              Register Now
            </button>

            <div className="flex justify-center mt-4">
              <span className="text-gray-600"> Don't have an account?</span>
              <Link to="/login">
                <button className="text-cyan-600"> Login </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default SignUp;
