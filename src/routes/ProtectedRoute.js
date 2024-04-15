import { Navigate, Outlet } from "react-router-dom";
import MainDashboard from "../dashboard/MainDashboard";
import Header from "../partials/Header";
import Breadcrumbs from "../components/Breadcrumbs";

export const ProtectedRoute = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" />;
  }
  return (
    <>
      <div className="">
        <div className="sticky top-0 left-0 h-28 w-full z-50">
          <Header />
        </div>
        <div className="w-full">
          <div className="flex">
            <div className="sticky top-28 left-0 h-28 w-52">
              <div className="">
                <MainDashboard />
              </div>
            </div>
            <div className="w-full pl-8">
              <div className="bg-white h-8 sticky top-32">
                <Breadcrumbs />
              </div>
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
