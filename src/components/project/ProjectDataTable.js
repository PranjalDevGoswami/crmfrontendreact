import React, { useEffect } from "react";
import DataTable from "react-data-table-component";
import { GetProjectData } from "../fetchApis/projects/getProjectData/GetProjectData.js";
import { useDispatch, useSelector } from "react-redux";
import { addFormData } from "../features/projectData/projectDataSlice";

const ProjectDataTable = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const fetchDataFromApi2 = await GetProjectData();
        const projectDataObject = fetchDataFromApi2.map((val) => {
          return val;
        });
        dispatch(addFormData(projectDataObject));
      } catch (error) {
        console.error("Error fetching project data:", error);
      }
    };
    fetchProjectData();
  }, []);

  const Formdata1 = useSelector((store) => store.FormData.items);

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
      name: "Project Target",
      selector: (row) => row.sample,
      sortable: true,
    },
    {
        name: "Project Manager",
        selector: (row) => row.year,
        sortable: true,
      },
    {
      name: "Achieved Target",
      selector: (row) => row.year,
      sortable: true,
    },
    {
      name: "Remaining Target",
      selector: (row) => row.year,
      sortable: true,
    },
    {
      name: "CPI",
      selector: (row) => row.cpi,
      sortable: true,
    },
    {
      name: "SOW Costing",
      selector: (row) => row.year,
      sortable: true,
    },
    {
      name: "Actual Costing",
      selector: (row) => row.year,
      sortable: true,
    },
    {
        name: "Status",
        selector: (row) => row.year,
        sortable: true,
      },
  ];
//  {Formdata1.map((value, index) => {
//     console.log('table',value);
//  })}
//     <td>{index + 1}</td>
//     <td>{value.project_code}</td>
//     <td>{value.clients}</td>
//     <td>{value.name}</td>
//     <td>{value.project_type}</td>
//     <td className="ml-4">{SatrtdatePart}</td>
//     <td>{EnddatePart}</td>
//     <td>in Process..</td>
//     <td>{value.other_cost}</td>
//     <td>800</td>
//     <td>200</td>
//     <td>{value.cpi}</td>
//     <td>200</td>
//     <td>hold</td>
//     <td>{totalMandays}</td>
//     <td>{value.project_manager}</td>
//     <td>
//  })
const tableData = Formdata1.map(value => value)
const finalTableData = [tableData
    // {
    //     id: 1,
    //     title: "Beetlejuice",
    //     year: "1988",
    // },
    // {
    //     id: 2,
    //     title: "Ghostbusters",
    //     year: "1984",
    // },
];
const data1 =[]
finalTableData.forEach(item => {
    // If the item is an array, flatten it and push each object to the new array
    if (Array.isArray(item)) {
        item.forEach(obj => {
            data1.push(obj);
        });
    } else {
        data1.push(item); // If it's already an object, just push it to the new array
    }
});
// const {id,clients} = data1
// const TrimDate = data1.map((item,index) => ({
// const ttStartDateTimeString = item.tentative_start_date;
//             const ttEndDateTimeString = item.tentative_end_date;
//             const SatrtdatePart = ttStartDateTimeString.split("T")[0];
//             const EnddatePart = ttEndDateTimeString.split("T")[0];
// }))
const data = data1.map((item,index) => ({
    
    id: index+1,
    project_code:item.project_code,
    name: item.name,
    cpi: item.cpi,
    clients:item.clients,
    operation_select: item.operation_select,
    project_type: item.project_type,
    other_cost: item.other_cost,
    project_code: item.project_code,
    set_up_fee: item.set_up_fee,
    tentative_end_date: item.tentative_end_date,
    tentative_start_date: item.tentative_start_date,
    tentative_start_date:item.tentative_start_date,
    tentative_end_date:item.tentative_end_date,
    sample:item.sample
  }));
// console.log('data',data);
//  })}


  

  return <DataTable columns={columns} data={data} />;
};

export default ProjectDataTable;
