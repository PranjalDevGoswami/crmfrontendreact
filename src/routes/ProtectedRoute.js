import { Navigate, Outlet } from "react-router-dom";
import Header from "../partials/Header";
import { useContext } from "react";
import { ThemeContext } from "../ContextApi/ThemeContext";
import SideBar from "../components/Sidebar/SideBar";

export const ProtectedRoute = () => {
  const token = localStorage.getItem("token");
  const { darkMode, sideBarOpen } = useContext(ThemeContext);

  if (!token) {
    return <Navigate to="/login" />;
  }

  return (
    <div
      className={`h-full min-h-screen container mx-auto max-w-full w-full ${
        darkMode ? "bg-black" : "bg-gray-200"
      }`}
    >
      <div className="fixed top-0 left-0 w-full z-50">
        <Header />
      </div>
      <div className="flex flex-1 pt-16">
        <div
          className={`fixed top-28 left-0 h-full z-40 ${
            sideBarOpen ? "w-[12%]" : "w-12"
          } transition-width duration-300 `}
        >
          <SideBar />
        </div>
        <div
          className={`flex-1 transition-all duration-300 overflow-scroll no-scrollbar h-screen mr-4 ${
            sideBarOpen ? "ml-[12%]" : "ml-[4rem]"
          } mt-8`}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};
