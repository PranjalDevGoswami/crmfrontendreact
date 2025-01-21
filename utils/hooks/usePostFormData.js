import { PostFormData } from "../../src/fetchApis/projects/postProjectData/PostProjectData";
import SweetAlert from "../../src/components/SweetAlert";
import { removeMultipleSample } from "../slices/MultipleSampleCpiRecordsSlice";
import {
  checkedMultipleSampleCpi,
  toggleMultipleSampleCpi,
} from "../slices/AddMutipleSampleCpiSlice";
import { ProjectData } from "../apis/projectData";
import { setProjects } from "../slices/ProjectSlice";

export const usePostFormData = async (
  data,
  SetProjectAdded,
  dispatch,
  dispatchAddMultipleSampleCpi,
  dispatchAddMultipleSampleCpiCheckbox,
  navigate,
  setFormData
) => {
  try {
    const response = await PostFormData(data);
    if (response?.status == true) {
      SweetAlert({
        title: "Success",
        text: "Project Added Successfully!!",
        icon: "success",
      });
      SetProjectAdded(true);
      dispatchAddMultipleSampleCpi(removeMultipleSample());
      dispatchAddMultipleSampleCpiCheckbox(toggleMultipleSampleCpi(false));
      dispatchAddMultipleSampleCpiCheckbox(checkedMultipleSampleCpi(false));
      navigate("/sales-dashboard");
      setFormData({
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
      });
      const projectData = await ProjectData();
      dispatch(setProjects(projectData));
    } else if (
      response?.ex?.response?.data[0] ===
      "Tentative end date cannot be in the past."
    ) {
      SweetAlert({
        title: "Error",
        text: response?.ex?.response?.data[0] || "An error occurred",
        icon: "error",
      });
    } else if (
      response?.ex?.response?.data?.upload_document[0] ===
      "The submitted data was not a file. Check the encoding type on the form."
    ) {
      SweetAlert({
        title: "Error",
        text: "File Formate Not supported",
        icon: "error",
      });
    } else if (
      response?.ex?.response?.data?.project_samples[0] ===
      "This field is required."
    ) {
      SweetAlert({
        title: "Error",
        text: "Multiple Sample CPI Required",
        icon: "error",
      });
    }
  } catch (error) {
    console.log(error);

    SweetAlert({
      title: "Error",
      text: "Error fetching project data:",
      icon: "error",
    });
  }
};
