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
      <div className="sticky top-0 left-0 h-28 w-full z-50">
        <Header />
      </div>
      <div className="w-full">
        <div className="flex">
          <div className="sticky top-28 left-0 h-28 max-w-52">
            <MainDashboard />
          </div>
          <div className="w-full  ml-8">
            <div className="container mx-auto">
              {/* <div className="bg-white h-8 sticky top-32">
              <Breadcrumbs />
            </div> */}
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
