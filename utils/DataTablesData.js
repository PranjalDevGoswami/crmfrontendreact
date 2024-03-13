import { MdOutlineMoreVert } from "react-icons/md";

export const Data =[
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
      name:'status',
      selector:(row) => row.status,
      sortable:true
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
 

  export  const Dummycolumns = [
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
    },
  ];

  export const DummyData = [
    {
            id: "",
            project_code: "",
            cpi: "",
            clients: "",
            operation_select: "",
            project_type: "",
            other_cost: "",
            set_up_fee: "",
            tentative_start_date: "",
            tentative_end_date: "",
            sample: "",
            name: "No data Found",
            status:""
          },
  ];

  export const customStyles = {
    rows: {
      style: {
        backgroundColor: "#fff", // override the row height
        textAlign: "center",
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

  export const editedColumns = [
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
      name: "CPI",
      selector: (row) => row.cpi,
      sortable: true,
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
    }
  ];

  