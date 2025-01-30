// export const useExportData = (data) => {
//   const dataForExport = data.map((item) => {
//     // console.log(item?.project_samples?.map((item)=>item?.sample));
//     const multipleSample = item?.project_samples?.map((item)=>item?.cpi)
//     console.log("🚀 ~ dataForExport ~ multipleSample:", multipleSample)
//     return {
//       "Project Code": item?.project_code || "N/A",
//       "Project Name": item?.name || "N/A",
//       "Client Name": item?.clients || "N/A",
//       "Project Type": item?.project_type || "N/A",
//       "Sample": item?.sample || 0,
//       "CPI": item?.cpi || 0,
//       "Setup Fee": item?.set_up_fee || 0,
//       "Other Cost": item?.other_cost || 0,
//       "Total Man Days": item?.man_days || 0,
//       "Status": item?.status || "N/A",
//       "Start Date": item?.tentative_start_date || "N/A",
//       "Tentative End Date": item?.tentative_end_date || "N/A",
//       "Remaining Interview": item?.remaining_interview || "N/A",
//       "Total Achieved Target": item?.total_achievement || "N/A",
//       "Project Assigned to": item?.assigned_to?.name || "N/A",
//       "Project Assigned to Teamlead":
//         item?.project_assigned_to_teamlead || "N/A",
//       "Project Client PM": item?.project_client_pm?.name || "N/A",
//       {item?.project_samples.length>1 &&
//         item?.item?.project_samples?.map((item)=>item?.sample)
//       },
//       // "Multiple Sample" : item?.project_samples?.map((item)=>item?.sample),
//       // "Cpi" : item?.project_samples?.map((item)=>item?.cpi),
//       "Total Cost": (item?.total_achievement * item?.cpi) + item?.set_up_fee + item?.other_cost
//     };
//   });
//   return dataForExport;
// };

export const useExportData = (data) => {
  const dataForExport = data.map((item) => {
    const multipleSamples = item?.project_samples?.map((sample) => sample?.sample) || [];
    const multipleCpi = item?.project_samples?.map((sample) => sample?.cpi) || [];

    return {
      "Project Code": item?.project_code || "N/A",
      "Project Name": item?.name || "N/A",
      "Client Name": item?.clients || "N/A",
      "Project Type": item?.project_type || "N/A",
      "Sample": item?.sample || 0,
      "CPI": item?.cpi || 0,
      "Setup Fee": item?.set_up_fee || 0,
      "Other Cost": item?.other_cost || 0,
      "Total Man Days": item?.man_days || 0,
      "Status": item?.status || "N/A",
      "Start Date": item?.project_actual_start_date?.split("T")[0] || "N/A",
      "Tentative End Date": item?.tentative_end_date || "N/A",
      "Remaining Interview": item?.remaining_interview || "N/A",
      "Total Achieved Target": item?.total_achievement || "N/A",
      "Project Assigned to": item?.assigned_to?.name || "N/A",
      "Project Assigned to Teamlead": item?.project_assigned_to_teamlead || "N/A",
      "Project Client PM": item?.project_client_pm?.name || "N/A",
      "Multiple Samples": multipleSamples.join(", "), // Join array into a string
      "Multiple CPI": multipleCpi.join(", "),
      "Total Cost":
        (item?.total_achievement * item?.cpi) +
        (item?.set_up_fee || 0) +
        (item?.other_cost || 0),
    };
  });

  return dataForExport;
};
