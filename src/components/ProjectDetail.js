import React, { useEffect, useState } from "react";
import { MdModeEditOutline, MdDelete } from "react-icons/md";
import { GrFormView } from "react-icons/gr";
import Button from "./Button.js";
import Label from "./Label";
import ViewProjectDetails from "./ViewProjectDetails.js";
import { useDispatch, useSelector } from "react-redux";
import { addFormData } from "./features/projectData/projectDataSlice.js";
import { PROJECTDATAAPIS } from "../../utils/Apis.js";

const ProjectDetail = ({ data }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [editedIndex, setEditedIndex] = useState();
  const [editedValue, setEditedValue] = useState({});
  const [totalMandays, setTotalMandays] = useState(0);
  const [mandaysEnrty, setMandaysEnrty] = useState(0);
  const [CalculateEnrty, setCalculateEnrty] = useState(0);
  const [isOperationPerson, setIsOperationPerson] = useState(true);
  const [viewProjectDetails, setViewProjectDetails] = useState(false);
  const [projectDataFetch, setProjectDataFetch] = useState([]);

  const dispatchProjectData = useDispatch();

  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        const projectData = await fetch(PROJECTDATAAPIS);
        const projectDataJson = await projectData.json();
        const projectDataObject = projectDataJson.map((val) => {
          return val;
        });

        dispatchProjectData(addFormData(projectDataObject));
      } catch (error) {
        console.error("Error fetching project data:", error);
      }
    };

    fetchDataFromApi();
  }, []);

  const Formdata1 = useSelector((store) => store.FormData.items);

  console.log("data from store", Formdata1);

  const manDays = 10;
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
    let AddMandays = mandaysEnrty;
    setTotalMandays(AddMandays);
    setMandaysEnrty("");
  };
  const handleCancelUpdate = () => {
    setIsEdit(false);
  };

  const handleMandays = (e) => {
    setMandaysEnrty(e.target.value);
  };

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
            return (
              <tr
                key={index}
                className=" [&>*]:text-black [&>*]:border [&>*]:border-solid [&>*]:border-gray-200 [&>*]:py-3 [&>*]:text-xs [&>*]:uppercase [&>*]:border-l-0 [&>*]:border-r-0 [&>*]:whitespace-no-wrap [&>*]:font-semibold [&>*]:text-center even:bg-gray-100 even:text-white"
              >
                <td>{index + 1}</td>
                <td>{value.id}</td>
                <td>{value.clients}</td>
                <td>{value.name}</td>
                <td>{value.project_type}</td>
                <td>25/02/2024</td>
                <td className="ml-4">04/06/2024</td>
                <td>in Process..</td>
                <td>{value.other_cost}</td>
                <td>800</td>
                <td>200</td>
                <td>CSBR</td>
                <td>200</td>
                <td>hold</td>
                <td>{totalMandays}</td>
                <td>TEST</td>
                <td>
                  <MdModeEditOutline
                    className="cursor-pointer"
                    onClick={() => handleEditField(index)}
                  />
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
        <div className="absolute top-1/2 left-1/2 bg-white w-9/12 h-8/12 p-8 border shadow-lg translate-x-[-50%] translate-y-[-50%] p-26">
          <div className="flex flex-wrap w-full">
            {Object.keys(editedValue).map((val, ind) => {
              return (
                <div className="flex w-[30%]" key={ind}>
                  <Label labelName={val} className={"p-2 w-5/12"} />
                  <input
                    value={editedValue[val]}
                    className="p-2 border m-2 w-7/12 bg-gray-100 cursor-not-allowed"
                    disabled="true"
                  />
                </div>
              );
            })}
          </div>
          {isOperationPerson ? (
            <div className="flex ">
              <div className="flex w-[30%]">
                <Label labelName={"manDays"} className={"p-2 w-5/12"} />
                <input
                  value={mandaysEnrty}
                  onChange={handleMandays}
                  className="p-2 border m-2 w-7/12"
                />
              </div>

              <div className="flex  w-[30%]">
                <Label labelName={"Achieve Target"} className={"p-2 w-5/12"} />
                <input
                  value={mandaysEnrty}
                  onChange={handleMandays}
                  className="p-2 border m-2 w-7/12"
                />
              </div>
            </div>
          ) : (
            ""
          )}
          <div className="flex justify-between w-6/12">
            <Button
              name={"update"}
              className={"bg-green-300 p-4 m-2 w-full"}
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
        <div className="fixed top-1/2 bg-white w-2/3  left-1/2 translate-x-[-50%] translate-y-[-50%] p-16 border border-red-200">
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
