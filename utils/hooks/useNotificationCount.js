import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setnotification } from "../slices/notificationCountSlice";
import { notificationCount } from "../apis/notificationCount";

const useNotificationCount = () => {
  const dispatch = useDispatch();
  const [notificationCountData, setNotificationCountData] = useState([]);

  const getNotificationCount = async () => {
    try {
      const response = await notificationCount();
      if (response) {
        dispatch(setnotification(response));
        setNotificationCountData(response);
      }
    } catch (error) {
      console.error("Error fetching project data:", error);
    }
  };

  useEffect(() => {
    getNotificationCount();
  }, []);

  return notificationCountData;
};

export default useNotificationCount;
