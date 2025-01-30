import { allManagerRolesRole } from "../../src/config/Role";
import ActionsButton from "../../src/project/projectCRUDOperations/ActionsButton";
import { MdDownload, MdFileDownloadOff, MdRemoveRedEye } from "react-icons/md";
import Tooltip from "../../src/components/Tooltip";
import { isFinanceDept } from "../../src/config/Departments";
import viewInvoice from "../../src/assets/invoice.png";
import viewCBR from "../..//src/assets/bill_requisition.png";

export const TableColumn = ({
  buttonRef,
  handleViewCpi,
  setShowSowList,
  setSowList,
  navigate,
  desabledRowData
}) => {

  const invoice_generated = desabledRowData.filter((item)=>item.status === "Invoice generated")

  const handleGetInvoice = (selectedRecord) => {
    console.log("🚀 ~ handleGetInvoice ~ selectedRecord:", selectedRecord);
    // e.preventDefault();
    // setIsInvoice(true);
    navigate("/view-cbr", { state: selectedRecord });
  };

  const columns = [
    {
      name: "Project Code",
      selector: (row) => row?.project_code?.toUpperCase(),
      sortable: true,
      width: "120px",
    },
    {
      name: "Project Name",
      selector: (row) => row?.name,
      sortable: true,
      width: "180px",
      overflow: "wrap !important",
      whiteSpace: "pre-wrap !important",
    },
    {
      name: "Project Type",
      selector: (row) => row?.project_type,
      sortable: true,
      width: "85px",
    },
    {
      name: "Client Name",
      selector: (row) => row?.clients,
      sortable: true,
      width: "120px",
    },
    {
      name: "Start Date",
      selector: (row) => row?.tentative_start_date,
      sortable: true,
      width: "110px",
    },
    {
      name: "End Date",
      selector: (row) => row?.tentative_end_date,
      sortable: true,
      width: "110px",
    },
    !allManagerRolesRole && {
      name: "UniMrkt PM",
      selector: (row) => row?.assigned_to?.name,
      sortable: true,
      width: "140px",
    },
    !isFinanceDept && {
      name: "Team Lead",
      selector: (row) => row?.project_assigned_to_teamlead,
      sortable: true,
      width: "140px",
    },
    {
      name: "Client PM",
      selector: (row) => row?.project_client_pm?.name,
      sortable: true,
      width: "130px",
    },
    isFinanceDept && {
      name: "Sample",
      selector: (row) => row?.sample,
      width: "120px",
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
    isFinanceDept && {
      name: "Addnl. Fee",
      selector: (row) => (
        <Tooltip text={"View Additional Fee"} className={"w-40"}>
          <MdRemoveRedEye
            onClick={() => handleViewAddnl(row)}
            className="cursor-pointer text-base"
          />
        </Tooltip>
      ),
      width: "120px",
    },
    isFinanceDept &&  {
      name: "View CBR",
      selector: (row) => (
        <Tooltip text={"View CBR"} className={"w-40"}>
          <img
            alt="CBR"
            src={viewCBR}
            className="w-4 h-4 cursor-pointer"
            onClick={() => {
              handleGetInvoice(row);
            }}
          />
        </Tooltip>
      ),
      width: "100px",
    },
    isFinanceDept && invoice_generated.length>0 && {
      name: "View Invoice",
      selector: (row) => (
        <Tooltip text={"View Invoice"} className={"w-40"}>
          <img
            alt="invoice"
            src={viewInvoice}
            className="w-4 h-4 cursor-pointer"
          />
        </Tooltip>
      ),
      width: "120px",
    },
    !isFinanceDept && {
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
      width: "110px",
    },
    !isFinanceDept && {
      name: "Progress",
      selector: (row) => {
        const progressPercentage =
          row?.sample && parseFloat(row?.sample) !== 0
            ? (parseFloat(row?.total_achievement || 0) /
                parseFloat(row?.sample)) *
              100
            : 0;

        return (
          <div className="w-full">
            <div className="relative w-full h-4 bg-gray-200 border border-gray-400 overflow-hidden">
              <div
                className="h-full"
                style={{
                  width: `${progressPercentage}%`,
                  background:
                    progressPercentage <= 100
                      ? `hsl(${60 + progressPercentage * 0.6}, 100%, 50%)`
                      : `hsl(${
                          120 - (progressPercentage - 100) * 1.2
                        }, 100%, 50%)`,
                  color: "#fff",
                  textAlign: "center",
                  padding: "5px 0",
                  borderRadius: "8px",
                  transition:
                    "width 0.5s ease-in-out, background 0.5s ease-in-out",
                  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                }}
              ></div>
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
    !isFinanceDept && {
      name: "Man Days",
      selector: (row) => row?.man_days,
      sortable: true,
      width:"100px"
    },
    {
      name: "Status",
      selector: (row) => row?.status,
      sortable: true,
      width: "125px",
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
      width: "100px",
    },
    {
      name: "Actions",
      key: "action",
      text: "Action",
      className: "action",
      align: "left",
      sortable: false,
      width: "80px",
      cell: (record, index) => {
        return (
          <ActionsButton record={record} index={index} buttonRef={buttonRef} />
        );
      },
    },
  ].filter(Boolean); // This removes all falsy values (false, null, undefined)

  return columns;
};
