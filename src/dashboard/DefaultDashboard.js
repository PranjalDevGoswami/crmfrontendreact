import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import Breadcrumbs from "../components/Breadcrumbs.js";
import Header from "../partials/Header.js";
import ProjectDataTable from "../project/ProjectDataTable.js";
import SideBar from "../components/SideBar.js";

const DefaultDashboard = ({ showEdit }) => {
  return (
    <div className="mt-16">
      <h1 className="text-3xl">
        Please Check with Admin for Role and Department Assign!!
      </h1>
    </div>
  );
};

export default DefaultDashboard;
