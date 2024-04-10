import { POSTMANDAYSDATA } from "../../../../utils/urls";
import { postWithAuth } from "../../../provider/helper/axios";

export const PostMandaysData = async (mandaysData) => {
  console.log("mandaysData from mandays components", mandaysData);
  let token = localStorage.getItem("token");
  try {
    const response = await postWithAuth(POSTMANDAYSDATA, {
      method: "POST",
      body: JSON.stringify(mandaysData),
    });
  } catch (error) {
    console.log("Edited data push unsuccessfully!", error);
  }
};
