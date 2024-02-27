import React, { useEffect } from "react";
import DataTable from "react-data-table-component";
import { GetProjectData } from "../fetchApis/projects/getProjectData/GetProjectData.js";
import { useDispatch, useSelector } from "react-redux";
import { addFormData } from "../features/projectData/projectDataSlice";
import { MdModeEditOutline, MdDelete } from "react-icons/md";


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
    // {
    //   name: "Project Manager",
    //   selector: (row) => row.year,
    //   sortable: true,
    // },
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
      name: "Status",
      selector: (row) => row.year,
      sortable: true,
    },
    {
        name: "Edit",
        selector: (row) => row.edit,
        sortable: false,
      },
  ];

  const tableData = Formdata1.map((value) => value);
  const finalTableData = [tableData];
  const data1 = [];
  finalTableData.forEach((item) => {
    if (Array.isArray(item)) {
      item.forEach((obj) => {
        data1.push(obj);
      });
    } else {
      data1.push(item);
    }
  });
  const customStyles = {
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

  const data = data1.map((item, index) => ({
    id: index + 1,
    project_code: item.project_code,
    name: item.name,
    cpi: item.cpi,
    clients: item.clients,
    operation_select: item.operation_select,
    project_type: item.project_type,
    other_cost: item.other_cost,
    project_code: item.project_code,
    set_up_fee: item.set_up_fee,
    tentative_end_date: item.tentative_end_date,
    tentative_start_date: item.tentative_start_date.split("T")[0],
    tentative_end_date: item.tentative_end_date.split("T")[0],
    sample: item.sample,
    edit:<MdModeEditOutline
    className="cursor-pointer"
    onClick={() => handleEditField(index)}
  />
  }));
  
  return (
    <div className="w-full overflow-hidden">
      <DataTable
        columns={columns}
        data={data}
        pagination
        customStyles={customStyles}
      />
     </div>
  );
};

export default ProjectDataTable;
