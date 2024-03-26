import React, { useEffect, useState } from "react";
import Breadcrumbs from "../Breadcrumbs.js";
import Header from "../partials/Header.js";
// import View from "../project/projectCRUDOperations/View";
import View from "../project/projectCRUDOperations/View.js";
import SideBar from "../components/SideBar.js";

const ViewDashboard = ({ viewRecord }) => {
  console.log("viewRecord", viewRecord);

  return (
    <div className="">
      <div className="w-full sticky top-0 z-20">
        <Header />
      </div>
      <div className="flex bg-[#d9d9d9] ">
        <div className="sticky top-32 h-screen">
          <SideBar />
        </div>
        <div className="w-full">
          <div className="p-8">
            <Breadcrumbs />
          </div>
          <div className="m-8 mb-8">
            <View viewRecord={viewRecord} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewDashboard;
