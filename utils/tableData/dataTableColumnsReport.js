import { allManagerRolesRole } from "../../src/config/Role";
import ActionsButton from "../../src/project/projectCRUDOperations/ActionsButton";
import { MdDownload, MdFileDownloadOff, MdRemoveRedEye } from "react-icons/md";
import Tooltip from "../../src/components/Tooltip";
import { isFinanceDept } from "../../src/config/Departments";
import viewInvoice from "../../src/assets/invoice.png";
import viewCBR from "../..//src/assets/bill_requisition.png";

export const TableColumnReport = ({
  buttonRef,
  handleViewCpi,
  setShowSowList,
  setSowList,
  navigate,
  desabledRowData
}) => {

  const invoice_generated = desabledRowData.filter((item)=>item?.status === "Invoice generated")

  const handleGetInvoice = (selectedRecord) => {
    // e.preventDefault();
    // setIsInvoice(true);
    navigate("/view-cbr", { state: selectedRecord });
  };
  const handleViewAddnl = () =>{console.log("");
  }
  const columns = [
    {
      name: "Project Code",
      selector: (row) => row?.project_code?.toUpperCase(),
      sortable: true,
      width: "120px",
      rowspan:"2",
      reorder: true,
    },
    {
      name: "Project Name",
      selector: (row) => row?.name,
      sortable: true,
      width: "180px",
      overflow: "wrap !important",
      whiteSpace: "pre-wrap !important",
      reorder: true,
    },
    {
      name: "Project Type",
      selector: (row) => row?.project_type,
      sortable: true,
      width: "85px",
      reorder: true,
    },
    {
      name: "Client Name",
      selector: (row) => row?.clients,
      sortable: true,
      width: "120px",
      reorder: true,
    },
    {
      name: "Sales Executive",
      selector: (row) => row?.created_by.name,
      sortable: true,
      width: "130px",
      reorder: true,
    },
    {
      name: "Month",
      selector: (row) => new Date(row?.created_at).toLocaleString('default', { month: 'long' }),
      sortable: true,
      width: "110px",
      reorder: true,
    },
    
    {
      name: "Week Of",
      selector: (row) => {
        const date = new Date(row?.created_at);
        const startOfWeek = date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1);
        const month = date.getMonth()+1;
        const year = date.getFullYear();
        
        return `${startOfWeek}-${month}-${year}`;
    },
      sortable: true,
      width: "110px",
      reorder: true,
    },
    {
      name: "Initial Sample",
      selector: (row) => row?.initial_sample_size,
      width: "80px",
      reorder: true,
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
      reorder: true,
    },
    {
      name: "Addnl. Fee",
      selector: (row) => (
        <Tooltip text={"View Additional Fee"} className={"w-40"}>
          <MdRemoveRedEye
            onClick={(handleViewAddnl)}
            className="cursor-pointer text-base"
          />
        </Tooltip>
      ),
      width: "80px",
      reorder: true,
    },
    {
      name: "Project Value",
      selector: (row) => {
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            trailingZeroDisplay: 'stripIfInteger'  
        });
        const result = formatter.format(Number(row.initial_sample_size || 0) * Number(row.cpi || 0));
        return result;
    },
      width: "100px",
      reorder: true,
    },
     {
      name: "UniMrkt PM",
      selector: (row) => row?.assigned_to?.name,
      sortable: true,
      width: "130px",
      reorder: true,
    },
    {
      name: "Act. Start Date",
      selector: (row) => row?.project_actual_start_date?.split("T")[0],
      sortable: true,
      width: "130px",
      reorder: true,
    },
    {
      name: "Act. End Date",
      selector: (row) => row?.project_actual_end_date?.split("T")[0],
      sortable: true,
      width: "130px",
      reorder: true,
    },
    {
      name: "Revised Sample",
      selector: (row) => row?.sample,
      width: "80px",
      reorder: true,
    },
    {
      name: "Sample Achieved",
      selector: (row) => row?.total_achievement,
      width: "80px",
      reorder: true,
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
      reorder: true,
    },
    {
      name: "Addnl. Fee",
      selector: (row) => (
        <Tooltip text={"View Additional Fee"} className={"w-40"}>
          <MdRemoveRedEye
            onClick={() => handleViewAddnl(row)}
            className="cursor-pointer text-base"
          />
        </Tooltip>
      ),
      width: "80px",
      reorder: true,
    },
    {
      name: "Actual Value",
      selector: (row) => {
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            trailingZeroDisplay: 'stripIfInteger'  
        });
        const result = formatter.format(Number(row.total_achievement || 0) * Number(row.cpi || 0));
        return result;
    },
      width: "100px",
      reorder: true,
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
      width: "80px",
      reorder: true,
    },
    {
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
      reorder: true,
    },
    {
      name: "Man Days",
      selector: (row) => row?.man_days,
      sortable: true,
      reorder: true,
    },
    {
      name: "Status",
      selector: (row) => row?.status,
      sortable: true,
      width: "125px",
      reorder: true,
    },
    {
      name: "View ABR/CBR/Invoice",
      selector: (row) => {
        if (row.status === "CBR Raised") {
          return (
            <Tooltip text={"View CBR"} className={"w-40"}>
              <img
                alt="CBR"
                src={viewCBR}
                className="w-4 h-4 cursor-pointer"
                onClick={() => handleGetInvoice(row)}
              />
            </Tooltip>
          );
        }else if (row.status === "CBR Raised" || row.status === "CBR Raised"){
          return (<>
            <Tooltip text={"View CBR"} className={"w-40"}>
              <img
                alt="ABR"
                src={viewCBR}
                className="w-4 h-4 cursor-pointer"
                onClick={() => handleGetInvoice(row)}
              />
            </Tooltip>
             <Tooltip text={"View CBR"} className={"w-40"}>
             <img
               alt="CBR"
               src={viewCBR}
               className="w-4 h-4 cursor-pointer"
               onClick={() => handleGetInvoice(row)}
             />
           </Tooltip></>
          );
        }else if(row.status === "CBR Raised" || row.status === "CBR Raised" || row.status === "CBR Raised"){
          return (
            <>
            <Tooltip text={"View CBR"} className={"w-40"}>
              <img
                alt="ABR"
                src={viewCBR}
                className="w-4 h-4 cursor-pointer"
                onClick={() => handleGetInvoice(row)}
              />
            </Tooltip>
             <Tooltip text={"View CBR"} className={"w-40"}>
             <img
               alt="CBR"
               src={viewCBR}
               className="w-4 h-4 cursor-pointer"
               onClick={() => handleGetInvoice(row)}
             />
             
           </Tooltip>
           <Tooltip text={"View CBR"} className={"w-40"}>
             <img
               alt="CBR"
               src={viewCBR}
               className="w-4 h-4 cursor-pointer"
               onClick={() => handleGetInvoice(row)}
             />
             
           </Tooltip>
           </>
          );
        }
        return null; // Ensure a valid return
      },

      width: "140px",
      reorder: true,
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
      reorder: true,
    },
    // {
    //   name: "Actions",
    //   key: "action",
    //   text: "Action",
    //   className: "action",
    //   align: "left",
    //   sortable: false,
    //   width: "60px",
    //   cell: (record, index) => {
    //     return (
    //       <ActionsButton record={record} index={index} buttonRef={buttonRef} />
    //     );
    //   },
    // },
  ].filter(Boolean); // This removes all falsy values (false, null, undefined)

  return columns;
};
