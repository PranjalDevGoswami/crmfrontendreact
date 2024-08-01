import React, { createContext, useState } from "react";

export const ThemeContext = createContext();

export const ThemeContextProvider = ({ children }) => {
  const [profilePic, setProfilePic] = useState();
  const darkModeOn = localStorage.setItem("DarkModeOn", false);
  const [darkMode, setDarkMode] = useState(darkModeOn);
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
