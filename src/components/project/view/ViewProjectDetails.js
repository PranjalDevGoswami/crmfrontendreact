import React from 'react'
import DataTable from "react-data-table-component";

const ViewProjectDetails = ({viewRecordData}) => {
    const columns = [
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
    ]
// const data =[
//     {
//         id: "1",
//         project_code: "project001",
//         name: "Demo",
//         cpi: "300",
//         clients: "clients",
//         project_type: "project_type",
//         other_cost: "200",
//         project_code: "project001",
//         set_up_fee: "200",
//         tentative_end_date: "2024/02/28",
//         tentative_start_date: "2024/02/28",
//         tentative_end_date: "2024/04/28",
//         sample: "1000",
//         mandays: "20",
//         achiev_Target: "200",
//         Remaining_Target: "100",
//       },
// ]

  return (
    <DataTable columns={columns} data={viewRecordData} />
  )
}

export default ViewProjectDetails
