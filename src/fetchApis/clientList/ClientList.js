import axios from "axios";
import { CLIENTDATAAPIS } from "../../../utils/urls";
import { getWithAuth } from "../../provider/helper/axios";

export const ClientList = async () => {
  try {
    return getWithAuth(CLIENTDATAAPIS);
  } catch (error) {
    console.error("Error fetching project data:", error);
    throw error;
  }
};
