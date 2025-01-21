import { useContext, useState } from "react";
import { DataTableContext } from "../../ContextApi/DataTableContext";
import LableAndInput from "../../Molecules/LableAndInput";
import Dropdown from "../../components/DropDown";
import Label from "../../Atom/Label";
import { useDispatch } from "react-redux";
import { getMinDate } from "../../../utils/helperFunction/dateLimit";
import { addManDaysValidation } from "../../../utils/validation/addManDaysValidation";
import { handlePostMandaysData } from "../../../utils/helperFunction/postAddMandaysData";

const AddManDaysInduvisual = ({ viewRecord }) => {
  const [showDate, setShowDate] = useState("");
  const [updatedValue, setUpdatedValue] = useState([
    {
      project_id: viewRecord.id,
      update_date: "",
      total_man_days: "",
      total_achievement: "",
      status: "",
    },
  ]);
  const [errorMessage, setErrorMessage] = useState("");
  const { setIsAddManDays, setisEdit } = useContext(DataTableContext);
  const dispatch = useDispatch();

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
      setShowDate(value);
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
    setisEdit(false);
    setIsAddManDays(false);
    document.body.classList.remove("DrawerBody");
  };
  const closeDrawerRight = () => {
  
  };
  const validateFields = addManDaysValidation(updatedValue)

  const handleEditUpdate = () => {
    if (validateFields()) {   
      handlePostMandaysData(updatedValue,dispatch,setIsAddManDays, setisEdit,closeDrawerRight)
    }
  };

  return (
    <div className="">
      <h3 className="text-xl underline pb-4">
        Fill Man Days and Achieve Target
      </h3>
      <div className="flex items-center flex-wrap justify-center w-full rounded-sm">
        <div className="ProjectOperationEdit">
          <LableAndInput
            labelName={"Project Code"}
            Inputvalue={viewRecord.project_code.toUpperCase()}
            desabled={true}
            inputClassName={"cursor-not-allowed p-2 border bg-[#f3eded]"}
            labelClassName={"pt-4 pb-2 text-left"}
            inputChange={handleInputChange}
          />
        </div>
        <div className="ProjectOperationEdit">
          <LableAndInput
            labelName={"Project Name"}
            Inputvalue={viewRecord.name}
            desabled={true}
            inputClassName={"cursor-not-allowed p-2 border bg-[#f3eded]"}
            labelClassName={"pt-4 pb-2 text-left"}
            inputChange={handleInputChange}
          />
        </div>
        <div className="ProjectOperationEdit">
          <LableAndInput
            labelName={"Date"}
            InputName={"update_date"}
            InputType={"date"}
            inputClassName={"p-2 border w-full"}
            labelClassName={"pt-4 pb-2 text-left"}
            Inputvalue={showDate}
            inputChange={handleInputChange}
            min={getMinDate()}
            max={getMaxDate()}
            InputOnFocus={handleDateFocus}
            required
          />
          {errorMessage && (
            <p className="text-red-500 text-sm">{errorMessage}</p>
          )}
        </div>
        <div className="ProjectOperationEdit mt-4 text-left">
          <Label labelName={"Status"} className={"pb-2 mt-4"} />
          <Dropdown
            Option_Name={[
              "--Select Status--",
              "In Progress",
              "Completed",
              "On Hold",
            ]}
            onChange={(name, value) => handleFilterOption(name, value)}
            className={"p-2 mt-2 border w-full"}
            name={"status"}
            id={"status induvisual"}
          />
        </div>
        <div className="ProjectOperationEdit">
          <LableAndInput
            labelName={"Man Days"}
            InputName={"total_man_days"}
            InputType={"number"}
            inputClassName={"p-2 border"}
            labelClassName={"pt-4 pb-2 text-left"}
            Inputvalue={updatedValue.man_days}
            inputChange={handleInputChange}
            InputMax_lenght={2}
            required
          />
        </div>
        <div className="ProjectOperationEdit">
          <LableAndInput
            labelName={"Achieve Target"}
            InputType={"number"}
            InputName={"total_achievement"}
            inputClassName={"p-2 border"}
            labelClassName={"pt-4 pb-2 text-left"}
            Inputvalue={updatedValue.total_achievement}
            inputChange={handleInputChange}
            InputMax_lenght={3}
            required
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
