import { MdDownload, MdFileDownloadOff, MdRemoveRedEye } from "react-icons/md";
import viewInvoice from "../../../src/assets/invoice.png";
import viewCBR from "../../../src/assets/bill_requisition.png";
import { createColumnHelper } from "@tanstack/react-table";
import Tooltip from "../../components/Tooltip";
import { isFinanceDept } from "../../config/Departments";
import { useDispatch } from "react-redux";
import {
  addMultipleSample,
  toggleViewMultipleCpiSample,
} from "../../../utils/slices/addMutipleSampleCpiSlice";
import {
  setAddlnFee,
  setSelectedRecord,
  setSowList,
  toggleShowAddlnFee,
  toggleShowSowList,
  toggleViewCbr,
} from "../../../utils/slices/dataTableSlice";

const columnHelper = createColumnHelper();

const ProjectReportColumn = () => {
  const dispatch = useDispatch();

  const handleViewCpi = (row) => {
    dispatch(addMultipleSample(row));
    dispatch(toggleViewMultipleCpiSample(true));
  };
  const handleViewAddnl = (row) => {
    dispatch(setAddlnFee(row));
    dispatch(toggleShowAddlnFee());
  };

  const handleViewSow = (data) => {
    dispatch(toggleShowSowList());
    dispatch(setSowList(data));
  };
  const handleGetInvoice = () => {};

  return [
    columnHelper.group({
      id: "##",
      header: () => <span className="text-center flex justify-center"></span>,
      columns: [
        columnHelper.accessor("project_code", {
          id: "project_code",
          header: "Project Code",
          cell: (info) => {
            return (
              <span className="text-right flex justify-end">
                {info.getValue()?.toUpperCase()}
              </span>
            );
          },
        }),
        columnHelper.accessor("name", {
          id: "project_name",
          header: "Project Name",
          cell: (info) => {
            return (
              <span className="text-left flex justify-start">
                {info.getValue()}
              </span>
            );
          },
        }),
        columnHelper.accessor("project_type", {
          id: "project_type",
          header: "Project Type",
          cell: (info) => {
            return (
              <span className="text-left flex justify-start">
                {info.getValue()}
              </span>
            );
          },
        }),
        columnHelper.accessor("clients", {
          id: "client_name",
          header: "Client Name",
          cell: (info) => {
            return (
              <span className="text-left flex justify-start">
                {info.getValue()}
              </span>
            );
          },
        }),
      ],
    }),
    columnHelper.group({
      id: "Sales Data",
      header: () => (
        <span className="text-center flex justify-center">Sales Data</span>
      ),
      columns: [
        columnHelper.accessor("sales_head", {
          id: "sales_head",
          header: "Sales Head",
          cell: (info) => {
            return (
              <span className="text-left flex justify-start">
                {info.getValue()}
              </span>
            );
          },
        }),
        columnHelper.accessor("created_by.name", {
          id: "sales_executive",
          header: "Sales Executive",
          cell: (info) => info.getValue(),
        }),
        columnHelper.accessor("created_at", {
          id: "month",
          header: "Month",
          cell: (info) =>
            new Date(info.getValue()).toLocaleString("default", {
              month: "long",
            }),
        }),
        columnHelper.accessor("created_at", {
          id: "week_of",
          header: "Week Of",
          cell: (info) => {
            const date = new Date(info.getValue());
            const startOfWeek =
              date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1);
            const month = date.getMonth() + 1;
            const year = date.getFullYear();
            return `${startOfWeek}-${month}-${year}`;
          },
        }),
        columnHelper.accessor("initial_sample_size", {
          id: "initial_sample",
          header: "Initial Sample",
          cell: (info) => {
            return (
              <span className="text-right flex justify-end">
                {info.getValue()}
              </span>
            );
          },
        }),
        columnHelper.accessor("cpi", {
          id: "cpi",
          header: "CPI",
          cell: (info) => {
            const value = info.getValue();
            return value == 0 ? (
              <div className="flex justify-center">
              <Tooltip text={"View Multiple CPI"} className={"w-40"}>
                <button
                  onClick={() => handleViewCpi(info.row.original)}
                  className="cursor-pointer text-lg text-blue-600 hover:text-blue-800 text-center"
                >
                  <MdRemoveRedEye />
                </button>
              </Tooltip>
              </div>
            ) : (
              <span className="text-right flex justify-end">{value}</span>
            );
          },
        }),

        columnHelper.accessor("project_type", {
          id: "addnl_fee",
          header: "Addnl. Fee",
          cell: ({ row }) => {
            const rowData = row.original;
            if (
              (Number(rowData?.set_up_fee) || 0) > 0 ||
              (Number(rowData?.transaction_fee) || 0) > 0 ||
              (Number(rowData?.other_cost) || 0) > 0
            ) {
              return (
                <div className="relative flex items-center justify-center">
                  <Tooltip text="View Additional Fee" className="w-40">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleViewAddnl(rowData);
                      }}
                      className="cursor-pointer text-lg text-blue-600 hover:text-blue-800"
                    >
                      <MdRemoveRedEye />
                    </button>
                  </Tooltip>
                </div>
              );
            }
            return null;
          },
        }),
        // { cell: ({row}) => <div onClick={() => openAction('View', row.original)} title={row.original.desc}>{row.original.name}</div>, accessorKey: 'name', minSize: 200, header: 'Name', enableMultiSort: true }

        columnHelper.accessor("total_achievement", {
          id: "project_value",
          header: "Project Value",
          cell: (info) => {
            const row = info.row.original;
            const formatter = new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
              trailingZeroDisplay: "stripIfInteger",
            });

            const result =
              row?.project_samples?.length > 1
                ? formatter.format(
                    row.project_samples.reduce(
                      (acc, item) =>
                        acc + Number(item.sample) * Number(item.cpi),
                      0
                    )
                  )
                : formatter.format(
                    Number(row.initial_sample_size || 0) * Number(row.cpi || 0)
                  );

            return (
              <span className="text-right flex justify-end">{result}</span>
            );
          },
        }),
      ],
    }),
    columnHelper.group({
      id: "Operation Data",
      header: () => (
        <span className="text-center flex justify-center">Operation Data</span>
      ),
      columns: [
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
        }),
        columnHelper.accessor("project_actual_start_date", {
          id: "actual_start_date",
          header: "Act. Start Date",
          cell: (info) => info.getValue()?.split("T")[0],
        }),
        columnHelper.accessor("project_actual_end_date", {
          id: "actual_end_date",
          header: "Act. End Date",
          cell: (info) => info.getValue()?.split("T")[0],
        }),
        columnHelper.accessor("sample", {
          id: "revised_sample",
          header: "Revised Sample",
          cell: (info) => {
            return (
              <span className="text-right flex justify-end">
                {info.getValue()}
              </span>
            );
          },
        }),
        columnHelper.accessor("total_achievement", {
          id: "sample_achieved",
          header: "Sample Achieved",
          cell: (info) => {
            return (
              <span className="text-right flex justify-end">
                {info.getValue()}
              </span>
            );
          },
        }),
        columnHelper.accessor("cpi", {
          id: "cpi1",
          header: "CPI",
          cell: (info) => {
            const value = info.getValue();
            return value == 0 ? (
              <div className="flex justify-center">
              <Tooltip text={"View Multiple CPI"} className={"w-40"}>
                <button
                  onClick={() => handleViewCpi(info.row.original)}
                  className="cursor-pointer text-lg text-blue-600 hover:text-blue-800"
                >
                  <MdRemoveRedEye />
                </button>
              </Tooltip>
              </div>
            ) : (
              <span className="text-right flex justify-end">{value}</span>
            );
          },
        }),
        columnHelper.accessor("set_up_fee", {
          id: "addnl_fee1",
          header: "Addnl. Fee",
          cell: (info) => {
            const row = info.row.original;
            if (
              (Number(row?.set_up_fee) || 0) > 0 ||
              (Number(row?.transaction_fee) || 0) > 0 ||
              (Number(row?.other_cost) || 0) > 0
            ) {
              return (
              <div className="flex justify-center">
                <Tooltip text={"View Additional Fee"} className={"w-40"}>
                  <button
                    onClick={() => handleViewAddnl(info.row.original)}
                    className="cursor-pointer text-lg text-blue-600 hover:text-blue-800"
                  >
                    <MdRemoveRedEye />
                  </button>
                </Tooltip>
                </div>
              );
            }
            return null;
          },
        }),
        columnHelper.accessor("total_achievement", {
          id: "total_achievement1",
          header: "Actual Value",
          cell: (info) => {
            const row = info.row.original;
            const formatter = new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
              trailingZeroDisplay: "stripIfInteger",
            });

            const result =
              row?.project_samples?.length > 1
                ? (() => {
                    const cpiAvg =
                      row.project_samples.reduce(
                        (acc, item) => acc + Number(item.cpi),
                        0
                      ) / row.project_samples.length;

                    const totalCost =
                      Number(row?.transaction_fee || 0) +
                      Number(row?.set_up_fee || 0) +
                      Number(row?.other_cost || 0);

                    return formatter.format(
                      <span className="right flex justify-end">
                        {row.total_achievement * cpiAvg + totalCost}
                      </span>
                    );
                  })()
                : formatter.format(
                    Number(row.total_achievement || 0) * Number(row.cpi || 0) +
                      Number(row?.transaction_fee || 0) +
                      Number(row?.set_up_fee || 0) +
                      Number(row?.other_cost || 0)
                  );
            return (
              <span className="text-right flex justify-end">{result}</span>
            );
          },
        }),
        columnHelper.accessor("invoice_generated", {
          id: "invoice_generated",
          header: "View Invoice",

          cell: (info) => {
            return (
              isFinanceDept &&
              info.row.original?.invoice_generated?.length > 0 && (
              <div className="flex justify-center">
                <Tooltip text={"View Invoice"} className={"w-40"}>
                  <img
                    alt="invoice"
                    src={viewInvoice}
                    className="w-4 h-4 cursor-pointer"
                  />
                </Tooltip>
                </div>
              )
            );
          },
        }),
        columnHelper.accessor("Progress", {
          id: "Progress",
          header: "Progress",

          cell: (info) => {
            const progressPercentage =
              info.row.original?.sample &&
              parseFloat(info.row.original?.sample) !== 0
                ? (parseFloat(info.row.original?.total_achievement || 0) /
                    parseFloat(info.row.original?.sample)) *
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
        }),
      ],
    }),
    columnHelper.group({
      id: "#",
      header: () => <span className="text-center flex justify-center"></span>,
      columns: [
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
          meta: {
            filterVariant: "select",
          },
        }),
        columnHelper.accessor("View ABR/CBR/Invoice", {
          id: "View ABR/CBR/Invoice",
          header: "View ABR/CBR/Invoice",
          cell: (info) => {
            if (info.row.original.status === "CBR Raised") {
              return (
              <div className="flex justify-center">
                <Tooltip text={"View CBR"} className={"w-40"}>
                  <button
                    onClick={() => {
                      dispatch(setSelectedRecord(info.row.original)),
                        dispatch(toggleViewCbr());
                    }}
                    // dispatch(setSelectedRecord(record));

                    className="cursor-pointer text-lg text-blue-600 hover:text-blue-800"
                  >
                    <img alt="CBR" src={viewCBR} className="text-xs w-4 h-4" />
                  </button>
                </Tooltip>
                </div>
              );
            } else if (
              info.row.original.status === "CBR Raised" ||
              info.row.original.status === "CBR Raised"
            ) {
              return (
              <div className="flex justify-center">
                  <Tooltip text={"View CBR"} className={"w-40"}>
                    <button
                      onClick={() => handleGetInvoice(info.row.original)}
                      className="cursor-pointer text-lg text-blue-600 hover:text-blue-800"
                    >
                      <img
                        alt="CBR"
                        src={viewCBR}
                        className="text-xs w-4 h-4"
                      />
                    </button>
                  </Tooltip>
                  <Tooltip text={"View CBR"} className={"w-40"}>
                    <button
                      onClick={() => handleGetInvoice(info.row.original)}
                      className="cursor-pointer text-lg text-blue-600 hover:text-blue-800"
                    >
                      <img
                        alt="CBR"
                        src={viewCBR}
                        className="text-xs w-4 h-4"
                      />
                    </button>
                  </Tooltip>
                </div>
              );
            } else if (
              info.row.original.status === "CBR Raised" ||
              info.row.original.status === "CBR Raised" ||
              info.row.original.status === "CBR Raised"
            ) {
              return (
                <div className="flex justify-center">
                  <Tooltip text={"View CBR"} className={"w-40"}>
                    <button
                      onClick={() => {
                        dispatch(toggleViewCbr());
                      }}
                      className="cursor-pointer text-lg text-blue-600 hover:text-blue-800"
                    >
                      <img
                        alt="CBR"
                        src={viewCBR}
                        className="text-xs w-4 h-4"
                      />
                    </button>
                  </Tooltip>
                  <Tooltip text={"View CBR"} className={"w-40"}>
                    <button
                      onClick={() => {
                        dispatch(toggleViewCbr());
                      }}
                      className="cursor-pointer text-lg text-blue-600 hover:text-blue-800"
                    >
                      <img
                        alt="CBR"
                        src={viewCBR}
                        className="text-xs w-4 h-4"
                      />
                    </button>
                  </Tooltip>
                  <Tooltip text={"View CBR"} className={"w-40"}>
                    <button
                      onClick={() => {
                        dispatch(toggleViewCbr());
                      }}
                      className="cursor-pointer text-lg text-blue-600 hover:text-blue-800"
                    >
                      <img
                        alt="CBR"
                        src={viewCBR}
                        className="text-xs w-4 h-4"
                      />
                    </button>
                  </Tooltip>
                </div>
              );
            }
            return null;
          },
          meta: {
            filterVariant: "",
          },
        }),
        columnHelper.accessor("sow", {
          id: "sow",
          header: "SOW",
          cell: (info) =>
            info.row.original?.documents?.length > 0 ? (
              <div className="flex justify-center text-blue-600 cursor-pointer text-base">
                <Tooltip text={"Download SOW"} className={"w-32"}>
                  <button
                    onClick={() => handleViewSow(info.row.original)}
                    className="cursor-pointer text-lg text-blue-600 hover:text-blue-800"
                  >
                    <MdRemoveRedEye />
                  </button>
                </Tooltip>
                </div>
            ) : (
              <p className="text-base">
                <MdFileDownloadOff />
              </p>
            ),
        }),
      ],
    }),
  ];
};

export default ProjectReportColumn;
