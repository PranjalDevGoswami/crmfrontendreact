import { useSelector } from "react-redux";
import { allManagerRoles, isDirector } from "../../src/config/Role";
import ActionsButton from "../../src/project/projectCRUDOperations/ActionsButton";
import { TiEyeOutline } from "react-icons/ti";

export const TableColumn = ({ buttonRef }) => {
  const role = localStorage.getItem("role");
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
    role !== isDirector
      ? {
          name: "Start Date",
          selector: (row) => row?.tentative_start_date,
          sortable: true,
          width: "110px",
        }
      : { width: "5px" },
    role !== isDirector
      ? {
          name: "End Date",
          selector: (row) => row?.tentative_end_date,
          sortable: true,
          width: "110px",
        }
      : { width: "5px" },
    !allManagerRoles.includes(role) && {
      name: "Unimrkt PM",
      selector: (row) => row?.assigned_to?.name,
      sortable: true,
      width: "130px",
    },
    {
      name: "Team Lead",
      selector: (row) => row?.project_assigned_to_teamlead?.name,
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
      selector: (row) => row?.cpi,
      sortable: true,
      width: "75px",
    },
    // desabledRowData?.project_samples.length && {
    //   name: "CPI",
    //   selector: (row) => row?.cpi,
    //   sortable: true,
    //   width: "75px",
    //   cell: (record, index) => {
    //     return <TiEyeOutline />;
    //   },
    // },

    {
      name: "Project Target",
      selector: (row) => row?.sample,
      sortable: true,
      width: "100px",
    },
    {
      name: "Ach. Target",
      selector: (row) => row?.total_achievement,
      sortable: true,
      // width: "100px",
    },
    {
      name: "Rem. Target",
      selector: (row) => row?.remaining_interview,
      sortable: true,
      // width: "100px",
    },
    {
      name: "T. Man Days",
      selector: (row) => row?.man_days,
      sortable: true,
      // width: "110px",
    },
    {
      name: "status",
      selector: (row) => row?.status,
      sortable: true,
      width: "125px",
      conditionalCellStyles: [
        {
          when: (row) => row?.status === "Completed",
          style: {
            backgroundColor: "rgba(63, 195, 128, 0.9)",
            color: "white",
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
      name: "Actions",
      key: "action",
      text: "Action",
      className: "action",
      align: "left",
      sortable: false,
      // width: "90px",
      cell: (record, index) => {
        return (
          <ActionsButton record={record} index={index} buttonRef={buttonRef} />
        );
      },
    },
  ];

  return columns;
};
