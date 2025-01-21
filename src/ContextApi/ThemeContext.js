import React, { createContext, useState } from "react";

export const ThemeContext = createContext(false);

export const ThemeContextProvider = ({ children }) => {
  const [profilePic, setProfilePic] = useState();
  const [sideBarOpen, setSideBarOpen] = useState(false);

  return (
    <ThemeContext.Provider
      value={{
        profilePic,
        setProfilePic,
        sideBarOpen,
        setSideBarOpen,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
