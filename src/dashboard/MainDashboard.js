import React from "react";
import Header from "../partials/Header";
import SideBar from "../components/SideBar";
import Breadcrumbs from "../components/Breadcrumbs";

const MainDashboard = () => {
  return (
    <div className="flex">
      <SideBar />
      <div className="ml-8 w-60 z-50 mt-4 bg-white h-8">
        <Breadcrumbs />
      </div>
    </div>
  );
};

export default MainDashboard;
