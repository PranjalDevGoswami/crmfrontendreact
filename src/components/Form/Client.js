import React, { useContext, useEffect, useState } from "react";
import Label from "../../Atom/Label";
import Dropdown from "../DropDown";
import { FormDataContext } from "../../ContextApi/FormDataContext";
import { ClientList } from "../../fetchApis/clientList/ClientList";
import { CloseAddClient } from "../../ContextApi/CloseAddClientContext";
import { FilterContext } from "../../ContextApi/FilterContext";

const Client = () => {
  const { formData, setFormData } = useContext(FormDataContext);
  const { closeAddClient, setCloseAddClient } = useContext(CloseAddClient);

  const {
    clientListDataWithId,
    setClientListDataWithId,
    clientListData,
    setClientListData,
  } = useContext(FilterContext);

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
  }, [closeAddClient]);

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
    <div className="pt-2">
      <Label labelName={"Client"} className={"pt-4 pb-2 ml-1"} />
      {clientListData.length > 0 ? (
        <Dropdown
          name={"clients"}
          className={
            "p-[9px] outline-none cursor-pointer w-[100%] bg-[#f3eded] border rounded-md rounded-r-none"
          }
          Option_Name={["-- Select Client --", ...clientListData]}
          RequireAddButton={true}
          required
          onChange={SelectOptionHandler}
          id={"clients"}
        />
      ) : (
        <Dropdown
          name={"clients"}
          className={
            "p-3 outline-none cursor-pointer w-[100%] relative bg-[#f3eded] border rounded-md rounded-r-none mt-2"
          }
          Option_Name={[
            "-- Select Client --",
            "demo client 1",
            "demo client 2",
          ]}
          RequireAddButton={true}
          required
          onChange={SelectOptionHandler}
          id={"dummy client"}
        />
      )}
    </div>
  );
};

export default Client;
