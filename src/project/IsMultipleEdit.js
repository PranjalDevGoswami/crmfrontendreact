import React from "react";
import Button from "../Atom/Button";
// import {
//   allManagerRolesRole,
//   isDirectorRole,
//   isManagerRole,
//   isSuperUserRole,
//   isTeamLeadRole,
// } from "../config/Role";

const IsMultipleEdit = ({
  isMultiEdit,
  handleAddManDays,
  handleAssignProject,
  selectedRow,
}) => {
  const role = localStorage.getItem("role");
  const isViewerUserRole = role !== "viewer";
  const isSuperUserRole = role === "superUser";
  const isDirectorRole = role === "Director";
  const isHodRole = role === "HOD";
  const isTeamLeadRole = role === "Team Lead";
  const allManagerRolesRole = ["Sr.Manager", "Ass.Manager", "Manager"].includes(
    role
  );

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
          {isTeamLeadRole ? (
            <Button
              name={"Add Man Days"}
              className={
                "p-2 bg-yellow-200 border rounded-lg border-black ml-4"
              }
              onClick={handleAddManDays}
            />
          ) : // : allManagerRolesRole ? (
          //   <Button
          //     name={"Assign Project"}
          //     className={
          //       "p-2 bg-yellow-200 border rounded-lg border-black ml-4"
          //     }
          //     onClick={handleAssignProject}
          //   />
          // )
          isSuperUserRole || isDirectorRole || allManagerRolesRole ||  isHodRole? (
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
