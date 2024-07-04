import { LOGINPOSTAPIS } from "../../../utils/urls";
import SweetAlert from "../../components/SweetAlert";

export const PostLoginData = async (data) => {
  try {
    const response = await fetch(LOGINPOSTAPIS, {
      method: "POST",
      headers: {
        "Content-Type": "Application/Json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (error) {
    SweetAlert({
      title: "Error",
      text: "An error occurred. Please try again.",
      error,
      icon: "error",
    });
  }
};
