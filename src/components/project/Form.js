import React, { useEffect, useState } from "react";
import Label from "../Label";
import Input from "../InputField";
import Dropdown from "../DropDown";
import Button from "../Button";
import { Link } from "react-router-dom";
import MultipleValueDropDown from "../MultipleValueDropDown";
import CheckboxList from "../Checkbox";
import MultipleFileUpload from "../MultipleFileUpload";
import { useDispatch } from "react-redux";
import { addFormData } from "../features/projectData/projectDataSlice";
import LableAndInput from "../LableAndInput";
import { ClientList } from "../fetchApis/clientList/ClientList";
import { GetProjectData } from "../fetchApis/projects/getProjectData/GetProjectData";


const Form = ({ onSubmit }) => {
  const dispatch = useDispatch();
  const [otherCost, setOtherCost] = useState(false);
  const [translationCost, setTranslationCost] = useState(false);
  const [isOtherFee, setIsOtherFee] = useState(false);
  const [otherFeeValue, setOtherFeeValue] = useState();
  const [advancePAyment, setAdvancePAyment] = useState(false);
  const [clientListData, setClientListData] = useState([]);
  let count =+ 1;
  const [formData, setFormData] = useState({
    id: count,
    name: "",
    project_type: "",
    clients: "",
    AM: "",
    sample: "",
    cpi: "",
    Setup_fee: "",
    Operation_team: "",
    tentative_start_date: "",
    tentative_end_date: "",
    Other_Cost: "",
    Translator_Cost: "",
    Other_Cost_Details: "", // Additional field for Other Cost Details
    Translator_Cost_Details: "",
    Advance_payment_required: advancePAyment,
    mandaysEntry: "",
  });
  
  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const fetchDataFromApiProject = await GetProjectData();
        // const fetchDataFromApiProjectJson = fetchDataFromApiProject.json();
        const projectDataObject = fetchDataFromApiProject.map((val) => {
          return val;
        });
      } catch (error) {
        console.error("Error fetching project data:", error);
      }
    };
    fetchProjectData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (name, checked) => {
    // console.log("check", name, checked);
    setAdvancePAyment(checked);
  };

  const SelectOptionHandler = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = (e) => {
    const formDataArray = [formData];
    dispatch(addFormData(formDataArray));
    setFormData({
      id: "",
      name: "",
      project_type: "",
      clients: "",
      AM: "",
      sample: "",
      cpi: "",
      Setup_fee: "",
      Operation_team: "",
      tentative_start_date: "",
      tentative_end_date: "",
      Other_Cost: "",
      Translator_Cost: "",
      Other_Cost_Details: "", // Additional field for Other Cost Details
      Translator_Cost_Details: "",
      Advance_payment_required: advancePAyment,
      mandaysEntry: "",
    });
  };

  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        //clint Data List
        const ClientData = await ClientList(); 
        const clientDataItems = ClientData.map((val) => {
          return val.name;
        });
        setClientListData(clientDataItems);
      } catch (error) {
      }
    };
    fetchDataFromApi();
  }, []);

  const OpenOtherFee = () => {
    setIsOtherFee(true);
  };
  const CloseOtherFeehandler = () => {
    setIsOtherFee(false);
  };

  const today = new Date();
  // Subtract one day from today's date
  const minDate = new Date(today);
  minDate.setDate(minDate.getDate() - 1);

  const MultipleValueSection = (selectedOptions) => {
    const selectedValues = selectedOptions.map((option) => option.value);
    setOtherFeeValue(selectedValues);
    // console.log("other", otherFeeValue);

    // Check if 'Other Cost' is selected
    if (selectedValues.includes("Other Cost")) {
      setOtherCost(true);
    } else {
      setOtherCost(false);
    }

    // Check if 'Translation Cost' is selected
    if (selectedValues.includes("Translation Cost")) {
      setTranslationCost(true);
    } else {
      setTranslationCost(false);
    }
  };

  const isFormValid = () => {
    return (
      formData.name !== "" &&
      formData.project_type !== "" &&
      formData.clients !== "" &&
      formData.sample !== "" &&
      formData.cpi !== "" &&
      formData.Setup_fee !== "" &&
      formData.tentative_start_date !== "" &&
      formData.tentative_end_date !== ""
    );
  };

  const Amlist = ["AM 1", "AM 2"];

  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="p-2 pl-8">
        <div className="flex flex-wrap w-full gap-4">
          <div className="flex flex-col w-[32%]">
            <LableAndInput
              labelName={"Project Name"}
              InputName={"name"}
              InputType={"text"}
              inputChange={handleInputChange}
              required={"required"}
              InputMin_lenght={"1"}
              InputMax_lenght={"50"}
              inputClassName={'p-2 border bg-[#f3eded]'}
              labelClassName={'pt-4 pb-2'}
            />
          </div>
          <div className="flex flex-col w-[32%]">
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
              Option_Name={["-- Select Project Type --", "A", "B"]}
              RequireAddButton={false}
              required
              onChange={SelectOptionHandler}
            />
          </div>
          <div className="flex flex-col w-[32%]">
            <Label labelName={"Client"} className={"pt-4 pb-2"} />
            {clientListData.length > 0 ? (
              <Dropdown
                name={"clients"}
                className={
                  "p-2 outline-none cursor-pointer w-[100%] relative bg-[#f3eded] border"
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
          <div className="flex flex-col w-[32%]">
            <LableAndInput
              labelName={"Sample"}
              InputName={"sample"}
              InputType={"number"}
              inputChange={handleInputChange}
              required={"required"}
              inputClassName={'p-2 border bg-[#f3eded]'}
              labelClassName={'pt-4 pb-2'}

            />
          </div>
          <div className="flex flex-col w-[32%]">
            <LableAndInput
              labelName={"Cost Per Interview"}
              InputName={"cpi"}
              InputType={"number"}
              inputChange={handleInputChange}
              required={"required"}
              inputClassName={'p-2 border bg-[#f3eded]'}
              labelClassName={'pt-4 pb-2'}

            />
          </div>
          <div className="flex flex-col w-[32%] relative">
            <LableAndInput
              labelName={"Setup Fee "}
              InputName={"Setup_fee"}
              InputType={"number"}
              inputChange={handleInputChange}
              required={"required"}
              inputClassName={'p-2 border bg-[#f3eded]'}
              labelClassName={'pt-4 pb-2'}

            />
            <Button
              className={
                "bg-green-300 p-1 absolute right-0 top-[4.7rem] translate-y-[50%] text-sm"
              }
              name={"Other Fee"}
              onClick={OpenOtherFee}
            />
          </div>
          {isOtherFee ? (
            <div className="w-1/2 h-2/3 bg-white border rounded-md shadow-md z-50 absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%">
              <div className="bg-white w-full h-full flex items-center justify-center relative">
                <div className="flex flex-col w-2/3 relative">
                  <Label labelName={"Other Cost"} className={"pt-4 pb-2"} />

                  <MultipleValueDropDown
                    onChange={MultipleValueSection}
                    className={"w-full bg-[#f3eded]"}
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
            <div className="flex flex-col w-[32%]">
              <LableAndInput
                labelName={"Other Cost"}
                InputName={"Other_Cost"}
                InputType={"number"}
                inputChange={handleInputChange}
                required={"required"}
                inputClassName={'p-2 border bg-[#f3eded]'}
              labelClassName={'pt-4 pb-2'}

              />
            </div>
          ) : (
            ""
          )}
          {translationCost && (
            <div className="flex flex-col w-[32%]">
              <LableAndInput
                labelName={"Translator Cost"}
                InputName={"Translator_Cost"}
                InputType={"number"}
                inputChange={handleInputChange}
                required={"required"}
                inputClassName={'p-2 border bg-[#f3eded]'}
              labelClassName={'pt-4 pb-2'}

              />
            </div>
          )}
          <div className="flex flex-col w-[32%]">
            <Label labelName={"Select AM  "} className={"pt-4 pb-2"} />
            <Dropdown
              name={"AM"}
              className={
                "p-2 outline-none cursor-pointer w-[100%] relative bg-[#f3eded] border"
              }
              Option_Name={["-- Select AM --", ...Amlist]}
              RequireAddButton={false}
              required
              onChange={SelectOptionHandler}
            />
          </div>
          <div className="flex flex-col w-[32%]">
            <LableAndInput
              labelName={"Start Date"}
              InputName={"tentative_start_date"}
              InputType={"date"}
              placeholder={"dd/mm/yyyy"}
              inputChange={handleInputChange}
              min={minDate.toISOString().split("T")[0]}
              required={"required"}
              inputClassName={'p-2 border bg-[#f3eded]'}
              labelClassName={'pt-4 pb-2'}

            />
          </div>
          <div className="flex flex-col w-[32%]">
            <LableAndInput
              labelName={"End Date"}
              InputName={"tentative_end_date"}
              InputType={"date"}
              placeholder={"dd/mm/yyyy"}
              inputChange={handleInputChange}
              min={minDate.toISOString().split("T")[0]}
              required={"required"}
              inputClassName={'p-2 border bg-[#f3eded]'}
              labelClassName={'pt-4 pb-2'}

            />
          </div>
          <div className="flex flex-col w-[32%]">
            <Label labelName={"SOW File"} className={"pt-4 pb-2"} />
            <MultipleFileUpload className={"p-1 border bg-[#f3eded] w-full"} />
          </div>
        </div>
        <div className="flex flex-col w-[32%] pt-8 pb-2">
          <CheckboxList
            InputItems={["Advanced Payment Required"]}
            onCheckboxChange={handleCheckboxChange}
          />
        </div>
        <div className="flex justify-around pt-4 pb-2 w-4/12">
          <Link
            to={isFormValid() ? "/sales-dashboard" : ""}
            className="inline-block w-1/2 mr-2"
          >
            <Button
              className={`bg-green-500 p-4 mt-8 w-full text-white font-bold ${
                isFormValid() ? "" : "opacity-50 cursor-not-allowed"
              }`}
              name={"Submit"}
              onClick={() => handleSubmit(formData)}
            />
          </Link>
          <Button
            className="bg-red-500 p-4 mt-8 w-1/2 text-white font-bold"
            name={"Cancel"}
          />
        </div>
      </form>
    </div>
  );
};

export default Form;
