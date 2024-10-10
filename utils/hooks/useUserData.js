import React, { useEffect, useState } from "react";
import { getWithAuth } from "../../src/provider/helper/axios";
import { useDispatch } from "react-redux";
import { USERROLE } from "../constants/urls";
import { setUsers } from "../slices/UserSlice";

const useUserData = () => {
  const dispatchUserData = useDispatch();
  const [userData, setUserData] = useState([]);
  const getUserData = async () => {
    const data = await getWithAuth(USERROLE);
    const response = data?.data;
    response.length > 0 && dispatchUserData(setUsers(response));

    setUserData(response);
  };
  useEffect(() => {
    getUserData();
  }, []);

  return userData;
};
export default useUserData;
