import { Navigate, Outlet } from "react-router-dom";
import MainDashboard from "../dashboard/MainDashboard";
import Header from "../partials/Header";
import Breadcrumbs from "../components/Breadcrumbs";
import { useContext } from "react";
import { ThemeContext } from "../ContextApi/ThemeContext";

export const ProtectedRoute = () => {
  const token = localStorage.getItem("token");
  const { darkMode } = useContext(ThemeContext);

  if (!token) {
    return <Navigate to="/login" />;
  }
  return (
    <>
      <div className="fixed top-0 left-0 w-full z-50">
        <Header />
      </div>
      <div
        className={` ${
          darkMode ? "bg-black" : "bg-gray-200"
        } w-full  h-full min-h-screen`}
      >
        <div className="flex">
          <div className="sticky top-28 left-0 h-28 max-w-52 z-50">
            <MainDashboard />
          </div>
          <div className="w-full mt-36">
            <div className="container mx-auto">
              <div className="max-w-full">
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
