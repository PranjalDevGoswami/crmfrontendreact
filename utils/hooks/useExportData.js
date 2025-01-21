export const useExportData = (data) => {
  const dataForExport = data.map((item) => {
    return {
      //   id: item?.id || "N/A",
      project_code: item?.project_code || "N/A",
      name: item?.name || "N/A",
      clients: item?.clients || "N/A",
      cpi: item?.cpi || "N/A",
      man_days: item?.man_days || "N/A",
      status: item?.status || "N/A",
      project_type: item?.project_type || "N/A",
      sample: item?.sample || "N/A",
      set_up_fee: item?.set_up_fee || "N/A",
      tentative_start_date: item?.tentative_start_date || "N/A",
      tentative_end_date: item?.tentative_end_date || "N/A",
      remaining_interview: item?.remaining_interview || "N/A",
      total_achievement: item?.total_achievement || "N/A",
      assigned_to: item?.assigned_to?.name || "N/A",
      project_assigned_to_teamlead:
        item?.project_assigned_to_teamlead?.name || "N/A",
      project_client_pm: item?.project_client_pm?.name || "N/A",
      //   desabled: item?.desabled,
      //   operation_select: item?.operation_select || false,
      other_cost: item?.other_cost || "N/A",
    };
  });
  return dataForExport;
};
