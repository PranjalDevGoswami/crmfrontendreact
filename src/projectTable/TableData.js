import { useMemo } from "react";
import { useSelector } from "react-redux";

export const TableData = () => {
  const { projects } = useSelector((store) => store.projectData);
  const { filterOption } = useSelector((store) => store.filterSlice);

  const data = useMemo(() => {
    if (!projects) return [];

    return projects.map((item) => ({
      id: item?.id,
      project_code: item?.project_code.toUpperCase(),
      name: item?.name,
      cpi: item?.cpi ? Number(item?.cpi).toFixed(2) : "0.00",
      clients: item?.clients?.name,
      operation_select: item?.operation_select,
      project_type: item?.project_type?.name,
      other_cost: item?.other_cost,
      set_up_fee: item?.set_up_fee,
      transaction_fee: item?.transaction_fee,
      tentative_start_date: item?.tentative_start_date?.split("T")[0],
      tentative_end_date: item?.tentative_end_date?.split("T")[0],
      project_assigned_to_teamlead:
        item?.project_assigned_to_teamlead
          ?.map((user) => user.name)
          .join(" , ") || "N/A",
      assigned_to: item?.assigned_to,
      sample: item?.sample,
      project_samples: item?.project_samples,
      project_actual_start_date: item?.project_actual_start_date,
      total_achievement: item?.total_achievement,
      remaining_interview: item?.remaining_interview,
      man_days: item?.man_days,
      status: item?.status,
      project_client_pm: item?.project_client_pm?.name,
      upload_document: item?.upload_document,
      documents: item?.documents,
      initial_sample_size: item.initial_sample_size,
      created_by: item?.created_by,
      created_at: item?.created_at,
      purchase_order_no: item?.purchase_order_no,
    }));
  }, [
    projects,
    filterOption?.searchText,
    filterOption?.selectedOption,
    filterOption?.dateRange,
  ]);

  return data;
};
