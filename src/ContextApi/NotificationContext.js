import { createContext, useState } from "react";

export const NotifiactionContext = createContext();

export const NotifiactionProvider = ({ children }) => {
  const [notificationList, setNotificationList] = useState([]);
  const [notificationProjectList, setNotificationProjectList] = useState([]);
  const [isViewNotification, setIsViewNotification] = useState(false);
  return (
    <NotifiactionContext.Provider
      value={{
        notificationList,
        setNotificationList,
        notificationProjectList,
        setNotificationProjectList,
        isViewNotification,
        setIsViewNotification,
      }}
    >
      {children}
    </NotifiactionContext.Provider>
  );
};
