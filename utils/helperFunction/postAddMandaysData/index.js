import { PostMandaysData } from "../../../src/fetchApis/projects/mandays/PostMandaysData";
import { ProjectData } from "../../apis/projectData";
import SweetAlert from "../../../src/components/SweetAlert";
import { setProjects } from "../../slices/ProjectSlice";

export const handlePostMandaysData = async (data,dispatch,setIsAddManDays, setisEdit,closeDrawerRight) => {
    try {
      const response = await PostMandaysData(data);
      const error = response?.ex?.response?.data?.map((item) => item);
      if (response?.status == true) {
        setIsAddManDays(false);
        SweetAlert({
          title: "operation perform sucessfully",
          text: "",
          icon: "success",
        });
        closeDrawerRight()
        setisEdit(false);
        const projectData = await ProjectData();
        dispatch(setProjects(projectData));
      } else if (response?.ex?.response?.data[0]?.non_field_errors?.[0]) {
        SweetAlert({
          title: "Error",
          text: response?.ex?.response?.data[0]?.non_field_errors?.[0],
          icon: "error",
        });
      } else {
        SweetAlert({
          title: "Error",
          text: response?.ex?.response?.data?.error || "Something went wrong",
          icon: "error",
        });
      }
    } catch (error) {
      SweetAlert({
        title: "error",
        text: error,
        icon: "error",
      });
    }
    document.body.classList.remove("DrawerBody");
    // setIsDrawerOpen(false);
  };