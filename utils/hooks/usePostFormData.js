import { PostFormData } from "../../src/fetchApis/projects/postProjectData/PostProjectData";
import SweetAlert from "../../src/components/SweetAlert";
import { removeMultipleSample } from "../slices/MultipleSampleCpiRecordsSlice";
import {
  checkedMultipleSampleCpi,
  toggleMultipleSampleCpi,
} from "../slices/AddMutipleSampleCpiSlice";
import { ProjectData } from "../apis/projectData";
import { setProjects } from "../slices/ProjectSlice";
import { ADVANCEBILLING } from "../constants/urls";
import { postWithAuth } from "../../src/provider/helper/axios";

// export const usePostFormData = async (
//   data,
//   SetProjectAdded,
//   dispatch,
//   dispatchAddMultipleSampleCpi,
//   dispatchAddMultipleSampleCpiCheckbox,
//   navigate,
//   setFormData,page_number,page_size,
//   activeTabValue,
//   setAbrData,
//   abrData
// ) => {
//   try {
//     const response = await PostFormData(data);    
//     if (response?.status == true) {
//       setAbrData((prev) => ({...prev,project:response?.data?.id}))
//       try {
//         const response = await postWithAuth(ADVANCEBILLING, abrData);
//         console.log("🚀 ~ response:", response)
//       } catch (error) {
//         SweetAlert({
//           title: "Error",
//           text: "Error Abr post data:",
//           icon: "error",
//         });
//       }
//       SweetAlert({
//         title: "Success",
//         text: "Project Added Successfully!!",
//         icon: "success",
//       });
//       SetProjectAdded(true);
//       dispatchAddMultipleSampleCpi(removeMultipleSample());
//       dispatchAddMultipleSampleCpiCheckbox(toggleMultipleSampleCpi(false));
//       dispatchAddMultipleSampleCpiCheckbox(checkedMultipleSampleCpi(false));
//       navigate("/sales-projects");
//       setFormData({
//         name: "",
//         project_type: "",
//         clients: "",
//         sample: "",
//         cpi: "",
//         set_up_fee: "",
//         tentative_start_date: "",
//         tentative_end_date: "",
//         other_cost: "",
//         transaction_fee: "",
//         project_manager: "",
//         operation_select: true,
//         finance_select: false,
//         upload_document: "",
//         project_samples: [],
//         is_multiple_sample_cpi: null,
//       });
//       const projectData = await ProjectData(page_number,page_size,activeTabValue);
//       dispatch(setProjects(projectData?.results));
//     } else if (
//       response?.ex?.response?.data[0] ===
//       "Tentative end date cannot be in the past."
//     ) {
//       SweetAlert({
//         title: "Error",
//         text: response?.ex?.response?.data[0] || "An error occurred",
//         icon: "error",
//       });
//     } else if (
//       response?.ex?.response?.data?.upload_document[0] ===
//       "The submitted data was not a file. Check the encoding type on the form."
//     ) {
//       SweetAlert({
//         title: "Error",
//         text: "File Formate Not supported",
//         icon: "error",
//       });
//     } else if (
//       response?.ex?.response?.data?.project_samples[0] ===
//       "This field is required."
//     ) {
//       SweetAlert({
//         title: "Error",
//         text: "Multiple Sample CPI Required",
//         icon: "error",
//       });
//     }
//   } catch (error) {
//     console.log(error);

//     SweetAlert({
//       title: "Error",
//       text: "Error fetching project data:",
//       icon: "error",
//     });
//   }
// };

export const usePostFormData = async (
  data,
  SetProjectAdded,
  dispatch,
  dispatchAddMultipleSampleCpi,
  dispatchAddMultipleSampleCpiCheckbox,
  navigate,
  setFormData,
  page_number,
  page_size,
  activeTabValue,
  setAbrData,
  abrData
) => {
  console.log("🚀 ~ data:", data)
  try {
    const response = await PostFormData(data);
    
    if (response?.status == true) {
      const updatedAbrData = { ...abrData, project: response?.data?.id };

      console.log("🚀 ~ updatedAbrData:", updatedAbrData)
      try {
        const abrResponse = await postWithAuth(ADVANCEBILLING, updatedAbrData);
        console.log("🚀 ~ abrResponse:", abrResponse);
      } catch (error) {
        SweetAlert({
          title: "Error",
          text: "Error in ABR post data",
          icon: "error",
        });
      }

      SweetAlert({
        title: "Success",
        text: "Project Added Successfully!!",
        icon: "success",
      });

      SetProjectAdded(true);
      dispatchAddMultipleSampleCpi(removeMultipleSample());
      dispatchAddMultipleSampleCpiCheckbox(toggleMultipleSampleCpi(false));
      dispatchAddMultipleSampleCpiCheckbox(checkedMultipleSampleCpi(false));
      navigate("/sales-projects");

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

      const projectData = await ProjectData(page_number, page_size, activeTabValue);
      dispatch(setProjects(projectData?.results));
    } else {
      handleErrors(response);
    }
  } catch (error) {
    console.error(error);
    SweetAlert({
      title: "Error",
      text: "Error fetching project data",
      icon: "error",
    });
  }
};

// Error handling function
const handleErrors = (response) => {
  if (
    response?.ex?.response?.data[0] ===
    "Tentative end date cannot be in the past."
  ) {
    SweetAlert({
      title: "Error",
      text: response?.ex?.response?.data[0] || "An error occurred",
      icon: "error",
    });
  } else if (
    response?.ex?.response?.data?.upload_document &&
    response?.ex?.response?.data?.upload_document[0] ===
    "The submitted data was not a file. Check the encoding type on the form."
  ) {
    SweetAlert({
      title: "Error",
      text: "File Format Not Supported",
      icon: "error",
    });
  } else if (
    response?.ex?.response?.data?.project_samples &&
    response?.ex?.response?.data?.project_samples[0] ===
    "This field is required."
  ) {
    SweetAlert({
      title: "Error",
      text: "Multiple Sample CPI Required",
      icon: "error",
    });
  }
};
