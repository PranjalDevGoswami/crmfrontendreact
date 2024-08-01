import React, { useContext, useEffect, useState } from "react";
import Label from "../Label";
import Dropdown from "../DropDown";
import { FormDataContext } from "../../ContextApi/FormDataContext";
import { ClientList } from "../../fetchApis/clientList/ClientList";
import { CloseAddClient } from "../../ContextApi/CloseAddClientContext";

const Client = () => {
  const [clientListData, setClientListData] = useState([
    "demo Client1",
    "demo Cliet2",
  ]);
  const [clientListDataWithId, setClientListDataWithId] = useState([]);
  const { formData, setFormData } = useContext(FormDataContext);
  const { closeAddClient, setCloseAddClient } = useContext(CloseAddClient);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        const ClientData = await ClientList();
        setClientListDataWithId(ClientData?.data);
        const clientDataItems = ClientData?.data?.map((val) => {
          return val.name;
        });
        setClientListData(clientDataItems);
      } catch (error) {}
    };
    fetchDataFromApi();
  }, [closeAddClient, token]);

  const SelectOptionHandler = (name, value) => {
    setFormData({ ...formData, [name]: value });
    const clientId = clientListDataWithId?.filter((val) => {
      return val?.name?.toLowerCase() === value?.toLowerCase();
    });
    setFormData({
      ...formData,
      [name]: clientId[0]?.id,
    });
  };
  return (
    <div className="pt-4">
      <Label labelName={"Client"} className={"pt-4 pb-2"} />
      {clientListData.length > 0 && (
        <Dropdown
          name={"clients"}
          className={
            "p-3 outline-none cursor-pointer w-[100%] relative bg-[#f3eded] border rounded-r-none mt-2"
          }
          Option_Name={["-- Select Client --", ...clientListData]}
          RequireAddButton={true}
          required
          onChange={SelectOptionHandler}
        />
      )}
    </div>
  );
};

export default Client;
