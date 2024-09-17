import React, { createContext, useState } from "react";

export const ThemeContext = createContext(false);

export const ThemeContextProvider = ({ children }) => {
  const [profilePic, setProfilePic] = useState();
  // const darkModeOn = localStorage.setItem("DarkModeOn", false);
  const [darkMode, setDarkMode] = useState(false);
  const [sideBarOpen, setSideBarOpen] = useState(false);

  return (
    <ThemeContext.Provider
      value={{
        profilePic,
        setProfilePic,
        darkMode,
        setDarkMode,
        sideBarOpen,
        setSideBarOpen,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
