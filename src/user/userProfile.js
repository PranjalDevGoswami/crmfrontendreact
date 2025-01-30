import { jwtDecode } from "jwt-decode";
import Input from "../Atom/InputField.js";
import Button from "../Atom/Button";
import Dropdown from "../components/DropDown";
import { useEffect, useState } from "react";
import Label from "../Atom/Label.js";
import { getWithAuth, putWithAuthForUpload } from "../provider/helper/axios";
import { FaRegUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { MdOutlineModeEdit } from "react-icons/md";
import SweetAlert from "../components/SweetAlert.js";
import { UPDATE_PROFILE } from "../../utils/constants/urls.js";

// export const userDetails = () => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     const decoded = jwtDecode(token);
//     const { role, username, user_id, userrole } = decoded;
//     localStorage.setItem("role", role);
//     localStorage.setItem("user_id", user_id);
//     localStorage.setItem("userrole", userrole);
//     localStorage.setItem("username", username);
//     return { role, username, user_id };
//   }
// };
// import { useNavigate } from "react-router-dom";
// import jwtDecode from "jwt-decode";

export const userDetails = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  

  if (token && token.split(".").length == 3) {
    try {
      const decoded = jwtDecode(token);
      const { role, username, user_id, userrole } = decoded;
      localStorage.setItem("role", role);
      localStorage.setItem("user_id", user_id);
      localStorage.setItem("userrole", userrole);
      localStorage.setItem("username", username);
      return { role, username, user_id };
    } catch (error) {
      console.error("Invalid token:", error);
      localStorage.clear();
      navigate("/login", { replace: true });
    }
  } else {
    console.error("Token is missing or invalid");
    localStorage.clear();
    navigate("/login", { replace: true });
  }
};

export const Profile = ({ profileDataUpdate }) => {
  const [profilePic, setProfilePic] = useState("");

  const navigate = useNavigate();

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
        {
          profileDetails?.profile_picture && console.log("ht");
          setProfilePic(profileDetails?.profile_picture);
        }
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
        SweetAlert({
          title: "info",
          text: "Please upload a JPG, PNG, or WebP file.",
          icon: "info",
        });
        return;
      } else {
        setProfileUpdateData((prev) => ({ ...prev, [name]: files[0] }));
      }
    }
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
      SweetAlert({
        title: "Success",
        text: "Profile Update Successfully!",
        icon: "success",
      });
    } else {
      setProfileUpdated(false);
    }
  };

  const handleCancelUpdateProfile = (e) => {
    navigate(-1);
  };

  return (
    <div className="bg-white rounded-md p-4 mt-16">
      <div className="m-8 mb-8 overflow-hidden">
        <h1 className="text-3xl pb-8 ">Update Profile</h1>
        <div className="w-8/12 m-auto">
          <div className="lg:flex lg:flex-row flex-col items-center justify-around">
            <div className="profile-pic w-6/12 border-b-2 border-b-black md:border-none">
              {profileDetails?.profile_picture !== null ? (
                <div className="relative">
                  <img
                    src={profileDetails?.profile_picture}
                    alt="user-profile-pic"
                    className="lg:w-40 lg:h-40 w-20 h-20 rounded-full bg-cover"
                  />
                  {profileDetails?.profile_picture && (
                    <MdOutlineModeEdit
                      className={
                        "absolute bottom-0 left-24 bg-gray-100 rounded-full p-2 w-8 h-8 cursor-pointer"
                      }
                      onClick={() => console.log("PP clear")}
                    />
                  )}
                </div>
              ) : (
                <FaRegUserCircle className="lg:w-40 lg:h-40 w-20 h-20 rounded-full bg-cover" />
              )}
              <div className="flex items-center mt-4">
                <Label labelName={"Email:"} className={"inline-block"} />
                <p className="text-xl font-bold p-1 text-wrap break-words w-9/12">
                  {profileDetails?.email}
                </p>
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
            <div className="w-6/12 flex flex-col lg:gap-4 gap-3 p-3 lg:p-4 mt-8">
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
                id={"gender"}
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
