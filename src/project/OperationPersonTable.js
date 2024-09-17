import React, { useContext, useEffect, useRef } from "react";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import { TableColumn } from "../../utils/dataTableColumns";
import {
  customStyles,
  customStylesDarkMode,
  Dummycolumns,
  DummyData,
} from "../../utils/DataTablesData";
import { ThemeContext } from "../ContextApi/ThemeContext";
import ExportCSV from "./ExportExcel";
import Button from "../components/Button";
import AddManDaysInduvisual from "./projectCRUDOperations/AddManDaysInduvisual";
import UpdateStatus from "./projectCRUDOperations/UpdateStatus";
import View from "./projectCRUDOperations/View";
import Edit from "./projectCRUDOperations/ProjectEditRequest";

const OperationPersonTable = ({
  data,
  handleSelectedRowsChange,
  isOperationPerson,
  isEdit,
  isAddManDays,
  isView,
  changeProjectStatus,
  desabledRowData,
  setIsViewOptionOpen,
  setOpenDropdownIndex,
  selectedRecord,
  closeView,
}) => {
  let department = localStorage.getItem("department");
  let role = localStorage.getItem("role");
  const { darkMode } = useContext(ThemeContext);
  const buttonRef = useRef(null);
  const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (buttonRef.current && !buttonRef.current.contains(event.target)) {
      setIsViewOptionOpen(false);
      setOpenDropdownIndex(-1);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdownIndex(-1);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      {department == 2 &&
      (role?.includes("Team Lead") ||
        role?.includes("Manager") ||
        role?.includes("Sr.Manager") ||
        // role?.includes("HOD") ||
        role?.includes("Ass.Manager")) ? (
        <DataTable
          columns={data?.length > 0 ? TableColumn({ buttonRef }) : Dummycolumns}
          data={data?.length > 0 ? desabledRowData : DummyData}
          pagination
          customStyles={darkMode ? customStylesDarkMode : customStyles}
          selectableRows
          onSelectedRowsChange={handleSelectedRowsChange}
          enableMultiRowSelection
          selectableRowDisabled={(row) => row.desabled}
          actions={
            <ExportCSV
              data={desabledRowData}
              name={"Exports"}
              className={
                "rounded-full bg-green-300 p-2 pl-4 pr-4 text-white text-lg"
              }
              downloadName={"Project_List.csv"}
            />
          }
        />
      ) : department == 2 && role?.includes("HOD") ? (
        <DataTable
          columns={data?.length > 0 ? TableColumn({ buttonRef }) : Dummycolumns}
          data={data?.length > 0 ? desabledRowData : DummyData}
          pagination
          customStyles={darkMode ? customStylesDarkMode : customStyles}
          actions={
            <ExportCSV
              data={desabledRowData}
              name={"Exports"}
              className={
                "rounded-full bg-green-300 p-2 pl-4 pr-4 text-white text-lg"
              }
              downloadName={"Project_List.csv"}
            />
          }
        />
      ) : ((department == 1 ||
          department == 2 ||
          department == 3 ||
          department == 4) &&
          role?.includes("superuser")) ||
        role?.includes("Director") ? (
        <div className="">
          <Link to={"/entry-page"}>
            <Button
              name={"Add Project"}
              className={`${
                darkMode
                  ? "bg-black text-white border-white"
                  : "bg-yellow-200 border-black"
              } border rounded-lg p-2 absolute right-28 top-2 z-10`}
            />
          </Link>
          <DataTable
            columns={
              data?.length > 0 ? TableColumn({ buttonRef }) : Dummycolumns
            }
            data={data?.length > 0 ? desabledRowData : DummyData}
            pagination
            selectableRows
            customStyles={darkMode ? customStylesDarkMode : customStyles}
            onSelectedRowsChange={handleSelectedRowsChange}
            enableMultiRowSelection
            selectableRowDisabled={(row) => row.desabled}
            actions={
              <ExportCSV
                data={desabledRowData}
                name={"Exports"}
                className={
                  "rounded-full bg-green-300 p-2 pl-4 pr-4 text-white text-lg"
                }
                downloadName={"Project_List.csv"}
              />
            }
          />
        </div>
      ) : (
        <div className="w-full no-scrollbar">
          {role?.includes("Director") ? (
            <DataTable
              columns={
                data?.length > 0 ? TableColumn({ buttonRef }) : Dummycolumns
              }
              data={data?.length > 0 ? desabledRowData : DummyData}
              pagination
              customStyles={darkMode ? customStylesDarkMode : customStyles}
              onSelectedRowsChange={handleSelectedRowsChange}
              enableMultiRowSelection
              selectableRowDisabled={(row) => row.desabled}
              actions={
                <ExportCSV
                  data={desabledRowData}
                  name={"Exports"}
                  className={
                    "rounded-full bg-green-300 p-2 pl-4 pr-4 text-white text-lg"
                  }
                  downloadName={"Project_List.csv"}
                />
              }
            />
          ) : (
            <div>
              <Link to={"/entry-page"}>
                <Button
                  name={"Add Project"}
                  className={`${
                    darkMode
                      ? "bg-black text-white border-white"
                      : "bg-yellow-200 border-black"
                  } border rounded-lg p-2 absolute right-0 top-2 z-20`}
                />
              </Link>
              <DataTable
                columns={
                  data?.length > 0 ? TableColumn({ buttonRef }) : Dummycolumns
                }
                data={data?.length > 0 ? desabledRowData : DummyData}
                pagination
                customStyles={darkMode ? customStylesDarkMode : customStyles}
                onSelectedRowsChange={handleSelectedRowsChange}
                enableMultiRowSelection
                selectableRowDisabled={(row) => row.desabled}
                actions={<div />}
              />
            </div>
          )}
        </div>
      )}

      {isOperationPerson && isEdit && (
        <div className="absolute  w-1/2 h-auto top-1/3 left-1/2 bg-white p-4 border rounded-md  border-black drop-shadow-lg shadow-2xl shadow-slate-400 -translate-x-1/2 -translate-y-1/2 z-30">
          <Edit viewRecord={selectedRecord} />
        </div>
      )}
      {isOperationPerson && isAddManDays && (
        <div className="absolute  w-1/2 h-auto top-1/3 left-1/2 bg-white p-4 border  rounded-md border-black drop-shadow-lg shadow-2xl shadow-slate-400 -translate-x-1/2 -translate-y-1/2 z-30">
          <AddManDaysInduvisual viewRecord={selectedRecord} />
        </div>
      )}
      {isView && (
        <div className="z-50">
          <View />
        </div>
      )}
      {changeProjectStatus && (
        <div className="absolute  w-1/2z h-auto top-1/3 left-1/2 bg-white p-8 border border-black drop-shadow-lg shadow-2xl shadow-slate-400 translate-x-[-50%] translate-y-[-30%] z-30">
          <UpdateStatus viewRecord={selectedRecord} closeView={closeView} />
        </div>
      )}
    </>
  );
};

export default OperationPersonTable;
