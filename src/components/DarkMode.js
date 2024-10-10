import React from "react";
import { MdDarkMode, MdOutlineDarkMode } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { toggleDarkMode } from "../../utils/slices/DarkmodeSlice";

const DarkMode = () => {
  const darkMode = useSelector((store) => store.darkMode.isDarkMode);
  const dispatchDarkMode = useDispatch();
  const HandleDarkMode = () => {
    dispatchDarkMode(toggleDarkMode(!darkMode));
  };

  return (
    <div>
      {darkMode && (
        <MdOutlineDarkMode
          className="mr-4 cursor-pointer color-black min-[320px]:text-md sm:text-xl"
          onClick={HandleDarkMode}
        />
      )}
      {!darkMode && (
        <MdDarkMode
          className="mr-4 cursor-pointer text-black min-[320px]:text-md sm:text-xl"
          onClick={HandleDarkMode}
        />
      )}
    </div>
  );
};

export default DarkMode;
