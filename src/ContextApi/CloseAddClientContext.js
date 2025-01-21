import React, { createContext, useState } from "react";
export const CloseAddClient = createContext();

export const CloseAddClientProvider = ({ children }) => {
  const [closeAddClient, setCloseAddClient] = useState(false);
  return (
    <CloseAddClient.Provider value={{ closeAddClient, setCloseAddClient }}>
      {children}
    </CloseAddClient.Provider>
  );
};
