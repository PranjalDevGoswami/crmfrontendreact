import { useContext, useEffect, useState } from "react";
import { FilterContext } from "../../src/ContextApi/FilterContext";

export const Data = () => {
  const role = localStorage.getItem("role");
  const isDirectorRole = role === "Director";
  const isHodRole = role === "HOD";
  const { searchTerm, filteredProjectData } = useContext(FilterContext);
  const [projectData, setProjectData] = useState([]);

  useEffect(() => {
    setProjectData(filteredProjectData);
  }, [filteredProjectData]);

  const filteredData = projectData?.filter((item) =>
    Object.values(item).some((val) => {
      if (typeof val === "object" && val !== null) {
        return Object.values(val).some((propVal) =>
          propVal
        ?.toString()
        ?.toLowerCase()
        ?.includes(searchTerm?.toLowerCase())
      );
      } else if (val) {
        return val
          ?.toString()
          ?.toLowerCase()
          ?.includes(searchTerm?.toLowerCase());
        }
        return false;
      })
    );

  const data = filteredData?.map((item, index) =>({    
    id: item?.id,
    // project_code: item.project_code !== null ? item?.project_code : item?.project?.project_code,
    project_code: item.project_code ?? item?.project?.project_code,
    name:item?.name ||  (item?.project_name ?? item?.project?.name),
    cpi: (item?.cpi ? Number(item?.cpi).toFixed(2) : "0.00") || (item?.cpi ?  Number(item?.cpi).toFixed(2) : "0.00"),
    clients: item?.clients?.name || (item?.project?.client ?? item?.project?.clients?.name),
    operation_select: item?.operation_select,
    project_type: item?.project_type?.name ?? item?.project?.project_type?.name,
    other_cost: item?.other_cost ?? item?.project?.other_cost,
    set_up_fee: item?.set_up_fee ?? item?.project?.set_up_fee,
    tentative_end_date: item?.tentative_end_date ?? item?.project?.tentative_end_date?.split("T")[0],
    tentative_start_date:item?.tentative_start_date?.split("T")[0] ?? item?.project?.tentative_start_date?.split("T")[0],
    tentative_end_date:item?.tentative_end_date?.split("T")[0] ?? item?.project?.tentative_end_date?.split("T")[0],
    project_assigned_to_teamlead: item?.project_assigned_to_teamlead?.map((user) => user.name).join(' , ') || 'N/A',
    assigned_to: item?.assigned_to || (item.project_manager ?? item?.project?.assigned_to),
    sample: item?.sample || (item?.final_sample ?? item?.project?.sample),
    project_samples:item?.project_samples || (item?.final_samples),
    project_actual_start_date:item?.project_actual_start_date,
    total_achievement: item?.total_achievement,
    remaining_interview: item?.remaining_interview,
    man_days: item.man_days,
    status: item?.status,
    project_client_pm: item?.project_client_pm,
    upload_document: item?.upload_document,
    documents: item?.documents,
    initial_sample_size:
      (isDirectorRole || isHodRole) && item.initial_sample_size,
      created_by:item.created_by,
      created_at:item.created_at,
    project_actual_start_date:item.project_actual_start_date,
    initial_sample_size:item.initial_sample_size,
    project:item?.project
  }));
  return data;
};
