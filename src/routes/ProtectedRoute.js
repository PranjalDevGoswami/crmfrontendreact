import { Navigate, Outlet } from "react-router-dom";
import MainDashboard from "../dashboard/MainDashboard";
import Header from "../partials/Header";

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
              <div className="flex w-52">
                <MainDashboard />
              </div>
            </div>
            <div className="w-full overflow-hidden">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
