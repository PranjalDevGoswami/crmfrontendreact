import { createContext, useState } from "react";

export const UserDetails = createContext();

export const UserProfileDetails = ({ children }) => {
  const [profileDetails, setProfileDetails] = useState();
  return (
    <UserDetails.Provider value={{ profileDetails, setProfileDetails }}>
      {children}
    </UserDetails.Provider>
  );
};
