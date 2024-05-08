import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "../provider/authProvider";
import { ProtectedRoute } from "./ProtectedRoute";
import Login from "../user/Login.js";
import OperationDashboard from "../dashboard/OperationDashboard.js";
import SignUp from "../user/SignUp.js";
import SalesDashboard from "../dashboard/SalesDashboard.js";
import AdminPanel from "../dashboard/AdminPanel.js";
import Reset from "../user/Reset.js";
import Error from "../components/Error";
import Form from "../project/Form.js";
import View from "../project/projectCRUDOperations/View";
import DefaultDashboard from "../dashboard/DefaultDashboard.js";
import FinanceDashboard from "../dashboard/FinanceDashboard.js";
import Invoice from "../components/Invoice";
import InvoicePDF from "../components/InvoicePDF.js";
import ResetPassword from "../user/ResetPassword.js";
import ChangePassword from "../user/ChangePassword.js";
import { Profile } from "../user/userProfile";
import DirectorDashboard from "../dashboard/DirectorDashboard.js";
import LogoutTimer from "../user/LogoutTimer.js";

const Routes = () => {
  const { token } = useAuth();
  // const token = localStorage.getItem("token");
  // Define public routes accessible to all users
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
      element: <LogoutTimer />, // Include LogoutTimer component
    },
  ];

  const routesForAuthenticatedOnly = [
    {
      path: "/",
      element: <ProtectedRoute />, // Wrap the component in ProtectedRoute
      children: [
        {
          path: "/operation-dashboard",
          element: <OperationDashboard />,
        },
        {
          path: "/finance-dashboard",
          element: <FinanceDashboard />,
        },
        {
          path: "/admin",
          element: <AdminPanel />,
        },
        {
          path: "/sales-dashboard",
          element: <SalesDashboard />,
        },
        {
          path: "/director-dashboard",
          element: <DirectorDashboard />,
        },
        {
          path: "/entry-page",
          element: <Form />,
        },
        {
          path: "/logout",
          element: <div>Logout</div>,
        },
        {
          path: "/view",
          element: <View />,
        },
        {
          path: "/invoice",
          element: <Invoice />,
        },
        {
          path: "/change-password",
          element: <ChangePassword />,
        },
        {
          path: "/profile",
          element: <Profile />,
        },
        // {
        //   path: "/download-invoice",
        //   element: <InvoicePDF />,
        // },
        {
          path: "/default-dashboard",
          element: <DefaultDashboard />,
        },
        { path: "*", element: <Error /> },
      ],
    },
  ];
  // Combine and conditionally include routes based on authentication status
  const router = createBrowserRouter([
    ...routesForPublic,
    ...routesForAuthenticatedOnly,
  ]);

  // Provide the router configuration using RouterProvider
  return <RouterProvider router={router} />;
};

export default Routes;
