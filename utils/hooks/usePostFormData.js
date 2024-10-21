import { PostFormData } from "../../src/fetchApis/projects/postProjectData/PostProjectData";
import SweetAlert from "../../src/components/SweetAlert";
import { removeMultipleSample } from "../slices/MultipleSampleCpiSlice";

export const usePostFormData = async (
  data,
  SetProjectAdded,
  dispatchAddMultipleSampleCpi
) => {
  try {
    const response = await PostFormData(data);
    if (response?.status == true) {
      SweetAlert({
        title: "Project Added Successfully!!",
        text: "",
        icon: "success",
      });
      SetProjectAdded(true);
      dispatchAddMultipleSampleCpi(removeMultipleSample());
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
    } else {
      SweetAlert({
        title: "Error",
        text: "something went wrong",
        icon: "error",
      });
    }
  } catch (error) {
    SweetAlert({
      title: "Error",
      text: "Error fetching project data:",
      error,
      icon: "error",
    });
  }
};
