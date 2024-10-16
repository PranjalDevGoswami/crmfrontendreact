import React, { useContext, useRef } from "react";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import {
  customStyles,
  customStylesDarkMode,
  Dummycolumns,
  DummyData,
} from "../../utils/tableData/DataTablesData";
import Button from "../components/Button";
import AddManDaysInduvisual from "./projectCRUDOperations/AddManDaysInduvisual";
import UpdateStatus from "./projectCRUDOperations/UpdateStatus";
import View from "./projectCRUDOperations/View";
import Edit from "./projectCRUDOperations/ProjectEditRequest";
import { MdAddTask } from "react-icons/md";

import {
  allManagerRoles,
  isDirector,
  isHod,
  isSuperUser,
  isSuperUserDepartment,
  isTeamLead,
} from "../config/Role";
import { isOperationDept } from "../config/Departments";
import { useHandleOutsideClick } from "../../utils/hooks/useHandleOutSideClick";
import { TableColumn } from "../../utils/tableData/dataTableColumns";
import { useSelector } from "react-redux";
import FilterProject from "./FilterProject";
import Tooltip from "../components/Tooltip";

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
  const darkMode = useSelector((store) => store.darkMode.isDarkMode);
  const buttonRef = useRef(null);

  const department = localStorage.getItem("department");
  const role = localStorage.getItem("role");

  const handleClose = () => {
    setIsViewOptionOpen(false);
    setOpenDropdownIndex(-1);
  };
  useHandleOutsideClick(buttonRef, handleClose);

  return (
    <>
      {department == isOperationDept &&
      (role?.includes(isTeamLead) || allManagerRoles.includes(role)) ? (
        <DataTable
          columns={data?.length > 0 ? TableColumn({ buttonRef }) : Dummycolumns}
          data={data?.length > 0 ? desabledRowData : DummyData}
          pagination
          customStyles={darkMode ? customStylesDarkMode : customStyles}
          selectableRows
          onSelectedRowsChange={handleSelectedRowsChange}
          enableMultiRowSelection
          selectableRowDisabled={(row) => row.desabled}
          actions={<FilterProject />}
        />
      ) : department == isOperationDept && role?.includes(isHod) ? (
        <DataTable
          columns={data?.length > 0 ? TableColumn({ buttonRef }) : Dummycolumns}
          data={data?.length > 0 ? desabledRowData : DummyData}
          pagination
          customStyles={darkMode ? customStylesDarkMode : customStyles}
          actions={<FilterProject />}
        />
      ) : (isSuperUserDepartment.includes(department) &&
          role?.includes(isSuperUser)) ||
        role?.includes(isDirector) ? (
        <div className="">
          <Link to={"/entry-page"}>
            <Button
              name={
                <Tooltip text="Add New Project" position="top">
                  <MdAddTask />
                </Tooltip>
              }
              className={`${
                darkMode ? "bg-black text-white border-white" : "border-black"
              } p-2 border border-gray-200 bg-gray-100 rounded-sm text-sm flex items-center justify-around text-blue-400 absolute right-11 -top-8 z-10`}
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
            actions={<FilterProject />}
          />
        </div>
      ) : (
        <div className="w-full no-scrollbar">
          {role?.includes(isDirector) ? (
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
              actions={<FilterProject />}
            />
          ) : (
            <div>
              <Link to={"/entry-page"}>
                <Button
                  name={
                    <Tooltip text="Add New Project" position="top">
                      <MdAddTask />
                    </Tooltip>
                  }
                  className={`${
                    darkMode
                      ? "bg-black text-white border-white"
                      : " border-black"
                  } p-2 border border-gray-200 bg-gray-100 rounded-sm text-sm flex items-center justify-around text-blue-400 absolute right-11 -top-8 z-20 hover:scale-110`}
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
                actions={<FilterProject />}
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
