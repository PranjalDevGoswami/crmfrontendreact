import React, { useEffect, useState } from "react";
import Label from "../components/Label.js";
import Dropdown from "../components/DropDown.js";
import Button from "../components/Button.js";
import { useNavigate } from "react-router-dom";
import MultipleValueDropDown from "../components/MultipleValueDropDown.js";
import CheckboxList from "../components/Checkbox.js";
import MultipleFileUpload from "../components/MultipleFileUpload.js";
import LableAndInput from "../components/LableAndInput.js";
import { ClientList } from "../fetchApis/clientList/ClientList";
import { GetProjectData } from "../fetchApis/projects/getProjectData/GetProjectData";
import { PostFormData } from "../fetchApis/projects/postProjectData/PostProjectData.js";
import Input from "../components/InputField.js";
import { TiPlus } from "react-icons/ti";
import { ProjectTypeList } from "../fetchApis/projects/projectType/ProjectTypeList";
import { GetProjectManager } from "../fetchApis/projectManager/projectManager.js";

const Form = () => {
  const [otherCost, setOtherCost] = useState(false);
  const [translationCost, setTranslationCost] = useState(false);
  const [isOtherFee, setIsOtherFee] = useState(false);
  const [otherFeeValue, setOtherFeeValue] = useState([]);
  const [advancePAyment, setAdvancePAyment] = useState(false);
  const [clientListData, setClientListData] = useState([
    "demo Client1",
    "demo Cliet2",
  ]);
  const [projectTypeData, setProjectTypeData] = useState([
    "Demo CATI",
    " Demo CAWI",
  ]);
  const [projectManagerData, setProjectManagerData] = useState([
    "demo manager1",
    "demo manager2",
  ]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [managerList, setManagerList] = useState();
  const user = localStorage.getItem("user");
  const user_id = localStorage.getItem("user_id");
  const [formData, setFormData] = useState({
    name: "",
    project_type: "",
    clients: "",
    sample: "",
    cpi: "",
    set_up_fee: "",
    tentative_start_date: "",
    tentative_end_date: "",
    other_cost: "",
    transaction_fee: "",
    user_email: user,
    user_id: user_id,
    project_manager: "",
    operation_select: true,
    finance_select: advancePAyment,
    upload_document: "",
  });
  const navigate = useNavigate();
  const ProjectTypeListData = projectTypeData;

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const fetchDataFromApiProject = await GetProjectData();
        const projectDataObject = fetchDataFromApiProject?.data?.map((val) => {
          return val;
        });
      } catch (error) {
        console.error("Error fetching project data:", error);
      }
    };
    fetchProjectData();
    const FetchProjectType = async () => {
      try {
        const ProjectType = await ProjectTypeList();
        const ProjectTypeObject = ProjectType?.data?.map((val) => {
          return val?.name;
        });
        setProjectTypeData(ProjectTypeObject);
      } catch (error) {
        console.error("Error fetching project type List:", error);
      }
    };
    FetchProjectType();
    const FetchProjectManager = async () => {
      try {
        const ProjectManager = await GetProjectManager();
        const Opern_Manager = ProjectManager?.data?.filter((item) => {
          return item.manager_dep.name === "Operations";
        });
        const ProjectManagerObject = Opern_Manager?.map((val) => {
          return val?.name;
        });
        setManagerList(Opern_Manager);
        setProjectManagerData(ProjectManagerObject);
      } catch (error) {
        console.error("Error fetching project type List:", error);
      }
    };
    FetchProjectManager();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === "tentative_start_date") {
      const tst = value;
      const parts = tst.split("/");
      const isoDate = new Date(
        `${parts[2]}-${parts[1]}-${parts[0]}`
      ).toISOString();
      setFormData({ ...formData, [name]: isoDate });
    }
    if (name === "tentative_end_date") {
      const tst = value;
      const parts = tst.split("/");
      const isoDate = new Date(
        `${parts[2]}-${parts[1]}-${parts[0]}`
      ).toISOString();
      setFormData({ ...formData, [name]: isoDate });
    }
    if (name === "set_up_fee") {
      e.preventDefault();
      if (/^\d*$/.test(value)) {
        setFormData({ ...formData, [name]: Number(value) });
      } else {
        alert(`'Sample value can't be in decimal'`);
      }
    }
    if (name === "transaction_fee") {
      e.preventDefault();
      if (/^\d*$/.test(value)) {
        setFormData({ ...formData, [name]: Number(value) });
      } else {
        alert(`'Sample value can't be in decimal'`);
      }
    }
    if (name === "cpi") {
      e.preventDefault();
      if (/^\d*$/.test(value)) {
        setFormData({ ...formData, [name]: value });
      } else {
        alert(`'Sample value can't be in decimal'`);
      }
    }
    if (name === "sample") {
      e.preventDefault();
      if (/^\d*$/.test(value)) {
        setFormData({ ...formData, [name]: value });
      } else {
        alert(`'Sample value can't be in decimal'`);
      }
    }
    if (name === "upload_document") {
      const formDataFile = new FormData();
      formDataFile.append("file", files[0]);
      setFormData({ ...formData, [name]: files[0] });
    }
  };

  const handleCheckboxChange = (name, checked) => {
    setAdvancePAyment(checked);
  };

  const SelectOptionHandler = (name, value) => {
    setFormData({ ...formData, [name]: value });
    if (name === "clients") {
      const clientIndex = clientListData.indexOf(value);
      setFormData({
        ...formData,
        [name]: clientIndex + 1,
      });
    }
    if (name === "project_type") {
      const ProjectTypeIndex = projectTypeData.indexOf(value);
      setFormData({
        ...formData,
        [name]: ProjectTypeIndex + 1,
      });
    }
    if (name === "project_manager") {
      const selectedManager = managerList.find(
        (manager) => manager.name === value
      );
      setFormData({
        ...formData,
        [name]: selectedManager.id,
      });
    }
  };

  const PostProjectData = async (data) => {
    try {
      const response = await PostFormData(data);
      if (response?.status == true) {
        alert("Project Add Successfully!!");
      } else if (
        response?.ex?.response?.data[0] ===
        "Tentative end date cannot be in the past."
      ) {
        alert(response?.ex?.response?.data[0]);
      } else if (
        response?.ex?.response?.data?.upload_document[0] ===
        "The submitted data was not a file. Check the encoding type on the form."
      ) {
        alert("File Formate Not supported");
      } else {
        alert("Something went wrong!!");
      }
    } catch (error) {
      console.error("Error fetching project data:", error);
    }
  };

  const handleSubmit = (e) => {
    if (!isFormValid()) {
      return;
    } else {
      PostProjectData(formData);
      navigate("/sales-dashboard");
    }
  };

  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        const ClientData = await ClientList();
        const clientDataItems = ClientData?.data?.map((val) => {
          return val.name;
        });
        setClientListData(clientDataItems);
      } catch (error) {}
    };
    fetchDataFromApi();
  }, []);

  const OpenOtherFee = (e) => {
    e.preventDefault();
    setIsOtherFee(true);
  };
  const CloseOtherFeehandler = () => {
    setIsOtherFee(false);
  };

  const today = new Date();
  const minDate = new Date(today);
  minDate.setDate(minDate.getDate() - 1);

  // const MultipleValueSection = (selectedOptions) => {
  //   const selectedValues = selectedOptions.map((option) => option.value);
  //   setOtherFeeValue(selectedValues);
  //   if (selectedValues.includes("other_cost")) {
  //     setOtherCost(true);
  //   } else {
  //     setOtherCost(false);
  //   }

  //   if (selectedValues.includes("transaction_fee")) {
  //     setTranslationCost(true);
  //   } else {
  //     setTranslationCost(false);
  //   }
  // };
  const MultipleValueSection = (selectedOptions) => {
    // Extracting the values from the selected options
    const selectedValues = selectedOptions.map((option) => option.value);

    // Merging the newly selected values with the old ones
    const updatedValues = [...otherFeeValue, ...selectedValues];

    // Setting the state with the updated values
    setOtherFeeValue(updatedValues);

    // Updating the other state variables based on the selections
    setOtherCost(updatedValues.includes("other_cost"));
    setTranslationCost(updatedValues.includes("transaction_fee"));
  };

  const isFormValid = () => {
    return (
      formData.name !== "" &&
      formData.project_type?.name !== "" &&
      formData.clients?.name !== "" &&
      formData.sample !== "" &&
      formData.cpi !== "" &&
      formData.set_up_fee !== "" &&
      formData.tentative_start_date !== "" &&
      formData.tentative_end_date !== ""
    );
  };

  const Amlist = ["Manager 1", "Manager2", "1"];

  return (
    <div className="relative">
      <h2 className="text-3xl p-8 mt-8 underline">Add Project Details</h2>
      <form
        onSubmit={handleSubmit}
        className="lg:p-2 lg:pl-8 lg:pr-4 pr-8"
        encType="multipart/form-data"
      >
        <div className="lg:flex inline-block lg:flex-wrap flex-nowrap w-full gap-4">
          <div className="flex flex-col lg:w-[32%] w-full">
            <LableAndInput
              labelName={"Project Name"}
              InputName={"name"}
              InputType={"text"}
              inputChange={handleInputChange}
              InputMin_lenght={"1"}
              InputMax_lenght={"50"}
              inputClassName={"p-2 border bg-[#f3eded]"}
              labelClassName={"pt-4 pb-2"}
            />
          </div>
          <div className="flex flex-col lg:w-[32%] w-full">
            <Label
              labelName={"Project Type"}
              className={"pt-4 pb-2"}
              required
            />
            <Dropdown
              name={"project_type"}
              className={
                "p-2 outline-none cursor-pointer w-[100%] bg-[#f3eded] border"
              }
              Option_Name={[
                "-- Select Project Type --",
                ...ProjectTypeListData,
              ]}
              RequireAddButton={false}
              required
              onChange={SelectOptionHandler}
            />
          </div>
          <div className="flex flex-col lg:w-[32%] w-full">
            <Label labelName={"Client"} className={"pt-4 pb-2"} />
            {clientListData.length > 0 ? (
              <Dropdown
                name={"clients"}
                className={
                  "p-2 outline-none cursor-pointer w-[100%] relative bg-[#f3eded] border rounded-r-none"
                }
                Option_Name={["-- Select Client --", ...clientListData]}
                RequireAddButton={true}
                required
                onChange={SelectOptionHandler}
              />
            ) : (
              ""
            )}
          </div>
          <div className="flex flex-col lg:w-[32%] w-full">
            <LableAndInput
              labelName={"Sample"}
              InputName={"sample"}
              InputType={"number"}
              inputChange={handleInputChange}
              inputClassName={"p-2 border bg-[#f3eded]"}
              labelClassName={"pt-4 pb-2"}
              min={0}
            />
          </div>
          <div className="lg:w-[32%] w-full flex flex-col">
            <Label labelName={"Cost Per Interview"} className={"pt-4 pb-2"} />
            <div className="flex w-full">
              <div className="w-full inline-block">
                <Input
                  name={"cpi"}
                  type={"number"}
                  onchange={handleInputChange}
                  className={"p-2 border bg-[#f3eded] w-full"}
                  min={0}
                />
              </div>
            </div>
          </div>
          <div className="lg:w-[32%] w-full flex flex-col relative">
            <Label labelName={"Setup Fee"} className={"pt-4 pb-2"} />
            <div className="flex w-full items-center">
              <div className="w-full inline-block">
                <Input
                  name={"set_up_fee"}
                  type={"number"}
                  onchange={handleInputChange}
                  className={"p-2 border bg-[#f3eded] w-full rounded-r-none"}
                  min={0}
                />
              </div>
              <div className="w-[7%] bg-yellow-200 flex items-center justify-center rounded-r-full">
                <button
                  onClick={OpenOtherFee}
                  className="inline-block p-[13px] "
                >
                  <TiPlus />
                </button>
              </div>
            </div>
          </div>
          {isOtherFee ? (
            <div className="w-1/2 h-2/3 bg-white border rounded-md shadow-md z-50 absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">
              <div className="bg-white w-full h-full flex items-center justify-center relative">
                <div className="flex flex-col w-2/3 relative">
                  <Label labelName={"Other Cost"} className={"pt-4 pb-2"} />

                  <MultipleValueDropDown
                    options={[
                      { value: "other_cost", label: "Other Cost" },
                      { value: "transaction_fee", label: "Translation Cost" },
                      // { value: 'Cost', label: 'Cost' },
                    ]}
                    onChange={MultipleValueSection}
                    className={"w-full bg-[#f3eded] "}
                    // defaultValue={
                    //   otherFeeValue && otherFeeValue.length > 0
                    //     ? otherFeeValue
                    //     : null
                    // }
                  />
                </div>
                <Button
                  name={"X"}
                  className={
                    "bg-red-400 p-2 w-8 h-8 rounded-full absolute top-4 right-8 flex items-center justify-center text-white"
                  }
                  onClick={CloseOtherFeehandler}
                />
              </div>
            </div>
          ) : (
            ""
          )}
          {/* Additional fields based on checkbox selection */}
          {otherCost ? (
            <div className="lg:w-[32%] w-full flex flex-col">
              <Label labelName={"Other Cost"} className={"pt-4 pb-2"} />
              <div className="flex w-full">
                <div className="w-full inline-block">
                  <Input
                    name={"other_cost"}
                    type={"number"}
                    onchange={handleInputChange}
                    className={"p-2 border bg-[#f3eded] w-full"}
                    min={0}
                    // value={"12"}
                  />
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
          {translationCost && (
            <div className="flex flex-col lg:w-[32%] w-full">
              <Label labelName={"Translator Cost"} className={"pt-4 pb-2"} />
              <div className="flex w-full">
                <div className="w-full inline-block">
                  <Input
                    name={"transaction_fee"}
                    type={"number"}
                    onchange={handleInputChange}
                    className={"p-2 border bg-[#f3eded] w-full"}
                    min={0}
                    // value={"12"}
                  />
                </div>
              </div>
            </div>
          )}
          <div className="flex flex-col lg:w-[32%] w-full">
            <Label labelName={"Manager  "} className={"pt-4 pb-2"} />
            <Dropdown
              name={"project_manager"}
              className={
                "p-2 outline-none cursor-pointer w-[100%] relative bg-[#f3eded] border"
              }
              Option_Name={["-- Select Manager --", ...projectManagerData]}
              RequireAddButton={false}
              required
              onChange={SelectOptionHandler}
            />
          </div>
          <div className="flex flex-col lg:w-[32%] w-full">
            <LableAndInput
              labelName={"Start Date"}
              InputName={"tentative_start_date"}
              InputType={"date"}
              placeholder={"dd/mm/yyyy"}
              inputChange={handleInputChange}
              min={minDate.toISOString().split("T")[0]}
              inputClassName={"p-2 border bg-[#f3eded]"}
              labelClassName={"pt-4 pb-2"}
            />
          </div>
          <div className="flex flex-col lg:w-[32%] w-full">
            <LableAndInput
              labelName={"End Date"}
              InputName={"tentative_end_date"}
              InputType={"date"}
              placeholder={"dd/mm/yyyy"}
              inputChange={handleInputChange}
              min={minDate.toISOString().split("T")[0]}
              inputClassName={"p-2 border bg-[#f3eded]"}
              labelClassName={"pt-4 pb-2"}
            />
          </div>
          <div className="flex flex-col lg:w-[32%] w-full">
            <Label labelName={"SOW File"} className={"pt-4 pb-2"} />
            <MultipleFileUpload
              selectedFiles={selectedFiles}
              name={"upload_document"}
              handleFileChange={handleInputChange}
              className={"p-1 border bg-[#f3eded] w-full"}
            />
          </div>
        </div>
        <div className="flex flex-col lg:w-[32%] w-full pt-8 pb-2">
          <CheckboxList
            InputItems={["Advanced Payment Required"]}
            onCheckboxChange={handleCheckboxChange}
          />
        </div>
        <div className="flex justify-around pt-4 pb-2 md:w-4/12 w-6/12">
          <Button
            className={`bg-green-500 p-4 mt-8 mr-2 md:w-1/2 w-full text-white font-bold ${
              isFormValid() ? "" : "opacity-50 cursor-not-allowed"
            }`}
            name={"Submit"}
            onClick={() => handleSubmit(formData)}
          />
          <Button
            className="bg-red-500 p-4 mt-8 md:w-1/2 w-full text-white font-bold"
            name={"Cancel"}
          />
        </div>
      </form>
    </div>
  );
};

export default Form;

// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { TiPlus } from "react-icons/ti";
// import Label from "../components/Label.js";
// import Dropdown from "../components/DropDown.js";
// import Button from "../components/Button.js";
// import MultipleValueDropDown from "../components/MultipleValueDropDown.js";
// import CheckboxList from "../components/Checkbox.js";
// import MultipleFileUpload from "../components/MultipleFileUpload.js";
// import LableAndInput from "../components/LableAndInput.js";
// import Input from "../components/InputField.js";
// import { ClientList } from "../fetchApis/clientList/ClientList";
// import { GetProjectData } from "../fetchApis/projects/getProjectData/GetProjectData";
// import { PostFormData } from "../fetchApis/projects/postProjectData/PostProjectData.js";
// import { ProjectTypeList } from "../fetchApis/projects/projectType/ProjectTypeList";
// import { GetProjectManager } from "../fetchApis/projectManager/projectManager.js";

// const Form = () => {
//   const [otherCost, setOtherCost] = useState(false);
//   const [translationCost, setTranslationCost] = useState(false);
//   const [isOtherFee, setIsOtherFee] = useState(false);
//   const [otherFeeValue, setOtherFeeValue] = useState([]);
//   const [advancePayment, setAdvancePayment] = useState(false);
//   const [clientListData, setClientListData] = useState([]);
//   const [projectTypeData, setProjectTypeData] = useState([]);
//   const [projectManagerData, setProjectManagerData] = useState([]);
//   const [selectedFiles, setSelectedFiles] = useState([]);
//   const [managerList, setManagerList] = useState([]);
//   const [formData, setFormData] = useState({
//     name: "",
//     project_type: "",
//     clients: "",
//     sample: "",
//     cpi: "",
//     set_up_fee: "",
//     tentative_start_date: "",
//     tentative_end_date: "",
//     other_cost: "",
//     transaction_fee: "",
//     user_email: localStorage.getItem("user"),
//     user_id: localStorage.getItem("user_id"),
//     project_manager: "",
//     operation_select: true,
//     finance_select: advancePayment,
//     upload_document: "",
//   });

//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchInitialData = async () => {
//       try {
//         const [clientData, projectTypeData, projectManagerData] =
//           await Promise.all([
//             ClientList(),
//             ProjectTypeList(),
//             GetProjectManager(),
//           ]);

//         setClientListData(clientData?.data?.map((val) => val.name));
//         setProjectTypeData(projectTypeData?.data?.map((val) => val.name));

//         const projectManagers = projectManagerData?.data?.filter(
//           (item) => item.manager_dep.name === "Operations"
//         );
//         setManagerList(projectManagers);
//         setProjectManagerData(projectManagers?.map((val) => val.name));
//       } catch (error) {
//         console.error("Error fetching initial data:", error);
//       }
//     };

//     fetchInitialData();
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value, files } = e.target;

//     setFormData((prevState) => ({
//       ...prevState,
//       [name]: name === "upload_document" ? files[0] : value,
//       tentative_start_date:
//         name === "tentative_start_date"
//           ? convertToISO(value)
//           : prevState.tentative_start_date,
//       tentative_end_date:
//         name === "tentative_end_date"
//           ? convertToISO(value)
//           : prevState.tentative_end_date,
//       set_up_fee:
//         name === "set_up_fee"
//           ? handleNumericValue(value, "Setup Fee")
//           : prevState.set_up_fee,
//       transaction_fee:
//         name === "transaction_fee"
//           ? handleNumericValue(value, "Translation Fee")
//           : prevState.transaction_fee,
//       cpi: name === "cpi" ? handleNumericValue(value, "CPI") : prevState.cpi,
//       sample:
//         name === "sample"
//           ? handleNumericValue(value, "Sample")
//           : prevState.sample,
//     }));
//   };

//   const handleNumericValue = (value, fieldName) => {
//     if (/^\d*$/.test(value)) {
//       return Number(value);
//     } else {
//       alert(`${fieldName} value can't be in decimal`);
//       return "";
//     }
//   };

//   const convertToISO = (dateStr) => {
//     const parts = dateStr.split("/");
//     return new Date(`${parts[2]}-${parts[1]}-${parts[0]}`).toISOString();
//   };

//   const handleCheckboxChange = (name, checked) => {
//     setAdvancePayment(checked);
//     setFormData((prevState) => ({
//       ...prevState,
//       finance_select: checked,
//     }));
//   };

//   const SelectOptionHandler = (name, value) => {
//     setFormData((prevState) => ({
//       ...prevState,
//       [name]:
//         name === "clients"
//           ? clientListData.indexOf(value) + 1
//           : name === "project_type"
//           ? projectTypeData.indexOf(value) + 1
//           : name === "project_manager"
//           ? managerList.find((manager) => manager.name === value).id
//           : value,
//     }));
//   };

//   const PostProjectData = async (data) => {
//     try {
//       const response = await PostFormData(data);
//       if (response?.status) {
//         alert("Project Added Successfully!!");
//       } else {
//         alert(response?.ex?.response?.data[0] || "Something went wrong!!");
//       }
//     } catch (error) {
//       console.error("Error posting project data:", error);
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!isFormValid()) return;

//     PostProjectData(formData);
//     navigate("/sales-dashboard");
//   };

//   const isFormValid = () => {
//     const {
//       name,
//       project_type,
//       clients,
//       sample,
//       cpi,
//       set_up_fee,
//       tentative_start_date,
//       tentative_end_date,
//     } = formData;
//     return (
//       name &&
//       project_type &&
//       clients &&
//       sample &&
//       cpi &&
//       set_up_fee &&
//       tentative_start_date &&
//       tentative_end_date
//     );
//   };

//   const toggleOtherFee = (e) => {
//     e.preventDefault();
//     setIsOtherFee(!isOtherFee);
//   };

//   const MultipleValueSection = (selectedOptions) => {
//     const selectedValues = selectedOptions.map((option) => option.value);
//     const updatedValues = [...new Set([...otherFeeValue, ...selectedValues])];

//     setOtherFeeValue(updatedValues);
//     setOtherCost(updatedValues.includes("other_cost"));
//     setTranslationCost(updatedValues.includes("transaction_fee"));
//   };

//   const minDate = new Date().toISOString().split("T")[0];

//   return (
//     <div className="relative">
//       <h2 className="text-3xl p-8 mt-8 underline">Add Project Details</h2>
//       <form
//         onSubmit={handleSubmit}
//         className="lg:p-2 lg:pl-8 lg:pr-4 pr-8"
//         encType="multipart/form-data"
//       >
//         <div className="lg:flex inline-block lg:flex-wrap flex-nowrap w-full gap-4">
//           <div className="flex flex-col lg:w-[32%] w-full">
//             <LableAndInput
//               labelName="Project Name"
//               InputName="name"
//               InputType="text"
//               inputChange={handleInputChange}
//               InputMin_length="1"
//               InputMax_length="50"
//               inputClassName="p-2 border bg-[#f3eded]"
//               labelClassName="pt-4 pb-2"
//             />
//           </div>
//           <div className="flex flex-col lg:w-[32%] w-full">
//             <Label labelName="Project Type" className="pt-4 pb-2" required />
//             <Dropdown
//               name="project_type"
//               className="p-2 outline-none cursor-pointer w-[100%] bg-[#f3eded] border"
//               Option_Name={["-- Select Project Type --", ...projectTypeData]}
//               RequireAddButton={false}
//               required
//               onChange={SelectOptionHandler}
//             />
//           </div>
//           <div className="flex flex-col lg:w-[32%] w-full">
//             <Label labelName="Client" className="pt-4 pb-2" />
//             {clientListData.length > 0 && (
//               <Dropdown
//                 name="clients"
//                 className="p-2 outline-none cursor-pointer w-[100%] relative bg-[#f3eded] border rounded-r-none"
//                 Option_Name={["-- Select Client --", ...clientListData]}
//                 RequireAddButton={true}
//                 required
//                 onChange={SelectOptionHandler}
//               />
//             )}
//           </div>
//           <div className="flex flex-col lg:w-[32%] w-full">
//             <LableAndInput
//               labelName="Sample"
//               InputName="sample"
//               InputType="number"
//               inputChange={handleInputChange}
//               inputClassName="p-2 border bg-[#f3eded]"
//               labelClassName="pt-4 pb-2"
//               min={0}
//               required
//             />
//           </div>
//           <div className="flex flex-col lg:w-[32%] w-full">
//             <LableAndInput
//               labelName="CPI"
//               InputName="cpi"
//               InputType="number"
//               inputChange={handleInputChange}
//               inputClassName="p-2 border bg-[#f3eded]"
//               labelClassName="pt-4 pb-2"
//               min={0}
//               required
//             />
//           </div>
//           <div className="flex flex-col lg:w-[32%] w-full">
//             <LableAndInput
//               labelName="Setup Fee"
//               InputName="set_up_fee"
//               InputType="number"
//               inputChange={handleInputChange}
//               inputClassName="p-2 border bg-[#f3eded]"
//               labelClassName="pt-4 pb-2"
//               min={0}
//               required
//             />
//           </div>
//           <div className="flex flex-col lg:w-[32%] w-full">
//             <LableAndInput
//               labelName="Tentative Start Date"
//               InputName="tentative_start_date"
//               InputType="date"
//               inputChange={handleInputChange}
//               inputClassName="p-2 border bg-[#f3eded]"
//               labelClassName="pt-4 pb-2"
//               required
//               min={minDate}
//             />
//           </div>
//           <div className="flex flex-col lg:w-[32%] w-full">
//             <LableAndInput
//               labelName="Tentative End Date"
//               InputName="tentative_end_date"
//               InputType="date"
//               inputChange={handleInputChange}
//               inputClassName="p-2 border bg-[#f3eded]"
//               labelClassName="pt-4 pb-2"
//               required
//               min={minDate}
//             />
//           </div>
//           <div className="flex flex-col lg:w-[32%] w-full">
//             <Label labelName="Project Manager" className="pt-4 pb-2" />
//             {projectManagerData.length > 0 && (
//               <Dropdown
//                 name="project_manager"
//                 className="p-2 outline-none cursor-pointer w-[100%] relative bg-[#f3eded] border"
//                 Option_Name={[
//                   "-- Select Project Manager --",
//                   ...projectManagerData,
//                 ]}
//                 RequireAddButton={true}
//                 required
//                 onChange={SelectOptionHandler}
//               />
//             )}
//           </div>
//         </div>

//         <div className="lg:flex grid-cols-2 flex-wrap w-full gap-4">
//           <div className="flex flex-col lg:w-[32%] w-full pt-6">
//             <Label labelName="Advance Payment?" className="pb-2" />
//             <CheckboxList
//               name="finance_select"
//               options={["Advance Payment"]}
//               onChange={handleCheckboxChange}
//               selected={advancePayment}
//               required
//             />
//           </div>
//           <div className="flex flex-col lg:w-[32%] w-full pt-6">
//             <Label labelName="Upload Documents" className="pb-2" />
//             <MultipleFileUpload
//               name="upload_document"
//               files={selectedFiles}
//               onChange={handleInputChange}
//               onFileSelect={setSelectedFiles}
//             />
//           </div>
//           <div className="flex flex-col lg:w-[32%] w-full pt-6">
//             <Label labelName="Other Fee" className="pb-2" />
//             <MultipleValueDropDown
//               options={["Other Cost", "Translation Cost"]}
//               onChange={MultipleValueSection}
//             />
//           </div>
//         </div>

//         <div className="flex flex-wrap w-full gap-4">
//           {otherCost && (
//             <div className="flex flex-col lg:w-[32%] w-full pt-6">
//               <LableAndInput
//                 labelName="Other Cost"
//                 InputName="other_cost"
//                 InputType="number"
//                 inputChange={handleInputChange}
//                 inputClassName="p-2 border bg-[#f3eded]"
//                 labelClassName="pt-4 pb-2"
//                 min={0}
//               />
//             </div>
//           )}
//           {translationCost && (
//             <div className="flex flex-col lg:w-[32%] w-full pt-6">
//               <LableAndInput
//                 labelName="Translation Fee"
//                 InputName="transaction_fee"
//                 InputType="number"
//                 inputChange={handleInputChange}
//                 inputClassName="p-2 border bg-[#f3eded]"
//                 labelClassName="pt-4 pb-2"
//                 min={0}
//               />
//             </div>
//           )}
//         </div>

//         <div className="flex justify-end pt-8">
//           <Button
//             type="submit"
//             className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//           >
//             Submit
//           </Button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default Form;
