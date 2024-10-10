// import React, { useContext, useState } from "react";
// import Button from "../Button";
// import LableAndInput from "../LableAndInput";
// import { toggleMultipleSampleCpi } from "../../../utils/slices/AddMutipleSampleCpiSlice";
// import { useDispatch } from "react-redux";
// import { FormDataContext } from "../../ContextApi/FormDataContext";
// import { addMultipleSample } from "../../../utils/slices/MultipleSampleCpiSlice";
// import { useSelector } from "react-redux";

// const AddMultipleSample = () => {
//   const dispatchIsMultipleSample = useDispatch();
//   const { formData, setFormData } = useContext(FormDataContext);
//   const dispatchRecord = useDispatch();

//   const [inputData, setInputData] = useState([
//     { field: "TG", type: "text", value: "" },
//     { field: "Sample", type: "number", value: "" },
//     { field: "CPI", type: "number", value: "" },
//   ]);
//   const MultiSampleCpiRecord = useSelector(
//     (store) => store.MultiSampleCpiRecord.sampleCpiRecord
//   );

//   const HandleAddMore = (e) => {
//     e.preventDefault();
//     setInputData((prevData) => [
//       ...prevData,
//       { field: "TG", type: "text", value: "" },
//       { field: "Sample", type: "number", value: "" },
//       { field: "CPI", type: "number", value: "" },
//     ]);
//   };

//   const HandleRemoveRow = (e, rowIndex) => {
//     e.preventDefault();
//     const newData = inputData.filter(
//       (_, index) => Math.floor(index / 3) !== rowIndex
//     );
//     setInputData(newData);
//   };

//   const handleInputChange = (e, index) => {
//     const newInputData = [...inputData];
//     newInputData[index].value = e.target.value;
//     setInputData(newInputData);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const rowData = [];
//     for (let i = 0; i < inputData.length; i += 3) {
//       const row = {
//         target_group: inputData[i].value,
//         sample: inputData[i + 1].value,
//         cpi: inputData[i + 2].value,
//       };
//       rowData.push(row);
//     }
//     dispatchRecord(addMultipleSample(rowData));
//     setFormData({ ...formData, project_samples: rowData });

//     dispatchIsMultipleSample(toggleMultipleSampleCpi(false));
//   };

//   return (
//     <div className="p-4">
//       <h2 className="p-2 pl-0 font-bold text-md">
//         Add Multiple Sample and Cpi
//       </h2>
//       {Array.from(
//         { length: Math.ceil(inputData.length / 3) },
//         (_, rowIndex) => (
//           <div key={rowIndex} className="flex items-center mb-2">
//             <div className="flex w-9/12">
//               {inputData
//                 .slice(rowIndex * 3, rowIndex * 3 + 3)
//                 .map((item, index) => (
//                   <div key={index} className="w-1/3 pr-2">
//                     <LableAndInput
//                       labelName={item.field}
//                       InputName={item.field}
//                       InputType={item.type}
//                       inputClassName={"p-1 border bg-[#f3eded] w-full"}
//                       labelClassName={"pb-2"}
//                       inputChange={(e) =>
//                         handleInputChange(e, rowIndex * 3 + index)
//                       }
//                       Inputvalue={item.value}
//                     />
//                   </div>
//                 ))}
//             </div>
//             {Math.ceil(inputData.length / 3) > 1 && (
//               <Button
//                 name={"Remove"}
//                 onClick={(e) => HandleRemoveRow(e, rowIndex)}
//                 className={
//                   "bg-red-400 text-white p-1 border rounded-sm text-xs mt-[30px] w-1/12"
//                 }
//               />
//             )}
//             {rowIndex === Math.ceil(inputData.length / 3) - 1 && (
//               <div className="w-2/12">
//                 <Button
//                   name={"Add More"}
//                   onClick={HandleAddMore}
//                   className={
//                     "bg-green-400 text-white p-1 border rounded-sm w-1/2 text-xs mt-[30px]"
//                   }
//                 />
//               </div>
//             )}
//           </div>
//         )
//       )}
//       <Button
//         name={"Submit"}
//         onClick={handleSubmit}
//         className={"bg-green-300 p-2 text-white mt-4"}
//       />
//     </div>
//   );
// };

// export default AddMultipleSample;

import React, { useContext, useState } from "react";
import Button from "../Button";
import LableAndInput from "../LableAndInput";
import { toggleMultipleSampleCpi } from "../../../utils/slices/AddMutipleSampleCpiSlice";
import { useDispatch } from "react-redux";
import { FormDataContext } from "../../ContextApi/FormDataContext";
import { addMultipleSample } from "../../../utils/slices/MultipleSampleCpiSlice";
import { useSelector } from "react-redux";

const AddMultipleSample = () => {
  const dispatchIsMultipleSample = useDispatch();
  const { formData, setFormData } = useContext(FormDataContext);
  const dispatchRecord = useDispatch();

  const MultiSampleCpiRecord = useSelector(
    (store) => store.MultiSampleCpiRecord.sampleCpiRecord
  );

  const initialInputData =
    MultiSampleCpiRecord.length > 0
      ? MultiSampleCpiRecord.map((record) => [
          { field: "TG", type: "text", value: record.target_group },
          { field: "Sample", type: "number", value: record.sample },
          { field: "CPI", type: "number", value: record.cpi },
        ]).flat()
      : [
          { field: "TG", type: "text", value: "" },
          { field: "Sample", type: "number", value: "" },
          { field: "CPI", type: "number", value: "" },
        ];

  const [inputData, setInputData] = useState(initialInputData);

  const HandleAddMore = (e) => {
    e.preventDefault();
    setInputData((prevData) => [
      ...prevData,
      { field: "TG", type: "text", value: "" },
      { field: "Sample", type: "number", value: "" },
      { field: "CPI", type: "number", value: "" },
    ]);
  };

  const HandleRemoveRow = (e, rowIndex) => {
    e.preventDefault();
    const newData = inputData.filter(
      (_, index) => Math.floor(index / 3) !== rowIndex
    );
    setInputData(newData);
  };

  const handleInputChange = (e, index) => {
    const newInputData = [...inputData];
    newInputData[index].value = e.target.value;
    setInputData(newInputData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const rowData = [];
    for (let i = 0; i < inputData.length; i += 3) {
      const row = {
        target_group: inputData[i].value,
        sample: inputData[i + 1].value,
        cpi: inputData[i + 2].value,
      };
      rowData.push(row);
    }
    dispatchRecord(addMultipleSample(rowData));
    setFormData({ ...formData, project_samples: rowData });

    dispatchIsMultipleSample(toggleMultipleSampleCpi(false));
  };

  return (
    <div className="p-4">
      <h2 className="p-2 pl-0 font-bold text-md">
        Add Multiple Sample and Cpi
      </h2>
      {Array.from(
        { length: Math.ceil(inputData.length / 3) },
        (_, rowIndex) => (
          <div key={rowIndex} className="flex items-center mb-2">
            <div className="flex w-9/12">
              {inputData
                .slice(rowIndex * 3, rowIndex * 3 + 3)
                .map((item, index) => (
                  <div key={index} className="w-1/3 pr-2">
                    <LableAndInput
                      labelName={item.field}
                      InputName={item.field}
                      InputType={item.type}
                      inputClassName={"p-1 border bg-[#f3eded] w-full"}
                      labelClassName={"pb-2"}
                      inputChange={(e) =>
                        handleInputChange(e, rowIndex * 3 + index)
                      }
                      Inputvalue={item.value}
                    />
                  </div>
                ))}
            </div>
            {Math.ceil(inputData.length / 3) > 1 && (
              <Button
                name={"Remove"}
                onClick={(e) => HandleRemoveRow(e, rowIndex)}
                className={
                  "bg-red-400 text-white p-1 border rounded-sm text-xs mt-[30px] w-1/12"
                }
              />
            )}
            {rowIndex === Math.ceil(inputData.length / 3) - 1 && (
              <div className="w-2/12">
                <Button
                  name={"Add More"}
                  onClick={HandleAddMore}
                  className={
                    "bg-green-400 text-white p-1 border rounded-sm w-1/2 text-xs mt-[30px]"
                  }
                />
              </div>
            )}
          </div>
        )
      )}
      <Button
        name={"Submit"}
        onClick={handleSubmit}
        className={"bg-green-300 p-2 text-white mt-4"}
      />
    </div>
  );
};

export default AddMultipleSample;
