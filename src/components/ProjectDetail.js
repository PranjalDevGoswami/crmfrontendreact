import React, { useEffect, useState } from "react";
import { MdModeEditOutline, MdDelete } from "react-icons/md";
import { GrFormView } from "react-icons/gr";
import Button from "./Button.js";
import Label from "./Label";
import ViewProjectDetails from "./ViewProjectDetails.js";
import { useDispatch, useSelector } from "react-redux";
import { addFormData } from "./features/projectData/projectDataSlice.js";
import { GetProjectData } from "./fetchApis/projects/getProjectData/GetProjectData.js";
import LableAndInput from "./LableAndInput.js";

const ProjectDetail = ({ data }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [editedIndex, setEditedIndex] = useState();
  const [editedValue, setEditedValue] = useState({});
  const [totalMandays, setTotalMandays] = useState(0); // Initialize with 0
  const [mandaysEntry, setMandaysEntry] = useState("");
  const [mandaysEntryDate, setMandaysEntryDate] = useState("");
  const [CalculateEnrty, setCalculateEnrty] = useState(0);
  const [isOperationPerson, setIsOperationPerson] = useState(true);
  const [viewProjectDetails, setViewProjectDetails] = useState(false);
  const [editedFieldIndex, setEditedFieldIndex] = useState(null);
  const [achieveTarget, setAchieveTarget] = useState();

  const dispatchProjectData = useDispatch();

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const fetchDataFromApi2 = await GetProjectData();
        // console.log("fetchDataFromApi2",fetchDataFromApi2);
        const projectDataObject = fetchDataFromApi2.map((val) => {
          return val;
        });
        dispatchProjectData(addFormData(projectDataObject));
      } catch (error) {
        console.error("Error fetching project data:", error);
      }
    };
    fetchProjectData();
  }, []);

  const Formdata1 = useSelector((store) => store.FormData.items);

  const handleEditField = (index) => {
    setIsEdit(true);
    setEditedIndex(index);
    Formdata1.forEach((value, existingIndex) => {
      if (index == existingIndex) {
        setEditedValue(value);
      }
    });
  };

  const handleViewField = (index) => {
    setViewProjectDetails(true);
    setEditedIndex(index);
    Formdata1.forEach((value, existingIndex) => {
      if (index == existingIndex) {
        setEditedValue(value);
      }
    });
  };

  const handleViewProjectClose = () => {
    setViewProjectDetails(false);
  };

  const handleEditUpdate = () => {
    const mandaysEntryValue = parseFloat(mandaysEntry);
    if (!isNaN(mandaysEntryValue)) {
      setTotalMandays((prevState) => prevState + mandaysEntryValue);
      setMandaysEntry(0);
    } else {
      console.error("Invalid mandays entry value");
    }
    setMandaysEntry("");
  };

  const handleCancelUpdate = () => {
    setIsEdit(false);
  };
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    if (name === "manDaysEntryDate") {
      setMandaysEntryDate(value);
    } else if (name === "achieve_target") {
      setAchieveTarget(value);
    } else {
      setMandaysEntry(value);
    }
  };

  const handleMandays = (e) => {
    setMandaysEntry(e.target.value);
  };
  const today = new Date();
  // Subtract one day from today's date
  const minDate = new Date(today);
  minDate.setDate(minDate.getDate() - 1);

  return (
    <div className="border shadow-xl border-black rounded-lg max-w-screen ">
      <table className=" shadow-black shadow ">
        <tbody>
          <tr className=" [&>*]:border [&>*]:border-solid [&>*]:border-gray-200 [&>*]:py-3 [&>*]:text-sm [&>*]:uppercase [&>*]:border-l-0 [&>*]:border-r-0 [&>*]:whitespace-no-wrap [&>*]:font-semibold [&>*]:text-center">
            <th className="ml-8 bg-[#bd1d1d] text-white">Sr. No.</th>
            <th className="ml-8 bg-[#bd1d1d] text-white">Project ID</th>
            <th className="ml-8 bg-[#bd1d1d] text-white">Client Name</th>
            <th className="ml-8 bg-[#bd1d1d] text-white">Project Name</th>
            <th className="ml-8 bg-[#bd1d1d] text-white">Type</th>
            <th className="ml-8 bg-[#bd1d1d] text-white">Start Date</th>
            <th className="ml-8 bg-[#bd1d1d] text-white">End Date</th>
            <th className="ml-8 bg-[#bd1d1d] text-white">Status</th>
            <th className="ml-8 bg-[#bd1d1d] text-white">Project Target</th>
            <th className="ml-8 bg-[#bd1d1d] text-white">Achieved Target</th>
            <th className="ml-8 bg-[#bd1d1d] text-white">Remaining Target</th>
            <th className="ml-8 bg-[#bd1d1d] text-white">CPI</th>
            <th className="ml-8 bg-[#bd1d1d] text-white">SOW Costing</th>
            <th className="ml-8 bg-[#bd1d1d] text-white">Actual Costing</th>
            <th className="ml-8 bg-[#bd1d1d] text-white">Mandays Till Date</th>
            <th className="ml-8 bg-[#bd1d1d] text-white">Project Manager</th>
            <th className="ml-8 bg-[#bd1d1d] text-white"></th>
            <th className="ml-8 bg-[#bd1d1d] text-white"></th>
          </tr>
        </tbody>
        <tbody>
          {Formdata1.map((value, index) => {
            const ttStartDateTimeString = value.tentative_start_date;
            const ttEndDateTimeString = value.tentative_end_date;
            const SatrtdatePart = ttStartDateTimeString.split("T")[0];
            const EnddatePart = ttEndDateTimeString.split("T")[0];
            return (
              <tr
                key={index}
                className=" [&>*]:text-black [&>*]:border [&>*]:border-solid [&>*]:border-gray-200 [&>*]:py-3 [&>*]:text-xs [&>*]:uppercase [&>*]:border-l-0 [&>*]:border-r-0 [&>*]:whitespace-no-wrap [&>*]:font-semibold [&>*]:text-center even:bg-gray-100 even:text-white"
              >
                <td>{index + 1}</td>
                <td>{value.project_code}</td>
                <td>{value.clients}</td>
                <td>{value.name}</td>
                <td>{value.project_type}</td>
                <td className="ml-4">{SatrtdatePart}</td>
                <td>{EnddatePart}</td>
                <td>in Process..</td>
                <td>{value.other_cost}</td>
                <td>800</td>
                <td>200</td>
                <td>{value.cpi}</td>
                <td>200</td>
                <td>hold</td>
                <td>{totalMandays}</td>
                <td>{value.project_manager}</td>
                <td>
                  {isOperationPerson ? (
                    <MdModeEditOutline
                      className="cursor-pointer"
                      onClick={() => handleEditField(index)}
                    />
                  ) : (
                    "."
                  )}
                </td>
                <td>
                  <GrFormView
                    className="cursor-pointer"
                    onClick={() => handleViewField(index)}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {isEdit ? (
        <div className="absolute top-1/2 left-1/2 bg-white w-6/12 h-6/12 p-16 border shadow-lg translate-x-[-50%] translate-y-[-50%]">
          {isOperationPerson ? (
            <div className="flex flex-wrap justify-between">
              <div className="w-5/12">
                <LableAndInput
                  labelName={"Project Code"}
                  Inputvalue={Formdata1.map(
                    (project_code) => project_code.project_code
                  )}
                  desabled={true}
                  inputClassName={"cursor-not-allowed p-2 border bg-[#f3eded]"}
                  labelClassName={"pt-4 pb-2"}
                  readOnly
                />
              </div>
              <div className="w-5/12">
                <LableAndInput
                  labelName={"Date"}
                  InputName={"manDaysEntryDate"}
                  Inputvalue={mandaysEntryDate}
                  inputChange={handleEditChange}
                  InputType={"date"}
                  inputClassName={"p-2 border"}
                  labelClassName={"pt-4 pb-2"}
                  min={minDate.toISOString().split("T")[0]}
                />
              </div>
              <div className="w-5/12">
                <LableAndInput
                  labelName={"Man Days"}
                  InputName={"mandays_number"}
                  Inputvalue={mandaysEntry}
                  inputChange={handleEditChange}
                  InputType={"number"}
                  inputClassName={"p-2 border"}
                  labelClassName={"pt-4 pb-2"}
                />
              </div>
              <div className="w-5/12">
                <LableAndInput
                  labelName={"Achieve Target"}
                  Inputvalue={achieveTarget}
                  InputType={"number"}
                  InputName={"achieve_target"}
                  inputChange={handleEditChange}
                  inputClassName={"p-2 border"}
                  labelClassName={"pt-4 pb-2"}
                />
              </div>
            </div>
          ) : (
            ""
          )}
          <div className="flex justify-between w-6/12 mt-8">
            <Button
              name={"update"}
              className={"bg-green-300 p-4 m-2 ml-0 w-full"}
              onClick={handleEditUpdate}
            />
            <Button
              name={"cancel"}
              className={"bg-red-300 p-4 m-2 w-full"}
              onClick={handleCancelUpdate}
            />
          </div>
        </div>
      ) : (
        ""
      )}
      {viewProjectDetails ? (
        <div className="fixed top-1/2 bg-white w-full h-full left-1/2 translate-x-[-50%] translate-y-[-50%] p-16 border border-red-200">
          {Object.keys(editedValue).map((val, ind) => {
            return (
              <div className="flex gap-2" key={ind}>
                <Label labelName={val} className={"p-2 w-2/12"} />
                <input
                  value={editedValue[val]}
                  className="p-2 border m-2 w-10/12 bg-gray-100 cursor-not-allowed"
                  disabled="true"
                />
              </div>
            );
          })}
          <div
            className="absolute top-2 right-2 rounded-xl border p-2 bg-red-400 cursor-pointer"
            onClick={handleViewProjectClose}
          >
            X
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default ProjectDetail;
