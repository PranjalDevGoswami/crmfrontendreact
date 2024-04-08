import { POSTMANDAYSDATA } from "../../../../utils/urls";

export const PostMandaysData = async (mandaysData) => {
  console.log("mandaysData from mandays components", mandaysData);
  let token = localStorage.getItem("token");
  try {
    const response = await fetch(POSTMANDAYSDATA, {
      method: "POST",
      headers: {
        "Content-Type": "Application/Json",
        Accept: "Application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(mandaysData),
    });
  } catch (error) {
    console.log("Edited data push unsuccessfully!", error);
  }
};
