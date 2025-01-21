import React, { useState } from "react";
import ProjectDataTable from "../project/ProjectDataTable.js";

const FinanceDashboard = () => {
  const [operationDepartment] = useState(true);

  return <ProjectDataTable PersonDepartment={operationDepartment} />;
};

export default FinanceDashboard;
