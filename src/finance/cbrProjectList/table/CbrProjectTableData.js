import { useMemo } from "react";
import { useSelector } from "react-redux";

export const CbrProjectTableData = () => {
  const { cbrProjectsData, cbrActiveTabs } = useSelector(
    (store) => store.financeDepartment
  );
  const { filterOption } = useSelector((store) => store.filterSlice);

  const data = useMemo(() => {
    if (!cbrProjectsData) return [];
    const searchText = filterOption?.searchText?.toLowerCase() || "";

    // Filter projects based on searchText
    let filteredData = searchText
      ? cbrProjectsData.filter((item) =>
          Object.values(item).some((val) => {
            if (typeof val === "object" && val !== null) {
              return Object.values(val).some((propVal) =>
                propVal?.toString()?.toLowerCase()?.includes(searchText)
              );
            } else if (val) {
              return val?.toString()?.toLowerCase()?.includes(searchText);
            }
            return false;
          })
        )
        : cbrProjectsData;
        
        // Filter projects based on activeTabs
        filteredData = filteredData.filter((item) => {
          return item.status === cbrActiveTabs;
        });

    // Map data for the table
    return filteredData.map((item) => ({
      id: item?.project?.id,
      project_code: item?.project?.project_code,
      name: item?.project?.name,
      project_type: item?.project?.project_type?.name,
      clients: item?.project?.clients?.name,
      cpi: item?.cpi ? Number(item?.cpi).toFixed(2) : "0.00",
      operation_select: item?.operation_select,
      other_cost: item?.project?.other_cost,
      set_up_fee: item?.project?.set_up_fee,
      transaction_fee: item?.project?.transaction_fee,
      tentative_start_date: item?.project?.tentative_start_date?.split("T")[0],
      tentative_end_date: item?.project?.tentative_end_date?.split("T")[0],
      ops_head:item?.operation_hod?.username,
      project_assigned_to_teamlead:
        item?.project_assigned_to_teamlead
          ?.map((user) => user.name)
          .join(" , ") ??
        (item?.project?.project_assigned_to_teamlead
          ?.map((user) => user.name)
          .join(" , ") ||
          "N/A"),
      assigned_to:
        item?.project_manager?.name ?? item?.project?.assigned_to?.name,
      sample: item?.sample,
      project_samples: item?.project?.project_samples,
      project_actual_start_date: item?.project_actual_start_date,
      total_achievement: item?.total_achievement,
      remaining_interview: item?.remaining_interview,
      man_days: item?.man_days,
      status: item?.status,
      project_client_pm: item?.project_client_pm,
      upload_document: item?.upload_document,
      documents: item?.documents,
      initial_sample_size: item.initial_sample_size,
      created_by: item?.created_by,
      created_at: item?.created_at,
    }));
  }, [cbrProjectsData, filterOption?.searchText, cbrActiveTabs]); // ✅ Proper dependencies

  return data;
};
