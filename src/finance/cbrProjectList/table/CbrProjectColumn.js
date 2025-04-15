import { MdDownload, MdFileDownloadOff, MdRemoveRedEye } from "react-icons/md";
import { createColumnHelper } from "@tanstack/react-table";
import { useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
// import ProgressBar from "../components/ProgressBar";
import Tooltip from "../../../components/Tooltip";
import {
  allManagerRolesRole,
  isDirectorRole,
  isHodRole,
} from "../../../config/Role";
import {
  setSowList,
  toggleShowSowList,
} from "../../../../utils/slices/dataTableSlice";
import TableActionsButton from "../../../projectTable/TableActionsButton";
import {
  addMultipleSample,
  toggleViewMultipleCpiSample,
} from "../../../../utils/slices/addMutipleSampleCpiSlice";
import CbrTableActionButton from "./CbrTableActionButton";

export const CbrProjectColumn = () => {
  const selectedRowRecord = useSelector((store) => store.dataTable.selectedRow);
  const department = localStorage.getItem("department");

  const dispatch = useDispatch();
  const ref = useRef(null);

  const columnHelper = createColumnHelper();

  const currentDate = new Date().toISOString().split("T")[0];

  const columns = useMemo(
    () =>
      [
        columnHelper.accessor("project_code", {
          id: "project_code",
          header: "Project Code",
          cell: (info) => info.getValue(),
        }),
        columnHelper.accessor("name", {
          id: "name",
          header: "Project Name",
          cell: (info) => {return <span className="text-left flex justify-start">{info.getValue()}</span>},
        }),
        columnHelper.accessor("project_type", {
          id: "project_type",
          header: "Type",
          cell: (info) => {return <span className="text-left flex justify-start">{info.getValue()}</span>},
        }),
        columnHelper.accessor("clients", {
          id: "clients",
          header: "Client Name",
          cell: (info) => {return <span className="text-left flex justify-start">{info.getValue()}</span>},
        }),
        columnHelper.accessor("tentative_start_date", {
          id: "start_date",
          header: "Start Date",
          cell: (info) => info.getValue(),
        }),
        columnHelper.accessor("tentative_end_date", {
          id: "end_date",
          header: "End Date",
          cell: (info) => info.getValue(),
        }),
        columnHelper.accessor("ops_head", {
          id: "ops_head",
          header: "Ops Head",
          cell: (info) => {
            return (
              <span className="text-left flex justify-start">
                {info.getValue()}
              </span>
            );
          },
        }),
        !allManagerRolesRole &&
          columnHelper.accessor("assigned_to", {
            id: "unimrkt_pm",
            header: "UniMrkt PM",
            cell: (info) => {return <span className="text-left flex justify-start">{info.getValue()}</span>},
          }),
        // columnHelper.accessor("project_assigned_to_teamlead", {
        //   id: "team_lead",
        //   header: "Team Lead",
        //   cell: (info) => {return <span className="text-left flex justify-start">{info.getValue()}</span>},
        // }),
        columnHelper.accessor("project_client_pm", {
          id: "client_pm",
          header: "Client PM",
          cell: (info) => {return <span className="text-left flex justify-start">{info.getValue()}</span>},
        }),
        columnHelper.accessor("cpi", {
          id: "cpi",
          header: "CPI",
          cell: (info) => {
            const row = info.row.original;
            // console.log("🚀 ~ CbrProjectColumn ~ row:", row)
            return row?.cpi == 0 ? (
              <Tooltip text={"View Multiple CPI"} className={"w-40"}>
                <MdRemoveRedEye
                  onClick={() => {
                    dispatch(addMultipleSample(row));
                    dispatch(toggleViewMultipleCpiSample(true));
                  }}
                  className="cursor-pointer text-base text-blue-600"
                />
              </Tooltip>
            ) : (
<span className="text-right flex justify-end">{row?.cpi}</span>
            
            );
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
                  <span className="mr-1">{row?.total_achievement || 0}</span>
                </Tooltip>
                <Tooltip
                  position="bottom"
                  text={"Total Target"}
                  className={"w-32"}
                >
                  <span className="text-gray-700 mr-2">{` / ${
                    row?.sample || 0
                  }`}</span>
                </Tooltip>
              </div>
            );
          },
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
                    className="h-full"
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
        }),
        columnHelper.accessor("man_days", {
          id: "man_days",
          header: "Man Days",
          cell: (info) => {return <span className="text-rigth flex justify-end">{info.getValue()}</span>},
        }),
        columnHelper.accessor("status", {
          id: "status",
          header: "Status",
          cell: (info) => {return <span className="text-right flex justify-start">{info.getValue()}</span>},
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
              <span className="text-blue-600 cursor-pointer text-base">
                <Tooltip text={"Download SOW"} className={"w-32"}>
                  <MdDownload
                    onClick={() => {
                      dispatch(toggleShowSowList());
                      dispatch(setSowList(row));
                    }}
                  />
                </Tooltip>
              </span>
            ) : (
              <p className="text-base">
                <MdFileDownloadOff />
              </p>
            );
          },
        }),
        columnHelper.display({
          id: "actions",
          header: "Actions",
          cell: (info) => {
            const row = info?.row?.original;
            return (
              <div className="flex justify-center">
                <CbrTableActionButton record={row} index={info?.row?.id} />
              </div>
            );
          },
        }),
      ].filter(Boolean),
    [selectedRowRecord, department, currentDate, dispatch]
  ); // ✅ Remove `false` values

  return columns;
};
