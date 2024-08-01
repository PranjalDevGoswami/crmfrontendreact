import { MdOutlineMoreVert } from "react-icons/md";

export const Data = [
  {
    name: "Sr.No.",
    selector: (row) => row.id,
    sortable: true,
  },
  {
    name: "Project Code",
    selector: (row) => row.project_code,
    sortable: true,
  },
  {
    name: "Client Name",
    selector: (row) => row.clients,
    sortable: true,
  },
  {
    name: "Project Name",
    selector: (row) => row.name,
    sortable: true,
  },
  {
    name: "Type",
    selector: (row) => row.project_type,
    sortable: true,
  },
  {
    name: "Start Date",
    selector: (row) => row.tentative_start_date,
    sortable: true,
  },
  {
    name: "End Date",
    selector: (row) => row.tentative_end_date,
    sortable: true,
  },
  {
    name: "CPI",
    selector: (row) => row.cpi,
    sortable: true,
  },
  {
    name: "Project Target",
    selector: (row) => row.sample,
    sortable: true,
  },
  {
    name: "Achieved Target",
    selector: (row) => row.total_achievement,
    sortable: true,
  },
  {
    name: "Remaining Target",
    selector: (row) => row.remaining_interview,
    sortable: true,
  },
  {
    name: "T. Man Days",
    selector: (row) => row.man_days,
    sortable: true,
  },
  {
    name: "status",
    selector: (row) => row.status,
    sortable: true,
    right: true,
  },
  {
    name: "Actions",
    key: "action",
    text: "Action",
    className: "action",
    width: 100,
    align: "left",
    sortable: false,
    cell: (record) => {
      return (
        <div className="relative w-full">
          <div className="flex items-center">
            <button
              onClick={() => handleViewField(record)}
              className="border p-2 rounded-md mr-2 cursor-pointer"
            >
              <MdOutlineMoreVert />
            </button>
            {isOperationPerson ? (
              <button
                className="relative"
                onClick={() => {
                  HandleOnEdit(record);
                }}
              >
                <MdEdit className="font-bold text-xl" />
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
      );
    },
  },
];

export const Dummycolumns = [
  {
    name: "Project Code",
    selector: (row) => row.project_code,
    sortable: true,
  },
  {
    name: "Client Name",
    selector: (row) => row.clients,
    sortable: true,
  },
  {
    name: "Project Name",
    selector: (row) => row.name,
    sortable: true,
  },
  {
    name: "Type",
    selector: (row) => row.project_type,
    sortable: true,
  },
  {
    name: "Start Date",
    selector: (row) => row.tentative_start_date,
    sortable: true,
  },
  {
    name: "End Date",
    selector: (row) => row.tentative_end_date,
    sortable: true,
  },
  {
    name: "CPI",
    selector: (row) => row.cpi,
    sortable: true,
  },
  {
    name: "Project Target",
    selector: (row) => row.sample,
    sortable: true,
  },
  {
    name: "Achieved Target",
    selector: (row) => row.achiev_Target,
    sortable: true,
  },
  {
    name: "Remaining Target",
    selector: (row) => row.Remaining_Target,
    sortable: true,
  },
  {
    name: "T. Man Days",
    selector: (row) => row.mandays,
    sortable: true,
  },
  {
    name: "Actions",
    key: "action",
    text: "Action",
    className: "action",
    width: 100,
    align: "left",
    sortable: false,
    // cell: (record, index) => {
    //   return (
    //     <div className="relative w-full">
    //       <div className="flex items-center">
    //         <button
    //           // onClick={() => handleAddEditOperation(record, index)}
    //           className="border p-2 rounded-md mr-2 cursor-pointer"
    //         >
    //           edit
    //         </button>
    //         {/* {isOperationPerson && openDropdownIndex === index ? (
    //             <OpereationButton record={record} />
    //           ) : (
    //             ""
    //           )} */}
    //       </div>
    //     </div>
    //   );
    // },
  },
];

export const DummyData = [
  {
    id: "1",
    project_code: "dummyCode",
    cpi: "dummycpi",
    clients: "",
    operation_select: "",
    project_type: "",
    other_cost: "",
    set_up_fee: "",
    tentative_start_date: "",
    tentative_end_date: "",
    sample: "",
    name: "No data Found",
    status: "dummy",
  },
];

export const customStyles = {
  rows: {
    style: {
      backgroundColor: "rgb(229 231 235 / var(--tw-bg-opacity))", // override the row height
      textAlign: "center",
      position: "relative",
    },
  },
  rows: {
    highlightOnHoverStyle: {
      backgroundColor: "rgb(229 231 235 / var(--tw-bg-opacity))",
      borderBottomColor: "#FFFFFF",
      borderRadius: "25px",
      outline: "1px solid #FFFFFF",
    },
  },
  headCells: {
    style: {
      color: "#fff",
      backgroundColor: "#bd1d1d",
      // backgroundColor: "red",
      fontSize: "14px",
      textAlign: "center",
      whiteSpace: "pre-wrap",
      wordWrap: "break-word",
    },
  },
  cells: {
    style: {
      paddingLeft: "20px", // override the cell padding for data cells
      paddingRight: "20px",
      textAlign: "center",
    },
    stripedStyle: {
      color: "NORMALCOLOR",
      backgroundColor: "NORMALCOLOR",
    },
  },
  // pagination: {
  //   style: {
  //     color: "#000",
  //     backgroundColor: "rgb(229 231 235 / var(--tw-bg-opacity))",
  //     borderBottom: "none",
  //   },
  // },
  // header: {
  //   style: {
  //     color: "#000",
  //     backgroundColor: "#e5e7eb",
  //     borderBottom: "none",
  //   },
  // },
};
export const customStylesDarkMode = {
  header: {
    style: {
      color: "#fff",
      backgroundColor: "#000",
      borderBottom: "1px solid",
    },
  },
  pagination: {
    style: {
      color: "#fff",
      borderColor: "white",
      backgroundColor: "#000",
      borderBottom: "none",
    },
  },
  rows: {
    style: {
      backgroundColor: "#000", // override the row height
      textAlign: "center",
      position: "relative",
      text: "#fff",
      color: "#fff",
    },
  },
  rows: {
    highlightOnHoverStyle: {
      // backgroundColor: "rgb(230, 244, 244)",
      borderBottomColor: "#FFFFFF",
      borderRadius: "25px",
      outline: "1px solid #FFFFFF",
      backgroundColor: "#000",
    },
  },
  headCells: {
    style: {
      color: "#fff",
      // backgroundColor: "#bd1d1d",
      backgroundColor: "#000",
      fontSize: "14px",
      textAlign: "center",
      whiteSpace: "pre-wrap",
      wordWrap: "break-word",
      borderColor: "red",
      backgroundColor: "#000",
    },
  },
  cells: {
    style: {
      paddingLeft: "20px", // override the cell padding for data cells
      paddingRight: "20px",
      textAlign: "center",
      backgroundColor: "#000",
      color: "#fff",
    },
    stripedStyle: {
      color: "NORMALCOLOR",
      backgroundColor: "#fff",
    },
  },
};

export const customStylesFormanDaysDetails = {
  table: {
    style: {
      minHeight: "400px",
    },
  },
  rows: {
    style: {
      backgroundColor: "#fff", // override the row height
      textAlign: "center",
      position: "relative",
    },
  },
  rows: {
    highlightOnHoverStyle: {
      backgroundColor: "rgb(230, 244, 244)",
      borderBottomColor: "#FFFFFF",
      borderRadius: "25px",
      outline: "1px solid #FFFFFF",
    },
  },
  headCells: {
    style: {
      color: "#fff",
      backgroundColor: "#bd1d1d",
      fontSize: "14px",
      textAlign: "center",
      whiteSpace: "pre-wrap",
      wordWrap: "break-word",
    },
  },
  cells: {
    style: {
      paddingLeft: "20px", // override the cell padding for data cells
      paddingRight: "20px",
      textAlign: "center",
    },
    stripedStyle: {
      color: "NORMALCOLOR",
      backgroundColor: "NORMALCOLOR",
    },
  },
};

export const customStylesFormanDaysDetailsDarkMode = {
  header: {
    style: {
      color: "#fff",
      backgroundColor: "#000",
      border: "1px solid",
    },
  },
  pagination: {
    style: {
      color: "#fff",
      borderColor: "white",
      backgroundColor: "#000",
      border: "1px solid",
    },
  },
  rows: {
    style: {
      backgroundColor: "#000", // override the row height
      textAlign: "center",
      position: "relative",
      text: "#fff",
      color: "#fff",
    },
  },
  rows: {
    highlightOnHoverStyle: {
      // backgroundColor: "rgb(230, 244, 244)",
      borderBottomColor: "#FFFFFF",
      borderRadius: "25px",
      outline: "1px solid #FFFFFF",
      backgroundColor: "#000",
    },
  },
  headCells: {
    style: {
      color: "#fff",
      // backgroundColor: "#bd1d1d",
      backgroundColor: "#000",
      fontSize: "14px",
      textAlign: "center",
      whiteSpace: "pre-wrap",
      wordWrap: "break-word",
      borderColor: "red",
      backgroundColor: "#000",
    },
  },
  cells: {
    style: {
      paddingLeft: "20px", // override the cell padding for data cells
      paddingRight: "20px",
      textAlign: "center",
      backgroundColor: "#000",
      color: "#fff",
    },
    stripedStyle: {
      color: "NORMALCOLOR",
      backgroundColor: "#fff",
    },
  },
};

export const editedColumns = [
  // {
  //   name: "Sr.No.",
  //   selector: (row) => row.id,
  //   sortable: true,
  //   width: "90px",
  // },
  {
    name: "Project Code",
    selector: (row) => row.project_code?.toUpperCase(),
    sortable: true,
  },
  {
    name: "Client Name",
    selector: (row) => row.clients,
    sortable: true,
  },
  {
    name: "Project Name",
    selector: (row) => row.name,
    sortable: true,
    width: "auto",
  },
  {
    name: "Sample",
    selector: (row) => row.sample,
    sortable: true,
    width: "100px",
  },
  {
    name: "Remaining Target",
    selector: (row) => row.remaining_interview,
    sortable: true,
    width: "150px",
  },
  {
    name: "Achieved Target",
    selector: (row) => row.total_achievement,
    sortable: true,
  },
  {
    name: "T. Man Days",
    selector: (row) => row.man_days,
    sortable: true,
  },
  {
    name: "status",
    selector: (row) => row.status,
    sortable: true,
    width: "200px",
  },
];

export const AssignColumns = [
  {
    name: "Project Code",
    selector: (row) => row.project_code?.toUpperCase(),
    sortable: true,
    // width: "200px",
  },
  {
    name: "Client Name",
    selector: (row) => row.clients,
    sortable: true,
    // width: "200px",
  },
  {
    name: "Project Name",
    selector: (row) => row.name,
    sortable: true,
    // width: "400px",
  },

  {
    name: "Assign To",
    selector: (row) => row.assigned,
    sortable: true,
    // width: "260px",
  },
];
const currentDate = new Date().toISOString().split("T")[0];

export const conditionalRowStyles = [
  {
    when: (row) => row.status === "cbr_raised",
    style: {
      backgroundColor: "rgb(128,128,128,1)",
      color: "white",
      "&:hover": {
        cursor: "not-allowed",
      },
    },
  },
];

export const conditionalRowStylesForTL = [
  {
    when: (row) => row?.assigned?.props?.children == "",
    style: {
      backgroundColor: "rgb(128,128,128,1)",
      color: "white",
      "&:hover": {
        cursor: "not-allowed",
      },
    },
  },
];
