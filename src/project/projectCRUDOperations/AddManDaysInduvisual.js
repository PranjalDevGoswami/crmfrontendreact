import { useContext, useState } from "react";
import { DataTableContext } from "../../ContextApi/DataTableContext";
import { PostMandaysData } from "../../fetchApis/projects/mandays/PostMandaysData";
import LableAndInput from "../../components/LableAndInput";
import Dropdown from "../../components/DropDown";
import Label from "../../components/Label";
import SweetAlert from "../../components/SweetAlert";
import { FetchProject } from "../../ContextApi/FetchProjectContext";

const AddManDaysInduvisual = ({ viewRecord, setisEdit }) => {
  const [showDate, setShowDate] = useState("");
  const [updatedValue, setUpdatedValue] = useState({
    name: viewRecord.name,
    project_code: viewRecord.project_code,
    date: "",
    man_days: "",
    total_achievement: "",
  });
  const { isAddManDays, setIsAddManDays } = useContext(DataTableContext);
  const { projectList } = useContext(FetchProject);

  const handleFilterOption = (name, value) => {
    setUpdatedValue({
      ...updatedValue,
      [name]: value,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedValue({
      ...updatedValue,
      [name]: value,
    });
    if (name === "date") {
      setShowDate(value);
      const DateVAlue = new Date(value);
      const formattedDate = DateVAlue.toISOString();
      setUpdatedValue({
        ...updatedValue,
        date: formattedDate,
      });
    }
  };

  const handleDateFocus = (e) => {
    const selectedDate = new Date(e.target.value);

    if (selectedDate.getDay() === 6 || selectedDate.getDay() === 0) {
      e.target.value = "";
      e.preventDefault();
      console.log("Weekend days cannot be selected");
    }
  };

  const getMinDate = () => {
    let currentDate = new Date();
    let daysBack = 0;

    while (daysBack < 2) {
      if (currentDate.getDay() === 1) {
        currentDate.setDate(currentDate.getDate() - 3);
      } else if (currentDate.getDay() === 0) {
        currentDate.setDate(currentDate.getDate() - 2);
      } else {
        currentDate.setDate(currentDate.getDate() - 1);
      }
      daysBack++;
    }

    return currentDate.toISOString().split("T")[0];
  };

  const getMaxDate = () => {
    const currentDate = new Date();
    return currentDate.toISOString().split("T")[0];
  };

  const handleCancelUpdate = () => {
    setIsAddManDays(false);

    document.body.classList.remove("DrawerBody");
  };

  const PostUpdateEditData = async (data) => {
    try {
      const response = await PostMandaysData(data);
      if (response?.status == true) {
        setIsAddManDays(false);
        SweetAlert({
          title: "operation perform sucessfully",
          text: "",
          icon: "success",
        });
      } else {
        SweetAlert({
          title: "field can not be blank.",
          text: "",
          icon: "info",
        });
      }
    } catch (error) {
      SweetAlert({
        title: "Error fetching project data:",
        error,
        text: "",
        icon: "error",
      });
    }

    document.body.classList.remove("DrawerBody");
    // setIsDrawerOpen(false);
  };

  const handleEditUpdate = () => {
    PostUpdateEditData(updatedValue);
  };

  return (
    <div className="absolute  w-1/2 h-auto top-1/2 left-1/2 bg-white p-8 border border-black drop-shadow-lg shadow-2xl shadow-slate-400 translate-x-[-50%] translate-y-[-30%] z-30">
      <h3 className="text-xl underline pb-4">
        Fill Man Days and Achieve Target
      </h3>
      <div className="flex items-center flex-col justify-between">
        <div className="w-11/12">
          <LableAndInput
            labelName={"Project Code"}
            Inputvalue={viewRecord.project_code.toUpperCase()}
            desabled={true}
            inputClassName={"cursor-not-allowed p-2 border bg-[#f3eded]"}
            labelClassName={"pt-4 pb-2"}
            inputChange={handleInputChange}
          />
        </div>
        <div className="w-11/12">
          <LableAndInput
            labelName={"Project Name"}
            Inputvalue={viewRecord.name}
            desabled={true}
            inputClassName={"cursor-not-allowed p-2 border bg-[#f3eded]"}
            labelClassName={"pt-4 pb-2"}
            inputChange={handleInputChange}
          />
        </div>
        <div className="w-11/12">
          <LableAndInput
            labelName={"Date"}
            InputName={"date"}
            InputType={"date"}
            inputClassName={"p-2 border w-full"}
            labelClassName={"pt-4 pb-2"}
            Inputvalue={showDate}
            inputChange={handleInputChange}
            min={getMinDate()}
            max={getMaxDate()}
            InputOnFocus={handleDateFocus}
          />
        </div>
        <div className="w-11/12 mt-4">
          <Label labelName={"Status"} className={"pb-2 mt-4"} />
          <Dropdown
            Option_Name={[
              "--Select Status--",
              "inprogress",
              "hold",
              "complete",
            ]}
            onChange={(name, value) => handleFilterOption(name, value)}
            className={"p-2 mt-2 border w-full"}
            name={"status"}
          />
        </div>
        <div className="w-11/12">
          <LableAndInput
            labelName={"Man Days"}
            InputName={"man_days"}
            InputType={"number"}
            inputClassName={"p-2 border"}
            labelClassName={"pt-4 pb-2"}
            Inputvalue={updatedValue.man_days}
            inputChange={handleInputChange}
            InputMax_lenght={2}
            min={1}
          />
        </div>
        <div className="w-11/12">
          <LableAndInput
            labelName={"Achieve Target"}
            InputType={"number"}
            InputName={"total_achievement"}
            inputClassName={"p-2 border"}
            labelClassName={"pt-4 pb-2"}
            Inputvalue={updatedValue.total_achievement}
            inputChange={handleInputChange}
            InputMax_lenght={3}
            min={1}
          />
        </div>
        <div className="flex pt-10">
          <button
            onClick={handleEditUpdate}
            className={
              "bg-green-300 p-4 m-2 flex items-center w-full rounded text-white hover:bg-green-500"
            }
          >
            Update
          </button>
          <button
            onClick={handleCancelUpdate}
            className={
              "bg-red-300 p-4 m-2 flex items-center w-full rounded text-white hover:bg-red-500"
            }
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddManDaysInduvisual;
