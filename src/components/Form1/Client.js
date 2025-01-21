import React, { useContext, useEffect } from "react";
import Label from "../../Atom/Label";
import Dropdown from "../DropDown";
import { FormDataContext } from "../../ContextApi/FormDataContext";
import { ClientList } from "../../fetchApis/clientList/ClientList";
import { CloseAddClient } from "../../ContextApi/CloseAddClientContext";
import { FilterContext } from "../../ContextApi/FilterContext";

const Client = () => {
  // Context and state management
  const { formData, setFormData } = useContext(FormDataContext);
  const { closeAddClient } = useContext(CloseAddClient);
  const {
    clientListDataWithId,
    setClientListDataWithId,
    clientListData,
    setClientListData,
  } = useContext(FilterContext);

  // Fetch client data on component mount or when new client is added
  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        const ClientData = await ClientList();
        setClientListDataWithId(ClientData?.data);
        const clientDataItems = ClientData?.data?.map((val) => val.name);
        setClientListData(clientDataItems);
      } catch (error) {
        console.error("Failed to fetch client data", error);
      }
    };
    fetchDataFromApi();
  }, [closeAddClient]);

  // Handle dropdown selection
  const SelectOptionHandler = (name, value) => {
    setFormData({ ...formData, [name]: value });
    const clientId = clientListDataWithId?.filter(
      (val) => val?.name?.toLowerCase() === value?.toLowerCase()
    );
    setFormData({ ...formData, [name]: clientId[0]?.id });
  };

  return (
    <div className="pt-4">
      <Label labelName="Client" className="pt-4 pb-2" />
      {clientListData.length > 0 ? (
        <Dropdown
          name="clients"
          className="p-3 outline-none cursor-pointer w-full bg-white border rounded-md mt-2"
          Option_Name={["-- Select Client --", ...clientListData]}
          RequireAddButton={true}
          required
          onChange={SelectOptionHandler}
          id="clients"
        />
      ) : (
        <Dropdown
          name="clients"
          className="p-3 outline-none cursor-pointer w-full bg-white border rounded-none mt-2"
          Option_Name={["-- Select Client --", "demo client 1", "demo client 2"]}
          RequireAddButton={true}
          required
          onChange={SelectOptionHandler}
          id="dummy client"
        />
      )}
    </div>
  );
};

export default Client;
