// import React, { useContext, useState } from "react";
// import LableAndInput from "../../Molecules/LableAndInput";
// import { postWithAuth } from "../../provider/helper/axios";
// import { EDITPROJECTREQUEST } from "../../../utils/constants/urls";
// import { NotifiactionContext } from "../../ContextApi/NotificationContext";
// import Loader from "../../Atom/Loader";
// import SweetAlert from "../../components/SweetAlert";
// import { DataTableContext } from "../../ContextApi/DataTableContext";
// import { useSelector } from "react-redux";
// import { addReRender } from "../../../utils/slices/ReRenderSlice";
// import { useDispatch } from "react-redux";
// import { ProjectData } from "../../../utils/apis/projectData";
// import { setProjects } from "../../../utils/slices/ProjectSlice";

// const SampleEdit = ({ viewRecord }) => {
//   const [showDate, setShowDate] = useState();
//   const [updatedValue, setUpdatedValue] = useState({
//     project_id: viewRecord.id,
//     tentative_end_date: new Date(viewRecord.tentative_end_date).toISOString(),
//     sample: viewRecord?.sample,
//     reason_for_adjustment: "",
//   });
//   const [errors, setErrors] = useState({
//     sample: "",
//     reason_for_adjustment: "",
//     tentative_end_date: "",
//   });

//   const projectData = useSelector((store) => store.projectData.projects);
//   const currentProject = projectData.filter((item) => item.id == viewRecord.id);
//   const IsMultipleSample = currentProject?.map(
//     (item) => item?.project_samples
//   );

//   const { setisEdit } = useContext(DataTableContext);
//   const darkMode = useSelector((store) => store.darkMode.isDarkMode);
//   const dispatchReRender = useDispatch();

//   const { notificationList, setNotificationList } =
//     useContext(NotifiactionContext);
//   const [loader, setLoader] = useState(false);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     if (name === "tentative_end_date") {
//       const selectedDate = new Date(value);
//       const tentativeStartDate = new Date(viewRecord.tentative_start_date);
//       let errorMsg = "";

//       if (selectedDate <= tentativeStartDate) {
//         errorMsg = "End date must be after the start date.";
//       } else if (selectedDate.getDay() === 6 || selectedDate.getDay() === 0) {
//         errorMsg = "Weekend dates are not allowed.";
//       }

//       setErrors((prevErrors) => ({
//         ...prevErrors,
//         tentative_end_date: errorMsg,
//       }));

//       setShowDate(value);
//       setUpdatedValue({
//         ...updatedValue,
//         tentative_end_date: selectedDate.toISOString(),
//       });
//     }

//     if (name === "sample") {
//       let errorMsg = "";
//       const numericValue = Number(value);

//       if (value.trim() === "") {
//         errorMsg = "Sample field cannot be empty.";
//       } else if (numericValue === 0) {
//         errorMsg = "Sample value cannot be 0.";
//       }
//       setErrors((prevErrors) => ({
//         ...prevErrors,
//         sample: errorMsg,
//       }));

//       setUpdatedValue({
//         ...updatedValue,
//         sample: value,
//       });
//     }
//     if (name === "reason_for_adjustment") {
//       setUpdatedValue({
//         ...updatedValue,
//         reason_for_adjustment: value,
//       });
//     }
//   };

//   const getMinDate = () => {
//     let currentDate = new Date();
//     let daysBack = 0;

//     while (daysBack < 2) {
//       if (currentDate.getDay() === 1) {
//         currentDate.setDate(currentDate.getDate() - 3);
//       } else if (currentDate.getDay() === 0) {
//         currentDate.setDate(currentDate.getDate() - 2);
//       } else {
//         currentDate.setDate(currentDate.getDate() - 1);
//       }
//       daysBack++;
//     }

//     return currentDate.toISOString().split("T")[0];
//   };

//   const handleCancelUpdate = () => {
//     setisEdit(false);
//     document.body.classList.remove("DrawerBody");
//   };

//   const validateFields = () => {
//     let isValid = true;
//     let errorMessage = "";

//     if (!updatedValue.reason_for_adjustment) {
//       isValid = false;
//       errorMessage += "Reason for adjustment is required.\n";
//     }

//     if (!isValid) {
//       SweetAlert({
//         title: "Error",
//         text: errorMessage.trim(),
//         icon: "error",
//       });
//     }

//     return isValid;
//   };
//   const PostUpdateEditData = async (data) => {
//     setLoader(true);
//     let id = data?.project_id;
//     const response = await postWithAuth(EDITPROJECTREQUEST(id), data);
//     if (response.status === true) {
//       setLoader(false);
//       SweetAlert({
//         title: "Edit Request Sent Successfully",
//         text: "",
//         icon: "success",
//       });
//       setisEdit(false);
//       // dispatchReRender(addReRender());
//       const projectData = await ProjectData(); // Wait for the promise to resolve
//       dispatchReRender(setProjects(projectData));
//     }
//     setNotificationList([...notificationList, response?.data]);
//   };

//   const handleEditUpdate = () => {
//     if (!validateFields() || errors.tentative_end_date) return;
// console.log(updatedValue);

//     PostUpdateEditData(updatedValue);
//   };

//   return (
//     <div
//       className={`${
//         darkMode ? "bg-black text-white" : "bg-gray-50 text-black"
//       }`}
//     >
//       <h3 className="text-xl underline pb-4">Project Edit Request</h3>
//       <div className="flex items-center flex-wrap justify-center w-full rounded-sm">
//         <div className="ProjectOperationEdit hidden">
//           <LableAndInput
//             labelName={"Project Code"}
//             Inputvalue={viewRecord.project_code.toUpperCase()}
//             desabled={true}
//             inputClassName={"cursor-not-allowed p-2 border bg-[#f3eded]"}
//             labelClassName={"pt-4 pb-2 text-left"}
//             inputChange={handleInputChange}
//           />
//         </div>
//         <div className="ProjectOperationEdit">
//           <LableAndInput
//             labelName={"Project Name"}
//             Inputvalue={viewRecord.name}
//             desabled={true}
//             inputClassName={"cursor-not-allowed p-2 border bg-[#f3eded]"}
//             labelClassName={"pt-4 pb-2 text-left"}
//             inputChange={handleInputChange}
//           />
//         </div>
//         <div className="ProjectOperationEdit">
//           <LableAndInput
//             labelName={"Date End Required(Tentative)"}
//             InputName={"tentative_end_date"}
//             InputType={"date"}
//             inputClassName={"p-2 border w-full"}
//             labelClassName={"pt-4 pb-2 text-left"}
//             Inputvalue={showDate}
//             inputChange={handleInputChange}
//             min={getMinDate()}
//           />
//           {errors.tentative_end_date && (
//             <p className="text-red-500 text-sm">{errors.tentative_end_date}</p>
//           )}
//         </div>

//         <div className="ProjectOperationEdit">
//           <LableAndInput
//           labelName={"Revised Target Required (Sample)"}
//           InputType={"number"}
//           InputName={"sample"}
//           inputClassName={"p-2 border"}
//           labelClassName={"pt-4 pb-2 text-left"}
//           Inputvalue={updatedValue.sample}
//           inputChange={handleInputChange}
//           InputMax_lenght={3}
//           min={1}
//         />         
//           {errors.sample && (
//             <p className="text-red-500 text-sm">{errors.sample}</p>
//           )}
//         </div>
//         <div className="ProjectOperationEdit">
//           <LableAndInput
//             labelName={"Reason"}
//             InputType={"text"}
//             InputName={"reason_for_adjustment"}
//             inputClassName={"p-2 border"}
//             labelClassName={"pt-4 pb-2 text-left"}
//             Inputvalue={updatedValue.reason_for_adjustment}
//             inputChange={handleInputChange}
//           />
//         </div>
//         <div className="flex pt-10">
//           <button
//             onClick={handleEditUpdate}
//             className={
//               "bg-green-300 p-4 m-2 flex items-center w-full rounded text-white hover:bg-green-500"
//             }
//           >
//             Update
//           </button>
//           <button
//             onClick={handleCancelUpdate}
//             className={
//               "bg-red-300 p-4 m-2 flex items-center w-full rounded text-white hover:bg-red-500"
//             }
//           >
//             Cancel
//           </button>
//         </div>
//         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
//           {loader ? <Loader /> : ""}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SampleEdit;