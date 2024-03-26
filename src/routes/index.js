import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "../provider/authProvider";
import { ProtectedRoute } from "./ProtectedRoute";
import Login from "../user/Login.js";
import OperationDashboard from "../dashboard/OperationDashboard.js";
import SignUp from "../user/SignUp.js";
import SalesDashboard from "../dashboard/SalesDashboard.js";
import Reset from "../user/Reset.js";
import Error from "../components/Error";
// import UserProfile from "../user/userProfile.js";

const Routes = () => {
  const { token } = useAuth();

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
          path: "/sales-dashboard",
          element: <SalesDashboard />,
        },
        {
          path: "/logout",
          element: <div>Logout</div>,
        },
        // {
        //     path:"/user",
        //     element:<UserProfile />
        // },
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
