import React from "react";
import Button from "../components/Button";
import { isDirector, isManager, isSuperUser, isTeamLead } from "../config/Role";

const IsMultipleEdit = ({
  isMultiEdit,
  handleAddManDays,
  handleAssignProject,
  selectedRow,
}) => {
  const role = localStorage.getItem("role");
  return (
    <>
      {isMultiEdit && (
        <div
          className={`${
            isMultiEdit
              ? "AddManDaysAnimation  opacity-100 flex items-center justify-left bg-[#bd1d1d] border absolute right-0 top-[-0.3rem] w-full p-2"
              : " opacity-0"
          } z-auto`}
        >
          <span className="text-white text-xl">
            row selected ({selectedRow.length})
          </span>
          {role?.includes(isTeamLead) ? (
            <Button
              name={"Add Man Days"}
              className={
                "p-2 bg-yellow-200 border rounded-lg border-black ml-4"
              }
              onClick={handleAddManDays}
            />
          ) : role?.includes(isManager) ? (
            <Button
              name={"Assign Project"}
              className={
                "p-2 bg-yellow-200 border rounded-lg border-black ml-4"
              }
              onClick={handleAssignProject}
            />
          ) : role?.includes(isSuperUser) || role?.includes(isDirector) ? (
            <div>
              <Button
                name={"Add Man Days"}
                className={
                  "p-2 bg-yellow-200 border rounded-lg border-black ml-4"
                }
                onClick={handleAddManDays}
              />
              <Button
                name={"Assign Project"}
                className={
                  "p-2 bg-yellow-200 border rounded-lg border-black ml-4"
                }
                onClick={handleAssignProject}
              />
            </div>
          ) : (
            ""
          )}
        </div>
      )}
    </>
  );
};

export default IsMultipleEdit;
