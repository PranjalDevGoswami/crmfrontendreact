// import { RouterProvider } from "react-router-dom";

// import OperationDashboard from "../../dashboard/OperationDashboard.js";
// import SalesDashboard from "../../dashboard/SalesDashboard.js";
// import Error from "../../components/Error";
// import Form from "../../project/Form.js";
// import View from "../../project/projectCRUDOperations/View.js";
// import { ProtectedRoute } from "./ProtectedRoute.js";

// const Routes = () => {
//   const routesForAuthenticatedOnly = [
//     {
//       path: "/",
//       element: <ProtectedRoute />, // Wrap the component in ProtectedRoute
//       children: [
//         {
//           path: "/operation-dashboard",
//           element: <OperationDashboard />,
//         },
//         {
//           path: "/sales-dashboard",
//           element: <SalesDashboard />,
//         },
//         {
//           path: "/entry-page",
//           element: <Form />,
//         },
//         {
//           path: "/logout",
//           element: <div>Logout</div>,
//         },
//         {
//           path: "/view",
//           element: <View />,
//         },
//         { path: "*", element: <Error /> },
//       ],
//     },
//   ];
//   return <RouterProvider router={routesForAuthenticatedOnly} />;
// };

// export default Routes;
