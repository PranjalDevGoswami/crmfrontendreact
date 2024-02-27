import React from 'react';
import ReactDOM from 'react-dom/client';
import './src/index.css';
// import App from './src/App';
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import Body from './src/components/Body';
import Reset from './src/components/user/Reset';
import Login from './src/components/user/Login';
import Signup from './src/components/user/SignUp'
import SalesDashboard from './src/components/dashboard/SalesDashboard';
import AmDashboard from './src/components/dashboard/AmDashboard';
import DirectorDashboard from './src/components/dashboard/DirectorDashboard';
import OperationDashboard from './src/components/dashboard/OperationDashboard';
import EntryForm from './src/components/project/EntryForm';
import { Provider } from 'react-redux';
import store from './src/store';

const App = () => {
  // const isLoggedIn = localStorage.getItem('isLoggedIn')
  return (
    <>
    <Provider store={store}>
    {/* {isLoggedIn? */}
      <Outlet />
      {/* :<Login />} */}
     </Provider>
    </>
  );
};
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    // errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/reset",
        element: <Reset />,
      },
      {
        path: "/register",
        element: <Signup />,
      },
      {
        path: "/sales-dashboard",
        element: <SalesDashboard />,
      },
      {
        path: "/am-dashboard",
        element: <AmDashboard />,
      },
      {
        path: "/operation-dashboard",
        element: <OperationDashboard />,
      },
      {
        path: "/director-dashboard",
        element: <DirectorDashboard />,
      },{
        path: "/entry-page",
        element: <EntryForm />,
      },
      
    ],
  },
]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={appRouter} />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals