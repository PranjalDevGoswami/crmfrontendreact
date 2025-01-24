import {
  allManagerRolesRole,
  isDirectorRole,
  isHodRole,
} from "../../src/config/Role";
import ActionsButton from "../../src/project/projectCRUDOperations/ActionsButton";
import { MdDownload, MdFileDownloadOff, MdRemoveRedEye } from "react-icons/md";
import Tooltip from "../../src/components/Tooltip";

export const TableColumn = ({
  buttonRef,
  handleViewCpi,
  setShowSowList,
  setSowList,
}) => {
  
  const columns = [
    {
      name: "Project Code",
      selector: (row) => row?.project_code?.toUpperCase(),
      sortable: true,
      width: "120px",
    },
    {
      name: "Client Name",
      selector: (row) => row?.clients,
      sortable: true,
      width: "120px",
    },
    {
      name: "Project Name",
      selector: (row) => row?.name,
      sortable: true,
      width: "235px",
      overflow: "wrap !important",
      whiteSpace: "pre-wrap !important",
    },
    {
      name: "Type",
      selector: (row) => row?.project_type,
      sortable: true,
      width: "85px",
      // hide: "md",
    },
    // !isDirectorRole ? 
    {
          name: "Start Date",
          selector: (row) => row?.tentative_start_date,
          sortable: true,
          width: "110px",
        },
      // : { width: "5px" },
    // !isDirectorRole ?
     {
          name: "End Date",
          selector: (row) => row?.tentative_end_date,
          sortable: true,
          width: "110px",
        },
      // : { width: "5px" },
    !allManagerRolesRole && {
      name: "UniMrkt PM",
      selector: (row) => row?.assigned_to?.name,
      sortable: true,
      width: "130px",
    },
    {
      name: "Team Lead",
      selector: (row) => row?.project_assigned_to_teamlead,
      sortable: true,
      width: "130px",
    },
    {
      name: "Client PM",
      selector: (row) => row?.project_client_pm?.name,
      sortable: true,
      width: "130px",
    },
    {
      name: "CPI",
      selector: (row) =>
        row?.cpi == 0 ? (
          <Tooltip text={"View Multiple CPI"} className={"w-40"}>
            <MdRemoveRedEye
              onClick={() => handleViewCpi(row)}
              className="cursor-pointer text-base"
            />
          </Tooltip>
        ) : (
          row?.cpi
        ),
      sortable: true,
      width: "85px",
    },
    (isDirectorRole || isHodRole) && {
      name: "Initial Target",
      selector: (row) => row?.initial_sample_size,
      sortable: true,
      width: "140px",
    },

    // {
    //   name: "Project Target",
    //   selector: (row) => row?.sample,
    //   sortable: true,
    //   width: "100px",
    // },
    // {
    //   name: "Ach. Target",
    //   selector: (row) => row?.total_achievement,
    //   sortable: true,
    //   // width: "100px",
    // },
    // {
    //   name: "Rem. Target",
    //   selector: (row) => row?.remaining_interview,
    //   sortable: true,
    //   // width: "100px",
    // },
    {
      name: "Project Target",
      selector: (row) => (
        <div className="flex">
          <Tooltip position="top" text={"Achieved Target"} className={"w-40"}>
            <span className="mr-1">{row?.total_achievement || 0}</span>
          </Tooltip>
          <Tooltip position="bottom" text={"Total Target"} className={"w-32"}>
            <span className="text-[#888] mr-2">{` / ${row?.sample || 0}`}</span>
          </Tooltip>
        </div>
      ),

      sortable: true,
      width: "150px",
    },
    {
      name: "Progress",
      selector: (row) => {
        const progressPercentage = 
          row?.sample && parseFloat(row?.sample) !== 0
            ? (parseFloat(row?.total_achievement || 0) / parseFloat(row?.sample)) * 100
            : 0; 

        return (
          <div className="w-full">
            <div className="relative w-full h-4 bg-gray-200 border border-gray-400 overflow-hidden">
              <div
                className="h-full"
                // style={{
                //   width: `${Math.min(progressPercentage, 100)}%`, // Cap width to 100%
                //   backgroundColor:
                //     progressPercentage > 100 ? "#FF6347" : "#38A169", // Reddish color if > 100%
                // }}
                style={{
                  width: `${Math.min(progressPercentage, 100)}%`, // Cap width to 100%
                  backgroundColor:
                    progressPercentage === 100
                      ? "#38A169" // Greenish color for exactly 100%
                      : progressPercentage > 100
                      ? "#FF6347" // Reddish color for > 100%
                      : "#FFD700", // Gold color for < 100%
                }}
                
              ></div>
              {parseFloat(row?.initial_sample_size) <
                parseFloat(row?.sample) && (
                <div
                  className="absolute top-0 left-0 h-full bg-yellow-400 opacity-50"
                  style={{
                    width: `${Math.min(
                      ((parseFloat(row?.sample) -
                        parseFloat(row?.initial_sample_size)) /
                        parseFloat(row?.sample)) *
                        100,
                      100
                    )}%`,
                  }}
                ></div>
              )}
            </div>
            <span className="text-gray-700">
              {progressPercentage.toFixed(2)}%
            </span>
          </div>
        );
      },
      sortable: true,
      width: "100px",
    },
    {
      name: "Man Days",
      selector: (row) => row?.man_days,
      sortable: true,
      // width: "110px",
    },
    {
      name: "Status",
      selector: (row) => row?.status,
      sortable: true,
      width: "125px",
      conditionalCellStyles: [
        {
          when: (row) => row?.status === "In Progress",
          style: {
            color: "rgba(29, 78, 216,1)",
            "&:hover": {
              cursor: "pointer",
            },
          },
        },
        {
          when: (row) => row?.status === "Completed",
          style: {
            // backgroundColor: "#888",
            color: "rgba(63, 195, 128, 1)",
            "&:hover": {
              cursor: "pointer",
            },
          },
        },
        {
          when: (row) => row?.status === "cbr_raised",
          style: {
            backgroundColor: "rgb(128,128,128,1)",
            color: "white",
            "&:hover": {
              cursor: "pointer",
            },
          },
        },
        {
          when: (row) => row?.status === "undefined",
          style: {
            backgroundColor: "rgba(248, 148, 6, 0.9)",
            color: "white",
            "&:hover": {
              cursor: "pointer",
            },
          },
        },
        {
          when: (row) => row?.status === null,
          style: {
            backgroundColor: "rgba(242, 38, 19, 0.9)",
            color: "white",
            "&:hover": {
              cursor: "not-allowed",
            },
          },
        },
      ],
    },
    {
      name: "SOW",
      selector: (row) =>
        row?.documents?.length > 0 ? (
          <span className="text-blue-600 cursor-pointer text-base">
            <Tooltip text={"Download SOW"} className={"w-32"}>
              <MdDownload
                onClick={() => {
                  setShowSowList(true);
                  setSowList(row);
                }}
              />
            </Tooltip>
          </span>
        ) : (
          <p className="text-base">
            <MdFileDownloadOff />
          </p>
        ),
      sortable: true,
      width: "60px",
    },
    {
      name: "Actions",
      key: "action",
      text: "Action",
      className: "action",
      align: "left",
      sortable: false,
      width: "60px",
      cell: (record, index) => {
        return (
          <ActionsButton record={record} index={index} buttonRef={buttonRef} />
        );
      },
    },
  ];

  return columns;
};
