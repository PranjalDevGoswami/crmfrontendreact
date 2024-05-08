import { jwtDecode } from "jwt-decode";
import Input from "../components/InputField";
import Button from "../components/Button";
import Dropdown from "../components/DropDown";
import { useEffect, useState } from "react";
import Label from "../components/Label";
import {
  getWithAuth,
  putWithAuth,
  putWithAuthForUpload,
} from "../provider/helper/axios";
import { UPDATE_PROFILE } from "../../utils/urls.js";
import { FaRegUserCircle } from "react-icons/fa";

export const userDetails = () => {
  const token = localStorage.getItem("token");
  if (token) {
    const decoded = jwtDecode(token);
    const { role, username, user_id } = decoded;
    localStorage.setItem("role", role);
    localStorage.setItem("user_id", user_id);
    localStorage.setItem("username", username);
    return { role, username, user_id };
  }
};

export const Profile = () => {
  const [profileUpdateData, setProfileUpdateData] = useState({
    gender: "",
    email: "",
    phone: "",
    profile_picture: "",
  });
  const [profileDetails, setProfileDetails] = useState();
  const [profileUpdated, setProfileUpdated] = useState(false);

  useEffect(() => {
    const GetProfileDetails = async () => {
      const response = await getWithAuth(UPDATE_PROFILE);
      if (response?.status == true) {
        setProfileDetails(response?.data);
        console.log(response);
      }
    };
    GetProfileDetails();
  }, [profileUpdated]);

  const handleDropdownChange = (e, dropdownType, value) => {
    if (dropdownType === "gender") {
      setProfileUpdateData((prevData) => ({
        ...prevData,
        gender: value,
      }));
    }
  };
  const handleUpdateProfileInput = (e) => {
    const { name, value, files } = e.target;
    setProfileUpdateData((prev) => ({ ...prev, [name]: value }));
    if (name === "profile_picture" && files.length > 0) {
      const allowedFormats = ["image/jpeg", "image/png", "image/webp"];
      const file = files[0];
      if (!allowedFormats.includes(file.type)) {
        alert("Please upload a JPG, PNG, or WebP file.");
        return;
      } else {
        setProfileUpdateData((prev) => ({ ...prev, [name]: files[0] }));
      }
    }
    // if (name === "profile_picture") {
    // }
  };
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    const updatedData = Object.entries(profileUpdateData)
      .filter(([key, value]) => value !== null && value !== "")
      .reduce((acc, [key, value]) => {
        acc[key] = value;
        return acc;
      }, {});
    const response = await putWithAuthForUpload(UPDATE_PROFILE, updatedData);
    if (response.status == true) {
      setProfileUpdated(!profileUpdated);
      alert("Profile Update Successfully!");
    } else {
      console.log(response);
      setProfileUpdated(false);
    }
  };

  const handleCancelUpdateProfile = (e) => {
    console.log("cancel");
  };

  return (
    <div className="">
      <div className="m-8 mb-8 overflow-hidden">
        <h1 className="text-3xl pb-8 ">Update Profile</h1>
        <div className="w-10/12 m-auto">
          <div className="lg:flex lg:flex-row flex-col items-center justify-around">
            <div className="profile-pic lg:w-4/12 w-full border-b-2 border-b-black">
              {profileDetails?.profile_picture !== null ? (
                <div>
                  <img
                    src={profileDetails?.profile_picture}
                    alt="user-profile-pic"
                    className="lg:w-40 lg:h-40 w-20 h-20 rounded-full bg-cover"
                  />
                </div>
              ) : (
                <FaRegUserCircle className="lg:w-40 lg:h-40 w-20 h-20 rounded-full bg-cover" />
              )}
              <div className="flex items-center mt-4">
                <Label labelName={"Email:"} className={"inline-block"} />
                <p className="text-xl font-bold p-1">{profileDetails?.email}</p>
              </div>
              <div className="flex items-center">
                <Label labelName={"Gender:"} />
                <p className="text-xl font-bold p-1">
                  {profileDetails?.gender}
                </p>
              </div>
              <div className="flex items-center">
                <Label labelName={"Phone:"} />
                <p className="text-xl font-bold p-1">{profileDetails?.phone}</p>
              </div>
            </div>
            <div className="lg:w-8/12 w-full flex flex-col lg:gap-4 gap-3 p-3 lg:p-4 mt-8">
              <Label labelName={"Phone Number"} />
              <Input
                type={"number"}
                name={"phone"}
                className={
                  "outline-none p-2 pl-4 border bg-[#f3eded] rounded-full focus:border-cyan-600 relative w-full"
                }
                required={"required"}
                placeholder={"Phone Number"}
                onchange={handleUpdateProfileInput}
              />
              <Label labelName={"Gender"} />

              <Dropdown
                className={
                  "outline-none p-2 pl-4 border bg-[#f3eded] rounded-full focus:border-cyan-600 relative w-full pr-4"
                }
                Option_Name={["select gender", "Male", "Female", "Other"]}
                RequireAddButton={false}
                onChange={(e, value) =>
                  handleDropdownChange(e, "gender", value)
                }
              />
              <Label labelName={"Upload Profile pic"} />

              <Input
                type={"file"}
                name={"profile_picture"}
                className={
                  "outline-none p-2 pl-4 border bg-[#f3eded] rounded-full focus:border-cyan-600 relative w-full"
                }
                required={"required"}
                placeholder={"upload profile pic"}
                onchange={handleUpdateProfileInput}
              />

              <div className="flex justify-center pt-4">
                <Button
                  className={
                    "p-4 bg-green-300 w-1/2 rounded-full text-white hover:bg-green-600"
                  }
                  name={"Update"}
                  onClick={handleUpdateProfile}
                />
                <Button
                  className={
                    "p-4 bg-[#e7251e] w-1/2 rounded-full text-white ml-2"
                  }
                  name={"Cancel"}
                  onClick={handleCancelUpdateProfile}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
