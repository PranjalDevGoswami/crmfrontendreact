import { PostFormData } from "../../src/fetchApis/projects/postProjectData/PostProjectData";
import SweetAlert from "../../src/components/SweetAlert";
import { ProjectData } from "../apis/projectData";
import { setProjects } from "../slices/projectSlice";
import {
  checkedMultipleSampleCpi,
  removeMultipleSample,
  toggleMultipleSampleCpi,
} from "../slices/addMutipleSampleCpiSlice";
import {
  addAbrData,
  addFormData,
  toggleAdvancedPayment,
  toggleAdvancedPaymentHasData,
} from "../slices/projectEntryFormSlice";
import { createAdvanceBilling } from "../apis/createAdvanceBilling";

export const usePostFormData = async (
  data,
  dispatch,
  navigate,
  page_number,
  page_size,
  activeTab,
  abr,
  isAdvancedPaymentHasData,
  user
) => {
  try {
    const response = await PostFormData(data);
    if (response?.status === true) {
      SweetAlert({
        title: "Success",
        text: "Project Added Successfully!!",
        icon: "success",
      });
      if (isAdvancedPaymentHasData == true) {
        const updatedAbrData = { ...abr, project: response?.data?.id };
        const abrResponse = await createAdvanceBilling(updatedAbrData);
        dispatch(toggleAdvancedPayment());
        dispatch(toggleAdvancedPaymentHasData(false));
        dispatch(
          addAbrData({
            client_name: "", //id
            clientname: "", //name
            client_address: "",
            client_city: "",
            client_country: "",
            project: "",
            contact_person_name: "",
            contact_person_email: "",
            cc_emails: "",
            specific_billing_instruction: "",
            total_project_cost: 0,
            advance_invoice_percentage: "",
            advance_invoice_amount: 0,
            sales_owner: Number(user),
            project_manager: "",
            created_by: Number(user),
            status: "Advanced Billing Raised",
          })
        );
      }
      dispatch(removeMultipleSample());
      dispatch(toggleMultipleSampleCpi(false));
      dispatch(checkedMultipleSampleCpi(false));

      dispatch(
        addFormData({
          name: "",
          project_type: "",
          clients: "",
          sample: "",
          cpi: "",
          set_up_fee: "",
          tentative_start_date: "",
          tentative_end_date: "",
          other_cost: "",
          transaction_fee: "",
          project_manager: "",
          operation_select: true,
          finance_select: false,
          upload_document: "",
          project_samples: [],
          is_multiple_sample_cpi: null,
        })
      );

      const projectData = await ProjectData(page_number, page_size, activeTab);
      dispatch(setProjects({ data: projectData?.results, reset: true }));

      setTimeout(() => navigate("/sales-projects"), 500);
    } else {
      handleErrors(response);
    }
  } catch (error) {
    console.log("🚀 ~ error:", error);
    SweetAlert({
      title: "Error",
      text: "Error fetching project data",
      icon: "error",
    });
  }
};

// Helper function to handle errors
const handleErrors = (response) => {
  if (
    response?.ex?.response?.data?.length &&
    response.ex.response.data[0] === "Tentative end date cannot be in the past."
  ) {
    SweetAlert({
      title: "Error",
      text: response.ex.response.data[0] || "An error occurred",
      icon: "error",
    });
  } else if (
    response?.ex?.response?.data?.upload_document?.length &&
    response.ex.response.data.upload_document[0] ===
      "The submitted data was not a file. Check the encoding type on the form."
  ) {
    SweetAlert({
      title: "Error",
      text: "File Format Not Supported",
      icon: "error",
    });
  } else if (
    response?.ex?.response?.data?.project_samples?.length &&
    response.ex.response.data.project_samples[0] === "This field is required."
  ) {
    SweetAlert({
      title: "Error",
      text: "Multiple Sample CPI Required",
      icon: "error",
    });
  } else {
    SweetAlert({
      title: "Error",
      text: "An unknown error occurred",
      icon: "error",
    });
  }
};
