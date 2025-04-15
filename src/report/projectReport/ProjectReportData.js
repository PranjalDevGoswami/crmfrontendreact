import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { getDashboardProject } from "../../fetchApis/dashboard";
import useUserData from "../../../utils/hooks/useUserData";

export const ProjectReportData = () => {
  const { searchText } = useSelector((store) => store.filterSlice.filterOption);
  const { invoiceStatus, invoiceAge, salesPerson } = useSelector(
    (store) => store.ReportSlice
  );
  const users = useUserData();

  const role = localStorage.getItem("role");
  const isDirectorRole = role === "Director";
  const isHodRole = role === "HOD";
  const [projectData, setProjectData] = useState([]);

  useEffect(() => {
    const getAllProject = async () => {
      const resposnse = await getDashboardProject();
      setProjectData(resposnse);
    };
    getAllProject();
  }, []);

  const today = new Date();

  const filterByAgeRange = (ranges) => {
    return projectData.filter((item) => {
      const createdAt = item.cbr_raised_date?.date
        ? new Date(item.cbr_raised_date?.date)
        : null;

      // Skip invalid dates
      if (!createdAt || isNaN(createdAt)) return false;

      const ageInDays = Math.floor((today - createdAt) / (1000 * 60 * 60 * 24));

      // Check if item matches any of the selected ranges
      return ranges.some((range) => {
        switch (range) {
          case "Less than 15 Days":
            return ageInDays < 15;

          case "15 days - 30 Days":
            return ageInDays >= 15 && ageInDays <= 30;

          case "45 days - 60 Days":
            return ageInDays >= 45 && ageInDays <= 60;

          case "More than 60 Days":
            return ageInDays > 60;

          default:
            return false;
        }
      });
    });
  };

  const data = useMemo(() => {
    const allPersonReportingToSelected = users.filter(
      (user) =>
        salesPerson.includes(user?.reports_to?.name) ||
        salesPerson.includes(user?.user_role?.name)
    );

    const validUserIds = allPersonReportingToSelected.map((user) => user?.id);

    const salesPersonIds = users
      .filter((user) => salesPerson.includes(user?.user_role?.name))
      .map((user) => user?.id);

    let filteredData = searchText
      ? projectData.filter((item) =>
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
      : projectData;

    filteredData = invoiceStatus
      ? filteredData.filter((item) => item.status === invoiceStatus)
      : filteredData;

    filteredData = salesPerson.length
      ? filteredData.filter(
          (item) =>
            salesPersonIds.includes(item?.created_by?.id) ||
            validUserIds.includes(item?.created_by?.id)
        )
      : filteredData;

    filteredData = invoiceAge.length
      ? filterByAgeRange(invoiceAge).filter((item) =>
          filteredData.includes(item)
        )
      : filteredData;

    return filteredData?.map((item) => ({
      id: item?.id,
      project_code: item?.project_code,
      name: item?.name,
      cpi: item?.cpi ? Number(item?.cpi).toFixed(2) : "0.00",
      clients: item?.clients?.name,
      ops_head : item?.operation_hod?.username,
      sales_head : item?.sales_hod?.username,
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
      project_client_pm: item?.project_client_pm,
      upload_document: item?.upload_document,
      documents: item?.documents,
      initial_sample_size:
        (isDirectorRole || isHodRole) && item.initial_sample_size,
      created_by: item?.created_by,
      created_at: item?.created_at,
    }));
  }, [projectData, searchText, invoiceStatus, salesPerson, invoiceAge, users]);

  return data;
};
