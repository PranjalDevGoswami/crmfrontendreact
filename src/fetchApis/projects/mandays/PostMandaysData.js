import { POSTMANDAYSDATA } from "../../../../utils/Apis";

export const PostMandaysData = async (mandaysData) => {
  console.log("mandaysData from mandays components", mandaysData);
  try {
    const response = await fetch(POSTMANDAYSDATA, {
      method: "POST",
      headers: {
        "Content-Type": "Application/Json",
        Accept: "Application/json",
      },
      body: JSON.stringify(mandaysData),
    });
  } catch (error) {
    console.log("Edited data push unsuccessfully!", error);
  }
};
