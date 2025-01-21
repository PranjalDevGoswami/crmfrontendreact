import { createContext, useState } from "react";

export const RoleContext = createContext();

export const RoleProvider = ({ children }) => {
  const [roleConfig, setRoleConfig] = useState(null);

  return (
    <RoleContext.Provider value={roleConfig}>{children}</RoleContext.Provider>
  );
};
