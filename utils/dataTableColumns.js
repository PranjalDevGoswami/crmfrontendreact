import { MdOutlineMoreVert } from "react-icons/md";
import OpereationButton from "../src/project/projectCRUDOperations/OpereationButton";
import { DataTableContext } from "../src/ContextApi/DataTableContext";
import { useContext } from "react";

export const TableColumn = ({ buttonRef }) => {
  const {
    setChangeStatus,
    setisEdit,
    isView,
    setisView,
    selectedRecord,
    setSelectedRecord,
    openDropdownIndex,
    setOpenDropdownIndex,
    setIsViewOptionIndex,
    isViewOptionOpen,
    setIsViewOptionOpen,
    setSelectedIndex,
  } = useContext(DataTableContext);

  const handleAddEditOperation = (record, index) => {
    setOpenDropdownIndex(openDropdownIndex === index ? -1 : index);
    setIsViewOptionIndex(index);
    setIsViewOptionOpen(!isViewOptionOpen);
    setSelectedRecord(record);
    setSelectedIndex(index);
  };

  const columns = [
    // {
    //   name: "SN.",
    //   selector: (row) => row.id,
    //   sortable: true,
    //   width: "75px",
    // },
    {
      name: "Project Code",
      selector: (row) => row?.project_code?.toUpperCase(),
      sortable: true,
      // width: "120px",
    },
    {
      name: "Client Name",
      selector: (row) => row?.clients,
      sortable: true,
      // width: "100px",
    },
    {
      name: "Project Name",
      selector: (row) => row?.name,
      sortable: true,
      width: "235px",
      overflow: "wrap",
      whiteSpace: "pre-wrap !important",
    },
    {
      name: "Type",
      selector: (row) => row?.project_type,
      sortable: true,
      // width: "85px",
      hide: "md",
    },
    {
      name: "Start Date",
      selector: (row) => row?.tentative_start_date,
      sortable: true,
      // width: "110px",
    },
    {
      name: "End Date",
      selector: (row) => row?.tentative_end_date,
      sortable: true,
      // width: "110px",
    },
    {
      name: "CPI",
      selector: (row) => row?.cpi,
      sortable: true,
      // width: "75px",
    },
    {
      name: "Project Target",
      selector: (row) => row?.sample,
      sortable: true,
      // width: "100px",
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
      // width: "125px",
      conditionalCellStyles: [
        {
          when: (row) => row?.status === "completed",
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
          <div className="relative w-full overflow-y-visible">
            <div className="flex items-center overflow-visible">
              <button
                onClick={() => handleAddEditOperation(record, index)}
                className="border p-2 rounded-md mr-2 cursor-pointer"
              >
                <MdOutlineMoreVert />
              </button>
              {openDropdownIndex === index ? (
                <div
                  ref={buttonRef}
                  onClick={(e) => e.stopPropagation()}
                  className={`absolute z-50 ${
                    index <= 5 ? "opration_btn" : "opration_btn_bottom"
                  }`}
                >
                  <OpereationButton record={selectedRecord} />
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        );
      },
    },
  ];

  return columns;
};
