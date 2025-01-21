import React, { useState } from "react";
import ProjectDataTable from "../project/ProjectDataTable.js";

const OperationDashboard = () => {
  const [operationDepartment] = useState(true);

  return <ProjectDataTable PersonDepartment={operationDepartment} />;
  // return <ExportCSV />;
};

export default OperationDashboard;
