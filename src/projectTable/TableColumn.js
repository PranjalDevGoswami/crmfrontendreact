import { allManagerRolesRole, isDirectorRole, isHodRole } from "../config/Role";
import { MdDownload, MdFileDownloadOff, MdRemoveRedEye } from "react-icons/md";
import Tooltip from "../components/Tooltip";
import { createColumnHelper } from "@tanstack/react-table";
import { useEffect, useMemo, useRef } from "react";
import {
  setSelectedRecord,
  setSelectedRow,
  setSowList,
  toggleIsMultiEdit,
  toggleShowSowList,
} from "../../utils/slices/dataTableSlice";
import { useDispatch, useSelector } from "react-redux";
import ProgressBar from "../components/ProgressBar";
import {
  addMultipleSample,
  toggleViewMultipleCpiSample,
} from "../../utils/slices/addMutipleSampleCpiSlice";
import TableActionsButton from "./TableActionsButton";

export const TableColumn = () => {
  const selectedRowRecord = useSelector((store) => store.dataTable.selectedRow);
  const department = localStorage.getItem("department");

  const dispatch = useDispatch();
  const ref = useRef(null);

  const columnHelper = createColumnHelper();

  function IndeterminateCheckbox({ indeterminate, className = "", ...rest }) {
    useEffect(() => {
      if (typeof indeterminate === "boolean") {
        ref.current.indeterminate = !rest.checked && indeterminate;
      }
    }, [ref, indeterminate]);

    return (
      <input
        type="checkbox"
        ref={ref}
        className={className + " cursor-pointer"}
        {...rest}
      />
    );
  }
  const currentDate = new Date().toISOString().split("T")[0];

  const columns = useMemo(
    () =>
      [
        department === "2"
          ? columnHelper.display({
              id: "select",
              header: ({ table }) => (
                <IndeterminateCheckbox
                  {...{
                    checked: selectedRowRecord.length > 0 ? true : false,
                    indeterminate:
                      selectedRowRecord.length > 0 &&
                      selectedRowRecord.length <
                        table.getRowModel().rows.length,
                    onChange: (e) => {
                      const isChecked = e.target.checked;
                      table.getToggleAllRowsSelectedHandler()(e);

                      const selectedRows = isChecked
                        ? table.options.data.filter((item) => {
                            const enableDate =
                              new Date(item.tentative_end_date) >=
                              new Date(currentDate);
                            const enableStatus =
                              item.status !== "CBR Raised" &&
                              item.status !== "Completed" &&
                              item.status !== "On Hold" &&
                              item.status !== "Cancelled";
                            return enableDate && enableStatus;
                          })
                        : [];
                      dispatch(setSelectedRow(selectedRows));
                      dispatch(toggleIsMultiEdit(selectedRows.length > 0));
                    },
                  }}
                />
              ),

              cell: ({ row }) => (
                <div className="px-1">
                  <IndeterminateCheckbox
                    {...{
                      checked: selectedRowRecord.some(
                        (item) => item.id === row.original.id
                      ),
                      disabled: !row.getCanSelect(),
                      indeterminate: row.getIsSomeSelected(),
                      onChange: (e) => {
                        row.getToggleSelectedHandler()(e);

                        const isSelected = e.target.checked;
                        let newSelectedRows = [...selectedRowRecord];

                        if (isSelected) {
                          newSelectedRows.push(row.original);
                        } else {
                          newSelectedRows = newSelectedRows.filter(
                            (item) => item.id !== row.original.id
                          );
                        }
                        dispatch(setSelectedRow(newSelectedRows));
                        if (newSelectedRows.length === 0) {
                          dispatch(toggleIsMultiEdit(false));
                        } else if (isSelected) {
                          dispatch(toggleIsMultiEdit(true));
                        }
                      },
                    }}
                  />
                </div>
              ),
            })
          : null,
        columnHelper.accessor("project_code", {
          id: "project_code",
          header: "Project Code",
          cell: (info) => {
            return (
              <span className="text-right flex justify-end">
                {info.getValue()}
              </span>
            );
          },
          // meta: {
          //   filterVariant: "",
          // },
        }),
        columnHelper.accessor("clients", {
          id: "clients",
          header: "Client Name",
          cell: (info) => {
            return (
              <span className="text-left flex justify-start">
                {info.getValue()}
              </span>
            );
          },
          // meta: {
          //   filterVariant: "",
          // },
        }),
        columnHelper.accessor("name", {
          id: "name",
          header: "Project Name",
          cell: (info) => {
            return (
              <span className="text-left flex justify-start">
                {info.getValue()}
              </span>
            );
          },
          // meta: {
          //   filterVariant: "",
          // },
        }),
        columnHelper.accessor("project_type", {
          id: "project_type",
          header: "Type",
          cell: (info) => {
            return (
              <span className="text-left flex justify-start">
                {info.getValue()}
              </span>
            );
          },
          // meta: {
          //   filterVariant: "",
          // },
        }),
        columnHelper.accessor("tentative_start_date", {
          id: "start_date",
          header: "Start Date",
          cell: (info) => {
            return (
              <span className="text-left flex justify-start">
                {info.getValue()}
              </span>
            );
          },
          // meta: {
          //   filterVariant: "",
          // },
        }),
        columnHelper.accessor("tentative_end_date", {
          id: "end_date",
          header: "End Date",
          cell: (info) => {
            return (
              <span className="text-left flex justify-start">
                {info.getValue()}
              </span>
            );
          },
          // meta: {
          //   filterVariant: "",
          // },
        }),
        !allManagerRolesRole &&
          columnHelper.accessor("assigned_to.name", {
            id: "unimrkt_pm",
            header: "UniMrkt PM",
            cell: (info) => {
              return (
                <span className="text-left flex justify-start">
                  {info.getValue()}
                </span>
              );
            },
            meta: {
              filterVariant: "",
            },
          }),
        columnHelper.accessor("project_assigned_to_teamlead", {
          id: "team_lead",
          header: "Team Lead",
          cell: (info) => {
            return (
              <span className="text-left flex justify-start">
                {info.getValue()}
              </span>
            );
          },
          // meta: {
          //   filterVariant: "",
          // },
        }),
        columnHelper.accessor("project_client_pm", {
          id: "project_client_pm",
          header: "Client PM",
          cell: (info) => {
            return (
              <span className="text-left flex justify-start">
                {info.getValue()}
              </span>
            );
          },
          // meta: {
          //   filterVariant: "",
          // },
        }),
        columnHelper.accessor("cpi", {
          id: "cpi",
          header: "CPI",
          cell: (info) => {
            const row = info.row.original;
            return row?.cpi == 0 ? (
              <div className="flex justify-center">
                <Tooltip text={"View Multiple CPI"} className={"w-40"}>
                  <MdRemoveRedEye
                    onClick={() => {
                      dispatch(addMultipleSample(row));
                      dispatch(toggleViewMultipleCpiSample(true));
                    }}
                    className="cursor-pointer text-base text-blue-600 text-center"
                  />
                </Tooltip>
              </div>
            ) : (
              <span className="text-right flex justify-end"> {row?.cpi} </span>
            );
          },
          // meta: {
          //   filterVariant: "",
          // },
        }),
        (isDirectorRole || isHodRole) &&
          columnHelper.accessor("initial_sample_size", {
            id: "initial_target",
            header: "Initial Target",
            cell: (info) => {
              return (
                <span className="text-right flex justify-end">
                  {info.getValue()}
                </span>
              );
            },
            meta: {
              filterVariant: "",
            },
          }),
        columnHelper.accessor("sample", {
          id: "project_target",
          header: "Project Target",
          cell: (info) => {
            const row = info.row.original;
            return (
              <div className="flex justify-end">
                <Tooltip
                  position="top"
                  text={"Achieved Target"}
                  className={"w-40"}
                >
                  <span className="mr-1 text-right flex flex-end">
                    {row?.total_achievement || 0}
                  </span>
                </Tooltip>
                <Tooltip
                  position="bottom"
                  text={"Total Target"}
                  className={"w-32"}
                >
                  <span className="text-gray-700 mr-2 text-right flex flex-end">{` / ${
                    row?.sample || 0
                  }`}</span>
                </Tooltip>
              </div>
            );
          },
          // meta: {
          //   filterVariant: "",
          // },
        }),
        columnHelper.accessor("total_achievement", {
          id: "progress",
          header: "Progress",
          cell: (info) => {
            const row = info.row.original;
            const progressPercentage =
              row?.sample && parseFloat(row?.sample) !== 0
                ? (parseFloat(row?.total_achievement || 0) /
                    parseFloat(row?.sample || 0)) *
                  100
                : 0.0;

            return (
              <div className="w-full">
                <div className="relative w-full h-4 border rounded-lg overflow-hidden">
                  <div
                    className="h-full text-right"
                    style={{
                      width: `${Math.min(progressPercentage, 100)}%`,
                      backgroundColor:
                        progressPercentage === 100
                          ? "#38A169"
                          : progressPercentage > 100
                          ? "#FF6347"
                          : "#FFD700",
                      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                      textAlign: "center",
                      padding: "5px 0",
                      borderRadius: "8px",
                      transition:
                        "width 0.5s ease-in-out, background 0.5s ease-in-out",
                    }}
                  ></div>
                </div>
                <span className="text-gray-700">
                  {progressPercentage.toFixed(2)}%
                </span>
              </div>
              // <ProgressBar progress={progressPercentage} />
            );
          },
          // meta: {
          //   filterVariant: "",
          // },
        }),
        columnHelper.accessor("man_days", {
          id: "man_days",
          header: "Man Days",
          cell: (info) => {
            return (
              <span className="text-right flex justify-end">
                {info.getValue()}
              </span>
            );
          },
          // meta: {
          //   filterVariant: "",
          // },
        }),
        columnHelper.accessor("status", {
          id: "status",
          header: "Status",
          cell: (info) => {
            return (
              <span className="text-left flex justify-start">
                {info.getValue()}
              </span>
            );
          },
          // meta: {
          //   filterVariant: 'select',
          // },
        }),
        columnHelper.accessor("documents", {
          id: "sow",
          header: "SOW",
          cell: (info) => {
            const row = info.row.original;
            return row?.documents?.length > 0 ? (
              <div className="text-blue-600 cursor-pointer text-base flex justify-center">
                <Tooltip text={"Download SOW"} className={"w-32"}>
                  <MdDownload
                    onClick={() => {
                      dispatch(toggleShowSowList());
                      dispatch(setSowList(row));
                    }}
                  />
                </Tooltip>
              </div>
            ) : (
              <div className="text-base flex justify-center">
                <MdFileDownloadOff />
              </div>
            );
          },
          // meta: {
          //   filterVariant: "",
          // },
        }),
        columnHelper.display({
          id: "actions",
          header: "Actions",
          cell: (info) => {
            const row = info?.row?.original;

            return (
              <div className="flex justify-center">
                <TableActionsButton record={row} index={info?.row?.id} />
              </div>
            );
          },
          // meta: {
          //   filterVariant: "",
          // },
        }),
      ].filter(Boolean),
    [selectedRowRecord, department, currentDate, dispatch]
  ); // ✅ Remove `false` values

  return columns;
};
