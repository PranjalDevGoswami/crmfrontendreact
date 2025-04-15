import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LableAndInput from "../../Molecules/LableAndInput";
import Dropdown from "../../components/DropDown";
import Label from "../../Atom/Label";
import { PostMandaysData } from "../../fetchApis/projects/mandays/PostMandaysData";
import SweetAlert from "../../components/SweetAlert";
import { ProjectData } from "../../../utils/apis/projectData";
import { setProjects } from "../../../utils/slices/projectSlice";
import { getMinDate } from "../../../utils/helperFunction/dateLimit";
import { toggleIsAddManDays } from "../../../utils/slices/dataTableSlice";

const AddManDaysInduvisual = () => {
  const { page_size, page_number, activeTab } = useSelector(
    (store) => store.projectData
  );
  const { selectedRecord } = useSelector((store) => store.dataTable);

  const dispatch = useDispatch();
  const [updatedValue, setUpdatedValue] = useState([
    {
      project_id: selectedRecord?.id,
      update_date: "",
      total_man_days: "",
      total_achievement: "",
      status: "",
    },
  ]);
  const [errorMessage, setErrorMessage] = useState({});

  const handleFilterOption = (name, value) => {
    setUpdatedValue((prevValues) =>
      prevValues.map((item) => ({
        ...item,
        [name]: value,
      }))
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedValue((prevValues) =>
      prevValues.map((item) => ({
        ...item,
        [name]: value,
      }))
    );
    if (name === "update_date") {
      const DateValue = new Date(value);
      const formattedDate = DateValue.toISOString();
      setUpdatedValue((prevValues) =>
        prevValues.map((item) => ({
          ...item,
          update_date: formattedDate,
        }))
      );
    }
  };
  const handleDateFocus = (e) => {
    const selectedDate = new Date(e.target.value);
    if (selectedDate.getDay() === 6 || selectedDate.getDay() === 0) {
      e.target.value = "";
      setErrorMessage("Weekend days cannot be selected");
      e.preventDefault();
    } else {
      setErrorMessage("");
    }
  };

  const getMaxDate = () => {
    const currentDate = new Date();
    return currentDate.toISOString().split("T")[0];
  };

  const handleCancelUpdate = () => {
    dispatch(toggleIsAddManDays());
  };

  const validateFields = () => {
    const errorMsg = {};
    const { update_date, total_man_days, total_achievement, status } =
      updatedValue[0];

    if (!update_date) {
      errorMsg.update_date = "Date is required.";
    }
    if (!status) {
      errorMsg.status = "Status is required.";
    }
    if (!total_man_days) {
      errorMsg.total_man_days = "Man Days is required.";
    }
    if (total_man_days == 0) {
      errorMsg.total_man_days = "Man Days cannot be 0.";
    }
    if (!total_achievement) {
      errorMsg.total_achievement = "Achieve Target is required.";
    }

    return errorMsg;
  };

  const handleEditUpdate = () => {
    const errors = validateFields();
    setErrorMessage(errors);
    if (Object.keys(errors).length === 0) {
      PostUpdateEditData(updatedValue);
    }
  };
  const PostUpdateEditData = async (data) => {
    const response = await PostMandaysData(data);
    if (response?.status == true) {
      dispatch(toggleIsAddManDays());
      SweetAlert({
        title: "operation perform sucessfully",
        text: "",
        icon: "success",
      });
      const projectData = await ProjectData(page_number, page_size);
      dispatch(setProjects({ data: projectData?.results, reset: true }));
    }
  };

  const MandaysInputFields = [
    {
      labelName: "Project Code",
      inputValue: selectedRecord?.project_code?.toUpperCase(),
      disabled: true,
      inputChange: handleInputChange,
      type: "text",
    },
    {
      labelName: "Project Name",
      inputValue: selectedRecord?.name,
      disabled: true,
      inputChange: handleInputChange,
      type: "text",
    },
    {
      labelName: "Date",
      inputName: "update_date",
      inputType: "date",
      inputValue: updatedValue.update_date,
      inputChange: handleInputChange,
      min: getMinDate(),
      max: getMaxDate(),
      inputOnFocus: handleDateFocus,
      required: true,
      errorMessage: errorMessage.update_date,
    },
    {
      labelName: "Status",
      isDropdown: true,
      options: ["--Select Status--", "In Progress", "Completed", "On Hold"],
      onChange: handleFilterOption,
      name: "status",
      id: "status_individual",
      errorMessage: errorMessage.status,
    },
    {
      labelName: "Man Days",
      inputName: "total_man_days",
      inputType: "number",
      inputValue: updatedValue[0].total_man_days,
      inputChange: handleInputChange,
      maxLength: 2,
      required: true,
      errorMessage: errorMessage.total_man_days,
    },
    {
      labelName: "Achieve Target",
      inputName: "total_achievement",
      inputType: "number",
      inputValue: updatedValue[0].total_achievement,
      inputChange: handleInputChange,
      maxLength: 3,
      required: true,
      errorMessage: errorMessage.total_achievement,
    },
  ];

  return (
    <div className="">
      <h3 className="text-xl underline pb-4">
        Fill Man Days and Achieve Target
      </h3>

      <div className="grid grid-cols-2 gap-4 w-full rounded-md">
        {MandaysInputFields.map((field, index) =>
          field.isDropdown ? (
            <div className="mt-4 text-left" key={index}>
              <Label labelName={field.labelName} className="pb-2 mt-4" />
              <Dropdown
                Option_Name={field.options}
                onChange={(name, value) => field.onChange(name, value)}
                className={"p-2 mt-2 border w-full rounded-md bg-white"}
                name={field.name}
                id={field.id}
              />
              {field.errorMessage && (
                <p className="text-red-500 text-xs text-left">
                  {field.errorMessage}
                </p>
              )}
            </div>
          ) : (
            <div key={index}>
              <LableAndInput
                labelName={field.labelName}
                InputName={field.inputName}
                InputType={field.inputType}
                inputClassName={`${
                  field.disabled
                    ? "cursor-not-allowed bg-[#f3eded]"
                    : "bg-white"
                } p-2 border rounded-md `}
                labelClassName={"pt-4 pb-2 text-left"}
                inputValue={field.inputValue}
                inputChange={field.inputChange}
                min={field.min}
                max={field.max}
                inputOnFocus={field.inputOnFocus}
                disabled={field.disabled}
                maxLength={field.maxLength}
                required={field.required}
              />
              {field.errorMessage && (
                <p className="text-red-500 text-xs text-left">
                  {field.errorMessage}
                </p>
              )}
            </div>
          )
        )}
      </div>
      <div className="flex justify-center pt-4">
        <button
          onClick={handleEditUpdate}
          className={
            "bg-green-400 p-4 m-2 w-1/4 rounded text-white text-center hover:bg-green-500"
          }
        >
          Update
        </button>
        <button
          onClick={handleCancelUpdate}
          className={
            "bg-red-400 p-4 m-2 w-1/4 rounded text-white text-center hover:bg-red-500"
          }
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddManDaysInduvisual;
