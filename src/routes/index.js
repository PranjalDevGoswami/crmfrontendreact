import React, { lazy, Suspense } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import RoleProtectedRoute from "./allowRoutes/index.js";
import { canAccessOperationProjects } from "../config/allowRole/canAccessOperationProjects.js";
import { canAccessSalesProjects } from "../config/allowRole/canAccessSalesProjects.js";
import { canAccessFinanceProjects } from "../config/allowRole/canAccessFinanceProjects.js";
import { canAccessReportDashboard } from "../config/allowRole/canAccessReportDashboard.js";
import { canAccessProjectEntry } from "../config/allowRole/canAccessProjectEntry.js";

// Lazy loaded components
const Login = lazy(() => import("../user/Login.js"));
const SignUp = lazy(() => import("../user/SignUp.js"));
const OperationDashboard = lazy(() => import("../pages/OperationDashboard.js"));
const SalesDashboard = lazy(() => import("../pages/SalesDashboard.js"));
const AdminPanel = lazy(() => import("../dashboard/AdminPanel.js"));
const Reset = lazy(() => import("../user/Reset.js"));
const Error = lazy(() => import("../pages/Error.js"));
const DefaultDashboard = lazy(() => import("../dashboard/DefaultDashboard.js"));
const Invoice = lazy(() => import("../components/Invoice"));
const ResetPassword = lazy(() => import("../user/ResetPassword.js"));
const ChangePassword = lazy(() => import("../user/ChangePassword.js"));
const Profile = lazy(() => import("../user/userProfile"));
const LogoutTimer = lazy(() => import("../user/LogoutTimer.js"));
const ManagementPanel = lazy(() => import("../dashboard/ManagementRole"));
const NotAuthorized = lazy(() => import("../pages/NotAuthorized.js"));
const ViewProjectDetails = lazy(() =>
  import("../project/view/ViewProjectDetails.js")
);
const Form = lazy(() => import("../sales/createProject/Form.js"));
const CbrProjectList = lazy(() =>
  import("../finance/cbrProjectList/CbrProjectList.js")
);
const AbrProjectList = lazy(() =>
  import("../finance/abrProjectList/AbrProjectList.js")
);
const ProjectDashboard = lazy(() => import("../pages/ProjectDashboard.js"));
const ProjectReport = lazy(() => import("../report/ProjectReport.js"));
const CreateCbrInvoice = lazy(() =>
  import("../finance/invoice/CreateCbrInvoice.js")
);
const CreateAbrInvoice = lazy(() =>
  import("../finance/invoice/CreateAbrInvoice.js")
);

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
  // Combine and conditionally include routes based on authentication status
  const routesForAuthenticatedOnly = [
    {
      path: "/",
      element: <ProtectedRoute />,
      children: [
        {
          path: "/operation-projects",
          element: (
            <RoleProtectedRoute
              element={<OperationDashboard />}
              allowedRoles={canAccessOperationProjects.role}
              allowDepartments={canAccessOperationProjects.department}
            />
          ),
        },
        {
          path: "/sales-projects",
          element: (
            <RoleProtectedRoute
              element={<SalesDashboard />}
              allowedRoles={canAccessSalesProjects.role}
              allowDepartments={canAccessSalesProjects.department}
            />
          ),
        },
        { path: "/admin", element: <AdminPanel /> },
        { path: "/logout", element: <div>Logout</div> },
        { path: "/view-project-details", element: <ViewProjectDetails /> },
        { path: "/change-password", element: <ChangePassword /> },
        { path: "/profile", element: <Profile /> },
        { path: "/Admin-panel", element: <AdminPanel /> },
        { path: "/Management-Role", element: <ManagementPanel /> },
        { path: "/default-panel", element: <DefaultDashboard /> },

        {
          path: "/finance-projects/cbr",
          element: (
            <RoleProtectedRoute
              element={<CbrProjectList />}
              allowedRoles={canAccessFinanceProjects.role}
              allowDepartments={canAccessFinanceProjects.department}
            />
          ),
        },
        {
          path: "/finance/cbr/create-invoice",
          element: (
            <RoleProtectedRoute
              element={<CreateCbrInvoice />}
              allowedRoles={canAccessFinanceProjects.role}
              allowDepartments={canAccessFinanceProjects.department}
            />
          ),
        },
        {
          path: "/finance-projects/abr",
          element: (
            <RoleProtectedRoute
              element={<AbrProjectList />}
              allowedRoles={canAccessFinanceProjects.role}
              allowDepartments={canAccessFinanceProjects.department}
            />
          ),
        },
        {
          path: "/finance/abr/create-invoice",
          element: (
            <RoleProtectedRoute
              element={<CreateAbrInvoice />}
              allowedRoles={canAccessFinanceProjects.role}
              allowDepartments={canAccessFinanceProjects.department}
            />
          ),
        },
        {
          path: "/finance/invoice",
          element: (
            <RoleProtectedRoute
              element={<Invoice />}
              allowedRoles={canAccessFinanceProjects.role}
              allowDepartments={canAccessFinanceProjects.department}
            />
          ),
        },
        {
          path: "/project-report",
          element: (
            <RoleProtectedRoute
              element={<ProjectReport />}
              allowedRoles={canAccessReportDashboard.role}
              allowDepartments={canAccessReportDashboard.department}
            />
          ),
        },
        {
          path: "/project-dashboard",
          element: (
            <RoleProtectedRoute
              element={<ProjectDashboard />}
              allowedRoles={canAccessReportDashboard.role}
              allowDepartments={canAccessReportDashboard.department}
            />
          ),
        },
        {
          path: "/entry-page",
          element: (
            <RoleProtectedRoute
              element={<Form />}
              allowedRoles={canAccessProjectEntry.role}
              allowDepartments={canAccessProjectEntry.department}
            />
          ),
        },
        { path: "*", element: <Error /> },
        { path: "/not-authorized", element: <NotAuthorized /> },
      ],
    },
  ];

  const router = createBrowserRouter([
    ...routesForPublic,
    ...routesForAuthenticatedOnly,
  ]);

  // Provide the router configuration using RouterProvider
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RouterProvider router={router} />
    </Suspense>
  );
};

export default Routes;
