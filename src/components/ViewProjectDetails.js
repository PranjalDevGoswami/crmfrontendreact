// import React from "react";
// import Label from "./Label";
// import Input from "./InputField";
// import { useSelector } from "react-redux";


// const ViewProjectDetails = ({index}) => {
//   const [editedValue, setEditedValue] = useState({});

//   const handleEditField = (index) => {
//     setIsEdit(true);
//     setEditedIndex(index);
//     Formdata1.forEach((value, existingIndex) => {
//       if (index == existingIndex) {
//         setEditedValue(value);
//       }
//     });
//   };

//   const Formdata1 = useSelector((store)=>store.FormData.items);

//   // const { Project_Name, Client, Start_Date, End_Date, AM } = Formdata1;
//   console.log("fordata..........",Formdata1);

//   return (
//     <div className="flex flex-col gap-4 p-8 pt-16 text-xl border border-red-100">
//       {/* <div className="bg-gray-200"> */}
//         {/* {
//           Formdata1.map()
//         }
//         <Label labelName={"Project ID"} />
//         <Input
//           disabled="true"
//           className={"cursor-not-allowed"}
//           value={Project_Name}
//         />
//       </div>
//       <div className="bg-gray-">
//         <Label labelName={"Project_Name"} />
//         <Input
//           disabled="true"
//           className={"cursor-not-allowed"}
//           value={Project_Name}
//         />
//       </div>
//       <div className="bg-gray-200">
//         {" "}
//         <Label labelName={"Client Name"} />
//         <Input
//           disabled="true"
//           className={"cursor-not-allowed"}
//           value={Client}
//         />
//       </div>
//       <div className="bg-gray-">
//         {" "}
//         <Label labelName={"Start Date"} />
//         <Input
//           disabled="true"
//           className={"cursor-not-allowed"}
//           value={Start_Date}
//         />
//       </div>
//       <div className="bg-gray-200">
//         {" "}
//         <Label labelName={"End Date"} />
//         <Input
//           disabled="true"
//           className={"cursor-not-allowed"}
//           value={End_Date}
//         />
//       </div>
//       <div className="bg-gray-">
//         {" "}
//         <Label labelName={"Type"} />
//         <Input
//           disabled="true"
//           className={"cursor-not-allowed"}
//           value={AM}
//         />
//       </div>
//       <div className="bg-gray-200">
//         {" "}
//         <Label labelName={"Project Target"} />
//         <Input
//           disabled="true"
//           className={"cursor-not-allowed"}
//           value={Project_Name}
//         />
//       </div>
//       <div className="bg-gray-">
//         {" "}
//         <Label labelName={"Achieved Target"} />
//         <Input
//           disabled="true"
//           className={"cursor-not-allowed"}
//           value={Project_Name}
//         />
//       </div>
//       <div className="bg-gray-200">
//         {" "}
//         <Label labelName={"Remaining Target"} />
//         <Input
//           disabled="true"
//           className={"cursor-not-allowed"}
//           value={Project_Name}
//         />
//       </div>
//       <div className="bg-gray-">
//         {" "}
//         <Label labelName={"CPI"} />
//         <Input
//           disabled="true"
//           className={"cursor-not-allowed"}
//           value={Project_Name}
//         />
//       </div>
//       <div className="bg-gray-200">
//         {" "}
//         <Label labelName={"CBR Status"} />
//         <Input
//           disabled="true"
//           className={"cursor-not-allowed"}
//           value={Project_Name}
//         />
//       </div>
//       <div className="bg-gray-">
//         {" "}
//         <Label labelName={"SOW Costing"} />
//         <Input
//           disabled="true"
//           className={"cursor-not-allowed"}
//           value={Project_Name}
//         />
//       </div>
//       <div className="bg-gray-200">
//         {" "}
//         <Label labelName={"Actual Costing"} />
//         <Input
//           disabled="true"
//           className={"cursor-not-allowed"}
//           value={Project_Name}
//         />
//       </div>
//       <div className="bg-gray-">
//         <Label labelName={"SOW Status"} />
//         <Input
//           disabled="true"
//           className={"cursor-not-allowed"}
//           value={Project_Name}
//         />
//       </div>
//       <div className="bg-gray-200">
//         {" "}
//         <Label labelName={"Mandays Till Date"} />
//         <Input
//           disabled="true"
//           className={"cursor-not-allowed"}
//           value={Project_Name}
//         />
//       </div>
//       <div className="bg-gray-">
//         {" "}
//         <Label labelName={"Remarks"} />
//         <Input
//           disabled="true"
//           className={"cursor-not-allowed"}
//           value={Project_Name}
//         />
//       </div>
//       <div className="bg-gray-200">
//         {" "}
//         <Label labelName={"Project Manager"} />
//         <Input
//           disabled="true"
//           className={"cursor-not-allowed"}
//           value={Project_Name}
//         />
//       </div>
//       <div className="bg-gray-">
//         {" "}
//         <Label labelName={"PSF PROJECTS"} />
//         <Input
//           disabled="true"
//           className={"cursor-not-allowed"}
//           value={Project_Name}
//         />
//       </div> */}
//       {Object.keys(editedValue).map((val, ind) => {
//             return (
//               <div className="flex gap-4" key={ind}>
//                 <Label labelName={val} className={"p-2 w-4/12"} />
//                 <input
//                   value={editedValue[val]}
//                   className="p-2 border m-2 w-9/12 bg-gray-100 cursor-not-allowed"
//                   disabled="true"
//                 />
//               </div>
//             );
//           })}
//     </div>
//   );
// };

// export default ViewProjectDetails;
