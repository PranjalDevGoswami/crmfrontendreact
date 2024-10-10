import React, { useContext, useEffect, useState } from "react";
import { getWithAuth } from "../../src/provider/helper/axios";
import { FilterContext } from "../../src/ContextApi/FilterContext";
import { CLIENTDATAAPIS } from "../constants/urls";

const useClientList = () => {
  const {
    clientsList,
    setClientsList,
    setClientListDataWithId,
    setClientListData,
  } = useContext(FilterContext);

  const getClientList = async () => {
    const data = await getWithAuth(CLIENTDATAAPIS);
    const response = data?.data;
    setClientsList(response?.map((val) => val));
    setClientListDataWithId(response);
    const clientDataItems = response?.map((val) => val.name);
    setClientListData(clientDataItems);
  };
  useEffect(() => {
    getClientList();
  }, []);
  return clientsList;
};

export default useClientList;
