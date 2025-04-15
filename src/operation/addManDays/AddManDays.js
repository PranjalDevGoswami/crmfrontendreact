import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PostMandaysData } from "../../fetchApis/projects/mandays/PostMandaysData";
import Label from "../../Atom/Label";
import AddManDaysTable from "./AddManDaysTable";
import Tooltip from "../../components/Tooltip";
import SweetAlert from "../../components/SweetAlert";
import { setProjects } from "../../../utils/slices/projectSlice";
import { ProjectData } from "../../../utils/apis/projectData";
import { useHandleOutsideClick } from "../../../utils/hooks/useHandleOutSideClick";
import { addManDaysValidation } from "../../../utils/helperFunction/validation/addManDaysValidation";
import {
  setSelectedRow,
  toggleIsDrawerOpen,
  toggleIsMultiEdit,
} from "../../../utils/slices/dataTableSlice";
import DateComponent from "../../components/DateComponent";
import { setMultipleManDays } from "../../../utils/slices/addMultipleManDaysSlice";

export const AddManDays = ({ setMultiEditFieldOpen }) => {
  const { page_number, page_size, activeTab } = useSelector(
    (store) => store.projectData
  );
  const { MultipleManDays } = useSelector((store) => store.MultipleManDays);
  const darkMode = useSelector((store) => store.themeSetting.isDarkMode);
  const dispatch = useDispatch();

  const [openRight, setOpenRight] = useState(true);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDate = (e) => {
    const inputDate = e.target.value;
    if (!inputDate) return;
    const [day, month, year] = inputDate.split("/");
    const isoDate = new Date(`${year}-${month}-${day}`).toISOString();
    setSelectedDate(isoDate);
    dispatch(
      setMultipleManDays(
        MultipleManDays.length > 0
          ? MultipleManDays.map((item) => ({
              ...item,
              update_date: isoDate,
            }))
          : []
      )
    );
  };

  const closeDrawerRight = () => {
    dispatch(toggleIsDrawerOpen());
    dispatch(toggleIsMultiEdit(false));
    dispatch(setSelectedRow([]));
    setMultiEditFieldOpen(false);
    setOpenRight(false);
  };

  const HandleAddManDays = () => {
    const updatedEntries = MultipleManDays.map((item) => ({
      ...item,
      total_man_days: parseInt(item.total_man_days),
      update_date: selectedDate,
    }));
    dispatch(setMultipleManDays(updatedEntries));
    const validateFields = addManDaysValidation(updatedEntries);
    if (validateFields) {
      BulkUpdateManDays(updatedEntries);
    }
  };

  const BulkUpdateManDays = async (data) => {
    const response = await PostMandaysData(data);
    if (response?.status === true) {
      SweetAlert({
        title: "Operation Performed Successfully",
        text: "",
        icon: "success",
      });
      closeDrawerRight();
      dispatch(setMultipleManDays([]));
      const projectData = await ProjectData(page_number, page_size);
      dispatch(setProjects({ data: projectData?.results, reset: true }));
    } else {
      const errorMessage = 
        response?.ex?.response?.data[0]?.non_field_errors?.[0] ||
        response?.ex?.response?.data?.error ||
        "Something went wrong"
      SweetAlert({
        title: "Info",
        text: errorMessage,
        icon: "info",
      });
    }
  };
  const handleAddManDayDrawer = useRef();
  // useHandleOutsideClick(handleAddManDayDrawer, closeDrawerRight);

  return (
    <React.Fragment>
      {openRight && (
        <div
          className={`${
            darkMode ? "bg-black text-white" : "bg-white text-black"
          } fixed top-0 right-0 w-full max-w-6xl h-full shadow-lg z-50 p-4 delay-300 transition-all overflow-scroll`}
          ref={handleAddManDayDrawer}
        >
          <div className="">
            <h3 className="text-xl underline pb-4">
              Fill Man Days and Achieve Target
            </h3>
            <div className="flex justify-end w-full p-2">
              <Label
                labelName={"Man Days Entry For Date :"}
                className={"pt-4 pb-2 w-auto"}
              />
              <DateComponent handleDateChange={handleDate} />
            </div>
          </div>
          <div className="overflow-y-visible text-center">
            <AddManDaysTable />
            <button
              className="bg-green-500 hover:bg-green-700 rounded-md p-2 text-white m-1"
              onClick={HandleAddManDays}
            >
              Submit
            </button>
          </div>
          <button
            className="absolute top-4 right-4 p-2 bg-red-500 rounded text-white"
            onClick={closeDrawerRight}
          >
            <Tooltip text={"Close Drawer"} position="left">
              X
            </Tooltip>
          </button>
        </div>
      )}
    </React.Fragment>
  );
};
