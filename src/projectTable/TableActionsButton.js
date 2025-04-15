import React, { useRef } from "react";
import { MdOutlineMoreVert } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import {
  setIsViewOptionIndex,
  setOpenDropdownIndex,
  setSelectedIndex,
  setSelectedRecord,
  toggleIsViewOptionOpen,
} from "../../utils/slices/dataTableSlice";
import ViewProjectDetailsButton from "../projectOperationButtons/ViewProjectDetailsButton";
import AddManDaysButton from "../projectOperationButtons/AddManDaysButton";
import ProjectEditButton from "../projectOperationButtons/ProjectEditButton";
import UpdateStatusButton from "../projectOperationButtons/UpdateStatusButton";
import RaiseCbrButton from "../projectOperationButtons/RaiseCbrButton";
import GetInvoiceButton from "../projectOperationButtons/GetInvoiceButton";
import UpdateSowButton from "../projectOperationButtons/UpdateSowButton";
import { canAcessProjectAction } from "../config/allowRole/canAcessProjectAction";
import CanUserView from "../config/allowUserCanAccess/CanUserView";
import { useHandleOutsideClick } from "../../utils/hooks/useHandleOutSideClick";
import ViewCbrButton from "../projectOperationButtons/ViewCbrButton";

const TableActionsButton = ({ record, index }) => {
  const dispatch = useDispatch();
  const buttonRef = useRef();
  const { openDropdownIndex } = useSelector((store) => store.dataTable);
  const pageSize = useSelector((store) => store.projectData?.page_size);

  const handleAddEditOperation = (record, index) => {
    dispatch(setOpenDropdownIndex(openDropdownIndex == index ? -1 : index));
    dispatch(setIsViewOptionIndex(index));
    dispatch(toggleIsViewOptionOpen());
    dispatch(setSelectedIndex(index));
    dispatch(setSelectedRecord(record));
  };
  const handleClose = () => {
    dispatch(setOpenDropdownIndex(-1));
  };
  const close = useHandleOutsideClick(buttonRef, handleClose);

  return (
    <div className="relative w-full overflow-y-visible">
      <div className="flex justify-center items-center overflow-visible relative">
        <button
          onClick={() => handleAddEditOperation(record, index)}
          className="border p-2 rounded-md mr-2 cursor-pointer"
        >
          <MdOutlineMoreVert />
        </button>
        {openDropdownIndex == index && (
          <div
            ref={buttonRef}
            onClick={(e) => e.stopPropagation()}
            className={`${
              index > pageSize - 3 ? "bottom-0" : "top-0"
            } absolute w-24 right-16 z-50`}
          >
            <ViewProjectDetailsButton />
            <CanUserView
              element={<AddManDaysButton />}
              allowDepartments={canAcessProjectAction.addManDay.department}
              allowedRoles={canAcessProjectAction.addManDay.role}
            />
            <CanUserView
              element={<ProjectEditButton />}
              allowDepartments={canAcessProjectAction.editProject.department}
              allowedRoles={canAcessProjectAction.editProject.role}
            />
            <CanUserView
              element={<UpdateStatusButton />}
              allowDepartments={canAcessProjectAction.chnageStatus.department}
              allowedRoles={canAcessProjectAction.chnageStatus.role}
            />
            <CanUserView
              element={<RaiseCbrButton />}
              allowDepartments={canAcessProjectAction.raiseCBR.department}
              allowedRoles={canAcessProjectAction.raiseCBR.role}
            />
            <CanUserView
              element={<ViewCbrButton />}
              allowDepartments={canAcessProjectAction.raiseCBR.department}
              allowedRoles={canAcessProjectAction.raiseCBR.role}
            />
            <CanUserView
              element={<GetInvoiceButton />}
              allowDepartments={canAcessProjectAction.getInvoice.department}
              allowedRoles={canAcessProjectAction.getInvoice.role}
            />
            <CanUserView
              element={<UpdateSowButton />}
              allowDepartments={canAcessProjectAction.UploadSow.department}
              allowedRoles={canAcessProjectAction.UploadSow.role}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default TableActionsButton;
