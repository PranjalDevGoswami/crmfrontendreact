import React, { useState } from "react";
import ProjectDataTable from "../project/ProjectDataTable.js";

const OperationDashboard = () => {
  const [operationDepartment] = useState(true);

  return <ProjectDataTable PersonDepartment={operationDepartment} />;
};

export default OperationDashboard;
