import { CLIENTDATAAPIS } from "../../../utils/Apis";

export const ClientList = async () => {
  try {
    const clientData = await fetch(CLIENTDATAAPIS);
    const clientDataJson = await clientData.json();
    return clientDataJson;
    //  const clientDataItems = clientDataJson.map((val)=>{return val.name})
    //  setClientListData(clientDataItems)
  } catch (error) {
    console.error("Error fetching project data:", error);
    throw error;
  }
};
