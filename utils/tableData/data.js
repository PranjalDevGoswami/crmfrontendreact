import { useContext, useEffect } from "react";
import { FilterContext } from "../../src/ContextApi/FilterContext";
import { isDirector } from "../../src/config/Role";

export const Data = () => {
  const { searchTerm, filteredProjectData } = useContext(FilterContext);
  const role = localStorage.getItem("role");

  const filteredData = filteredProjectData?.filter((item) =>
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

  const data = filteredData?.map((item, index) => ({
    id: item?.id,
    project_code: item?.project_code,
    name: item?.name,
    cpi: item?.cpi ? Number(item?.cpi).toFixed(2) : "0.00",
    clients: item?.clients?.name,
    operation_select: item?.operation_select,
    project_type: item?.project_type?.name,
    other_cost: item?.other_cost,
    project_code: item?.project_code,
    set_up_fee: item?.set_up_fee,
    tentative_end_date: item?.tentative_end_date,
    tentative_start_date:
      role !== isDirector && item?.tentative_start_date?.split("T")[0],
    tentative_end_date:
      role !== isDirector && item?.tentative_end_date?.split("T")[0],
    project_assigned_to_teamlead: item?.project_assigned_to_teamlead,
    assigned_to: item?.assigned_to,
    sample: item?.sample,
    total_achievement: item?.total_achievement,
    remaining_interview: item?.remaining_interview,
    man_days: item.man_days,
    status: item?.status,
    project_client_pm: item?.project_client_pm,
  }));
  return data;
};
