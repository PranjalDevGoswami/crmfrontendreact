import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import Login from "../user/Login.js";
import OperationDashboard from "../dashboard/OperationDashboard.js";
import SignUp from "../user/SignUp.js";
import SalesDashboard from "../dashboard/SalesDashboard.js";
import AdminPanel from "../dashboard/AdminPanel.js";
import Reset from "../user/Reset.js";
import Error from "../Atom/Error.js";
import Form from "../project/Form.js";
import View from "../project/projectCRUDOperations/View";
import DefaultDashboard from "../dashboard/DefaultDashboard.js";
import FinanceDashboard from "../dashboard/FinanceDashboard.js";
import ResetPassword from "../user/ResetPassword.js";
import ChangePassword from "../user/ChangePassword.js";
import { Profile } from "../user/userProfile";
import DirectorDashboard from "../dashboard/DirectorDashboard.js";
import LogoutTimer from "../user/LogoutTimer.js";
import ManagementPanel from "../dashboard/ManagementRole";
import ReportDashboard from "../dashboard/ReportDashboard.js";
import RoleProtectedRoute from "./allowRoutes/index.js";
import AbrDashboard from "../dashboard/AbrDashboard.js";
import CbrDashboard from "../dashboard/CbrDashboard.js";
import ViewCBR from "../components/VIewCBR.js";
import Report from "../page/report/Report.js";

const Routes = () => {
  const routesForPublic = [
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <SignUp />,
    },
    {
      path: "/reset",
      element: <Reset />,
    },
    {
      path: "/confirm-password",
      element: <ResetPassword />,
    },
    { path: "*", element: <Error /> },
    {
      path: "/logout",
      element: <LogoutTimer />,
    },
  ];

  // const routesForAuthenticatedOnly = [
  //   {
  //     path: "/",
  //     element: <ProtectedRoute />,
  //     children: [
  //       {
  //         path: "/operation-dashboard",
  //         element: <OperationDashboard />,
  //       },
  //       {
  //         path: "/finance-dashboard",
  //         element: <FinanceDashboard />,
  //       },
  //       {
  //         path: "/admin",
  //         element: <AdminPanel />,
  //       },
  //       {
  //         path: "/sales-dashboard",
  //         element: <SalesDashboard />,
  //       },
  //       {
  //         path: "/director-dashboard",
  //         element: <DirectorDashboard />,
  //       },
  //       {
  //         path: "/entry-page",
  //         element: <Form />,
  //       },
  //       {
  //         path: "/logout",
  //         element: <div>Logout</div>,
  //       },
  //       {
  //         path: "/view",
  //         element: <View />,
  //       },
  //       {
  //         path: "/invoice",
  //         element: <Invoice />,
  //       },
  //       {
  //         path: "/change-password",
  //         element: <ChangePassword />,
  //       },
  //       {
  //         path: "/profile",
  //         element: <Profile />,
  //       },
  //       {
  //         path: "/Admin-dashboard",
  //         element: <AdminPanel />,
  //       },
  //       {
  //         path: "/Management-Role",
  //         element: <ManagementPanel />,
  //       },
  //       // {
  //       //   path: "/download-invoice",
  //       //   element: <InvoicePDF />,
  //       // },
  //       {
  //         path: "/default-dashboard",
  //         element: <DefaultDashboard />,
  //       },
  //       {
  //         path: "/report",
  //         element: <ReportDashboard />,
  //       },
  //       { path: "*", element: <Error /> },
  //     ],
  //   },
  // ];
  // Combine and conditionally include routes based on authentication status
  const routesForAuthenticatedOnly = [
    {
      path: "/",
      element: <ProtectedRoute />,
      children: [
        { path: "/operation-projects", element: <OperationDashboard /> },
        { path: "/finance-projects", element: <FinanceDashboard /> },
        { path: "/admin", element: <AdminPanel /> },
        { path: "/sales-projects", element: <SalesDashboard /> },
        { path: "/director-projects", element: <DirectorDashboard /> },
        { path: "/entry-page", element: <Form /> },
        { path: "/logout", element: <div>Logout</div> },
        { path: "/view", element: <View /> },
        { path: "/view-cbr", element: <ViewCBR /> },
        { path: "/change-password", element: <ChangePassword /> },
        { path: "/profile", element: <Profile /> },
        { path: "/Admin-dashboard", element: <AdminPanel /> },
        { path: "/Management-Role", element: <ManagementPanel /> },
        { path: "/default-projects", element: <DefaultDashboard /> },
        { path: "/report", element: <Report /> },
        {
          path: "/dashboard",
          element: (
            <RoleProtectedRoute
              element={<ReportDashboard />}
              allowedRoles={["Admin", "Manager","Director","HOD","Ass.Manager","Sr.Manager"]}
            />
          ),
        },
        {
          path: "/abr",
          element: (
            <RoleProtectedRoute
              element={<AbrDashboard />}
              allowedRoles={["Admin", "Manager","Director","HOD","Ass.Manager","Sr.Manager"]}
            />
          ),
        },
        {
          path: "/cbr",
          element: (
            <RoleProtectedRoute
              element={<CbrDashboard />}
              allowedRoles={["Admin", "Manager","Director","HOD","Ass.Manager","Sr.Manager"]}
            />
          ),
        },
        { path: "*", element: <Error /> },
      ],
    },
  ];
  
  const router = createBrowserRouter([
    ...routesForPublic,
    ...routesForAuthenticatedOnly,
  ]);

  // Provide the router configuration using RouterProvider
  return <RouterProvider router={router} />;
};

export default Routes;
